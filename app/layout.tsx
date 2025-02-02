import type { Metadata } from "next";
import {  Saira_Condensed } from "next/font/google";
import "./globals.css";

const Saira = Saira_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});


export const metadata: Metadata = {
  title: "dropsaas",
  description: "Auth base app for DropSaas application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Saira.className}`}>{children}</body>
    </html>
  );
}
