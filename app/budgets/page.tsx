'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Plus, Trash2, AlertTriangle } from 'lucide-react'

interface Budget {
  id: string
  name: string
  limit: number
  spent: number
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    limit: '',
  })

  useEffect(() => {
    fetchBudgets()
  }, [])

  const fetchBudgets = async () => {
    try {
      const response = await fetch('/api/budgets')
      const data = await response.json()
      setBudgets(data)
    } catch (error) {
      console.error('Error fetching budgets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddBudget = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          limit: parseFloat(formData.limit),
        }),
      })
      if (response.ok) {
        setFormData({
          name: '',
          limit: '',
        })
        fetchBudgets()
      }
    } catch (error) {
      console.error('Error adding budget:', error)
    }
  }

  const handleDeleteBudget = async (id: string) => {
    try {
      await fetch(`/api/budgets/${id}`, { method: 'DELETE' })
      fetchBudgets()
    } catch (error) {
      console.error('Error deleting budget:', error)
    }
  }

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">🎯 বাজেট</h1>
          <p className="text-muted-foreground">আপনার মাসিক বাজেট তৈরি এবং পরিচালনা করুন</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">মোট বাজেট</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">৳{totalBudget.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">মোট খরচ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">৳{totalSpent.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Budget Form */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>নতুন বাজেট</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddBudget} className="space-y-4">
                <div>
                  <Label>বাজেটের নাম</Label>
                  <Input
                    placeholder="বাজেটের নাম"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label>সীমা</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.limit}
                    onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  যোগ করুন
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Budgets List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>আপনার বাজেট</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">লোড হচ্ছে...</p>
              ) : budgets.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">এখনও কোনো বাজেট নেই</p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {budgets.map((budget) => {
                    const percentage = (budget.spent / budget.limit) * 100
                    const isOverBudget = budget.spent > budget.limit

                    return (
                      <div key={budget.id} className="p-4 rounded-lg border bg-card">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{budget.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              ৳{budget.spent.toLocaleString()} / ৳{budget.limit.toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteBudget(budget.id)}
                            className="p-1 hover:bg-red-200 dark:hover:bg-red-800 rounded"
                          >
                            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </button>
                        </div>

                        <Progress value={Math.min(percentage, 100)} className="mb-2" />

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{Math.round(percentage)}%</span>
                          {isOverBudget && (
                            <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-sm">বাজেট অতিক্রম</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
