import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google"; // ✅ Agregamos Playfair
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Nueva fuente para títulos elegantes
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair", // Usamos variable para Tailwind
  weight: ["400", "700"], // Normal y negrita
});

export const metadata: Metadata = {
  title: "BLASS BARBERÍA",
  description: "Barbería premium en Adrogué desde 2018",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es"> {/* ✅ Cambié a "es" */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}