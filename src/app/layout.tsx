import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saksham Srivastava | Computer Engineer & Developer",
  description: "Computer Engineering major and Math minor at USF. Building innovative projects in AI, systems programming, and software development. Explore my portfolio of work.",
  keywords: ["Saksham Srivastava", "Computer Engineering", "Software Developer", "Portfolio", "USF", "Python", "C++", "AI"],
  authors: [{ name: "Saksham Srivastava" }],
  openGraph: {
    title: "Saksham Srivastava | Computer Engineer & Developer",
    description: "Computer Engineering major and Math minor building for fun and impact",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saksham Srivastava | Computer Engineer & Developer",
    description: "Computer Engineering major and Math minor building for fun and impact",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
