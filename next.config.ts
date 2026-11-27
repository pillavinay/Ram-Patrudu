import type { NextConfig } from "next";

/**
 * Static export: `npm run build` creates a plain HTML/CSS/JS website in the `out/` folder.
 * That folder can be hosted anywhere (GitHub Pages, Netlify, cPanel, etc.).
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // /ventures/redcrabs/ -> /ventures/redcrabs/index.html (works on GitHub Pages)
  images: { unoptimized: true }, // required for static export
  reactStrictMode: true,
};

export default nextConfig;
