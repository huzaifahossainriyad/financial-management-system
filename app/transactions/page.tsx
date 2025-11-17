'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import ProtectedPage from '@/components/ProtectedPage'

interface Transaction {
  id: string
  title: string
  amount: number
  category: string
  date: string
  type: 'income' | 'expense'
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'খাদ্য',
    date: new Date().toISOString().split('T')[0],
    type: 'expense' as 'income' | 'expense',
  })

  useEffect(() => {
    const saved = localStorage.getItem('transactions')
    if (saved) {
      setTransactions(JSON.parse(saved))
    }
  }, [])

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.amount) return

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      type: formData.type,
    }

    const updated = [newTransaction, ...transactions]
    setTransactions(updated)
    localStorage.setItem('transactions', JSON.stringify(updated))

    setFormData({
      title: '',
      amount: '',
      category: 'খাদ্য',
      date: new Date().toISOString().split('T')[0],
      type: 'expense',
    })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    const updated = transactions.filter((t) => t.id !== id)
    setTransactions(updated)
    localStorage.setItem('transactions', JSON.stringify(updated))
  }

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">💳 লেনদেন</h1>
                <p className="text-slate-600">আপনার সমস্ত লেনদেন পরিচালনা করুন - Created by RIYAD HOSSAIN HUZAIFA</p>
              </div>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                নতুন লেনদেন
              </Button>
            </div>
          </div>

          {/* Add Transaction Form */}
          {showForm && (
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg mb-8">
              <CardHeader>
                <CardTitle>নতুন লেনদেন যোগ করুন</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddTransaction} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">শিরোনাম</label>
                      <input
                        type="text"
                        placeholder="লেনদেনের শিরোনাম"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">পরিমাণ</label>
                      <input
                        type="number"
                        placeholder="পরিমাণ"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">ক্যাটাগরি</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>খাদ্য</option>
                        <option>পরিবহন</option>
                        <option>বিনোদন</option>
                        <option>স্বাস্থ্য</option>
                        <option>শিক্ষা</option>
                        <option>অন্যান্য</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">তারিখ</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">ধরন</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="expense">খরচ</option>
                        <option value="income">আয়</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">
                      যোগ করুন
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                    >
                      বাতিল
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Transactions List */}
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <CardTitle>সমস্ত লেনদেন ({transactions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <div className="space-y-2">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex justify-between items-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{transaction.title}</p>
                        <p className="text-sm text-slate-500">
                          {transaction.category} • {transaction.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p
                          className={`text-lg font-bold ${
                            transaction.type === 'income'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {transaction.type === 'income' ? '+' : '-'}৳{transaction.amount.toLocaleString()}
                        </p>
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500">কোন লেনদেন নেই</p>
                </div>
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
