'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const monthlyData = [
  { month: 'জানুয়ারি', income: 5000, expense: 3000 },
  { month: 'ফেব্রুয়ারি', income: 6000, expense: 3500 },
  { month: 'মার্চ', income: 5500, expense: 4000 },
  { month: 'এপ্রিল', income: 7000, expense: 3800 },
  { month: 'মে', income: 6500, expense: 4200 },
  { month: 'জুন', income: 8000, expense: 4500 },
]

const categoryData = [
  { name: 'খাবার', value: 800, color: '#ef4444' },
  { name: 'পরিবহন', value: 300, color: '#f97316' },
  { name: 'বিনোদন', value: 200, color: '#eab308' },
  { name: 'স্বাস্থ্য', value: 150, color: '#22c55e' },
  { name: 'শিক্ষা', value: 400, color: '#3b82f6' },
]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            📊 বিশ্লেষণ এবং রিপোর্ট
          </h1>
          <p className="text-muted-foreground mt-2">আপনার আর্থিক ডেটা বিশ্লেষণ করুন এবং ট্রেন্ড দেখুন</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">মোট আয়</p>
              <p className="text-3xl font-bold mt-2 text-green-600">৳38,000</p>
              <p className="text-xs text-green-600/70 mt-2">↑ ১৫% বৃদ্ধি</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">মোট খরচ</p>
              <p className="text-3xl font-bold mt-2 text-red-600">৳23,000</p>
              <p className="text-xs text-red-600/70 mt-2">↑ ৮% বৃদ্ধি</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">নেট সঞ্চয়</p>
              <p className="text-3xl font-bold mt-2 text-blue-600">৳15,000</p>
              <p className="text-xs text-blue-600/70 mt-2">↑ ২৫% বৃদ্ধি</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">সঞ্চয়ের হার</p>
              <p className="text-3xl font-bold mt-2 text-purple-600">৳39%</p>
              <p className="text-xs text-purple-600/70 mt-2">লক্ষ্য: ৪০%</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trend */}
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
                  <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} name="আয়" />
                  <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} name="খরচ" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
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

          {/* Bar Chart */}
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg lg:col-span-2">
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
                  <Bar dataKey="income" fill="#22c55e" name="আয়" />
                  <Bar dataKey="expense" fill="#ef4444" name="খরচ" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-0 shadow-lg">
          <CardHeader>
            <CardTitle>💡 অন্তর্দৃষ্টি এবং সুপারিশ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <div className="text-2xl">📈</div>
              <div>
                <p className="font-semibold">আপনার আয় বৃদ্ধি পাচ্ছে</p>
                <p className="text-sm text-muted-foreground">গত ৬ মাসে আপনার আয় ৬০% বৃদ্ধি পেয়েছে। দুর্দান্ত কাজ!</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-2xl">🎯</div>
              <div>
                <p className="font-semibold">খাবারে বেশি খরচ হচ্ছে</p>
                <p className="text-sm text-muted-foreground">আপনার মোট খরচের ৩৫% খাবারে ব্যয় হচ্ছে। বাজেট কমানোর চেষ্টা করুন।</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-2xl">💰</div>
              <div>
                <p className="font-semibold">সঞ্চয়ের লক্ষ্য প্রায় পূরণ</p>
                <p className="text-sm text-muted-foreground">আপনি ৩৯% সঞ্চয় করছেন। ১% আরও বাড়ান এবং লক্ষ্য অর্জন করুন।</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
