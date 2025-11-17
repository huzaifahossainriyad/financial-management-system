'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Target, PieChart, Calendar, AlertCircle, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

interface Transaction {
  id: string
  name: string
  amount: number
  type: 'income' | 'expense'
  date: string
}

interface Budget {
  id: string
  name: string
  limit: number
  spent: number
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [transRes, budgetRes] = await Promise.all([
        fetch('/api/transactions'),
        fetch('/api/budgets'),
      ])
      const transactions = await transRes.json()
      const budgets = await budgetRes.json()
      setTransactions(transactions)
      setBudgets(budgets)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpense

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)
  const budgetPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0

  const overBudgetCount = budgets.filter(b => b.spent > b.limit).length

  const recentTransactions = transactions.slice(0, 5)

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
      scale: 1.05,
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
            আপনার আর্থিক ড্যাশবোর্ড
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            আপনার আর্থিক অবস্থা এক নজরে দেখুন
          </p>
        </div>
      </motion.div>

      {/* Main Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        {/* Total Income */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <motion.div
                className="p-3 bg-green-100 dark:bg-green-900 rounded-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </motion.div>
              <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full">
                আয়
              </span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300 mb-1">মোট আয়</p>
            <motion.p
              className="text-3xl font-bold text-green-600 dark:text-green-400"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ৳{totalIncome.toLocaleString()}
            </motion.p>
          </Card>
        </motion.div>

        {/* Total Expense */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="p-6 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-red-200 dark:border-red-800 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <motion.div
                className="p-3 bg-red-100 dark:bg-red-900 rounded-lg"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
              </motion.div>
              <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 px-2 py-1 rounded-full">
                খরচ
              </span>
            </div>
            <p className="text-sm text-red-700 dark:text-red-300 mb-1">মোট খরচ</p>
            <motion.p
              className="text-3xl font-bold text-red-600 dark:text-red-400"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
            >
              ৳{totalExpense.toLocaleString()}
            </motion.p>
          </Card>
        </motion.div>

        {/* Balance */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className={`p-6 bg-gradient-to-br ${
            balance >= 0
              ? 'from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800'
              : 'from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-orange-200 dark:border-orange-800'
          } shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <motion.div
                className={`p-3 rounded-lg ${
                  balance >= 0
                    ? 'bg-blue-100 dark:bg-blue-900'
                    : 'bg-orange-100 dark:bg-orange-900'
                }`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className={`w-6 h-6 ${
                  balance >= 0
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-orange-600 dark:text-orange-400'
                }`} />
              </motion.div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                balance >= 0
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900'
                  : 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900'
              }`}>
                {balance >= 0 ? 'ইতিবাচক' : 'নেতিবাচক'}
              </span>
            </div>
            <p className={`text-sm mb-1 ${
              balance >= 0
                ? 'text-blue-700 dark:text-blue-300'
                : 'text-orange-700 dark:text-orange-300'
            }`}>ব্যালেন্স</p>
            <motion.p
              className={`text-3xl font-bold ${
                balance >= 0
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-orange-600 dark:text-orange-400'
              }`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            >
              {balance >= 0 ? '+' : '-'}৳{Math.abs(balance).toLocaleString()}
            </motion.p>
          </Card>
        </motion.div>

        {/* Budget Status */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-pink-800 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <motion.div
                className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </motion.div>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded-full">
                বাজেট
              </span>
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-300 mb-1">ব্যবহৃত শতাংশ</p>
            <motion.p
              className="text-3xl font-bold text-purple-600 dark:text-purple-400"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              {budgetPercentage.toFixed(1)}%
            </motion.p>
          </Card>
        </motion.div>
      </motion.div>

      {/* Secondary Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {/* Budget Overview */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 border-cyan-200 dark:border-blue-800 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <PieChart className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </motion.div>
              <h3 className="font-bold text-slate-900 dark:text-white">বাজেট সারসংক্ষেপ</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">মোট বাজেট:</span>
                <span className="font-bold text-slate-900 dark:text-white">৳{totalBudget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">খরচ হয়েছে:</span>
                <span className="font-bold text-slate-900 dark:text-white">৳{totalSpent.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Alerts */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-orange-800 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </motion.div>
              <h3 className="font-bold text-slate-900 dark:text-white">সতর্কতা</h3>
            </div>
            <div className="space-y-2">
              {overBudgetCount > 0 ? (
                <motion.div
                  className="p-3 bg-red-100 dark:bg-red-900 rounded-lg border border-red-200 dark:border-red-800"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-sm font-bold text-red-700 dark:text-red-300">
                    ⚠️ {overBudgetCount} বাজেট অতিক্রম করেছে!
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  className="p-3 bg-green-100 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-800"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-sm font-bold text-green-700 dark:text-green-300">
                    ✅ সব বাজেট নিয়ন্ত্রণে আছে
                  </p>
                </motion.div>
              )}
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                {transactions.length} লেনদেন রেকর্ড করা হয়েছে
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-indigo-200 dark:border-purple-800 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </motion.div>
              <h3 className="font-bold text-slate-900 dark:text-white">দ্রুত পরিসংখ্যান</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">সক্রিয় বাজেট:</span>
                <span className="font-bold text-slate-900 dark:text-white">{budgets.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">মাসিক লক্ষ্য:</span>
                <span className="font-bold text-slate-900 dark:text-white">৳50,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">সঞ্চয়ের হার:</span>
                <motion.span
                  className="font-bold text-slate-900 dark:text-white"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0}%
                </motion.span>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            সাম্প্রতিক লেনদেন
          </h2>
          {recentTransactions.length === 0 ? (
            <p className="text-slate-600 dark:text-slate-400">কোনো লেনদেন নেই</p>
          ) : (
            <motion.div
              className="space-y-3"
              variants={containerVariants}
            >
              {recentTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-white dark:bg-slate-700 rounded-lg hover:shadow-md transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {transaction.name}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {new Date(transaction.date).toLocaleDateString('bn-BD')}
                    </p>
                  </div>
                  <motion.p
                    className={`text-lg font-bold ${
                      transaction.type === 'income'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                  >
                    {transaction.type === 'income' ? '+' : '-'}৳{transaction.amount.toLocaleString()}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
