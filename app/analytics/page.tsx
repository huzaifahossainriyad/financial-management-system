'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'

export default function AnalyticsPage() {
  const monthlyData = [
    { month: 'জানুয়ারি', income: 30000, expense: 18000 },
    { month: 'ফেব্রুয়ারি', income: 32000, expense: 19000 },
    { month: 'মার্চ', income: 28000, expense: 17000 },
    { month: 'এপ্রিল', income: 35000, expense: 21000 },
    { month: 'মে', income: 38000, expense: 23000 },
  ]

  const categoryData = [
    { name: 'খাবার', value: 8000, color: '#FF6B6B' },
    { name: 'পরিবহন', value: 5000, color: '#4ECDC4' },
    { name: 'বিনোদন', value: 3000, color: '#FFE66D' },
    { name: 'স্বাস্থ্য', value: 4000, color: '#95E1D3' },
    { name: 'শিক্ষা', value: 3000, color: '#A8E6CF' },
  ]

  const totalIncome = 38000
  const totalExpense = 23000
  const totalSavings = totalIncome - totalExpense
  const savingsRate = ((totalSavings / totalIncome) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            📈 বিশ্লেষণ
          </h1>
          <p className="text-muted-foreground mt-2">আপনার আর্থিক ডেটা বিশ্লেষণ করুন - Created by <strong>RIYAD HOSSAIN HUZAIFA</strong></p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">মোট আয়</p>
              <p className="text-3xl font-bold mt-2 text-green-600">৳{totalIncome.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">মোট খরচ</p>
              <p className="text-3xl font-bold mt-2 text-red-600">৳{totalExpense.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">নেট সঞ্চয়</p>
              <p className="text-3xl font-bold mt-2 text-blue-600">৳{totalSavings.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">সঞ্চয়ের হার</p>
              <p className="text-3xl font-bold mt-2 text-purple-600">{savingsRate}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Line Chart */}
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <CardTitle>মাসিক আয় এবং খরচ</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} name="আয়" />
                  <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} name="খরচ" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <CardTitle>ক্যাটাগরি অনুযায়ী খরচ বিতরণ</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ৳${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bar Chart */}
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
          <CardHeader>
            <CardTitle>মাসিক তুলনা</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#10B981" name="আয়" />
                <Bar dataKey="expense" fill="#EF4444" name="খরচ" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-0 shadow-lg">
          <CardHeader>
            <CardTitle>💡 অন্তর্দৃষ্টি এবং সুপারিশ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-white/50 dark:bg-slate-900/50 rounded-lg">
              <p className="font-semibold text-sm">✅ চমৎকার সঞ্চয় হার</p>
              <p className="text-xs text-muted-foreground mt-1">আপনি আপনার আয়ের {savingsRate}% সঞ্চয় করছেন, যা দুর্দান্ত!</p>
            </div>
            <div className="p-3 bg-white/50 dark:bg-slate-900/50 rounded-lg">
              <p className="font-semibold text-sm">📊 খাবারে সর্বোচ্চ খরচ</p>
              <p className="text-xs text-muted-foreground mt-1">খাবারে আপনার মোট খরচের ৩৫% ব্যয় হয়। এটি কমানোর চেষ্টা করুন।</p>
            </div>
            <div className="p-3 bg-white/50 dark:bg-slate-900/50 rounded-lg">
              <p className="font-semibold text-sm">🎯 লক্ষ্য নির্ধারণ করুন</p>
              <p className="text-xs text-muted-foreground mt-1">প্রতি মাসে ৳৫০,০০০ আয়ের লক্ষ্য নির্ধারণ করুন এবং সঞ্চয় বৃদ্ধি করুন।</p>
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
