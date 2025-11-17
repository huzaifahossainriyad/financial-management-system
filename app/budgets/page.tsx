'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, Edit2, Trash2, Plus } from 'lucide-react'
import { useState } from 'react'

export default function BudgetsPage() {
  const budgets = [
    { id: 1, category: 'খাবার', limit: 5000, spent: 650, icon: '🍔', color: 'from-red-500 to-red-600' },
    { id: 2, category: 'পরিবহন', limit: 3000, spent: 0, icon: '🚗', color: 'from-blue-500 to-blue-600' },
    { id: 3, category: 'বিনোদন', limit: 2000, spent: 0, icon: '🎬', color: 'from-purple-500 to-purple-600' },
    { id: 4, category: 'স্বাস্থ্য', limit: 4000, spent: 0, icon: '⚕️', color: 'from-green-500 to-green-600' },
    { id: 5, category: 'শিক্ষা', limit: 6000, spent: 0, icon: '📚', color: 'from-yellow-500 to-yellow-600' },
  ]

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStatusBadge = (percentage) => {
    if (percentage >= 100) return { text: 'অতিক্রম করেছে', color: 'bg-red-100 text-red-700' }
    if (percentage >= 90) return { text: 'সতর্কতা', color: 'bg-yellow-100 text-yellow-700' }
    return { text: 'ভালো', color: 'bg-green-100 text-green-700' }
  }

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)
  const totalRemaining = totalBudget - totalSpent

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              💰 বাজেট
            </h1>
            <p className="text-muted-foreground mt-2">আপনার বাজেট ট্র্যাক করুন - Created by <strong>RIYAD HOSSAIN HUZAIFA</strong></p>
          </div>
          <Button className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            নতুন বাজেট
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">মোট বাজেট</p>
              <p className="text-3xl font-bold mt-2 text-blue-600">৳{totalBudget.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">মোট খরচ</p>
              <p className="text-3xl font-bold mt-2 text-red-600">৳{totalSpent.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">অবশিষ্ট</p>
              <p className="text-3xl font-bold mt-2 text-green-600">৳{totalRemaining.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Budgets List */}
        <div className="space-y-4">
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.limit) * 100
            const status = getStatusBadge(percentage)
            const remaining = budget.limit - budget.spent

            return (
              <Card key={budget.id} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{budget.icon}</div>
                        <div>
                          <p className="font-bold text-lg">{budget.category}</p>
                          <p className="text-xs text-muted-foreground">বাজেট: ৳{budget.limit.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                        {status.text}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">খরচ: ৳{budget.spent.toLocaleString()}</span>
                        <span className="font-semibold">{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full ${getProgressColor(percentage)} transition-all duration-300`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>অবশিষ্ট: ৳{remaining.toLocaleString()}</span>
                        <span>{budget.limit - budget.spent > 0 ? 'ভালো' : 'অতিক্রম'}</span>
                      </div>
                    </div>

                    {/* Alert */}
                    {percentage >= 90 && (
                      <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <p className="text-xs text-yellow-700 dark:text-yellow-300">
                          আপনি আপনার বাজেটের {percentage.toFixed(1)}% ব্যয় করেছেন
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t">
                      <Button variant="outline" size="sm" className="flex-1 hover:bg-blue-100">
                        <Edit2 className="w-4 h-4 mr-2" />
                        সম্পাদনা
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 hover:bg-red-100">
                        <Trash2 className="w-4 h-4 mr-2" />
                        মুছুন
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Tips */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-0 shadow-lg">
          <CardHeader>
            <CardTitle>💡 বাজেট টিপস</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">• প্রতি মাসে আপনার বাজেট পর্যালোচনা করুন</p>
            <p className="text-sm">• প্রয়োজনীয় খরচের জন্য বেশি বাজেট বরাদ্দ করুন</p>
            <p className="text-sm">• অপ্রয়োজনীয় খরচ কমানোর চেষ্টা করুন</p>
            <p className="text-sm">• নিয়মিত আপনার লক্ষ্য পর্যালোচনা করুন</p>
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
