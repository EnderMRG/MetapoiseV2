import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the Department of Computer Science and Engineering at DUIET, the vision behind METAPOISE, and the legacy of Version 1.0.",
  alternates: {
    canonical: '/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
