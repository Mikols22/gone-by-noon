// /llms.txt — a plain-text summary of the business for AI assistants (ChatGPT, Claude, Perplexity, etc.).
// Built from site.ts and content.ts, so it stays in sync with the website.
import { SHOW_ITEM_PRICES, priceLabel, priceList, services, towns } from "@/content";
import { site } from "@/site";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Key facts",
    `- Business: locally owned junk removal company based in Doylestown, Pennsylvania (Bucks County).`,
    `- Phone (call or text): ${site.phoneDisplay}. Fastest quote: text a photo of the items.`,
    `- Email: ${site.email}`,
    `- Hours: ${site.hours}`,
    `- Website: ${site.url}`,
    `- Crew: from ${site.partnerCompany}, a local home builder.`,
    `- Noon Guarantee: ${site.guarantee.text} ${site.guarantee.fine}`,
    `- Service area: ${site.towns.join(", ")}, PA.`,
    `- Does not take: paint, chemicals, fuel, propane tanks, asbestos, medical waste.`,
    "",
    "## Pricing (starting prices; labor, loading, hauling and disposal included)",
    `- Single item: ${site.prices.single}`,
    `- Quarter trailer load: ${site.prices.quarter}`,
    `- Half trailer load: ${site.prices.half}`,
    `- Full trailer load: ${site.prices.full}`,
    ...(SHOW_ITEM_PRICES ? priceList : []).flatMap((c) => c.items.map((i) => `- ${i.name}: ${priceLabel(i.from)}`)),
    `- One or two items: text a photo for an exact price.`,
    `- Full price list: ${site.url}/pricing`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.name}](${site.url}/services/${s.slug}): ${s.description}`),
    "",
    "## Towns",
    ...towns.map((t) => `- [Junk removal in ${t.name}, PA](${site.url}/junk-removal/${t.slug})`),
    "",
    "## Other pages",
    `- [About](${site.url}/about)`,
    `- [Free quote](${site.url}/#quote)`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
