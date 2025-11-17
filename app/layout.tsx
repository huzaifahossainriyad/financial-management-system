import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'আর্থিক ব্যবস্থাপনা | Financial Management System - RIYAD HOSSAIN HUZAIFA',
  description: 'একটি আধুনিক এবং সম্পূর্ণ আর্থিক ব্যবস্থাপনা অ্যাপ্লিকেশন - Created by RIYAD HOSSAIN HUZAIFA',
  keywords: 'financial management, আর্থিক ব্যবস্থাপনা, RIYAD HOSSAIN HUZAIFA',
  authors: [{ name: 'RIYAD HOSSAIN HUZAIFA' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <footer className="text-center py-4 text-sm text-muted-foreground border-t mt-12">
          <p>© 2025 Financial Management System - Created by <strong>RIYAD HOSSAIN HUZAIFA</strong></p>
        </footer>
      </body>
    </html>
  )
}
