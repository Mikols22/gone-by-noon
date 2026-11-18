import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon } from "@/components/Icons";
import { BUSINESS_ID, CtaBand, FaqSection, GuaranteeCard, JsonLd, PageHero, SiteFooter, SiteHeader } from "@/components/Chrome";
import { findPrice, priceLabel, serviceBySlug, services, towns } from "@/content";
import { site } from "@/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  const path = `/services/${s.slug}`;
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: path },
    openGraph: { title: s.title, description: s.description, url: `${site.url}${path}`, siteName: site.name, type: "website" },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const prices = s.priceItems.map((n) => findPrice(n)).filter((p) => p !== undefined);
  const lowest = prices.map((p) => (p.from === "min" ? 99 : p.from)).filter((n): n is number => typeof n === "number");

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: "Junk removal",
    description: s.description,
    url: `${site.url}/services/${s.slug}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: site.towns.map((t) => ({ "@type": "City", name: `${t}, PA` })),
    ...(lowest.length
      ? { offers: { "@type": "Offer", priceCurrency: "USD", price: Math.min(...lowest), description: `Starting price for ${s.name.toLowerCase()}` } }
      : {}),
  };

  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <SiteHeader />
      <JsonLd data={serviceLd} />
      <main>
        <PageHero eyebrow="Junk removal · Bucks County, PA" title={s.h1} lead={s.intro} trail={[{ name: s.name, href: `/services/${s.slug}` }]} />

        <section className="section">
          <div className="wrap two-col" style={{ marginTop: 0 }}>
            <div>
              <h2 className="h2">What we take</h2>
              <ul className="checks">
                {s.take.map((t) => (
                  <li key={t}><CheckIcon size={22} /> {t}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="h2">Good to know</h2>
              <ul className="checks">
                {s.goodToKnow.map((t) => (
                  <li key={t}><CheckIcon size={22} /> {t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section gray">
          <div className="wrap">
            <p className="eyebrow">Upfront pricing</p>
            <h2 className="h2">What it costs</h2>
            <p className="section-lead">{s.priceNote} Labor, loading, hauling and disposal are always included.</p>
            {prices.length > 0 ? (
              <div className="price-tables">
                <table className="price-table">
                  <tbody>
                    {prices.map((p) => (
                      <tr key={p.name}><td>{p.name}</td><td>{priceLabel(p.from)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="price-tables">
                <table className="price-table">
                  <tbody>
                    <tr><td>Quarter trailer load</td><td>{site.prices.quarter}</td></tr>
                    <tr><td>Half trailer load</td><td>{site.prices.half}</td></tr>
                    <tr><td>Full trailer load</td><td>{site.prices.full}</td></tr>
                  </tbody>
                </table>
              </div>
            )}
            <p className="more-links"><Link href="/pricing">See all prices →</Link></p>
          </div>
        </section>

        <section className="section">
          <div className="wrap split">
            <GuaranteeCard />
            <div>
              <p className="eyebrow">Where we work</p>
              <h2 className="h2">{s.name} near you</h2>
              <p className="section-lead">
                Based in Doylestown and serving central Bucks County. {site.hours}.
              </p>
              <ul className="link-grid">
                {towns.map((t) => (
                  <li key={t.slug}><Link href={`/junk-removal/${t.slug}`}>{t.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <FaqSection faqs={s.faqs} title={`${s.name}: questions`} />

        <section className="section">
          <div className="wrap">
            <p className="eyebrow">More services</p>
            <h2 className="h2">Other things we haul</h2>
            <ul className="link-grid">
              {others.map((o) => (
                <li key={o.slug}><Link href={`/services/${o.slug}`}>{o.name}</Link></li>
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
