'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, Trash2, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'খাবার', limit: 3000, spent: 2400, month: 'নভেম্বর', year: 2025, icon: '🍔' },
    { id: 2, category: 'পরিবহন', limit: 1500, spent: 800, month: 'নভেম্বর', year: 2025, icon: '🚗' },
    { id: 3, category: 'বিনোদন', limit: 1000, spent: 950, month: 'নভেম্বর', year: 2025, icon: '🎬' },
    { id: 4, category: 'স্বাস্থ্য', limit: 2000, spent: 500, month: 'নভেম্বর', year: 2025, icon: '⚕️' },
    { id: 5, category: 'শিক্ষা', limit: 2500, spent: 2100, month: 'নভেম্বর', year: 2025, icon: '📚' },
  ])

  const getProgressPercentage = (spent, limit) => (spent / limit) * 100
  const getStatusColor = (percentage) => {
    if (percentage >= 90) return 'text-red-600'
    if (percentage >= 70) return 'text-yellow-600'
    return 'text-green-600'
  }
  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              🎯 বাজেট ব্যবস্থাপনা
            </h1>
            <p className="text-muted-foreground mt-2">আপনার খরচ নিয়ন্ত্রণ করুন এবং বাজেট সেট করুন</p>
          </div>
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            নতুন বাজেট
          </Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">মোট বাজেট</p>
              <p className="text-3xl font-bold mt-2">৳10,000</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">মোট খরচ</p>
              <p className="text-3xl font-bold mt-2 text-red-600">৳6,750</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">অবশিষ্ট</p>
              <p className="text-3xl font-bold mt-2 text-green-600">৳3,250</p>
            </CardContent>
          </Card>
        </div>

        {/* Budgets List */}
        <div className="space-y-4">
          {budgets.map((budget) => {
            const percentage = getProgressPercentage(budget.spent, budget.limit)
            const isOverBudget = budget.spent > budget.limit
            
            return (
              <Card key={budget.id} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{budget.icon}</div>
                        <div>
                          <p className="font-bold text-lg">{budget.category}</p>
                          <p className="text-sm text-muted-foreground">{budget.month} {budget.year}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">খরচ: ৳{budget.spent}</span>
                        <span className={`text-sm font-bold ${getStatusColor(percentage)}`}>
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${getProgressColor(percentage)}`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>বাজেট: ৳{budget.limit}</span>
                        <span className={isOverBudget ? 'text-red-600 font-bold' : ''}>
                          {isOverBudget ? `অতিরিক্ত: ৳${budget.spent - budget.limit}` : `অবশিষ্ট: ৳${budget.limit - budget.spent}`}
                        </span>
                      </div>
                    </div>

                    {/* Alert */}
                    {percentage >= 90 && (
                      <div className="flex gap-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700 dark:text-red-300">
                          {isOverBudget ? 'আপনি বাজেট অতিক্রম করেছেন!' : 'সতর্কতা: আপনি বাজেটের ৯০% ব্যয় করেছেন'}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Tips */}
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-0 shadow-lg">
          <CardHeader>
            <CardTitle>💡 বাজেট পরামর্শ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <div className="text-2xl">📊</div>
              <div>
                <p className="font-semibold">নিয়মিত পর্যালোচনা করুন</p>
                <p className="text-sm text-muted-foreground">প্রতি সপ্তাহে আপনার বাজেট পর্যালোচনা করুন এবং প্রয়োজনে সামঞ্জস্য করুন।</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-2xl">🎯</div>
              <div>
                <p className="font-semibold">বাস্তবসম্মত লক্ষ্য নির্ধারণ করুন</p>
                <p className="text-sm text-muted-foreground">আপনার আয় এবং খরচের উপর ভিত্তি করে বাস্তবসম্মত বাজেট তৈরি করুন।</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-2xl">⚠️</div>
              <div>
                <p className="font-semibold">সতর্কতা সেট করুন</p>
                <p className="text-sm text-muted-foreground">বাজেটের ৮০% ব্যয় হলে নোটিফিকেশন পান এবং সময়মতো ব্যবস্থা নিন।</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
