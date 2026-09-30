import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thar Film Festival — Every Frame Tells a Story",
  description:
    "Where stories come alive, visions collide, and cinema finds its voice. Register your team and submit your film.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-main antialiased">
        <div className="film-grain" aria-hidden="true" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
