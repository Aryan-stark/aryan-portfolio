// Single source of truth for the deployment base path.
//
// On GitHub Pages this site is served from a sub-path
// (https://<user>.github.io/aryan-portfolio), so every absolute asset URL that
// is NOT routed through next/link or next/image must be prefixed manually.
// `next.config.ts` reads the same env var for `basePath`/`assetPrefix`.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix an absolute public asset path (e.g. "/frames/x.jpg") with BASE_PATH. */
export const asset = (path: string) => `${BASE_PATH}${path}`;
