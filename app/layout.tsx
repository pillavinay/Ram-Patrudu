import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/archivo/wdth-italic.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "./globals.css";
import { site } from "@/content/site";
import { withBase } from "@/lib/basePath";
import { Providers } from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ram Patrudu — Entrepreneur | Business Leader | Co-founder",
    template: "%s | Ram Patrudu",
  },
  description: site.description,
  keywords: ["Ram Patrudu", "rampatrudu", "Trovity Insurance", "Mad Over Insurance", "Redcrabs", "Call Me OOO", "entrepreneur"],
  authors: [{ name: "Ram Patrudu", url: site.url }],
  creator: "Ram Patrudu",
  alternates: { canonical: withBase("/") },
  icons: { icon: withBase("/favicon.svg"), apple: withBase("/apple-touch-icon.png") },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "Ram Patrudu",
    title: "Ram Patrudu — Dreams to Ventures.",
    description: site.description,
    images: [{ url: withBase("/og-image.png"), width: 1200, height: 630, alt: "Ram Patrudu — Dreams to Ventures." }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ram Patrudu — Dreams to Ventures.",
    description: site.description,
    images: [withBase("/og-image.png")],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
  width: "device-width",
  initialScale: 1,
};

// Runs before the page paints: hides the intro loader on repeat visits / reduced motion.
const loaderScript = `try{if(sessionStorage.getItem('rp-loaded')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('rp-seen')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" id="top" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: loaderScript }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">
          Skip to content
        </a>
        <Providers>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
