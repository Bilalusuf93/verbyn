import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/** Only emitted with absolute URLs once NEXT_PUBLIC_SITE_URL is configured. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return [];
  return [{ url: siteConfig.url, changeFrequency: "monthly", priority: 1 }];
}
