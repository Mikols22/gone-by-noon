import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon } from "@/components/Icons";
import { BUSINESS_ID, CtaBand, GuaranteeCard, JsonLd, PageHero, SiteFooter, SiteHeader } from "@/components/Chrome";
import { site } from "@/site";

const title = "About Gone by Noon | Locally Owned Junk Removal in Doylestown, PA";
const description =
  "Gone by Noon is a locally owned junk removal company in Doylestown, PA, run by two Bucks County business owners with a crew from local home builder TW Homes.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: `${site.url}/about`, siteName: site.name, type: "website" },
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${site.url}/about`,
          name: title,
          about: { "@id": BUSINESS_ID },
        }}
      />
      <main>
        <PageHero
          eyebrow="About us"
          title="Local owners. Real trucks."
          lead="Gone by Noon is a junk removal company based in Doylestown, started by two Bucks County business owners who wanted hauling to be fast, fairly priced and done right."
          trail={[{ name: "About", href: "/about" }]}
        />

        <section className="section">
          <div className="wrap split">
            <div className="prose">
              <p className="eyebrow">Who we are</p>
              <h2 className="h2">Built by builders</h2>
              <p>
                Our crew comes from {site.partnerCompany}, a local home builder. They spend their days working inside
                people&apos;s homes, so they know how to carry a sleeper sofa down a tight staircase without touching the
                walls, and they show up with real trailers and the right tools.
              </p>
              <p>
                The business side is run from Doylestown. We built Gone by Noon around one idea: you shouldn&apos;t lose a
                whole day waiting on a junk hauler. Book a morning, and your afternoon is yours again.
              </p>
            </div>
            <GuaranteeCard />
          </div>
        </section>

        <section className="section gray">
          <div className="wrap">
            <p className="eyebrow">How we work</p>
            <h2 className="h2">What you can count on</h2>
            <ul className="checks" style={{ maxWidth: 720 }}>
              <li><CheckIcon size={22} /> An upfront price before we lift anything. No surprise fees.</li>
              <li><CheckIcon size={22} /> You only pay for the space your junk takes on our trailer.</li>
              <li><CheckIcon size={22} /> We carry everything out, load it and sweep up before we leave.</li>
              <li><CheckIcon size={22} /> Book by 8, gone by noon, or 20% off (half loads and smaller).</li>
              <li><CheckIcon size={22} /> Quotes by text: send a photo and get a price back.</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="wrap prose">
            <p className="eyebrow">Contact</p>
            <h2 className="h2">Talk to us</h2>
            <p>
              Call or text <a href={`tel:+1${site.phoneDigits}`}>{site.phoneDisplay}</a>, email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>, or <Link href="/#quote">request a quote online</Link>.
              We&apos;re open {site.hours} and serve Doylestown and central Bucks County.
            </p>
          </div>
        </section>

        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
