import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Geist } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  weight: "900",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const higuenFallback = localFont({
  src: '../../public/Higuen Serif.otf',
  variable: "--font-higuen",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://metapoise.vercel.app'),
  title: {
    default: "METAPOISE V2.0 | DUIET CSE Techfest",
    template: "%s | METAPOISE V2.0"
  },
  description: "The flagship annual technical symposium hosted by the Department of Computer Science and Engineering, DUIET. A celebration of innovation and cutting-edge technology.",
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(spaceGrotesk.variable, inter.variable, jetbrainsMono.variable, higuenFallback.variable, "font-sans", geist.variable)}
    >
      <body className="w-full overflow-x-clip">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "METAPOISE V2.0",
              "startDate": "2026-10-30T09:00:00+05:30",
              "endDate": "2026-11-01T18:00:00+05:30",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "eventStatus": "https://schema.org/EventScheduled",
              "location": {
                "@type": "Place",
                "name": "Department of Computer Science and Engineering, DUIET",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Dibrugarh",
                  "addressRegion": "Assam",
                  "addressCountry": "IN"
                }
              },
              "description": "The flagship annual technical symposium hosted by the Department of Computer Science and Engineering, DUIET.",
              "organizer": {
                "@type": "Organization",
                "name": "Department of Computer Science and Engineering, DUIET",
                "url": "https://metapoise.vercel.app"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
