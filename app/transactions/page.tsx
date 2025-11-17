'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Search, Filter, Download, Trash2, Edit2 } from 'lucide-react'
import { useState } from 'react'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'eta kinlam', date: '2025-11-17', amount: 150, type: 'expense', category: 'খাবার' },
    { id: 2, description: 'খাবার', date: '2025-11-17', amount: 500, type: 'expense', category: 'খাবার' },
    { id: 3, description: 'অন্যান্য', date: '2025-11-16', amount: 150, type: 'expense', category: 'অন্যান্য' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  const filteredTransactions = transactions
    .filter(t => {
      const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           t.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'all' || t.type === filterType
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === 'amount') return b.amount - a.amount
      if (sortBy === 'name') return a.description.localeCompare(b.description)
      return 0
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              💳 লেনদেন ব্যবস্থাপনা
            </h1>
            <p className="text-muted-foreground mt-2">সমস্ত লেনদেন দেখুন এবং পরিচালনা করুন</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            নতুন লেনদেন
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">মোট লেনদেন</p>
              <p className="text-3xl font-bold mt-2">{transactions.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">মোট খরচ</p>
              <p className="text-3xl font-bold mt-2 text-red-600">৳{transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">মোট আয়</p>
              <p className="text-3xl font-bold mt-2 text-green-600">৳{transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Controls */}
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
          <CardHeader>
            <CardTitle>অনুসন্ধান এবং ফিল্টার</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="লেনদেন খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors"
                />
              </div>

              {/* Filter by Type */}
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

            {/* Results Info */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{filteredTransactions.length} টি লেনদেন পাওয়া গেছে</span>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                এক্সপোর্ট
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
          <CardHeader>
            <CardTitle>লেনদেনের তালিকা</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all hover:shadow-lg group ${
                      transaction.type === 'expense'
                        ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
                        : 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          transaction.type === 'expense'
                            ? 'bg-red-200 dark:bg-red-800'
                            : 'bg-green-200 dark:bg-green-800'
                        }`}>
                          {transaction.type === 'expense' ? '💸' : '💰'}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{transaction.description}</p>
                          <div className="flex gap-2 text-xs text-muted-foreground">
                            <span>{transaction.date}</span>
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                              {transaction.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className={`font-bold text-lg min-w-[100px] text-right ${
                        transaction.type === 'expense'
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-green-600 dark:text-green-400'
                      }`}>
                        {transaction.type === 'expense' ? '-' : '+'}৳{transaction.amount}
                      </p>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg">কোনো লেনদেন পাওয়া যায়নি</p>
                  <p className="text-sm mt-2">নতুন লেনদেন যোগ করতে উপরের বোতাম ক্লিক করুন</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
