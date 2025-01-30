import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import "./globals.css";

const PTSans = PT_Sans({ subsets: ["latin"], display: "swap", weight: ["400"] });


export const metadata: Metadata = {
  title: "auth-app",
  description: "Auth base app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${PTSans.className}`}>{children}</body>
    </html>
  );
}
