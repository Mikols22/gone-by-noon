import { Logo } from "@/components/Logo";
import { QuoteForm } from "@/components/QuoteForm";
import {
  BuildingIcon,
  CameraIcon,
  CheckIcon,
  GarageIcon,
  HammerIcon,
  HouseIcon,
  LeafIcon,
  MobileIcon,
  PhoneIcon,
  SofaIcon,
  SpeedLines,
} from "@/components/Icons";
import { site, smsHref, telHref } from "@/site";

const services = [
  { Icon: SofaIcon, title: "Furniture & appliances", text: "Couches, mattresses, fridges, washers, hot tubs. Single items or a whole room." },
  { Icon: HouseIcon, title: "Home & estate cleanouts", text: "Moving, downsizing or settling an estate. We clear it out so you can move forward." },
  { Icon: GarageIcon, title: "Garage, basement & attic", text: "Years of boxes, old tools, broken toys. Get the space back in one morning." },
  { Icon: HammerIcon, title: "Construction & reno debris", text: "Drywall, flooring, cabinets, light demo. We come from the building trade, so this is home turf." },
  { Icon: LeafIcon, title: "Yard waste, sheds & decks", text: "Brush piles, old playsets, sheds and decks taken down and hauled off." },
  { Icon: BuildingIcon, title: "Office & commercial", text: "Office furniture, storage rooms, retail fixtures and property turnovers for landlords." },
];

const steps = [
  { title: "Send a photo or call", text: "Text us a picture, fill out the form, or just call. Tell us your town and what's going." },
  { title: "Get an upfront price", text: "We price by how much space it takes on the trailer. You approve it before we lift a thing." },
  { title: "It's gone by noon", text: "Book a morning slot. We load it, haul it, sweep up, and you've got your afternoon back." },
];

const loads = [
  { name: "Single item", fill: 8, price: site.prices.single, text: "One couch, mattress or appliance." },
  { name: "Quarter load", fill: 25, price: site.prices.quarter, text: "A few large items or a small room's worth." },
  { name: "Half load", fill: 50, price: site.prices.half, text: "A typical garage or basement cleanout." },
  { name: "Full load", fill: 100, price: site.prices.full, text: "Whole-house, estate or construction cleanups.", dark: true },
];

const faqs = [
  { q: "What do you take?", a: "Almost anything non-hazardous that two people can lift: furniture, appliances, electronics, boxes, yard waste, construction debris and more." },
  { q: "What can't you take?", a: "Hazardous materials like paint, chemicals, fuel, propane tanks, asbestos and medical waste." },
  { q: "How does pricing work?", a: "Single items have a set price. Bigger jobs are priced by how much space they take on our trailer. Labor, hauling and disposal are included, and we confirm the price on site before we start." },
  { q: "Do I need to be home?", a: "Not always. If the items are outside or easy to get to, we can handle it while you're out and text you photos when it's done." },
  { q: "Is it really gone by noon?", a: `Yes. ${site.guarantee.text} ${site.guarantee.fine}` },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  url: site.url,
  description: site.description,
  ...(site.phoneDigits ? { telephone: `+1${site.phoneDigits}` } : {}),
  address: { "@type": "PostalAddress", addressLocality: "Doylestown", addressRegion: "PA", addressCountry: "US" },
  areaServed: site.towns.map((t) => ({ "@type": "City", name: `${t}, PA` })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="site-header">
        <div className="wrap header-row">
          <a href="#top" aria-label="Gone by Noon home">
            <Logo width={138} />
          </a>
          <nav className="main-nav" aria-label="Main">
            <a href="#services">Services</a>
            <a href="#how">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#area">Service area</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="btn btn-green header-call" href={telHref}>
            <PhoneIcon size={18} />
            Call or text {site.phoneDisplay}
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero dark">
          <div className="wrap hero-row">
            <div className="hero-copy">
              <p className="eyebrow eyebrow-green">
                <SpeedLines /> {site.tagline}
              </p>
              <h1>
                Junk gone.
                <br />
                <span className="green">By noon.</span>
              </h1>
              <p className="lead">
                Book a morning pickup and we&apos;ll have it cleared before lunch. Furniture, cleanouts, construction
                debris. You point, we lift, load and haul.
              </p>
              <div className="btn-row">
                <a className="btn btn-green btn-lg" href={smsHref}>
                  <CameraIcon size={20} />
                  Text a photo for a free quote
                </a>
                <a className="btn btn-outline btn-lg" href={telHref}>
                  Call {site.phoneDisplay}
                </a>
              </div>
              <ul className="trust">
                <li><CheckIcon size={20} /> {site.guarantee.short}</li>
                <li><CheckIcon size={20} /> Locally owned in Doylestown</li>
                <li><CheckIcon size={20} /> Upfront, no-surprise pricing</li>
                              </ul>
            </div>
            <div id="quote" className="quote-card">
              <QuoteForm />
            </div>
          </div>
        </section>

        <section className="band-green">
          <div className="wrap band-row">
            <p>
              <MobileIcon size={36} />
              <span>
                Fastest quote: text a photo of your junk to <strong>{site.phoneDisplay}</strong>.
              </span>
            </p>
            <a className="btn btn-dark" href={smsHref}>Text a photo</a>
          </div>
        </section>

        <section id="services" className="section">
          <div className="wrap">
            <p className="eyebrow">What we haul</p>
            <h2 className="h2">If two people can lift it, it&apos;s gone.</h2>
            <div className="grid">
              {services.map(({ Icon, title, text }) => (
                <div key={title} className="card">
                  <div className="icon-box"><Icon size={28} /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="section dark">
          <div className="wrap">
            <p className="eyebrow eyebrow-green">How it works</p>
            <h2 className="h2">Three steps. Zero heavy lifting.</h2>
            <ol className="grid steps">
              {steps.map((s, i) => (
                <li key={s.title} className="card card-dark">
                  <span className="step-num">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="pricing" className="section gray">
          <div className="wrap">
            <p className="eyebrow">Simple pricing</p>
            <h2 className="h2">You pay for the space you use.</h2>
            <p className="section-lead">
              Every price includes labor, loading, hauling and disposal. We confirm the final price on site before we
              start.
            </p>
            <div className="grid grid-4">
              {loads.map((l) => (
                <div key={l.name} className={`card price-card${l.dark ? " price-dark" : ""}`}>
                  <h3>{l.name}</h3>
                  <div className="meter"><span style={{ width: `${l.fill}%` }} /></div>
                  <p className="price">{l.price}</p>
                  <p>{l.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="wrap split">
            <div className="guarantee">
              <Logo width={200} background="#1C1F24" />
              <p className="eyebrow eyebrow-green">The Noon Guarantee</p>
              <p className="guarantee-head">{site.guarantee.headline}</p>
              <p className="guarantee-text">{site.guarantee.text}</p>
              <p className="guarantee-fine">{site.guarantee.fine}</p>
            </div>
            <div>
              <p className="eyebrow">Why Gone by Noon</p>
              <h2 className="h2">Local guys. Real trucks.</h2>
              <p className="section-lead">
                Gone by Noon is a partnership between two Bucks County business owners. Our crew comes from{" "}
                {site.partnerCompany}, a local home builder, so we show up with real trailers, the right equipment and
                people who know how to work carefully in your home.
              </p>
              <ul className="checks">
                <li><CheckIcon size={22} /> Crew from a working construction company</li>
                <li><CheckIcon size={22} /> Upfront price before we lift anything</li>
                <li><CheckIcon size={22} /> We sweep up before we leave</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Before & after — turn back on once there are real job photos (see BeforeAfter in git history) */}

        <section id="area" className="section">
          <div className="wrap split">
            <div>
              <p className="eyebrow">Service area</p>
              <h2 className="h2">Based in Doylestown. Serving central Bucks.</h2>
              <p className="section-lead">Don&apos;t see your town? Send a quote request anyway and we&apos;ll let you know.</p>
            </div>
            <ul className="chips">
              {site.towns.map((t, i) => (
                <li key={t} className={i === 0 ? "chip chip-dark" : "chip"}>{t}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="faq" className="section gray">
          <div className="wrap narrow">
            <p className="eyebrow">FAQ</p>
            <h2 className="h2">Good questions.</h2>
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

        <section className="section dark cta">
          <div className="wrap band-row">
            <div>
              <h2 className="h2">Point at it. <span className="green">We&apos;ll haul it.</span></h2>
              <p className="lead">Free quotes by text, phone or online.</p>
            </div>
            <div className="btn-row">
              <a className="btn btn-green btn-lg" href="#quote">Get a free quote</a>
              <a className="btn btn-outline btn-lg" href={telHref}>Call {site.phoneDisplay}</a>
            </div>
          </div>
        </section>
      </main>

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
            <p className="footer-head">Explore</p>
            <p><a href="#services">Services</a></p>
            <p><a href="#pricing">Pricing</a></p>
            <p><a href="#area">Service area</a></p>
            <p><a href="#faq">FAQ</a></p>
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
