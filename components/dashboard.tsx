/**
 * Dashboard Component
 * 
 * Main dashboard showing:
 * - Total income and expense summary
 * - Current balance
 * - Recent transactions
 * - Monthly overview chart
 * - Quick action buttons
 */

'use client'

import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  description?: string
  date: string
  category?: string
}

export function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const { language } = useLanguage()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpense, setTotalExpense] = useState(0)
  const [loading, setLoading] = useState(true)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch transactions from API
  useEffect(() => {
    if (!mounted) return

    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions')
        if (response.ok) {
          const data = await response.json()
          setTransactions(data)
          
          // Calculate totals
          let income = 0
          let expense = 0
          data.forEach((tx: Transaction) => {
            if (tx.type === 'income') {
              income += tx.amount
            } else {
              expense += tx.amount
            }
          })
          setTotalIncome(income)
          setTotalExpense(expense)
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [mounted])

  if (!mounted) {
    return null
  }

  const balance = totalIncome - totalExpense
  const recentTransactions = transactions.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t(language, 'dashboard.title')}</h1>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          {t(language, 'transactions.addNew')}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Income Card */}
        <Card className="p-6 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t(language, 'dashboard.totalIncome')}
              </p>
              <p className="text-2xl font-bold text-green-600">
                ৳{totalIncome.toFixed(2)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </Card>

        {/* Total Expense Card */}
        <Card className="p-6 border-l-4 border-l-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t(language, 'dashboard.totalExpense')}
              </p>
              <p className="text-2xl font-bold text-red-600">
                ৳{totalExpense.toFixed(2)}
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-500 opacity-50" />
          </div>
        </Card>

        {/* Balance Card */}
        <Card className="p-6 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t(language, 'dashboard.balance')}
              </p>
              <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                ৳{balance.toFixed(2)}
              </p>
            </div>
            <Wallet className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          {t(language, 'dashboard.recentTransactions')}
        </h2>
        
        {loading ? (
          <p className="text-muted-foreground">{t(language, 'common.loading')}</p>
        ) : recentTransactions.length === 0 ? (
          <p className="text-muted-foreground">
            {t(language, 'transactions.noTransactions')}
          </p>
        ) : (
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium">{tx.description || tx.category || 'Transaction'}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(tx.date).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                  </p>
                </div>
                <p className={`font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.type === 'income' ? '+' : '-'}৳{tx.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
