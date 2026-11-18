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
  phoneDisplay: "(215) 688-0541",
  phoneDigits: "2156880541",
  email: "hello@gonebynoon.co",
  hours: "Mon–Fri, 7 AM–4 PM", // shown in the footer and pages
  // Same hours for search engines: days use schema.org names, times are 24-hour.
  openingHours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "16:00" },
  partnerCompany: "TW Homes",

  // Pricing section. Single item comes from the price sheet's minimum visit charge.
  prices: {
    single: "From $99",
    quarter: "From $240",
    half: "From $480",
    full: "From $680",
  },

  // The Noon Guarantee
  guarantee: {
    short: "Gone by noon, or 20% off",
    headline: "Booked by 8. Gone by noon.",
    text: "When we're scheduled to arrive by 8 AM, your full load is hauled away by 12 noon, or you get 20% off your bill.",
    fine: "Applies to jobs up to one full trailer load with an 8 AM or earlier arrival. Doesn't apply to delays outside our control, such as blocked access or items that aren't ready.",
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
