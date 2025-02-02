import type { Metadata } from "next";
import { Saira_Condensed } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

const Saira = Saira_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "dropsaas",
  description: "Auth base app for DropSaas application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en">
      <Provider>
        <body className={`${Saira.className}`}>{children}</body>
      </Provider>
    </html>
  );
}
