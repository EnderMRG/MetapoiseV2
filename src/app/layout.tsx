import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Geist } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: "900",
  subsets: ["latin"],
});

const higuenFallback = localFont({
  src: '../../public/Higuen Serif.otf',
  variable: "--font-higuen",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "METAPOISE V 2.0",
  description: "An experimental convergence: Neural architecture, synthetic biology, and decentralized protocols.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(spaceGrotesk.variable, inter.variable, jetbrainsMono.variable, higuenFallback.variable, "font-sans", geist.variable)}
    >
      <body className="w-full">{children}</body>
    </html>
  );
}
