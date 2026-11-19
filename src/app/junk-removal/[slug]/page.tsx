import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, FaqSection, GuaranteeCard, PageHero, SiteFooter, SiteHeader } from "@/components/Chrome";
import { serviceBySlug, towns, townSlug } from "@/content";
import { site } from "@/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return towns.map((t) => ({ slug: t.slug }));
}

const townBySlug = (slug: string) => towns.find((t) => t.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = townBySlug(slug);
  if (!t) return {};
  const path = `/junk-removal/${t.slug}`;
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: path },
    openGraph: { title: t.title, description: t.description, url: `${site.url}${path}`, siteName: site.name, type: "website" },
  };
}

export default async function TownPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = townBySlug(slug);
  if (!t) notFound();
  const popular = t.popular.map((p) => serviceBySlug(p)).filter((s) => s !== undefined);

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow={`Junk removal · ${t.name}, PA`}
          title={`Junk removal in ${t.name}, PA`}
          lead={t.intro}
          trail={[{ name: `Junk removal in ${t.name}`, href: `/junk-removal/${t.slug}` }]}
        />

        <section className="section">
          <div className="wrap split">
            <div className="prose">
              <p className="eyebrow">Local crew</p>
              <h2 className="h2">Gone by noon in {t.name}</h2>
              <p>{t.local}</p>
              <p>
                Text a photo of what&apos;s going to <a href={`sms:+1${site.phoneDigits}`}>{site.phoneDisplay}</a> and
                we&apos;ll reply with an upfront price. Jobs are priced by how much space they take on our trailer, starting with a quarter load at{" "}
                {site.prices.quarter.replace("From ", "")}. {site.hours}.
              </p>
            </div>
            <GuaranteeCard />
          </div>
        </section>

        <section className="section gray">
          <div className="wrap">
            <p className="eyebrow">Popular in {t.name}</p>
            <h2 className="h2">What we haul in {t.name}</h2>
            <div className="grid">
              {popular.map((s) => (
                <div key={s.slug} className="card">
                  <h3><Link href={`/services/${s.slug}`} className="card-link">{s.name}</Link></h3>
                  <p>{s.description}</p>
                </div>
              ))}
            </div>
            <p className="more-links"><Link href="/pricing">See all prices →</Link></p>
          </div>
        </section>

        <FaqSection faqs={t.faqs} title={`${t.name} questions`} />

        <section className="section">
          <div className="wrap">
            <p className="eyebrow">Nearby</p>
            <h2 className="h2">We also serve</h2>
            <ul className="chips" style={{ marginTop: 28 }}>
              {t.nearby.map((n) => {
                const s = townSlug(n);
                return (
                  <li key={n} className="chip">{s ? <Link href={`/junk-removal/${s}`}>{n}</Link> : n}</li>
                );
              })}
            </ul>
          </div>
        </section>

        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
