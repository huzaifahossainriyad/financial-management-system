'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, CreditCard, Tag, Target, BarChart3, TrendingUp, Settings, LogOut } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/', label: 'ড্যাশবোর্ড', icon: Home },
  { href: '/transactions', label: 'লেনদেন', icon: CreditCard },
  { href: '/categories', label: 'ক্যাটাগরি', icon: Tag },
  { href: '/budgets', label: 'বাজেট', icon: Target },
  { href: '/analytics', label: 'বিশ্লেষণ', icon: BarChart3 },
  { href: '/reports', label: 'রিপোর্ট', icon: TrendingUp },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 shadow-lg backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="text-2xl">💰</div>
              <span className="font-bold text-white text-lg hidden sm:inline group-hover:scale-105 transition-transform">
                আর্থিক ব্যবস্থাপনা
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      className={`${
                        isActive
                          ? 'bg-white text-blue-600 shadow-lg'
                          : 'text-white hover:bg-white/20'
                      } transition-all`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gradient-to-b from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 border-t border-white/20">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      className={`w-full justify-start ${
                        isActive
                          ? 'bg-white text-blue-600'
                          : 'text-white hover:bg-white/20'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
