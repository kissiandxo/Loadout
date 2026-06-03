"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

const plans = [
  {
    name: "Standard Kit",
    description:
      "12-skill AI crew for your niche — sales, support, ops, content and admin. Setup guide + 30-day cheat sheet included.",
    price: 97,
    buttonText: "Get the kit",
    buttonVariant: "outline" as const,
    href: "https://REPLACE.lemonsqueezy.com/buy/standard-97",
    includes: [
      "What's inside:",
      "12 specialist AI skills",
      "30-day prompt cheat sheet",
      "Beginner setup guide (PDF)",
      "Done-for-you templates",
      "No subscription ever",
    ],
  },
  {
    name: "Kit + Vault",
    description:
      "Everything in Standard plus the Vault — 25 battle-tested scripts for the high-pressure moments that matter most.",
    price: 144,
    buttonText: "Get the kit + Vault",
    buttonVariant: "default" as const,
    popular: true,
    href: "https://REPLACE.lemonsqueezy.com/buy/vault-144",
    includes: [
      "Everything in Standard, plus:",
      "25 bonus Vault scripts",
      "Objection handling scripts",
      "Win-back & refund templates",
      "High-stakes email sequences",
      "Priority email support",
    ],
  },
  {
    name: "Full Bundle",
    description:
      "Both the Sales kit and Customer Engagement kit together — the complete AI crew at the best price.",
    price: 149,
    buttonText: "Get both kits",
    buttonVariant: "outline" as const,
    href: "https://REPLACE.lemonsqueezy.com/buy/bundle-149",
    includes: [
      "Everything in Standard, plus:",
      "Sales AI kit",
      "Customer Engagement kit",
      "Full 24-skill crew",
      "All cheat sheets & guides",
      "Best value option",
    ],
  },
];

const PricingBadge = () => (
  <div className="flex justify-center mb-4">
    <span className="inline-block text-xs font-bold tracking-widest uppercase text-blue-400 bg-blue-400/10 border border-blue-400/30 px-4 py-1.5 rounded-full">
      One-time price · Yours forever
    </span>
  </div>
);

export default function PricingSection() {
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  return (
    <div
      id="pricing"
      className="min-h-screen mx-auto relative bg-black overflow-x-hidden"
      ref={pricingRef}
    >
      {/* Grid background */}
      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute top-0 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]"
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]"></div>
        <SparklesComp
          density={1800}
          direction="bottom"
          speed={1}
          color="#FFFFFF"
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </TimelineContent>

      {/* Glow ring */}
      <TimelineContent
        animationNum={5}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute left-0 top-[-114px] w-full h-[113.625vh] flex flex-col items-start justify-start content-start flex-none flex-nowrap gap-2.5 overflow-hidden p-0 z-0"
      >
        <div className="relative w-full h-full">
          <div
            className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full"
            style={{
              border: "200px solid #3131f5",
              filter: "blur(92px)",
              WebkitFilter: "blur(92px)",
            }}
          ></div>
        </div>
      </TimelineContent>

      {/* Header */}
      <article className="text-center mb-6 pt-32 max-w-3xl mx-auto space-y-4 relative z-50 px-4">
        <PricingBadge />
        <h2 className="text-4xl font-medium text-white">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0,
            }}
          >
            Simple pricing. No subscriptions.
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-gray-300 text-lg"
        >
          Buy once. Install in 30 minutes. Your AI crew works for you from day one.
        </TimelineContent>
      </article>

      {/* Radial overlay */}
      <div
        className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, #206ce8 0%, transparent 70%)`,
          opacity: 0.6,
          mixBlendMode: "multiply",
        }}
      />

      {/* Pricing cards */}
      <div className="grid md:grid-cols-3 max-w-5xl gap-4 py-6 mx-auto px-4">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={1 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <Card
              className={cn(
                "relative text-white border-neutral-800 h-full",
                plan.popular
                  ? "bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 shadow-[0px_-13px_300px_0px_#0900ff] z-20"
                  : "bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 z-10"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-block text-xs font-bold tracking-widest uppercase text-blue-300 bg-blue-500/20 border border-blue-500/40 px-3 py-1 rounded-full whitespace-nowrap">
                    Most popular
                  </span>
                </div>
              )}
              <CardHeader className="text-left">
                <h3 className="text-2xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-semibold">
                    $
                    <NumberFlow
                      value={plan.price}
                      className="text-4xl font-semibold"
                    />
                  </span>
                  <span className="text-gray-400 ml-1 text-sm">one-time</span>
                </div>
                <p className="text-sm text-gray-300 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <a
                  href={plan.href}
                  className={cn(
                    "block w-full mb-6 p-4 text-center text-base font-semibold rounded-xl transition-all",
                    plan.popular
                      ? "bg-gradient-to-t from-blue-500 to-blue-600 shadow-lg shadow-blue-800 border border-blue-500 text-white hover:from-blue-600 hover:to-blue-700"
                      : "bg-gradient-to-t from-neutral-950 to-neutral-600 shadow-lg shadow-neutral-900 border border-neutral-800 text-white hover:from-neutral-900 hover:to-neutral-500"
                  )}
                >
                  {plan.buttonText}
                </a>

                <div className="space-y-3 pt-4 border-t border-neutral-700">
                  <h4 className="font-medium text-sm text-gray-400 mb-3">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-2">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <span className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>

      {/* Done-With-You upsell */}
      <TimelineContent
        as="div"
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="max-w-2xl mx-auto px-4 pb-16 relative z-10"
      >
        <div className="border border-neutral-700 bg-neutral-900/60 rounded-2xl p-8 text-center">
          <span className="text-blue-400 font-bold text-xs tracking-widest uppercase">
            White-Glove Option
          </span>
          <h3 className="text-2xl font-bold text-white mt-2 mb-2">
            Done-With-You
          </h3>
          <p className="text-gray-300 mb-2">
            A 60-minute 1-on-1 call — we install and tune every skill to your
            business, live.
          </p>
          <div className="text-4xl font-bold text-white mb-6">$497</div>
          <a
            href="https://REPLACE.lemonsqueezy.com/buy/dwy-497"
            className="inline-block bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Book a call
          </a>
        </div>
      </TimelineContent>

      {/* Guarantee */}
      <TimelineContent
        as="p"
        animationNum={5}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="text-center text-gray-400 text-sm pb-12 relative z-10"
      >
        14-day no-questions-asked money-back guarantee on every purchase.
      </TimelineContent>
    </div>
  );
}
