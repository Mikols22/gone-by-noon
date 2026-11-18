import type { MetadataRoute } from "next";
import { services, towns } from "@/content";
import { site } from "@/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/pricing`, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...towns.map((t) => ({ url: `${site.url}/junk-removal/${t.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.5 },
  ];
}
