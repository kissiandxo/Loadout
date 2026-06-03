import PricingSection from "@/components/ui/pricing-section";

export default function Home() {
  return (
    <>
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md border-b border-[#27272A]">
        <div className="max-w-[1080px] mx-auto px-6 flex items-center justify-between h-16">
          <div className="font-black text-[22px] tracking-tight">
            LOADOUT<span className="text-[#4F8BFF]">.</span>
          </div>
          <a
            href="#pricing"
            className="bg-[#3B82F6] text-white font-bold px-6 py-2.5 rounded-xl hover:bg-[#4F8BFF] hover:-translate-y-0.5 transition-all text-sm"
          >
            Get the kits
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="relative overflow-hidden py-24 border-b border-[#27272A]">
        <div
          className="absolute w-[680px] h-[680px] rounded-full top-[-280px] right-[-220px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(79,139,255,.18) 0%,rgba(79,139,255,0) 70%)",
          }}
        />
        <div className="max-w-[1080px] mx-auto px-6">
          <p className="text-[#4F8BFF] font-bold tracking-[2px] uppercase text-[13px] mb-4">
            Done-for-you Claude AI skill kits
          </p>
          <h1 className="text-[clamp(34px,6vw,62px)] font-black tracking-tight leading-[1.05] mb-6">
            Pre-built AI staff for{" "}
            <span className="text-[#4F8BFF]">any business.</span>
            <br />
            Live in 30 minutes.
          </h1>
          <p className="text-[#A1A1AA] text-[clamp(17px,2.2vw,21px)] max-w-[680px] mb-8 leading-relaxed">
            Install 12 specialist AI &ldquo;staff&rdquo; with one command —
            handling support, follow-ups, content, admin and operations. No
            coding. No monthly SaaS bloat. Big-company output without the
            headcount.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="#pricing"
              className="bg-[#3B82F6] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#4F8BFF] hover:-translate-y-0.5 transition-all"
            >
              Get the kits
            </a>
            <a
              href="#inside"
              className="bg-transparent border border-[#27272A] text-[#FAFAFA] font-bold px-8 py-4 rounded-xl hover:-translate-y-0.5 transition-all"
            >
              See what&rsquo;s inside
            </a>
          </div>
          <p className="text-[#A1A1AA] text-sm mt-5">
            One-time price · 14-day money-back · Works in any industry
          </p>
        </div>
      </header>

      {/* ── Problem ── */}
      <section className="py-[88px] border-b border-[#27272A]">
        <div className="max-w-[1080px] mx-auto px-6">
          <p className="text-[#4F8BFF] font-bold tracking-[2px] uppercase text-[13px] mb-3">
            The problem
          </p>
          <h2 className="text-[clamp(26px,4vw,40px)] font-extrabold tracking-tight mb-6">
            You&rsquo;re doing the work of a whole team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
            {[
              "Same emails, replies and follow-ups — every single day, eating the hours you should spend growing.",
              "Paying $19–99/month for software that gives generic answers and never quite fits your business.",
              "Leads go cold because the follow-up didn't happen. Reviews and refunds sit unanswered.",
              "Competitors have whole teams for this. You've got you, an inbox, and five tabs open.",
            ].map((text, i) => (
              <div
                key={i}
                className="bg-[#15151C] border border-[#27272A] rounded-2xl p-7 text-[#A1A1AA] leading-relaxed"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section id="inside" className="py-[88px] border-b border-[#27272A]">
        <div className="max-w-[1080px] mx-auto px-6">
          <p className="text-[#4F8BFF] font-bold tracking-[2px] uppercase text-[13px] mb-3">
            What you get
          </p>
          <h2 className="text-[clamp(26px,4vw,40px)] font-extrabold tracking-tight mb-4">
            12 AI staff, installed in one command
          </h2>
          <p className="text-[#A1A1AA] text-[clamp(17px,2.2vw,21px)] max-w-[680px] mb-8 leading-relaxed">
            Open the kit in Claude, type{" "}
            <strong className="text-[#FAFAFA]">/loadout-setup</strong>, and a
            full crew of specialist assistants goes live — each tuned for a real
            job, in your voice.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {[
              {
                tag: "SALES",
                title: "Never lose a follow-up",
                body: "Quote chasers, no-show recovery, objection prep, proposals — written and ready to send.",
              },
              {
                tag: "SUPPORT",
                title: "Own your customer chat",
                body: "Triage tickets, answer FAQs, handle reviews, refunds and win-backs — calm and on-brand.",
              },
              {
                tag: "OPS",
                title: "Kill the admin",
                body: "Summaries, recaps, message drafting and the repetitive work that drains your day.",
              },
            ].map((card) => (
              <div
                key={card.tag}
                className="bg-[#15151C] border border-[#27272A] rounded-2xl p-7"
              >
                <div className="text-[#4F8BFF] font-extrabold text-[14px] tracking-[1px] mb-2">
                  {card.tag}
                </div>
                <h3 className="font-bold text-xl mb-2">{card.title}</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
          <ul className="space-y-3">
            {[
              "Beginner-friendly setup guide (PDF) — running in under 30 minutes",
              "30-day prompt cheat sheet — the exact phrases for each AI staffer",
              "Done-for-you templates you can use on your next job",
              "You own it — no subscription, no lock-in",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-[#A1A1AA]">
                <span className="text-[#4F8BFF] font-extrabold mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-[88px] border-b border-[#27272A]">
        <div className="max-w-[1080px] mx-auto px-6">
          <p className="text-[#4F8BFF] font-bold tracking-[2px] uppercase text-[13px] mb-3">
            How it works
          </p>
          <h2 className="text-[clamp(26px,4vw,40px)] font-extrabold tracking-tight mb-8">
            Three steps. Under 30 minutes.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                num: "01",
                title: "Buy & download",
                body: "Instant delivery of your kit.",
              },
              {
                num: "02",
                title: "Open in Claude",
                body: "Type /loadout-setup — it installs everything for you.",
              },
              {
                num: "03",
                title: "Go live",
                body: "Your 12 AI staff are working the same afternoon.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-[#15151C] border border-[#27272A] rounded-2xl p-7"
              >
                <div className="text-[#4F8BFF] font-extrabold text-[14px] tracking-[1px] mb-3">
                  {step.num}
                </div>
                <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-[#A1A1AA] text-sm">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Animated Pricing Section ── */}
      <PricingSection />

      {/* ── FAQ ── */}
      <section className="py-[88px] border-b border-[#27272A]">
        <div className="max-w-[760px] mx-auto px-6">
          <p className="text-[#4F8BFF] font-bold tracking-[2px] uppercase text-[13px] mb-3">
            FAQ
          </p>
          <h2 className="text-[clamp(26px,4vw,40px)] font-extrabold tracking-tight mb-8">
            Questions
          </h2>
          {[
            {
              q: "Do I need to know how to code?",
              a: "No. If you can copy and paste, you can run this. The setup guide walks every step with screenshots — most people are live in under 30 minutes.",
            },
            {
              q: "What is Claude? Do I need a subscription?",
              a: "Claude is an AI assistant by Anthropic. You'll want a Claude Pro plan (~$20/mo) to run the skills. LOADOUT is the curated setup that makes Claude genuinely useful for your day-to-day.",
            },
            {
              q: "Does this work for my industry?",
              a: "Yes — the AI staff are calibrated for work any business does: follow-ups, support, content, admin, operations. Trades, agencies, e-com, services, coaching and more.",
            },
            {
              q: "What if it doesn't work for me?",
              a: "14-day no-questions-asked refund. Email us and we'll sort it out.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="border border-[#27272A] rounded-xl p-5 mb-3 bg-[#15151C]"
            >
              <summary className="font-bold cursor-pointer list-none">
                {item.q}
              </summary>
              <p className="text-[#A1A1AA] mt-3 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-[88px] border-b border-[#27272A] text-center">
        <div className="max-w-[1080px] mx-auto px-6">
          <h2 className="text-[clamp(26px,4vw,40px)] font-extrabold tracking-tight mb-4">
            Build your AI crew today
          </h2>
          <p className="text-[#A1A1AA] text-[clamp(17px,2.2vw,21px)] max-w-[680px] mx-auto mb-8">
            Install once. Run forever. Live in under 30 minutes.
          </p>
          <a
            href="#pricing"
            className="bg-[#3B82F6] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#4F8BFF] hover:-translate-y-0.5 transition-all inline-block"
          >
            Get the kits
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 text-[#A1A1AA] text-sm text-center">
        <div className="font-black text-[22px] tracking-tight text-[#FAFAFA] mb-2">
          LOADOUT<span className="text-[#4F8BFF]">.</span>
        </div>
        Done-for-you Claude AI skill kits · support@REPLACE-domain.com
        <br />
        © 2026 LOADOUT. All rights reserved.
      </footer>
    </>
  );
}
