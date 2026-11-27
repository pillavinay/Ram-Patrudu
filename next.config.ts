import type { NextConfig } from "next";

/**
 * Static export: `npm run build` creates a plain HTML/CSS/JS website in the `out/` folder.
 * That folder can be hosted anywhere (GitHub Pages, Netlify, cPanel, etc.).
 */
const nextConfig: NextConfig = {
  // Sub-path on GitHub Pages (e.g. "/Ram-Patrudu"); empty on a custom domain.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  output: "export",
  trailingSlash: true, // /ventures/redcrabs/ -> /ventures/redcrabs/index.html (works on GitHub Pages)
  images: { unoptimized: true }, // required for static export
  reactStrictMode: true,
};

export default nextConfig;
