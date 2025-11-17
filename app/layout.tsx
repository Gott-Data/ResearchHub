import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Research Hub - Data Stories for Society",
  description: "A scientific research hub exploring data stories about conflict, environment, technology, society, governance, economy, and politics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
