'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const email = localStorage.getItem('userEmail') || ''
    const name = localStorage.getItem('userName') || ''
    
    setIsLoggedIn(loggedIn)
    setUserName(name)

    // If not logged in, redirect to login page
    if (!loggedIn && typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      if (currentPath !== '/auth/login') {
        router.push('/auth/login')
      }
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    router.push('/auth/login')
  }

  const navItems = [
    { label: 'ড্যাশবোর্ড', href: '/', icon: '📊' },
    { label: 'লেনদেন', href: '/transactions', icon: '💳' },
    { label: 'ক্যাটাগরি', href: '/categories', icon: '🏷️' },
    { label: 'বাজেট', href: '/budgets', icon: '💰' },
    { label: 'বিশ্লেষণ', href: '/analytics', icon: '📈' },
    { label: 'রিপোর্ট', href: '/reports', icon: '📄' },
  ]

  if (!isLoggedIn) {
    return null
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
            <span className="text-2xl">💰</span>
            <span>আর্থিক ব্যবস্থাপনা</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-1 text-sm font-medium"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Profile and Logout */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
              <User size={18} />
              <span className="text-sm font-medium capitalize">{userName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <LogOut size={18} />
              লগআউট
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-lg hover:bg-white/20 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <div className="border-t border-white/20 pt-2 mt-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg mb-2">
                <User size={18} />
                <span className="text-sm font-medium capitalize">{userName}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout()
                  setIsOpen(false)
                }}
                className="w-full px-3 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <LogOut size={18} />
                লগআউট
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Text */}
      <div className="text-center text-xs py-1 bg-black/20">
        Created by <strong>RIYAD HOSSAIN HUZAIFA</strong>
      </div>
    </nav>
  )
}
