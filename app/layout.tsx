import type { Metadata } from "next";

import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Doces Mabecky",
  description: "Site de doces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
