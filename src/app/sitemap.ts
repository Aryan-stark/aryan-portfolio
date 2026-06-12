import type { MetadataRoute } from "next";

const SITE_URL = "https://aryan-stark.github.io/aryan-portfolio";

// Statically generated at build time → out/sitemap.xml.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
