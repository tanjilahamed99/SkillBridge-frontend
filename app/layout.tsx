import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderComponent from "@/providers/Provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SkillBridge",
  description:
    "A learning management system for skill development and career growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ProviderComponent>
          {children}
          <Toaster position="top-right" richColors/>
        </ProviderComponent>
      </body>
    </html>
  );
}
