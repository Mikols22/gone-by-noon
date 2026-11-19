import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_ID, CtaBand, FaqSection, JsonLd, PageHero, SiteFooter, SiteHeader } from "@/components/Chrome";
import { MIN_VISIT, SHOW_ITEM_PRICES, priceLabel, priceList, services } from "@/content";
import { site } from "@/site";

const title = "Junk Removal Prices in Bucks County, PA | Gone by Noon";
const description =
  "Upfront junk removal prices for Doylestown and central Bucks County: quarter loads from $295, half loads from $575, full loads from $995.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pricing" },
  openGraph: { title, description, url: `${site.url}/pricing`, siteName: site.name, type: "website" },
};

const num = (s: string) => Number(s.replace(/[^0-9]/g, ""));

const loads = [
  { name: "Quarter load", price: site.prices.quarter, text: "A few large items, like a couch, mattress set and dresser. Our smallest job." },
  { name: "Half load", price: site.prices.half, text: "A typical garage or basement cleanout." },
  { name: "Full load", price: site.prices.full, text: "Whole-house, estate or construction cleanups." },
];

const faqs = [
  { q: "How much does junk removal cost in Bucks County?", a: `Every job is priced by trailer space: a quarter load from ${site.prices.quarter.replace("From ", "")}, a half load from ${site.prices.half.replace("From ", "")} and a full load from ${site.prices.full.replace("From ", "")}.` },
  { q: "What's included in the price?", a: "Labor, carrying items out of the house, loading, hauling and disposal. We confirm the final price on site before we start." },
  { q: "Do you pick up just one item?", a: "Our smallest job is a quarter trailer load, from $295. That fits a few large items, like a couch, a mattress set and a dresser, so it's worth bundling everything you want gone into one visit." },
];

export default function PricingPage() {
  const catalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Gone by Noon junk removal prices",
    url: `${site.url}/pricing`,
    itemListElement: [
      ...loads.map((l) => ({ "@type": "Offer", name: l.name, priceCurrency: "USD", price: num(l.price), description: `${l.text} Starting price.`, seller: { "@id": BUSINESS_ID } })),
      ...(SHOW_ITEM_PRICES ? priceList : []).flatMap((c) =>
        c.items
          .filter((i) => i.from !== null)
          .map((i) => ({ "@type": "Offer", name: `${i.name} removal`, category: c.category, priceCurrency: "USD", price: i.from === "min" ? MIN_VISIT : i.from, seller: { "@id": BUSINESS_ID } })),
      ),
    ],
  };

  return (
    <>
      <SiteHeader />
      <JsonLd data={catalog} />
      <main>
        <PageHero
          eyebrow="Upfront pricing"
          title="Junk removal prices"
          lead="Simple, upfront prices for Doylestown and central Bucks County. Every price includes labor, loading, hauling and disposal. We confirm the final price on site before we lift anything."
          trail={[{ name: "Pricing", href: "/pricing" }]}
        />

        <section className="section gray">
          <div className="wrap">
            <p className="eyebrow">Bigger jobs</p>
            <h2 className="h2">Priced by trailer space</h2>
            <p className="section-lead">For cleanouts and three or more large items, you pay for how much room the load takes on our trailer. Our smallest job is a quarter load. Text a photo and we&apos;ll tell you which size fits.</p>
            <p className="section-lead">We can&apos;t take paint, chemicals, fuel, propane tanks, asbestos or medical waste.</p>
            <div className="grid grid-3">
              {loads.map((l) => (
                <div key={l.name} className="card price-card">
                  <h3>{l.name}</h3>
                  <p className="price">{l.price}</p>
                  <p>{l.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {SHOW_ITEM_PRICES && (
        <section className="section">
          <div className="wrap">
            <p className="eyebrow">Single items</p>
            <h2 className="h2">Single-item prices</h2>
            <p className="section-lead">
              Starting prices for one item. The minimum visit is ${MIN_VISIT}, and extra items on the same visit cost less.
            </p>
            <div className="price-tables">
              {priceList.map((c) => (
                <table key={c.category} className="price-table">
                  <caption>{c.category}</caption>
                  <tbody>
                    {c.items.map((i) => (
                      <tr key={i.name}><td>{i.name}</td><td>{priceLabel(i.from)}</td></tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </div>
            <p className="more-links">
              We can&apos;t take paint, chemicals, fuel, propane tanks, asbestos or medical waste.
            </p>
          </div>
        </section>

        )}

        <FaqSection faqs={faqs} title="Pricing questions" />

        <section className="section">
          <div className="wrap">
            <p className="eyebrow">Services</p>
            <h2 className="h2">Prices by service</h2>
            <ul className="link-grid">
              {services.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
