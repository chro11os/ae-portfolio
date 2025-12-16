import type { Metadata } from "next";
// 1. Import Rubik
import { Rubik, Oswald } from "next/font/google"; 
import SmoothScroll from "../components/SmoothScroll";
import "./globals.css";

// 2. Configure Rubik
const rubik = Rubik({ 
  subsets: ["latin"], 
  variable: "--font-rubik",
  // Rubik is a variable font by default in Next.js, so explicit weights are optional
});

const oswald = Oswald({ 
  subsets: ["latin"], 
  variable: "--font-oswald", 
  weight: ["400", "500", "700"] 
});

export const metadata: Metadata = {
  title: "Ae-Dam | Portfolio",
  description: "Motion, Graphics, and 3D Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Add rubik.variable to the class list */}
      <body className={`${rubik.variable} ${oswald.variable} antialiased subpixel-antialiased bg-brand-bg text-brand-text overflow-hidden`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}