import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Editorial Portrait Generator",
  description: "Candid editorial-style portrait with modern metro vibes",
  metadataBase: new URL("https://agentic-d1830520.vercel.app")
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

