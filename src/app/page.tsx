import Link from "next/link";
import { CtaBand, FaqSection, GuaranteeCard, SiteFooter, SiteHeader } from "@/components/Chrome";
import { services as servicePages, townSlug } from "@/content";
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
  SofaIcon,
  SpeedLines,
} from "@/components/Icons";
import { site, smsHref, telHref } from "@/site";

const services = [
  { Icon: SofaIcon, href: "/services/furniture-removal", title: "Furniture & appliances", text: "Couches, mattresses, fridges, washers, hot tubs. Single items or a whole room." },
  { Icon: HouseIcon, href: "/services/estate-cleanouts", title: "Home & estate cleanouts", text: "Moving, downsizing or settling an estate. We clear it out so you can move forward." },
  { Icon: GarageIcon, href: "/services/garage-cleanouts", title: "Garage, basement & attic", text: "Years of boxes, old tools, broken toys. Get the space back in one morning." },
  { Icon: HammerIcon, href: "/services/construction-debris-removal", title: "Construction & reno debris", text: "Drywall, flooring, cabinets, light demo. We come from the building trade, so this is home turf." },
  { Icon: LeafIcon, href: "", title: "Yard waste, sheds & decks", text: "Brush piles, old playsets, sheds and decks taken down and hauled off." },
  { Icon: BuildingIcon, href: "/services/realtor-property-cleanouts", title: "Office & commercial", text: "Office furniture, storage rooms, retail fixtures and property turnovers for landlords." },
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
  { q: "When are you open?", a: `${site.hours}. Text a photo anytime and we'll reply during business hours.` },
  { q: "Is it really gone by noon?", a: `Yes. ${site.guarantee.text} ${site.guarantee.fine}` },
];


export default function Home() {
  return (
    <>
      <SiteHeader />

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
              {services.map(({ Icon, href, title, text }) => (
                <div key={title} className="card">
                  <div className="icon-box"><Icon size={28} /></div>
                  <h3>{href ? <Link href={href} className="card-link">{title}</Link> : title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <p className="more-links">
              <strong>Popular:</strong>{" "}
              {servicePages.map((s, i) => (
                <span key={s.slug}>{i > 0 && " · "}<Link href={`/services/${s.slug}`}>{s.name}</Link></span>
              ))}
            </p>
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
            <p className="more-links"><Link href="/pricing">More on pricing →</Link></p>
          </div>
        </section>

        <section id="about" className="section">
          <div className="wrap split">
            <GuaranteeCard />
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
              <p className="more-links"><Link href="/about">More about us →</Link></p>
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
              {site.towns.map((t, i) => {
                const slug = townSlug(t);
                return (
                  <li key={t} className={i === 0 ? "chip chip-dark" : "chip"}>
                    {slug ? <Link href={`/junk-removal/${slug}`}>{t}</Link> : t}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <FaqSection faqs={faqs} />

        <CtaBand />
      </main>

      <SiteFooter />
    </>
  );
}
