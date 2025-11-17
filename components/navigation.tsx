'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, CreditCard, Tag, Target, BarChart3, FileText, Lightbulb, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { href: '/', label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
  { href: '/transactions', label: 'লেনদেন', icon: CreditCard },
  { href: '/categories', label: 'ক্যাটাগরি', icon: Tag },
  { href: '/budgets', label: 'বাজেট', icon: Target },
  { href: '/analytics', label: 'বিশ্লেষণ', icon: BarChart3 },
  { href: '/reports', label: 'রিপোর্ট', icon: FileText },
  { href: '/goals', label: 'লক্ষ্য', icon: Target },
  { href: '/tips', label: 'টিপস', icon: Lightbulb },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💰
            </motion.div>
            আর্থিক ড্যাশবোর্ড
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))

              return (
                <motion.div
                  key={item.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  )
}
