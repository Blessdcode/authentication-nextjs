"use client";

// import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth;

  return (
    <SessionProvider >
      <body>{children}</body>
    </SessionProvider>
  );
}
