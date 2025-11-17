'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, Wallet, Plus } from 'lucide-react'
import Link from 'next/link'

interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  description: string
  date: string
  category?: string
}

export default function DashboardContent() {
  const { t } = useLanguage()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  })

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

      setStats({
        totalIncome: income,
        totalExpense: expense,
        balance: income - expense,
      })
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {t('dashboard')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {t('welcome_message')}
          </p>
        </div>
        <Link href="/transactions">
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
            <Plus className="w-4 h-4" />
            {t('add_transaction')}
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                {t('total_income')}
              </p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                {formatCurrency(stats.totalIncome)}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        {/* Expense Card */}
        <Card className="p-6 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-red-200 dark:border-red-800 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">
                {t('total_expense')}
              </p>
              <p className="text-3xl font-bold text-red-700 dark:text-red-300">
                {formatCurrency(stats.totalExpense)}
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </Card>

        {/* Balance Card */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                {t('balance')}
              </p>
              <p className={`text-3xl font-bold ${
                stats.balance >= 0
                  ? 'text-blue-700 dark:text-blue-300'
                  : 'text-red-700 dark:text-red-300'
              }`}>
                {formatCurrency(stats.balance)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          {t('recent_transactions')}
        </h2>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-slate-600 dark:text-slate-400">{t('loading')}</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-600 dark:text-slate-400">
              {t('no_transactions')}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-lg ${
                      transaction.type === 'income'
                        ? 'bg-green-100 dark:bg-green-900'
                        : 'bg-red-100 dark:bg-red-900'
                    }`}
                  >
                    {transaction.type === 'income' ? (
                      <TrendingUp
                        className={`w-5 h-5 ${
                          transaction.type === 'income'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      />
                    ) : (
                      <TrendingDown
                        className={`w-5 h-5 ${
                          transaction.type === 'income'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-lg font-bold ${
                    transaction.type === 'income'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        )}

        {transactions.length > 5 && (
          <div className="mt-6 text-center">
            <Link href="/transactions">
              <Button variant="outline" className="gap-2">
                {t('view_all')}
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  )
}
