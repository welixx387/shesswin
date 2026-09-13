import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ["600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

const siteUrl = "https://shesswin.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ShessWin — Интерактивное обучение шахматным дебютам",
    template: "%s · ShessWin",
  },
  description:
    "Изучай шахматные дебюты на ShessWin. Интерактивные уроки, разбор партий, система прогресса. Итальянская партия, Сицилианская защита, Ферзевый гамбит и другие.",
  keywords: ["шахматы", "шахматные дебюты", "обучение шахматам", "итальянская партия", "сицилианская защита", "ферзевый гамбит"],
  openGraph: {
    title: "ShessWin — Освой шахматные дебюты, как гроссмейстер",
    description:
      "Интерактивные уроки, разбор партий и система прогресса — всё в одном месте.",
    url: siteUrl,
    siteName: "ShessWin",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShessWin — Освой шахматные дебюты, как гроссмейстер",
    description: "Интерактивные уроки, разбор партий и система прогресса.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
      <body className="relative min-h-screen bg-bg-primary font-sans antialiased">
        <AuroraBackground />
        <ScrollProgressBar />
        <CustomCursor />
        <Navbar />
        <main className="relative z-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
