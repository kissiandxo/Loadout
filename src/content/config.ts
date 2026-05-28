import { defineCollection, z } from 'astro:content';

const OutcomeGroup = z.object({
  outcome: z.string(),
  description: z.string(),
  items: z.array(z.string()),
});

const FAQ = z.object({
  q: z.string(),
  a: z.string(),
});

const bundles = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    niche: z.string(),
    name: z.string(),
    tagline: z.string(),
    price: z.number(),
    bumpPrice: z.number(),
    premiumPrice: z.number(),
    heroHeadline: z.string(),
    heroSubhead: z.string(),
    problem: z.array(z.string()),
    shift: z.string(),
    whatsInside: z.array(OutcomeGroup),
    skillCount: z.number(),
    pluginCount: z.number(),
    bonuses: z.array(z.string()),
    bumpName: z.string(),
    bumpDescription: z.string(),
    premiumName: z.string(),
    premiumDescription: z.string(),
    faqs: z.array(FAQ),
    checkoutUrl: z.string(),
    bumpUrl: z.string(),
    premiumUrl: z.string(),
    status: z.enum(['live', 'coming-soon']),
  }),
});

export const collections = { bundles };
