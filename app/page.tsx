'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, TrendingUp, TrendingDown, Wallet, Zap } from 'lucide-react'
import Link from 'next/link'
import ProtectedPage from '@/components/ProtectedPage'

interface Transaction {
  id: string
  title: string
  amount: number
  category: string
  date: string
  type: 'income' | 'expense'
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalExpense: 0,
    totalIncome: 0,
    balance: 0,
  })

  useEffect(() => {
    // Load data from localStorage
    const savedTransactions = localStorage.getItem('transactions')
    if (savedTransactions) {
      const parsed = JSON.parse(savedTransactions)
      setTransactions(parsed.slice(0, 5))

      // Calculate stats
      const totalExpense = parsed
        .filter((t: Transaction) => t.type === 'expense')
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0)

      const totalIncome = parsed
        .filter((t: Transaction) => t.type === 'income')
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0)

      setStats({
        totalTransactions: parsed.length,
        totalExpense,
        totalIncome,
        balance: totalIncome - totalExpense,
      })
    }
  }, [])

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">📊 ড্যাশবোর্ড</h1>
                <p className="text-slate-600">আপনার আর্থিক অবস্থা এক নজরে দেখুন - Created by RIYAD HOSSAIN HUZAIFA</p>
              </div>
              <Link href="/transactions">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  নতুন লেনদেন
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Transactions */}
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">মোট লেনদেন</p>
                    <p className="text-3xl font-bold mt-2">{stats.totalTransactions}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Wallet className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Expense */}
            <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">মোট খরচ</p>
                    <p className="text-3xl font-bold mt-2">৳{stats.totalExpense.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Income */}
            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-green-100 text-sm font-medium">মোট আয়</p>
                    <p className="text-3xl font-bold mt-2">৳{stats.totalIncome.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Balance */}
            <Card className={`bg-gradient-to-br ${stats.balance >= 0 ? 'from-purple-500 to-pink-600' : 'from-red-500 to-pink-600'} text-white border-0 shadow-lg hover:shadow-xl transition-shadow`}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">ব্যালেন্স</p>
                    <p className="text-3xl font-bold mt-2">৳{stats.balance.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Zap className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">সাম্প্রতিক লেনদেন</CardTitle>
                <Link href="/transactions">
                  <Button variant="outline" size="sm">
                    সব দেখুন
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{transaction.title}</p>
                        <p className="text-sm text-slate-500">
                          {transaction.category} • {transaction.date}
                        </p>
                      </div>
                      <p
                        className={`text-lg font-bold ${
                          transaction.type === 'income'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}৳{transaction.amount.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500 mb-4">কোন লেনদেন নেই</p>
                  <Link href="/transactions">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      প্রথম লেনদেন যোগ করুন
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
            <Link href="/transactions">
              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105">
                <CardContent className="pt-6 text-center">
                  <p className="text-2xl mb-2">💳</p>
                  <p className="text-sm font-medium">লেনদেন</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/categories">
              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105">
                <CardContent className="pt-6 text-center">
                  <p className="text-2xl mb-2">🏷️</p>
                  <p className="text-sm font-medium">ক্যাটাগরি</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/budgets">
              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105">
                <CardContent className="pt-6 text-center">
                  <p className="text-2xl mb-2">💰</p>
                  <p className="text-sm font-medium">বাজেট</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/analytics">
              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105">
                <CardContent className="pt-6 text-center">
                  <p className="text-2xl mb-2">📈</p>
                  <p className="text-sm font-medium">বিশ্লেষণ</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/reports">
              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105">
                <CardContent className="pt-6 text-center">
                  <p className="text-2xl mb-2">📄</p>
                  <p className="text-sm font-medium">রিপোর্ট</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/auth/login">
              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105">
                <CardContent className="pt-6 text-center">
                  <p className="text-2xl mb-2">👤</p>
                  <p className="text-sm font-medium">প্রোফাইল</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-muted-foreground border-t mt-12 bg-white/50">
        <p>© 2025 Financial Management System - Created by <strong>RIYAD HOSSAIN HUZAIFA</strong></p>
      </footer>
    </ProtectedPage>
  )
}
