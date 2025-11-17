'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ProtectedPage from '@/components/ProtectedPage'

interface Transaction {
  id: string
  title: string
  amount: number
  category: string
  date: string
  type: 'income' | 'expense'
}

export default function AnalyticsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    expensePercentage: 0,
  })

  useEffect(() => {
    const saved = localStorage.getItem('transactions')
    if (saved) {
      const parsed = JSON.parse(saved)
      setTransactions(parsed)

      const totalExpense = parsed
        .filter((t: Transaction) => t.type === 'expense')
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0)

      const totalIncome = parsed
        .filter((t: Transaction) => t.type === 'income')
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0)

      const balance = totalIncome - totalExpense
      const expensePercentage = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0

      setStats({
        totalIncome,
        totalExpense,
        balance,
        expensePercentage,
      })
    }
  }, [])

  const getCategoryStats = () => {
    const categoryMap: { [key: string]: number } = {}
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount
      })
    return Object.entries(categoryMap).map(([category, amount]) => ({
      category,
      amount,
    }))
  }

  const categoryStats = getCategoryStats()

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">📈 বিশ্লেষণ</h1>
            <p className="text-slate-600">আপনার আর্থিক বিশ্লেষণ দেখুন - Created by RIYAD HOSSAIN HUZAIFA</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg">
              <CardContent className="pt-6">
                <p className="text-green-100 text-sm font-medium">মোট আয়</p>
                <p className="text-3xl font-bold mt-2">৳{stats.totalIncome.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500 to-orange-600 text-white border-0 shadow-lg">
              <CardContent className="pt-6">
                <p className="text-red-100 text-sm font-medium">মোট খরচ</p>
                <p className="text-3xl font-bold mt-2">৳{stats.totalExpense.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-lg">
              <CardContent className="pt-6">
                <p className="text-blue-100 text-sm font-medium">মোট সঞ্চয়</p>
                <p className="text-3xl font-bold mt-2">৳{stats.balance.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-500 to-rose-600 text-white border-0 shadow-lg">
              <CardContent className="pt-6">
                <p className="text-pink-100 text-sm font-medium">খরচের হার</p>
                <p className="text-3xl font-bold mt-2">{stats.expensePercentage.toFixed(1)}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown */}
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <CardTitle>ক্যাটাগরি অনুযায়ী খরচ</CardTitle>
            </CardHeader>
            <CardContent>
              {categoryStats.length > 0 ? (
                <div className="space-y-4">
                  {categoryStats.map((stat) => {
                    const percentage = (stat.amount / stats.totalExpense) * 100
                    return (
                      <div key={stat.category}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-slate-900">{stat.category}</span>
                          <span className="text-slate-600">
                            ৳{stat.amount.toLocaleString()} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-slate-500 text-center py-8">কোন ডেটা উপলব্ধ নেই</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-muted-foreground border-t mt-12 bg-white/50">
        <p>© 2025 Financial Management System - Created by <strong>RIYAD HOSSAIN HUZAIFA</strong></p>
      </footer>
    </ProtectedPage>
  )
}
