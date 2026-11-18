import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/site";
import { BUSINESS_ID, JsonLd } from "@/components/Chrome";
import { services } from "@/content";
import "./globals.css";

// Fonts are bundled with the site (Anton for headlines, Inter for body text; both SIL Open Font License).
const anton = localFont({ src: "../fonts/anton.woff2", weight: "400", variable: "--font-anton", display: "swap" });
const inter = localFont({ src: "../fonts/inter-variable.woff2", weight: "100 900", variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Gone by Noon | Junk Removal in Doylestown & Bucks County, PA", template: "%s" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gone by Noon | Junk Removal in Bucks County, PA",
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
};

// Business details for Google, Bing and AI assistants. Appears on every page.
const business = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": BUSINESS_ID,
  name: site.name,
  url: site.url,
  logo: `${site.url}/apple-icon.png`,
  image: `${site.url}/opengraph-image.png`,
  description: site.description,
  slogan: site.guarantee.headline,
  telephone: `+1${site.phoneDigits}`,
  email: site.email,
  priceRange: "$$",
  address: { "@type": "PostalAddress", addressLocality: "Doylestown", addressRegion: "PA", addressCountry: "US" },
  areaServed: site.towns.map((t) => ({ "@type": "City", name: `${t}, PA` })),
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: site.openingHours.days, opens: site.openingHours.opens, closes: site.openingHours.closes },
  ],
  knowsAbout: services.map((s) => s.name),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Junk removal services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, url: `${site.url}/services/${s.slug}` },
    })),
  },
};

export const viewport: Viewport = { themeColor: "#1C1F24" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={business} />
        {children}
      </body>
    </html>
  );
}
