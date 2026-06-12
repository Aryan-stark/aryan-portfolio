import type { MetadataRoute } from "next";

const SITE_URL = "https://aryan-stark.github.io/aryan-portfolio";

// Statically generated at build time → out/robots.txt.
// Note: on a project Pages site this lives under /aryan-portfolio/, which
// crawlers don't read as the domain-root robots.txt — kept for tooling and
// in case the site moves to a custom domain.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
