/**
 * Financial Management System
 * Created by: Riyad Hossain Huzaifa
 * Date: November 2025
 * 
 * Main Layout Component
 * Provides the root layout for the entire application
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { LanguageProvider } from "@/lib/language-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "আর্থিক ড্যাশবোর্ড | Financial Management System",
  description: "A comprehensive Bengali-English bilingual financial management system with advanced animations",
  creator: "Riyad Hossain Huzaifa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          <Navigation />
          <main className="min-h-screen bg-background">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
