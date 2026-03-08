import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import OiaNav from "@/components/oia/OiaNav";
import OiaFooter from "@/components/oia/OiaFooter";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Operational Intelligence Audit — Ecrof Media Co.",
  description:
    "A 12 minute operational intelligence audit that reveals where decisions stall, systems break, and growth leaks — before you spend another dollar fixing the wrong thing.",
  openGraph: {
    title: "Operational Intelligence Audit — Ecrof Media Co.",
    description:
      "Discover what's quietly draining your time, money, and momentum. A diagnostic built to expose where operational decisions are costing you money.",
    siteName: "Ecrof Media Co.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <OiaNav />
        <div style={{ paddingTop: "64px" }}>{children}</div>
        <OiaFooter />
      </body>
    </html>
  );
}
