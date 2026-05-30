// Shared identity + credential spec — single source of truth for both the
// workflow generator (_build.mjs) and the installer (install/loadout.mjs).
// Deterministic IDs mean the credential a node references is the SAME id the
// installer imports, so everything links automatically after import.
import { createHash } from "node:crypto";

export const id = (seed) => {
  const h = createHash("sha1").update(seed).digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-8${h.slice(17, 20)}-${h.slice(20, 32)}`;
};

// Each credential: n8n type, deterministic id, display name, whether it needs a
// browser "Connect/Approve" click (OAuth), and how to fill its data from env.
export const CRED_SPEC = {
  anthropic: {
    type: "anthropicApi", id: id("cred/anthropic"), name: "LOADOUT Anthropic", oauth: false,
    requires: ["ANTHROPIC_API_KEY"],
    data: (e) => ({ apiKey: e.ANTHROPIC_API_KEY }),
  },
  gmail: {
    type: "gmailOAuth2", id: id("cred/gmail"), name: "LOADOUT Gmail", oauth: true,
    requires: ["GOOGLE_OAUTH_CLIENT_ID", "GOOGLE_OAUTH_CLIENT_SECRET"],
    data: (e) => ({ clientId: e.GOOGLE_OAUTH_CLIENT_ID, clientSecret: e.GOOGLE_OAUTH_CLIENT_SECRET }),
  },
  sheets: {
    type: "googleSheetsOAuth2Api", id: id("cred/sheets"), name: "LOADOUT Google Sheets", oauth: true,
    requires: ["GOOGLE_OAUTH_CLIENT_ID", "GOOGLE_OAUTH_CLIENT_SECRET"],
    data: (e) => ({ clientId: e.GOOGLE_OAUTH_CLIENT_ID, clientSecret: e.GOOGLE_OAUTH_CLIENT_SECRET }),
  },
  calendar: {
    type: "googleCalendarOAuth2Api", id: id("cred/calendar"), name: "LOADOUT Google Calendar", oauth: true,
    requires: ["GOOGLE_OAUTH_CLIENT_ID", "GOOGLE_OAUTH_CLIENT_SECRET"],
    data: (e) => ({ clientId: e.GOOGLE_OAUTH_CLIENT_ID, clientSecret: e.GOOGLE_OAUTH_CLIENT_SECRET }),
  },
  slack: {
    type: "slackApi", id: id("cred/slack"), name: "LOADOUT Slack", oauth: false,
    requires: ["SLACK_BOT_TOKEN"],
    data: (e) => ({ accessToken: e.SLACK_BOT_TOKEN }),
  },
  twilio: {
    type: "twilioApi", id: id("cred/twilio"), name: "LOADOUT Twilio", oauth: false,
    requires: ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN"],
    data: (e) => ({ accountSid: e.TWILIO_ACCOUNT_SID, authToken: e.TWILIO_AUTH_TOKEN }),
  },
};

// Node-stamping refs used by the generator: { credKey: { <type>: { id, name } } }
export const CRED = Object.fromEntries(
  Object.entries(CRED_SPEC).map(([k, s]) => [k, { [s.type]: { id: s.id, name: s.name } }])
);
