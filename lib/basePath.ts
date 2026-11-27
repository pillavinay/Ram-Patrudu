/**
 * The sub-path the site is served from, e.g. "/Ram-Patrudu" on
 * https://pillavinay.github.io/Ram-Patrudu/ — or "" on a custom domain.
 * Set at build time by the GitHub Pages workflow (NEXT_PUBLIC_BASE_PATH).
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a root-relative path ("/og-image.png") with the base path. */
export const withBase = (path: string) => (path.startsWith("/") ? `${basePath}${path}` : path);
