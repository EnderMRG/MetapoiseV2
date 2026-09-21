import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule",
  description: "View the day-by-day agenda for METAPOISE V2.0, including keynote seminars, workshops, and competitions.",
  alternates: {
    canonical: '/schedule',
  },
};

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
