// ─────────────────────────────────────────────────────────────
// Gone by Noon — site settings
// Edit this file to update contact info, prices and towns.
// Anything still in [BRACKETS] needs a real value before launch.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Gone by Noon",
  url: "https://gonebynoon.co",
  tagline: "Junk removal · Bucks County, PA",
  description:
    "Junk removal in Doylestown and central Bucks County. Book a morning pickup and it's gone by noon. Furniture, appliances, cleanouts and construction debris.",

  // Contact — fill these in. Phone: digits only for the links, display for the text.
  phoneDisplay: "[YOUR NUMBER]",
  phoneDigits: "", // e.g. "2155550123"
  email: "[YOUR EMAIL]",
  hours: "[YOUR HOURS]",
  partnerCompany: "[PARTNER COMPANY]",

  // Pricing section. Single item comes from the price sheet's minimum visit charge.
  prices: {
    single: "From $99",
    quarter: "[PRICE]",
    half: "[PRICE]",
    full: "[PRICE]",
  },

  towns: [
    "Doylestown",
    "Buckingham",
    "Warrington",
    "Chalfont",
    "New Britain",
    "Furlong",
    "Jamison",
    "Plumsteadville",
    "Dublin",
    "Perkasie",
    "Warminster",
    "Lahaska",
    "New Hope",
    "Hatfield",
    "Horsham",
  ],
};

export const telHref = site.phoneDigits ? `tel:+1${site.phoneDigits}` : "#quote";
export const smsHref = site.phoneDigits ? `sms:+1${site.phoneDigits}` : "#quote";
