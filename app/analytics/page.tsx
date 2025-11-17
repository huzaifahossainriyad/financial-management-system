'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { BarChart3, PieChart, TrendingUp, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  description: string
  date: string
  category?: string
}

export default function AnalyticsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    avgTransaction: 0,
    highestTransaction: 0,
    lowestTransaction: 0,
    transactionCount: 0,
  })
  const [categoryBreakdown, setCategoryBreakdown] = useState<Record<string, number>>({})
  const [monthlyData, setMonthlyData] = useState<Record<string, { income: number; expense: number }>>({})

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions')
      const data = await response.json()
      setTransactions(data)

      // Calculate stats
      const income = data
        .filter((t: Transaction) => t.type === 'income')
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0)
      const expense = data
        .filter((t: Transaction) => t.type === 'expense')
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0)

      const amounts = data.map((t: Transaction) => t.amount)
      const avgTransaction = data.length > 0 ? amounts.reduce((a: number, b: number) => a + b, 0) / data.length : 0

      setStats({
        totalIncome: income,
        totalExpense: expense,
        avgTransaction: Math.round(avgTransaction),
        highestTransaction: Math.max(...amounts, 0),
        lowestTransaction: Math.min(...amounts, 0),
        transactionCount: data.length,
      })

      // Calculate category breakdown
      const breakdown: Record<string, number> = {}
      data.forEach((t: Transaction) => {
        if (t.type === 'expense') {
          breakdown[t.category || 'Other'] = (breakdown[t.category || 'Other'] || 0) + t.amount
        }
      })
      setCategoryBreakdown(breakdown)

      // Calculate monthly data
      const monthly: Record<string, { income: number; expense: number }> = {}
      data.forEach((t: Transaction) => {
        const date = new Date(t.date)
        const monthKey = date.toLocaleString('en-BD', { month: 'short', year: 'numeric' })
        if (!monthly[monthKey]) {
          monthly[monthKey] = { income: 0, expense: 0 }
        }
        if (t.type === 'income') {
          monthly[monthKey].income += t.amount
        } else {
          monthly[monthKey].expense += t.amount
        }
      })
      setMonthlyData(monthly)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  }

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Analytics & Insights
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Deep dive into your financial data
          </p>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {/* Average Transaction */}
        <motion.div variants={cardVariants} whileHover="hover">
          <Card className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 border-indigo-200 dark:border-indigo-800 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">
                  Average Transaction
                </p>
                <motion.p
                  className="text-3xl font-bold text-indigo-700 dark:text-indigo-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {formatCurrency(stats.avgTransaction)}
                </motion.p>
              </div>
              <motion.div
                className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <BarChart3 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Highest Transaction */}
        <motion.div variants={cardVariants} whileHover="hover">
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">
                  Highest Transaction
                </p>
                <motion.p
                  className="text-3xl font-bold text-purple-700 dark:text-purple-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {formatCurrency(stats.highestTransaction)}
                </motion.p>
              </div>
              <motion.div
                className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Total Transactions */}
        <motion.div variants={cardVariants} whileHover="hover">
          <Card className="p-6 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950 dark:to-teal-950 border-cyan-200 dark:border-cyan-800 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-1">
                  Total Transactions
                </p>
                <motion.p
                  className="text-3xl font-bold text-cyan-700 dark:text-cyan-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {stats.transactionCount}
                </motion.p>
              </div>
              <motion.div
                className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Calendar className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Category Breakdown */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <PieChart className="w-6 h-6" />
            Expense Breakdown by Category
          </h2>

          {Object.keys(categoryBreakdown).length === 0 ? (
            <p className="text-slate-600 dark:text-slate-400 text-center py-8">
              No expense data available
            </p>
          ) : (
            <motion.div
              className="space-y-4"
              variants={containerVariants}
            >
              {Object.entries(categoryBreakdown).map(([category, amount], index) => {
                const total = Object.values(categoryBreakdown).reduce((a, b) => a + b, 0)
                const percentage = (amount / total) * 100

                return (
                  <motion.div
                    key={category}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-slate-900 dark:text-white">
                        {category}
                      </span>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                        {Math.round(percentage)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {formatCurrency(amount)}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Monthly Trends */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Monthly Trends
          </h2>

          {Object.keys(monthlyData).length === 0 ? (
            <p className="text-slate-600 dark:text-slate-400 text-center py-8">
              No monthly data available
            </p>
          ) : (
            <motion.div
              className="space-y-6"
              variants={containerVariants}
            >
              {Object.entries(monthlyData).map(([month, data], index) => (
                <motion.div
                  key={month}
                  variants={itemVariants}
                  className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
                >
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">
                    {month}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Income */}
                    <div>
                      <p className="text-sm text-green-600 dark:text-green-400 mb-2">
                        Income
                      </p>
                      <motion.p
                        className="text-2xl font-bold text-green-700 dark:text-green-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {formatCurrency(data.income)}
                      </motion.p>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                        />
                      </div>
                    </div>

                    {/* Expense */}
                    <div>
                      <p className="text-sm text-red-600 dark:text-red-400 mb-2">
                        Expense
                      </p>
                      <motion.p
                        className="text-2xl font-bold text-red-700 dark:text-red-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {formatCurrency(data.expense)}
                      </motion.p>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-red-500 to-rose-600"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
