'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, Wallet, Plus, Calendar, PieChart, Target, Zap } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 800,
    balance: -800,
    transactions: [
      { id: 1, description: 'eta kinlam', date: '2025-11-17', amount: -150, type: 'expense' },
      { id: 2, description: 'খাবার', date: '2025-11-17', amount: -500, type: 'expense' },
      { id: 3, description: 'অন্যান্য', date: '2025-11-16', amount: -150, type: 'expense' },
    ]
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')

  const filteredTransactions = stats.transactions
    .filter(t => t.description.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === 'amount') return Math.abs(b.amount) - Math.abs(a.amount)
      return 0
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            💰 আর্থিক ড্যাশবোর্ড
          </h1>
          <p className="text-lg text-muted-foreground">আপনার আর্থিক অবস্থা এক নজরে দেখুন এবং স্মার্ট সিদ্ধান্ত নিন</p>
        </div>

        {/* Main Stats - 3D Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Income Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <Card className="relative bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 border-green-200 dark:border-green-800 shadow-2xl hover:shadow-3xl transition-all transform group-hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
                  মোট আয়
                </CardTitle>
                <div className="p-2 bg-green-200 dark:bg-green-800 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                  ৳{stats.totalIncome.toLocaleString()}
                </div>
                <p className="text-xs text-green-600/70 mt-2">এই মাসে</p>
              </CardContent>
            </Card>
          </div>

          {/* Expense Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <Card className="relative bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-950 dark:to-rose-900 border-red-200 dark:border-red-800 shadow-2xl hover:shadow-3xl transition-all transform group-hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">
                  মোট খরচ
                </CardTitle>
                <div className="p-2 bg-red-200 dark:bg-red-800 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-red-600 dark:text-red-400">
                  ৳{stats.totalExpense.toLocaleString()}
                </div>
                <p className="text-xs text-red-600/70 mt-2">এই মাসে</p>
              </CardContent>
            </Card>
          </div>

          {/* Balance Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <Card className="relative bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-950 dark:to-cyan-900 border-blue-200 dark:border-blue-800 shadow-2xl hover:shadow-3xl transition-all transform group-hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  ব্যালেন্স
                </CardTitle>
                <div className="p-2 bg-blue-200 dark:bg-blue-800 rounded-lg">
                  <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-4xl font-bold ${stats.balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
                  ৳{stats.balance.toLocaleString()}
                </div>
                <p className="text-xs text-blue-600/70 mt-2">নেট ব্যালেন্স</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">লেনদেন</p>
                  <p className="text-2xl font-bold">{stats.transactions.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">গড় খরচ</p>
                  <p className="text-2xl font-bold">৳{Math.round(stats.totalExpense / stats.transactions.length)}</p>
                </div>
                <PieChart className="h-8 w-8 text-purple-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">বাজেট</p>
                  <p className="text-2xl font-bold">৳5000</p>
                </div>
                <Target className="h-8 w-8 text-green-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">সঞ্চয়</p>
                  <p className="text-2xl font-bold">৳0</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions with Search & Sort */}
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
          <CardHeader className="space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">সাম্প্রতিক লেনদেন</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">আপনার সমস্ত লেনদেন এক জায়গায়</p>
              </div>
              <Link href="/transactions">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  নতুন লেনদেন
                </Button>
              </Link>
            </div>

            {/* Search and Sort Controls */}
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                placeholder="লেনদেন খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors"
              >
                <option value="date">তারিখ অনুযায়ী</option>
                <option value="amount">পরিমাণ অনুযায়ী</option>
              </select>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                      transaction.type === 'expense'
                        ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
                        : 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
                    }`}
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                    <p className={`font-bold text-lg ${
                      transaction.type === 'expense'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-green-600 dark:text-green-400'
                    }`}>
                      {transaction.type === 'expense' ? '-' : '+'}৳{Math.abs(transaction.amount)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  কোনো লেনদেন পাওয়া যায়নি
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href: '/transactions', label: 'লেনদেন', icon: '💳', color: 'from-blue-500 to-blue-600' },
            { href: '/categories', label: 'ক্যাটাগরি', icon: '🏷️', color: 'from-purple-500 to-purple-600' },
            { href: '/budgets', label: 'বাজেট', icon: '🎯', color: 'from-green-500 to-green-600' },
            { href: '/analytics', label: 'বিশ্লেষণ', icon: '📊', color: 'from-pink-500 to-pink-600' },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className={`hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer bg-gradient-to-br ${item.color} border-0 shadow-lg`}>
                <CardContent className="pt-6 text-center text-white">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <p className="font-bold text-lg">{item.label}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
