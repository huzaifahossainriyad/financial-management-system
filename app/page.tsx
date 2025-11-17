'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Filter, ArrowUpRight, ArrowDownLeft, TrendingUp } from 'lucide-react'
import { useState } from 'react'

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')

  const transactions = [
    { id: 1, description: 'eta kinlam', amount: 150, type: 'expense', category: 'খাবার', date: '2025-11-17' },
    { id: 2, description: 'খাবার', amount: 500, type: 'expense', category: 'খাবার', date: '2025-11-17' },
    { id: 3, description: 'অনলাইন', amount: 150, type: 'expense', category: 'অন্যান্য', date: '2025-11-16' },
  ]

  const stats = [
    { label: 'মোট লেনদেন', value: transactions.length, icon: '📊', color: 'from-blue-500 to-blue-600' },
    { label: 'গড় খরচ', value: '৳267', icon: '💸', color: 'from-orange-500 to-orange-600' },
    { label: 'মাসিক বাজেট', value: '৳5000', icon: '💰', color: 'from-green-500 to-green-600' },
    { label: 'সঞ্চয়', value: '৳0', icon: '⚡', color: 'from-purple-500 to-purple-600' },
  ]

  const filteredTransactions = transactions.filter(t =>
    t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              📊 ড্যাশবোর্ড
            </h1>
            <p className="text-muted-foreground mt-2">আপনার আর্থিক অবস্থা এক নজরে দেখুন - Created by <strong>RIYAD HOSSAIN HUZAIFA</strong></p>
          </div>
          <Button className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 shadow-lg">
            + নতুন লেনদেন
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className={`bg-gradient-to-br ${stat.color} text-white border-0 shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className="text-4xl opacity-50">{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 h-20 flex flex-col items-center justify-center gap-2">
            <span className="text-2xl">💳</span>
            <span className="text-xs">লেনদেন</span>
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 h-20 flex flex-col items-center justify-center gap-2">
            <span className="text-2xl">🏷️</span>
            <span className="text-xs">ক্যাটাগরি</span>
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 h-20 flex flex-col items-center justify-center gap-2">
            <span className="text-2xl">💰</span>
            <span className="text-xs">বাজেট</span>
          </Button>
          <Button className="bg-pink-600 hover:bg-pink-700 h-20 flex flex-col items-center justify-center gap-2">
            <span className="text-2xl">📈</span>
            <span className="text-xs">বিশ্লেষণ</span>
          </Button>
        </div>

        {/* Recent Transactions */}
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
          <CardHeader>
            <CardTitle>সাম্প্রতিক লেনদেন</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search and Filter */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="লেনদেন খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors"
              >
                <option value="date">তারিখ অনুযায়ী</option>
                <option value="amount">পরিমাণ অনুযায়ী</option>
                <option value="name">নাম অনুযায়ী</option>
              </select>
            </div>

            {/* Transactions List */}
            <div className="space-y-2">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${transaction.type === 'expense' ? 'bg-red-100 dark:bg-red-900' : 'bg-green-100 dark:bg-green-900'}`}>
                        {transaction.type === 'expense' ? (
                          <ArrowDownLeft className={`w-4 h-4 ${transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'}`} />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">{transaction.category} • {transaction.date}</p>
                      </div>
                    </div>
                    <p className={`font-bold ${transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
                      {transaction.type === 'expense' ? '-' : '+'}৳{transaction.amount}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">কোনো লেনদেন পাওয়া যায়নি</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground py-4">
          <p>© 2025 Financial Management System - Created by <strong>RIYAD HOSSAIN HUZAIFA</strong></p>
        </div>
      </div>
    </div>
  )
}
