import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "Browse the schedule of hackathons, tech-expos, workshops, and symposiums at METAPOISE V2.0.",
  alternates: {
    canonical: '/events',
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
