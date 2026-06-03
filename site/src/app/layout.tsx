import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
};

export const metadata: Metadata = {
  title: "LOADOUT — Done-for-you Claude AI skill kits for any business",
  description:
    "Pre-built Claude AI skill kits that install in one command. AI staff for any business — live in under 30 minutes, no coding.",
  openGraph: {
    type: "website",
    title: "LOADOUT — AI skill kits for any business",
    description: "Pre-built AI staff. Install once, live in 30 minutes. No code.",
    images: ["https://files.catbox.moe/z3jt6u.png"],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "https://files.catbox.moe/ogb96w.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0A0A0B] text-[#FAFAFA]">{children}</body>
    </html>
  );
}
