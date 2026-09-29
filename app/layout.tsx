import type { Metadata } from "next";
import { Rubik, Oswald } from "next/font/google"; 
import SmoothScroll from "../components/SmoothScroll"; 
import { Navbar } from "../components/ui/Navbar";
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
  description: "An artist, a leader, a researcher, a media practitioner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Font variables must live on <html>: globals.css @theme resolves --font-sans/--font-display on :root
    <html lang="en" className={`${rubik.variable} ${oswald.variable}`}>
      <body className="antialiased subpixel-antialiased bg-brand-bg text-brand-text">
        
        {/* Navbar now handles global navigation without the bottom-left logo */}
        <Navbar />

        <SmoothScroll>
          <main>
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}