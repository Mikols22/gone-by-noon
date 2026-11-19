// ─────────────────────────────────────────────────────────────
// Gone by Noon: page content for services, towns and pricing.
// Edit wording and prices here; the pages, sitemap, search data
// and llms.txt all update from this file.
// ─────────────────────────────────────────────────────────────

export type Faq = { q: string; a: string };

// ── Single-item prices ──
// Working prices from the Nov 2026 price sheet (to review with Randy).
// null = priced on site. "min" = the minimum visit charge (site.prices.single).
// HIDDEN for now: set SHOW_ITEM_PRICES to true to show this list on the site again.
export const SHOW_ITEM_PRICES = false;
export const MIN_VISIT = 99;
export type PriceItem = { name: string; from: number | "min" | null };
export const priceList: { category: string; items: PriceItem[] }[] = [
  {
    category: "Appliances",
    items: [
      { name: "Refrigerator", from: 135 },
      { name: "Large refrigerator (side-by-side, French door)", from: 165 },
      { name: "Freezer (chest or upright)", from: 145 },
      { name: "Washer or dryer", from: 115 },
      { name: "Washer + dryer pair", from: 185 },
      { name: "Dishwasher", from: 105 },
      { name: "Stove, range or oven", from: 115 },
      { name: "Water heater", from: 155 },
      { name: "Grill", from: 105 },
      { name: "Mini fridge, microwave, window AC or dehumidifier", from: "min" },
    ],
  },
  {
    category: "Furniture",
    items: [
      { name: "Sofa or couch", from: 139 },
      { name: "Loveseat or recliner", from: 119 },
      { name: "Sleeper sofa", from: 179 },
      { name: "Sectional (4+ pieces)", from: 275 },
      { name: "Dresser", from: 125 },
      { name: "Armoire or wardrobe", from: 155 },
      { name: "Dining table", from: 115 },
      { name: "Desk", from: 125 },
      { name: "Large bookshelf or entertainment center", from: 115 },
      { name: "Chair, end table, nightstand or small bookshelf", from: "min" },
    ],
  },
  {
    category: "Mattresses & beds",
    items: [
      { name: "Mattress (any size)", from: 109 },
      { name: "Mattress + box spring set", from: 159 },
      { name: "Wood bed frame with headboard", from: 125 },
      { name: "Bunk bed or loft bed", from: 175 },
      { name: "Box spring, metal bed frame or crib", from: "min" },
    ],
  },
  {
    category: "TVs & electronics",
    items: [
      { name: "Flat-screen TV, 40–65 in.", from: 115 },
      { name: "TV over 65 in., tube or projection", from: 165 },
      { name: "TV under 40 in., computer, monitor or printer", from: "min" },
    ],
  },
  {
    category: "Outdoor, garage & fitness",
    items: [
      { name: "Hot tub", from: 450 },
      { name: "Swing set or playset", from: 375 },
      { name: "Riding mower", from: 225 },
      { name: "Push mower", from: 115 },
      { name: "Patio set (table + 4 chairs)", from: 155 },
      { name: "Treadmill", from: 175 },
      { name: "Elliptical", from: 155 },
      { name: "Home gym (multi-station)", from: 275 },
      { name: "Shed or above-ground pool", from: null },
    ],
  },
  {
    category: "Specialty",
    items: [
      { name: "Upright piano", from: 350 },
      { name: "Pool table", from: 350 },
      { name: "Safe", from: null },
    ],
  },
];

export function priceLabel(p: PriceItem["from"]): string {
  if (p === null) return "Priced on site";
  return `From $${p === "min" ? MIN_VISIT : p}`;
}

export function findPrice(name: string): PriceItem | undefined {
  for (const c of priceList) for (const i of c.items) if (i.name === name) return i;
  return undefined;
}

// ── Services ──
export type Service = {
  slug: string;
  name: string; // short name for links and cards
  title: string; // browser tab / Google title
  description: string; // Google snippet, ~150 characters
  h1: string;
  intro: string;
  take: string[]; // what we take
  priceItems: string[]; // names from priceList shown on the page
  priceNote: string;
  photoQuoteOnly?: boolean; // no price table; priced from a photo
  goodToKnow: string[];
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: "furniture-removal",
    name: "Furniture removal",
    title: "Furniture Removal in Doylestown & Bucks County, PA",
    description:
      "Couch, sectional, dresser or a whole room of furniture hauled away from your Bucks County home. Upfront prices, no surprises. Book by 8, gone by noon.",
    h1: "Furniture removal in Bucks County",
    intro:
      "Old couch, broken recliner, a dresser nobody wants. We carry it out of any room in the house, load it on our trailer and haul it away. You don't lift a thing, and we sweep up before we leave.",
    take: ["Sofas, sectionals and sleeper sofas", "Recliners and armchairs", "Dressers, armoires and nightstands", "Dining tables and chairs", "Desks and office furniture", "Bookshelves and entertainment centers", "Patio and outdoor furniture"],
    priceItems: ["Sofa or couch", "Sectional (4+ pieces)", "Sleeper sofa", "Dresser", "Dining table", "Chair, end table, nightstand or small bookshelf"],
    priceNote: "Several pieces at once? Extra items on the same visit cost less, or we price the whole job by trailer space.",
    goodToKnow: [
      "We take furniture from upstairs bedrooms, basements and attics. Tight staircase? Tell us when you text the photo.",
      "Sleeper sofas and sectionals are heavy. We bring enough crew to move them without damaging walls or floors.",
      "Leave it where it is. Taking furniture out of the room is part of the price.",
    ],
    faqs: [
      { q: "How much does couch removal cost in Bucks County?", a: "Our smallest job is a quarter load (from $240), which fits a few large items, like a couch, a mattress set and a dresser. Text a photo for an exact price. Labor, hauling and disposal are included." },
      { q: "Do I need to bring the furniture outside?", a: "No. We carry it out of whatever room it's in, including basements and second floors." },
      { q: "Can you take a whole room of furniture at once?", a: "Yes. For three or more large pieces we usually price by trailer space, which is cheaper than paying per item." },
    ],
  },
  {
    slug: "appliance-removal",
    name: "Appliance removal",
    title: "Appliance Removal: Fridges, Washers & More | Bucks County, PA",
    description:
      "Refrigerator, washer, dryer, stove or water heater removal in Doylestown and central Bucks County. Upfront prices, disposal included.",
    h1: "Appliance removal in Bucks County",
    intro:
      "Got a new fridge coming and nowhere to put the old one? We haul away refrigerators, freezers, washers, dryers, stoves, dishwashers and water heaters, and we get them to the right place for disposal.",
    take: ["Refrigerators and freezers", "Washers and dryers", "Stoves, ranges and ovens", "Dishwashers", "Water heaters", "Microwaves, window AC units and dehumidifiers", "Grills"],
    priceItems: ["Refrigerator", "Large refrigerator (side-by-side, French door)", "Washer or dryer", "Washer + dryer pair", "Stove, range or oven", "Water heater", "Dishwasher"],
    priceNote: "Fridges, freezers and AC units contain refrigerant that has to be handled properly, and that's built into the price.",
    goodToKnow: [
      "Gas appliances (stoves, dryers, water heaters) need to be disconnected by a licensed pro before we arrive.",
      "Please empty fridges and freezers first.",
      "Washers should be unhooked and drained.",
    ],
    faqs: [
      { q: "How much does it cost to get rid of an old refrigerator?", a: "Our smallest job is a quarter load (from $240), which fits a few large items, like a couch, a mattress set and a dresser. Text a photo for an exact price. Hauling and disposal are included." },
      { q: "Can you disconnect my gas stove or dryer?", a: "No. Gas lines need to be capped by a licensed plumber or technician. Once it's disconnected, we'll take it from there." },
      { q: "Do you take appliances from basements?", a: "Yes. Basement washers, dryers, freezers and water heaters are common jobs for us." },
    ],
  },
  {
    slug: "mattress-removal",
    name: "Mattress removal",
    title: "Mattress & Box Spring Removal in Bucks County, PA",
    description:
      "Mattress, box spring and bed frame removal in Doylestown and central Bucks County. Any size, upfront price. We carry it out, you don't lift a thing.",
    h1: "Mattress removal in Bucks County",
    intro:
      "Mattresses are awkward to move and most curbside trash pickups won't take them. We carry them down the stairs and out the door, along with the box spring and frame if you need those gone too.",
    take: ["Mattresses, any size", "Box springs", "Metal and wood bed frames", "Headboards and footboards", "Bunk beds and loft beds", "Cribs"],
    priceItems: ["Mattress (any size)", "Mattress + box spring set", "Wood bed frame with headboard", "Bunk bed or loft bed", "Box spring, metal bed frame or crib"],
    priceNote: "Getting a new mattress delivered? Book the morning of delivery and the old one is gone before the new one arrives.",
    goodToKnow: [
      "Strip the bedding first. We handle everything else.",
      "We can take the frame apart if it won't fit down the stairs in one piece.",
    ],
    faqs: [
      { q: "How much does mattress removal cost?", a: "Our smallest job is a quarter load (from $240), which fits a few large items, like a couch, a mattress set and a dresser. Text a photo for an exact price." },
      { q: "Do you take mattresses from upstairs bedrooms?", a: "Yes. We carry it out from wherever it is in the house." },
    ],
  },
  {
    slug: "hot-tub-removal",
    name: "Hot tub removal",
    title: "Hot Tub & Spa Removal in Bucks County, PA",
    description:
      "Hot tub and spa removal in Doylestown and central Bucks County. We cut it down, load it and haul it away. Upfront price from a photo.",
    h1: "Hot tub removal in Bucks County",
    intro:
      "An old hot tub is one of the hardest things to get rid of yourself. They're heavy, they rarely fit through a gate in one piece, and nobody wants them. Our crew comes from a working construction company, so we bring the tools to cut it down, load it and leave the area clean.",
    take: ["Above-ground hot tubs and spas", "Swim spas (priced on site)", "Hot tub covers, steps and surrounds", "Old decking around the tub (ask for a quote)"],
    priceItems: ["Hot tub"],
    photoQuoteOnly: true,
    priceNote: "Every hot tub is different, so we price it from a photo of the tub and the path to the driveway.",
    goodToKnow: [
      "Drain the tub a day or two before we arrive.",
      "The power needs to be shut off and disconnected by an electrician before removal.",
      "Send a photo that shows the tub and the path to the driveway. That's how we price it.",
    ],
    faqs: [
      { q: "How much does hot tub removal cost in Bucks County?", a: "It depends on the size and how easy it is to reach. Text a photo and we'll send an upfront price that includes cutting it down, hauling and disposal." },
      { q: "Do I need to drain and disconnect it first?", a: "Yes. Drain it ahead of time and have an electrician disconnect the power. We handle the rest." },
      { q: "Can you remove the deck around it too?", a: "Often, yes. Include the deck in your photo and we'll price both together." },
    ],
  },
  {
    slug: "garage-cleanouts",
    name: "Garage & basement cleanouts",
    title: "Garage, Basement & Attic Cleanouts | Bucks County, PA",
    description:
      "Garage, basement and attic cleanouts in Doylestown and central Bucks County. Priced by trailer space, from $240 for a quarter load. Done in one morning.",
    h1: "Garage, basement and attic cleanouts",
    intro:
      "Years of boxes, broken bikes, old tools and things nobody remembers buying. Point at what's going and we'll load it all, haul it away and sweep the floor, usually in a single morning.",
    take: ["Boxes and household clutter", "Old furniture and appliances", "Bikes, toys and sports gear", "Tools, shelving and workbenches", "Lawn equipment", "Holiday decorations"],
    priceItems: [],
    priceNote: "Cleanouts are priced by how much room the load takes on our trailer. A typical garage or basement is a quarter to half load.",
    goodToKnow: [
      "You don't need to sort or box anything. Just show us what stays.",
      "We can't take paint, chemicals, fuel, propane tanks or other hazardous materials.",
      "Want to keep the car out of the driveway tonight? Book a morning slot.",
    ],
    faqs: [
      { q: "How much does a garage cleanout cost?", a: "Most garages and basements are a quarter load (from $240) or a half load (from $480). Send a photo for an exact price." },
      { q: "Do I need to sort things first?", a: "No. Show us what you're keeping and we take everything else." },
      { q: "Can you take old paint and chemicals?", a: "No. Paint, chemicals, fuel and propane need to go to a household hazardous waste collection event." },
    ],
  },
  {
    slug: "estate-cleanouts",
    name: "House & estate cleanouts",
    title: "Estate & Whole-House Cleanouts in Bucks County, PA",
    description:
      "Whole-house and estate cleanouts for families, executors and downsizers in Doylestown and central Bucks County. Respectful crew, upfront price.",
    h1: "House and estate cleanouts in Bucks County",
    intro:
      "Clearing out a parent's home or downsizing is hard enough. We handle the heavy part carefully and on your schedule: furniture, appliances, closets, basements and everything in between, so the house is ready to sell or hand over.",
    take: ["Furniture and appliances throughout the house", "Closets, cabinets and contents", "Basements, attics and garages", "Sheds and outdoor items", "Everything left after family has taken what they want"],
    priceItems: [],
    priceNote: "Whole-house jobs are priced by trailer loads. A full load starts at $680, and we'll tell you how many loads to expect after seeing photos or a quick walkthrough.",
    goodToKnow: [
      "Mark or remove anything the family is keeping before we start.",
      "Not local? We can work with a realtor or neighbor who lets us in, and text you photos when the house is clear.",
      "We can work in stages if the family needs time to go through things.",
    ],
    faqs: [
      { q: "How much does an estate cleanout cost?", a: "It depends on how much is in the house. Each full trailer load starts at $680. Send photos of each room and we'll give you an upfront price." },
      { q: "Do I need to be there?", a: "No. Many families live out of the area. Someone just needs to let us in, and we'll send photos when it's done." },
      { q: "Can you clear the house before a listing goes live?", a: "Yes. Tell us the listing date and we'll schedule around it." },
    ],
  },
  {
    slug: "construction-debris-removal",
    name: "Construction debris removal",
    title: "Construction & Renovation Debris Removal | Bucks County, PA",
    description:
      "Drywall, flooring, cabinets and light demo debris hauled away in Bucks County. Run by a local home builder's crew. Cheaper than a dumpster for small jobs.",
    h1: "Construction and renovation debris removal",
    intro:
      "Our crew comes from TW Homes, a local home builder, so construction debris is home turf. Drywall, flooring, cabinets, tile and lumber, from a single bathroom remodel to a whole-house renovation. No dumpster sitting in your driveway for a week.",
    take: ["Drywall and plaster", "Flooring and carpet", "Cabinets and countertops", "Tile and lumber", "Doors, windows and trim", "Old decks and fencing (ask for a quote)"],
    priceItems: [],
    priceNote: "Debris is priced by trailer space. A small bathroom remodel is often a quarter load (from $240). Very heavy material like concrete or brick is priced on site.",
    goodToKnow: [
      "Pile debris in one spot if you can. It makes loading faster.",
      "We can't take asbestos, lead paint abatement waste or chemicals.",
      "Contractors: ask about scheduled pickups for ongoing jobs.",
    ],
    faqs: [
      { q: "Is it cheaper than renting a dumpster?", a: "For small and medium jobs, usually. You only pay for the space you use, we do the loading, and nothing sits in your driveway." },
      { q: "Do you take concrete and brick?", a: "Small amounts, yes. Because it's so heavy, it's priced after we see it." },
      { q: "Do you work with contractors?", a: "Yes. We come from the building trade and can schedule regular pickups for job sites." },
    ],
  },
  {
    slug: "realtor-property-cleanouts",
    name: "Realtor & property manager cleanouts",
    title: "Cleanouts for Realtors & Property Managers | Bucks County, PA",
    description:
      "Fast listing, tenant-turnover and foreclosure cleanouts for Bucks County realtors and property managers. Text the address, get a price, gone by noon.",
    h1: "Cleanouts for realtors and property managers",
    intro:
      "A listing can't go live with a basement full of junk, and a rental can't turn over until the last tenant's leftovers are gone. Text us the address and a few photos, and we'll clear it out and send photos when it's done, so you don't have to drive over.",
    take: ["Pre-listing cleanouts", "Tenant turnovers and move-outs", "Foreclosure and bank-owned properties", "Estate sales leftovers", "Sheds, garages and basements"],
    priceItems: [],
    priceNote: "Priced by trailer space, with an upfront price before we start. We can bill the agency, the seller or the estate.",
    goodToKnow: [
      "Lockbox access is fine. We'll text photos when we arrive and when we leave.",
      "Book an 8 AM arrival and the Noon Guarantee applies, so you can schedule photos for the afternoon.",
    ],
    faqs: [
      { q: "Can you work from a lockbox?", a: "Yes. Send us the code and we'll text photos before and after." },
      { q: "Who pays the bill?", a: "Whoever you tell us to bill: the agency, the seller or the estate." },
      { q: "How fast can you clear a listing?", a: "Book an 8 AM arrival and a full load is gone by noon, or 20% off the bill." },
    ],
  },
];

// ── Towns ──
export type Town = {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  local: string;
  popular: string[]; // service slugs
  nearby: string[]; // other town names from site.towns
  faqs: Faq[];
};

export const towns: Town[] = [
  {
    slug: "doylestown",
    name: "Doylestown",
    title: "Junk Removal in Doylestown, PA | Gone by Noon",
    description:
      "Local junk removal in Doylestown Borough and Township. Furniture, appliances, cleanouts and debris hauled away. Book by 8, gone by noon.",
    intro:
      "Doylestown is home base. We serve the Borough and all of Doylestown Township, from the older homes near Main and State Streets to the neighborhoods out toward Route 611 and Route 202.",
    local:
      "Older Doylestown homes often mean narrow staircases, tight basements and driveways with little room for a dumpster. That's where we fit: we bring a trailer for the morning, load everything by hand and leave nothing behind.",
    popular: ["furniture-removal", "estate-cleanouts", "garage-cleanouts", "appliance-removal"],
    nearby: ["Buckingham", "New Britain", "Furlong", "Jamison", "Warrington", "Chalfont"],
    faqs: [
      { q: "Do you serve both Doylestown Borough and Doylestown Township?", a: "Yes, all of both. We're based in Doylestown." },
      { q: "How soon can you come?", a: "Text a photo and we'll reply with a price and the next open morning." },
    ],
  },
  {
    slug: "buckingham",
    name: "Buckingham",
    title: "Junk Removal in Buckingham Township, PA | Gone by Noon",
    description:
      "Junk removal in Buckingham Township, including Furlong, Lahaska and Holicong. Barns, sheds, garages and whole-house cleanouts.",
    intro:
      "We serve all of Buckingham Township, including Furlong, Lahaska and Holicong, just minutes from our base in Doylestown.",
    local:
      "Bigger Buckingham properties tend to collect bigger projects: sheds, outbuildings, old playsets, riding mowers and garages that haven't been cleared in years. Our crew comes from a construction company, so taking down and hauling away a shed or playset is routine.",
    popular: ["garage-cleanouts", "hot-tub-removal", "estate-cleanouts", "construction-debris-removal"],
    nearby: ["Doylestown", "Furlong", "Lahaska", "New Hope", "Warrington"],
    faqs: [
      { q: "Do you take sheds and playsets?", a: "Yes. Playsets and sheds are priced from a photo." },
      { q: "Do you serve Lahaska and Holicong?", a: "Yes. Both are part of Buckingham Township and in our regular area." },
    ],
  },
  {
    slug: "warrington",
    name: "Warrington",
    title: "Junk Removal in Warrington, PA | Gone by Noon",
    description:
      "Junk removal in Warrington Township. Furniture, appliances, garage and basement cleanouts. Upfront prices and a gone-by-noon guarantee.",
    intro:
      "Warrington Township sits just south of Doylestown along Route 611, and it's one of the busiest parts of our service area.",
    local:
      "Most Warrington jobs are family homes: a basement that's finally getting finished, a garage that needs room for the car again, or a move to a new house. Book an 8 AM arrival and it's cleared out by noon.",
    popular: ["garage-cleanouts", "furniture-removal", "appliance-removal", "mattress-removal"],
    nearby: ["Doylestown", "Jamison", "Warminster", "Chalfont", "Horsham"],
    faqs: [
      { q: "Do you serve all of Warrington Township?", a: "Yes, including the neighborhoods off Route 611 and Bristol Road." },
      { q: "What does a typical garage cleanout cost?", a: "Most garages are a quarter load (from $240) or a half load (from $480)." },
    ],
  },
  {
    slug: "chalfont",
    name: "Chalfont",
    title: "Junk Removal in Chalfont, PA | Gone by Noon",
    description:
      "Junk removal in Chalfont Borough and nearby New Britain. Furniture, cleanouts and debris hauled away by a local Bucks County crew.",
    intro:
      "We serve Chalfont Borough and the surrounding New Britain Township area, about ten minutes from our base in Doylestown.",
    local:
      "From a few pieces of old furniture to whole-basement cleanouts, Chalfont jobs are quick for us to reach. Text a photo and we'll send a price back.",
    popular: ["furniture-removal", "appliance-removal", "garage-cleanouts", "mattress-removal"],
    nearby: ["New Britain", "Doylestown", "Warrington", "Hatfield", "Perkasie"],
    faqs: [
      { q: "What's the smallest job you take?", a: "A quarter trailer load, from $240. That fits a few large items, so it's a good time to clear out anything else that's been waiting to go." },
      { q: "Do you serve New Britain too?", a: "Yes, both the Borough and New Britain Township." },
    ],
  },
  {
    slug: "new-hope",
    name: "New Hope",
    title: "Junk Removal in New Hope, PA | Gone by Noon",
    description:
      "Junk removal in New Hope and nearby Solebury. Careful crew for historic homes, shops and rentals. Upfront price, gone by noon.",
    intro:
      "We serve New Hope Borough and the surrounding Solebury area along the Delaware River.",
    local:
      "New Hope's historic homes, shops and rentals often come with tight streets, limited parking and narrow doorways. Our crew is used to working carefully in older buildings, and we time the job so the trailer isn't blocking anyone for long.",
    popular: ["estate-cleanouts", "realtor-property-cleanouts", "furniture-removal", "construction-debris-removal"],
    nearby: ["Lahaska", "Buckingham", "Doylestown"],
    faqs: [
      { q: "Do you work with New Hope shops and rentals?", a: "Yes. We handle store fixture removal and rental turnovers, and can text photos when the job is done." },
      { q: "Parking is tight on my street. Is that a problem?", a: "Usually not. Send a photo of the street and we'll plan the best spot for the trailer." },
    ],
  },
  {
    slug: "warminster",
    name: "Warminster",
    title: "Junk Removal in Warminster, PA | Gone by Noon",
    description:
      "Junk removal in Warminster Township. Furniture, appliances, cleanouts and renovation debris. Local Bucks County crew with upfront prices.",
    intro:
      "We serve all of Warminster Township, from the neighborhoods around Street Road to the areas bordering Warrington and Ivyland.",
    local:
      "Warminster jobs run the range: appliances, tenant turnovers, renovation debris and full-house cleanouts. Whatever the size, you get an upfront price before we lift anything.",
    popular: ["appliance-removal", "realtor-property-cleanouts", "construction-debris-removal", "furniture-removal"],
    nearby: ["Warrington", "Horsham", "Jamison", "Doylestown"],
    faqs: [
      { q: "What's the smallest job you take?", a: "A quarter trailer load, from $240. Bundle a few large items into one visit." },
      { q: "Can you help with a rental turnover?", a: "Yes. Landlords and property managers can text us the address and we'll handle it from there." },
    ],
  },
];

export const townSlug = (name: string) => towns.find((t) => t.name === name)?.slug;
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
