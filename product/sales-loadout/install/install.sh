#!/usr/bin/env bash
# LOADOUT auto-installer (macOS / Linux)
# Installs a kit's skills + slash commands + plugins into Claude Code. Driven by manifest.json.
#
# Usage (the LOADOUT installer agent calls this for you):
#   Project install (recommended):  ./install.sh --mode project --target /path/to/your/project
#   Global install:                 ./install.sh --mode global
#   (testing)                       ./install.sh --mode global --home /tmp/fakehome
#
# Emits a machine-readable summary between [LOADOUT-RESULT] ... [/LOADOUT-RESULT].

set -uo pipefail

MODE="project"; TARGET=""; HOME_OVERRIDE=""
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
KIT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --mode) MODE="$2"; shift 2;;
    --target) TARGET="$2"; shift 2;;
    --home) HOME_OVERRIDE="$2"; shift 2;;
    --kit-root) KIT_ROOT="$2"; shift 2;;
    *) echo "Unknown arg: $1"; exit 64;;
  esac
done

MANIFEST="$SCRIPT_DIR/manifest.json"
[[ -f "$MANIFEST" ]] || { echo "manifest.json not found at $MANIFEST"; exit 64; }

# Minimal JSON scalar reader for our controlled manifest format.
json_str() { grep -o "\"$1\"[[:space:]]*:[[:space:]]*\"[^\"]*\"" "$MANIFEST" | head -1 | sed -E 's/.*:[[:space:]]*"([^"]*)"/\1/'; }
json_num() { grep -o "\"$1\"[[:space:]]*:[[:space:]]*[0-9]+" "$MANIFEST" | head -1 | sed -E 's/.*:[[:space:]]*([0-9]+)/\1/'; }

KIT="$(json_str kit)"; VERSION="$(json_str version)"; DISPLAY="$(json_str displayName)"
INSTALLER_CMD="$(json_str installerCommand)"; SAMPLE_CMD="$(json_str sampleCommand)"
EXP_SKILLS="$(json_num skills)"; EXP_COMMANDS="$(json_num commands)"; EXP_PLUGINS="$(json_num plugins)"

# Fixed layout convention across kits
SRC_SKILLS="$KIT_ROOT/skills"
SRC_COMMANDS="$KIT_ROOT/.claude/commands"
SRC_PLUGINS="$KIT_ROOT/plugins"

HOME_DIR="${HOME_OVERRIDE:-$HOME}"
STATE_DIR="$HOME_DIR/loadout/$KIT"
LOG_DIR="$STATE_DIR/logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/install-$(date +%Y%m%d-%H%M%S).log"
# Logs go to stderr (+ file) so they never pollute $(...) value captures.
log() { echo "$(date +%H:%M:%S)  $*" | tee -a "$LOG_FILE" >&2; }

log "LOADOUT installer - $DISPLAY ($VERSION)"

if [[ "$MODE" == "project" ]]; then
  [[ -n "$TARGET" ]] || { echo "Project mode needs --target <your project folder>"; exit 64; }
  DEST="$TARGET"; SKILLS_DST="$DEST/skills"; PLUGINS_DST="$DEST/plugins"; CMD_DST="$DEST/.claude/commands"
else
  DEST="$HOME_DIR/.claude"; SKILLS_DST="$DEST/skills"; PLUGINS_DST="$DEST/loadout-plugins"; CMD_DST="$DEST/commands"
fi
mkdir -p "$DEST" "$SKILLS_DST" "$PLUGINS_DST" "$CMD_DST"
log "Mode: $MODE   Target: $DEST"

WARN=(); ERR=()

copy_subfolders() { # src dst label  -> echoes count on stdout
  local src="$1" dst="$2" label="$3" n=0 d name
  if [[ ! -d "$src" ]]; then WARN+=("source $label missing: $src"); log "  ! $label source missing - skipped"; echo 0; return; fi
  for d in "$src"/*/; do
    [[ -d "$d" ]] || continue
    name="$(basename "$d")"
    if rm -rf "$dst/$name" && cp -R "$d" "$dst/$name"; then n=$((n+1)); else ERR+=("failed copying $label/$name"); fi
  done
  log "  $label installed: $n"
  echo "$n"
}

SKILLS_N="$(copy_subfolders "$SRC_SKILLS" "$SKILLS_DST" skills)"
PLUGINS_N="$(copy_subfolders "$SRC_PLUGINS" "$PLUGINS_DST" plugins)"

CMD_N=0
if [[ -d "$SRC_COMMANDS" ]]; then
  for f in "$SRC_COMMANDS"/*.md; do
    [[ -f "$f" ]] || continue
    base="$(basename "$f" .md)"
    if cp -f "$f" "$CMD_DST/"; then
      [[ "$base" != "$INSTALLER_CMD" ]] && CMD_N=$((CMD_N+1))
    else
      ERR+=("failed copying command $base")
    fi
  done
else
  WARN+=("commands source missing: $SRC_COMMANDS"); log "  ! commands source missing - skipped"
fi
log "  commands installed (product): $CMD_N"

REWRITES=0
if [[ "$MODE" == "global" ]]; then
  for f in "$CMD_DST"/*.md; do
    [[ -f "$f" ]] || continue
    if grep -q '@skills/' "$f"; then
      sed -i.bak "s#@skills/#@$SKILLS_DST/#g" "$f" && rm -f "$f.bak" && REWRITES=$((REWRITES+1))
    fi
  done
  log "  global path rewrites: $REWRITES command file(s)"
fi

VERIFY_OK=false
if [[ "$SKILLS_N" -ge "${EXP_SKILLS:-0}" && "$CMD_N" -ge "${EXP_COMMANDS:-0}" && "$PLUGINS_N" -ge "${EXP_PLUGINS:-0}" ]]; then VERIFY_OK=true; fi
SAMPLE_OK=false; [[ -f "$CMD_DST/$SAMPLE_CMD.md" ]] && SAMPLE_OK=true

STATUS="completed"
[[ "$VERIFY_OK" == false ]] && STATUS="incomplete"
[[ ${#ERR[@]} -gt 0 ]] && STATUS="completed-with-errors"

STATE_FILE="$STATE_DIR/.setup-state.json"
cat > "$STATE_FILE" <<JSON
{
  "kit": "$KIT", "version": "$VERSION", "mode": "$MODE", "target": "$DEST",
  "installedAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "counts": { "skills": $SKILLS_N, "commands": $CMD_N, "plugins": $PLUGINS_N },
  "expected": { "skills": ${EXP_SKILLS:-0}, "commands": ${EXP_COMMANDS:-0}, "plugins": ${EXP_PLUGINS:-0} },
  "pathRewrites": $REWRITES, "verifyOk": $VERIFY_OK, "sampleCommandPresent": $SAMPLE_OK,
  "status": "$STATUS"
}
JSON

echo ""
echo "[LOADOUT-RESULT]"
tr -d '\n' < "$STATE_FILE" | tr -s ' '
echo ""
echo "[/LOADOUT-RESULT]"
echo ""
echo "State : $STATE_FILE"
echo "Log   : $LOG_FILE"

[[ ${#ERR[@]} -gt 0 ]] && exit 2
[[ "$VERIFY_OK" == true ]] || exit 1
exit 0
