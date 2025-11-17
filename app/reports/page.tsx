'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileText, Calendar, Filter } from 'lucide-react'
import { motion } from 'framer-motion'

interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  description: string
  date: string
  category?: string
}

export default function ReportsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1)
  const [filterYear, setFilterYear] = useState(new Date().getFullYear())

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions')
      const data = await response.json()
      setTransactions(data)
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getFilteredTransactions = () => {
    return transactions.filter((t) => {
      const date = new Date(t.date)
      return date.getMonth() + 1 === filterMonth && date.getFullYear() === filterYear
    })
  }

  const filteredTransactions = getFilteredTransactions()
  const totalIncome = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const generatePDF = () => {
    const content = `
FINANCIAL REPORT
${new Date(filterYear, filterMonth - 1).toLocaleString('en-BD', { month: 'long', year: 'numeric' })}

SUMMARY
Total Income: ${formatCurrency(totalIncome)}
Total Expense: ${formatCurrency(totalExpense)}
Net: ${formatCurrency(totalIncome - totalExpense)}

TRANSACTIONS
${filteredTransactions
  .map(
    (t) =>
      `${formatDate(t.date)} | ${t.type.toUpperCase()} | ${t.description} | ${formatCurrency(t.amount)}`
  )
  .join('\n')}
    `

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
    element.setAttribute('download', `financial-report-${filterYear}-${filterMonth}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
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
            Financial Reports
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Generate and download detailed financial reports
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 shadow-lg">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="font-medium text-slate-900 dark:text-white">Filter by:</span>
            </div>

            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(parseInt(e.target.value))}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {new Date(2024, month - 1).toLocaleString('en-BD', { month: 'long' })}
                </option>
              ))}
            </select>

            <select
              value={filterYear}
              onChange={(e) => setFilterYear(parseInt(e.target.value))}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <motion.button
              onClick={generatePDF}
              className="ml-auto px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              Download Report
            </motion.button>
          </div>
        </Card>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {/* Total Income */}
        <motion.div variants={cardVariants} whileHover="hover">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                  Total Income
                </p>
                <motion.p
                  className="text-3xl font-bold text-green-700 dark:text-green-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {formatCurrency(totalIncome)}
                </motion.p>
              </div>
              <motion.div
                className="p-3 bg-green-100 dark:bg-green-900 rounded-lg"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Total Expense */}
        <motion.div variants={cardVariants} whileHover="hover">
          <Card className="p-6 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-red-200 dark:border-red-800 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">
                  Total Expense
                </p>
                <motion.p
                  className="text-3xl font-bold text-red-700 dark:text-red-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {formatCurrency(totalExpense)}
                </motion.p>
              </div>
              <motion.div
                className="p-3 bg-red-100 dark:bg-red-900 rounded-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Calendar className="w-6 h-6 text-red-600 dark:text-red-400" />
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Net */}
        <motion.div variants={cardVariants} whileHover="hover">
          <Card className={`p-6 bg-gradient-to-br ${
            totalIncome - totalExpense >= 0
              ? 'from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800'
              : 'from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-orange-200 dark:border-orange-800'
          } shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  totalIncome - totalExpense >= 0
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-orange-600 dark:text-orange-400'
                } mb-1`}>
                  Net Balance
                </p>
                <motion.p
                  className={`text-3xl font-bold ${
                    totalIncome - totalExpense >= 0
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-orange-700 dark:text-orange-300'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {formatCurrency(totalIncome - totalExpense)}
                </motion.p>
              </div>
              <motion.div
                className={`p-3 rounded-lg ${
                  totalIncome - totalExpense >= 0
                    ? 'bg-blue-100 dark:bg-blue-900'
                    : 'bg-orange-100 dark:bg-orange-900'
                }`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FileText className={`w-6 h-6 ${
                  totalIncome - totalExpense >= 0
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-orange-600 dark:text-orange-400'
                }`} />
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Transactions Table */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Transactions
          </h2>

          {loading ? (
            <p className="text-slate-600 dark:text-slate-400 text-center py-8">Loading...</p>
          ) : filteredTransactions.length === 0 ? (
            <p className="text-slate-600 dark:text-slate-400 text-center py-8">
              No transactions for this period
            </p>
          ) : (
            <motion.div
              className="overflow-x-auto"
              variants={containerVariants}
            >
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      Description
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      Type
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction, index) => (
                    <motion.tr
                      key={transaction.id}
                      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      variants={itemVariants}
                    >
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="py-3 px-4 text-slate-900 dark:text-white font-medium">
                        {transaction.description}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            transaction.type === 'income'
                              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                              : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                          }`}
                        >
                          {transaction.type === 'income' ? 'Income' : 'Expense'}
                        </span>
                      </td>
                      <td className={`py-3 px-4 text-right font-bold ${
                        transaction.type === 'income'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}
