/**
 * Navigation Bar Component
 * 
 * Displays:
 * - App logo/title
 * - Navigation links
 * - Language switcher (English/Bengali)
 * - User menu
 */

'use client'

import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe, Menu } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Navigation links
  const navLinks = [
    { href: '/', label: t(language, 'nav.dashboard') },
    { href: '/transactions', label: t(language, 'nav.transactions') },
    { href: '/categories', label: t(language, 'nav.categories') },
    { href: '/budgets', label: t(language, 'nav.budgets') },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">₹</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">
              {t(language, 'dashboard.title')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Side - Language Switcher & Menu */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">{language.toUpperCase()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setLanguage('en')}
                  className={language === 'en' ? 'bg-blue-50' : ''}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage('bn')}
                  className={language === 'bn' ? 'bg-blue-50' : ''}
                >
                  বাংলা
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
