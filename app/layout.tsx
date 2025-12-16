import type { Metadata } from "next";
import { Rubik, Oswald } from "next/font/google"; 
import SmoothScroll from "../components/SmoothScroll"; 
import '../app/globals.css';

const rubik = Rubik({ 
  subsets: ["latin"], 
  variable: "--font-rubik",
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
      <body className={`${rubik.variable} ${oswald.variable} antialiased subpixel-antialiased bg-brand-bg text-brand-text`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}