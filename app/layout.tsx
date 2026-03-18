import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medieval Fight",
  description: "Premier prototype du jeu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
