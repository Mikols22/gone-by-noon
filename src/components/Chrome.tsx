// Shared header, footer, mobile call bar and page building blocks.
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CameraIcon, PhoneIcon, SpeedLines } from "@/components/Icons";
import { site, smsHref, telHref } from "@/site";
import { services, towns, type Faq } from "@/content";

export const BUSINESS_ID = `${site.url}/#business`;

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href="/" aria-label="Gone by Noon home">
          <Logo width={138} />
        </Link>
        <nav className="main-nav" aria-label="Main">
          <Link href="/#services">Services</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/#area">Service area</Link>
          <Link href="/about">About</Link>
          <Link href="/#faq">FAQ</Link>
        </nav>
        <a className="btn btn-green header-call" href={telHref}>
          <PhoneIcon size={18} />
          Call or text {site.phoneDisplay}
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <div className="wrap footer-row">
          <div className="footer-brand">
            <Logo withTagline width={150} background="#14161A" />
            <p>Junk removal and cleanouts for homes and businesses in Bucks County, PA.</p>
          </div>
          <div>
            <p className="footer-head">Contact</p>
            <p><a href={telHref}>{site.phoneDisplay}</a></p>
            {site.email && <p><a href={`mailto:${site.email}`}>{site.email}</a></p>}
            {site.hours && <p>{site.hours}</p>}
            <p>Serving central Bucks County</p>
          </div>
          <div>
            <p className="footer-head">Services</p>
            {services.map((s) => (
              <p key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></p>
            ))}
          </div>
          <div>
            <p className="footer-head">Towns</p>
            {towns.map((t) => (
              <p key={t.slug}><Link href={`/junk-removal/${t.slug}`}>Junk removal in {t.name}</Link></p>
            ))}
          </div>
          <div>
            <p className="footer-head">Explore</p>
            <p><Link href="/pricing">Pricing</Link></p>
            <p><Link href="/about">About us</Link></p>
            <p><Link href="/#faq">FAQ</Link></p>
            <p><Link href="/#quote">Free quote</Link></p>
          </div>
        </div>
        <div className="wrap footer-base">© {new Date().getFullYear()} Gone by Noon · Doylestown, PA</div>
      </footer>
      <div className="callbar">
        <a className="btn btn-outline" href={telHref}><PhoneIcon size={18} /> Call</a>
        <a className="btn btn-green" href={smsHref}><CameraIcon size={18} /> Text a photo</a>
      </div>
    </>
  );
}

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...trail];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${site.url}${c.href}` })),
        }}
      />
      <nav className="crumbs" aria-label="Breadcrumb">
        {all.map((c, i) => (
          <span key={c.href}>
            {i > 0 && <span aria-hidden="true"> / </span>}
            {i < all.length - 1 ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
          </span>
        ))}
      </nav>
    </>
  );
}

export function PageHero({ eyebrow, title, lead, trail }: { eyebrow: string; title: string; lead: string; trail: Crumb[] }) {
  return (
    <section className="hero dark page-hero">
      <div className="wrap">
        <Breadcrumbs trail={trail} />
        <div className="hero-copy">
          <p className="eyebrow eyebrow-green"><SpeedLines /> {eyebrow}</p>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
          <div className="btn-row">
            <a className="btn btn-green btn-lg" href={smsHref}>
              <CameraIcon size={20} />
              Text a photo for a free quote
            </a>
            <a className="btn btn-outline btn-lg" href={telHref}>Call {site.phoneDisplay}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function FaqSection({ faqs, title = "Good questions.", id = "faq" }: { faqs: Faq[]; title?: string; id?: string }) {
  return (
    <section id={id} className="section gray">
      <JsonLd data={faqSchema(faqs)} />
      <div className="wrap narrow">
        <p className="eyebrow">FAQ</p>
        <h2 className="h2">{title}</h2>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GuaranteeCard() {
  return (
    <div className="guarantee">
      <Logo width={200} background="#1C1F24" />
      <p className="eyebrow eyebrow-green">The Noon Guarantee</p>
      <p className="guarantee-head">{site.guarantee.headline}</p>
      <p className="guarantee-text">{site.guarantee.text}</p>
      <p className="guarantee-fine">{site.guarantee.fine}</p>
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="section dark cta">
      <div className="wrap band-row">
        <div>
          <h2 className="h2">Point at it. <span className="green">We&apos;ll haul it.</span></h2>
          <p className="lead">Free quotes by text, phone or online. {site.hours}.</p>
        </div>
        <div className="btn-row">
          <Link className="btn btn-green btn-lg" href="/#quote">Get a free quote</Link>
          <a className="btn btn-outline btn-lg" href={telHref}>Call {site.phoneDisplay}</a>
        </div>
      </div>
    </section>
  );
}
