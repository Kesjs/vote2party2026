import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoadingProviderWrapper } from "@/components/providers/LoadingProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vote Party",
  description:
    "Plateforme citoyenne de vote en ligne permettant d’exprimer son opinion et de suivre les tendances électorales en temps réel, dans un cadre transparent, sécurisé et accessible à tous.",
  icons: {
    icon: [
      { url: '/logo.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingProviderWrapper>
          {children}
        </LoadingProviderWrapper>
      </body>
    </html>
  );
}
