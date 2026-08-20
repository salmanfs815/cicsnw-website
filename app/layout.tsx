import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "New West Masjid | CICS New Westminster",
  description: "Help establish New Westminster's first permanent masjid and Islamic centre.",
  openGraph: { title: "Help Build New West Masjid", description: "A $4 million community campaign to secure the land and build New Westminster's first permanent masjid.", type: "website" },
  twitter: { card: "summary", title: "Help Build New West Masjid", description: "A permanent home for New Westminster's Muslim community." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
