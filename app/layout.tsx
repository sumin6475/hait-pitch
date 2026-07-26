import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { content } from "@/lib/content";
import "./globals.css";

// HAIT's brand font (its app uses DM Sans). The active theme (app/theme.css) points
// --brand-font / --brand-font-heading at --font-dm-sans.
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

// SEO + Open Graph so a pasted link previews well.
export const metadata: Metadata = {
  title: `${content.projectName} — ${content.hero.headline}`,
  description: content.hero.subhead,
  openGraph: {
    title: `${content.projectName} — ${content.hero.headline}`,
    description: content.hero.subhead,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${content.projectName} — ${content.hero.headline}`,
    description: content.hero.subhead,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
