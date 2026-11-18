import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/site";
import "./globals.css";

// Fonts are bundled with the site (Anton for headlines, Inter for body text; both SIL Open Font License).
const anton = localFont({ src: "../fonts/anton.woff2", weight: "400", variable: "--font-anton", display: "swap" });
const inter = localFont({ src: "../fonts/inter-variable.woff2", weight: "100 900", variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Gone by Noon | Junk Removal in Doylestown & Bucks County, PA",
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

export const viewport: Viewport = { themeColor: "#1C1F24" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
