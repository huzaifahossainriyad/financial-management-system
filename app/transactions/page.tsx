'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Filter, Edit2, Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { useState } from 'react'

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  const transactions = [
    { id: 1, description: 'eta kinlam', amount: 150, type: 'expense', category: 'খাবার', date: '2025-11-17' },
    { id: 2, description: 'খাবার', amount: 500, type: 'expense', category: 'খাবার', date: '2025-11-17' },
    { id: 3, description: 'অনলাইন', amount: 150, type: 'expense', category: 'অন্যান্য', date: '2025-11-16' },
  ]

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || t.type === filterType
    return matchesSearch && matchesType
  })

  const stats = {
    total: filteredTransactions.length,
    income: filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    expense: filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              💳 লেনদেন
            </h1>
            <p className="text-muted-foreground mt-2">আপনার সমস্ত লেনদেন পরিচালনা করুন - Created by <strong>RIYAD HOSSAIN HUZAIFA</strong></p>
          </div>
          <Button className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 shadow-lg">
            + নতুন লেনদেন
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">মোট লেনদেন</p>
              <p className="text-3xl font-bold mt-2">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">মোট আয়</p>
              <p className="text-3xl font-bold mt-2 text-green-600">৳{stats.income.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">মোট খরচ</p>
              <p className="text-3xl font-bold mt-2 text-red-600">৳{stats.expense.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
          <CardHeader>
            <CardTitle>অনুসন্ধান এবং ফিল্টার</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="লেনদেন খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors"
                />
              </div>

              {/* Filter Type */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors"
              >
                <option value="all">সব ধরনের</option>
                <option value="income">আয়</option>
                <option value="expense">খরচ</option>
              </select>

              {/* Sort */}
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
          </CardContent>
        </Card>

        {/* Transactions List */}
        <div className="space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <Card key={transaction.id} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`p-3 rounded-lg ${transaction.type === 'expense' ? 'bg-red-100 dark:bg-red-900' : 'bg-green-100 dark:bg-green-900'}`}>
                        {transaction.type === 'expense' ? (
                          <ArrowDownLeft className="w-6 h-6 text-red-600" />
                        ) : (
                          <ArrowUpRight className="w-6 h-6 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-lg">{transaction.description}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">
                            {transaction.category}
                          </span>
                          <span className="text-xs text-muted-foreground">{transaction.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className={`text-2xl font-bold ${transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
                        {transaction.type === 'expense' ? '-' : '+'}৳{transaction.amount}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="hover:bg-blue-100">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="hover:bg-red-100">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="pt-12 pb-12 text-center">
                <p className="text-lg text-muted-foreground">কোনো লেনদেন পাওয়া যায়নি</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground py-4">
          <p>© 2025 Financial Management System - Created by <strong>RIYAD HOSSAIN HUZAIFA</strong></p>
        </div>
      </div>
    </div>
  )
}
