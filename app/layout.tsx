import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/lib/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import OrbitNav from "@/components/OrbitNav";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"]
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "The Saturate PH — Where Brands Find Their Orbit",
  description:
    "The Saturate PH is a digital growth studio helping brands become visible, recognizable, and trusted through strategy, design, websites and marketing.",
  metadataBase: new URL("https://thesaturateph.com"),
  openGraph: {
    title: "The Saturate PH — Where Brands Find Their Orbit",
    description:
      "We build digital ecosystems that help businesses become visible, memorable, and impossible to ignore.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable}`}>
      <body className="font-body">
        <SmoothScrollProvider>
          <CustomCursor />
          <OrbitNav />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
