import type { NextConfig } from "next";

// Base path the site is served from. Empty for local dev (`next dev`) and for a
// user/root Pages site; set to "/aryan-portfolio" by the deploy workflow so the
// project Pages site at https://<user>.github.io/aryan-portfolio resolves assets.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Emit a fully static site into `out/` so it can be served by GitHub Pages.
  output: "export",

  // GitHub Pages serves no Image Optimization server, so images must be served
  // as-is. (This project only uses plain <img>, but this keeps next/image safe.)
  images: { unoptimized: true },

  // Serve `/route/` -> `/route/index.html`, which GitHub Pages resolves cleanly.
  trailingSlash: true,

  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
