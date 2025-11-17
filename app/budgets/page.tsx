'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'
import ProtectedPage from '@/components/ProtectedPage'

interface Budget {
  id: string
  category: string
  limit: number
  spent: number
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    category: 'খাদ্য',
    limit: '',
  })

  useEffect(() => {
    const saved = localStorage.getItem('budgets')
    if (saved) {
      setBudgets(JSON.parse(saved))
    }
  }, [])

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.category || !formData.limit) return

    const newBudget: Budget = {
      id: Date.now().toString(),
      category: formData.category,
      limit: parseFloat(formData.limit),
      spent: 0,
    }

    const updated = [...budgets, newBudget]
    setBudgets(updated)
    localStorage.setItem('budgets', JSON.stringify(updated))

    setFormData({ category: 'খাদ্য', limit: '' })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    const updated = budgets.filter((b) => b.id !== id)
    setBudgets(updated)
    localStorage.setItem('budgets', JSON.stringify(updated))
  }

  const getProgressPercentage = (spent: number, limit: number) => {
    return Math.min((spent / limit) * 100, 100)
  }

  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return 'bg-green-500'
    if (percentage < 80) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">💰 বাজেট</h1>
                <p className="text-slate-600">আপনার বাজেট পরিচালনা করুন - Created by RIYAD HOSSAIN HUZAIFA</p>
              </div>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                নতুন বাজেট
              </Button>
            </div>
          </div>

          {/* Add Budget Form */}
          {showForm && (
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg mb-8">
              <CardHeader>
                <CardTitle>নতুন বাজেট যোগ করুন</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddBudget} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <label className="text-sm font-medium">বাজেট সীমা</label>
                      <input
                        type="number"
                        placeholder="বাজেট সীমা"
                        value={formData.limit}
                        onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
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

          {/* Budgets List */}
          <div className="space-y-4">
            {budgets.length > 0 ? (
              budgets.map((budget) => {
                const percentage = getProgressPercentage(budget.spent, budget.limit)
                const color = getProgressColor(percentage)

                return (
                  <Card key={budget.id} className="bg-white/80 backdrop-blur border-0 shadow-lg">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{budget.category}</h3>
                          <p className="text-sm text-slate-500">
                            বাজেট: ৳{budget.limit.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete(budget.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">খরচ: ৳{budget.spent.toLocaleString()}</span>
                          <span className="font-semibold">{percentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-full ${color} transition-all duration-300`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-slate-500">
                          অবশিষ্ট: ৳{Math.max(0, budget.limit - budget.spent).toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
                <CardContent className="pt-6 text-center py-8">
                  <p className="text-slate-500 mb-4">কোন বাজেট নেই</p>
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    প্রথম বাজেট যোগ করুন
                  </Button>
                </CardContent>
              </Card>
            )}
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
