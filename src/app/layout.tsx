import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "ThaiCreative AI | Creator Studio",
  description: "The premier AI production assistant for Thai creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}