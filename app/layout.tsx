import type { Metadata } from "next";
import { Playfair_Display, JetBrains_Mono, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ModeProvider } from "@/context/ModeContext";
import SmoothScroll from "@/components/SmoothScroll";

// Fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ['400', '600', '700'],
    variable: "--font-ibm-plex-mono",
    display: "swap",
});

// Base64 kodiertes SVG Favicon für maximale Kompatibilität
// Enthält das DK Logo in IKB Blau
const faviconBase64 = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSI1MCIgeT0iNDgiIHN0eWxlPSJmb250LWZhbWlseTptb25vc3BhY2U7IGZvbnQtd2VpZ2h0OmJvbGQ7IiBmb250LXNpemU9IjM4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAyRkE3IiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCI+REs8L3RleHQ+PHBhdGggZD0iTTI4IDIyIEMgMTggMjIsIDE4IDIyLCAxOCAzNSBMIDE4IDQyIEMgMTggNDgsIDEyIDUwLCAxMiA1MCBDIDEyIDUwLCAxOCA1MiwgMTggNTggTCAxOCA2NSBDIDE4IDc4LCAxOCA3OCwgMjggNzgiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2U9IiMwMDJGQTciLz48cGF0aCBkPSJNNzIgMjIgQyA4MiAyMiwgODIgMjIsIDgyIDM1IEwgODIgNDIgQyA4MiA0OCwgODggNTAsIDg4IDUwIEMgODggNTAsIDgyIDUyLCA4MiA1OCBMIDgyIDY1IEMgODIgNzgsIDgyIDc4LCA3MiA3OCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZT0iIzAwMkZBNyIvPjwvc3ZnPg==";

export const metadata: Metadata = {
  title: "Daniel Kleiboldt | Legal Engineer & KMU-Beratung",
  description: "Solutions Architect für AI & Blockchain. Schnittstelle zwischen Recht, IT und Business.",
  icons: {
    icon: faviconBase64, // Hier wird das Favicon gesetzt
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${playfair.variable} ${jetbrains.variable} ${ibmPlexMono.variable} bg-white dark:bg-slate-900 dark:text-gray-100 text-black font-serif antialiased transition-colors duration-500`}>
        <ModeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ModeProvider>

        <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "name": "Daniel Kleiboldt",
                "jobTitle": "Solutions Architect & Legal Engineer",
                "url": "https://dkleiboldt.de"
              }
            ]
          })
        }} />
      </body>
    </html>
  );
}