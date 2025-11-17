'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Filter, Plus } from 'lucide-react'
import { useState } from 'react'

export default function ReportsPage() {
  const [reportType, setReportType] = useState('monthly')
  const [selectedMonth, setSelectedMonth] = useState('November 2025')

  const reports = [
    {
      id: 1,
      title: 'নভেম্বর ২০২৫ মাসিক রিপোর্ট',
      date: '2025-11-17',
      type: 'মাসিক',
      income: 38000,
      expense: 23000,
      savings: 15000,
      categories: 6,
      transactions: 12,
    },
    {
      id: 2,
      title: 'অক্টোবর ২০২৫ মাসিক রিপোর্ট',
      date: '2025-10-31',
      type: 'মাসিক',
      income: 35000,
      expense: 21000,
      savings: 14000,
      categories: 6,
      transactions: 10,
    },
  ]

  const handlePDFDownload = (report) => {
    const content = `
Financial Report - ${report.title}
Generated: ${new Date().toLocaleDateString('bn-BD')}
Created by: RIYAD HOSSAIN HUZAIFA

Report Details:
- Total Income: ৳${report.income.toLocaleString()}
- Total Expense: ৳${report.expense.toLocaleString()}
- Net Savings: ৳${report.savings.toLocaleString()}
- Categories: ${report.categories}
- Transactions: ${report.transactions}
    `
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
    element.setAttribute('download', `report-${report.id}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleExcelDownload = (report) => {
    const csvContent = `
Report Title,${report.title}
Generated Date,${new Date().toLocaleDateString('bn-BD')}
Created by,RIYAD HOSSAIN HUZAIFA

Financial Summary
Total Income,৳${report.income.toLocaleString()}
Total Expense,৳${report.expense.toLocaleString()}
Net Savings,৳${report.savings.toLocaleString()}
Categories,${report.categories}
Transactions,${report.transactions}
    `
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent))
    element.setAttribute('download', `report-${report.id}.csv`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              📄 রিপোর্ট এবং ডাউনলোড
            </h1>
            <p className="text-muted-foreground mt-2">আপনার আর্থিক রিপোর্ট তৈরি করুন এবং ডাউনলোড করুন - Created by <strong>RIYAD HOSSAIN HUZAIFA</strong></p>
          </div>
          <Button className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            নতুন রিপোর্ট তৈরি করুন
          </Button>
        </div>

        {/* Filter Section */}
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
          <CardHeader>
            <CardTitle>ফিল্টার এবং অনুসন্ধান</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">রিপোর্টের ধরন</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full mt-2 px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors"
                >
                  <option value="all">সব ধরনের</option>
                  <option value="monthly">মাসিক</option>
                  <option value="quarterly">ত্রৈমাসিক</option>
                  <option value="yearly">বার্ষিক</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">মাস নির্বাচন করুন</label>
                <input
                  type="month"
                  value="2025-11"
                  className="w-full mt-2 px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors"
                />
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Filter className="w-4 h-4 mr-2" />
                  ফিল্টার প্রয়োগ করুন
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{report.title}</h3>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">📅 {report.date}</span>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">
                          {report.type}
                        </span>
                      </div>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Download className="w-4 h-4 mr-2" />
                      ডাউনলোড
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 py-3 border-y">
                    <div>
                      <p className="text-xs text-muted-foreground">মোট আয়</p>
                      <p className="text-lg font-bold text-green-600">৳{report.income.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">মোট খরচ</p>
                      <p className="text-lg font-bold text-red-600">৳{report.expense.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">নেট সঞ্চয়</p>
                      <p className="text-lg font-bold text-blue-600">৳{report.savings.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">ক্যাটাগরি</p>
                      <p className="text-lg font-bold">{report.categories}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">লেনদেন</p>
                      <p className="text-lg font-bold">{report.transactions}</p>
                    </div>
                  </div>

                  {/* Download Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="hover:bg-blue-100"
                      onClick={() => handlePDFDownload(report)}
                    >
                      📄 PDF ডাউনলোড করুন
                    </Button>
                    <Button
                      variant="outline"
                      className="hover:bg-green-100"
                      onClick={() => handleExcelDownload(report)}
                    >
                      📊 Excel ডাউনলোড করুন
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Templates */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-0 shadow-lg">
          <CardHeader>
            <CardTitle>📋 রিপোর্ট টেমপ্লেট</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/50 dark:bg-slate-900/50 rounded-lg hover:shadow-lg transition-all cursor-pointer">
                <p className="text-lg font-bold">📅 মাসিক রিপোর্ট</p>
                <p className="text-sm text-muted-foreground mt-2">প্রতি মাসের আয়, খরচ এবং সঞ্চয়ের বিস্তারিত রিপোর্ট</p>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">তৈরি করুন</Button>
              </div>
              <div className="p-4 bg-white/50 dark:bg-slate-900/50 rounded-lg hover:shadow-lg transition-all cursor-pointer">
                <p className="text-lg font-bold">📊 ত্রৈমাসিক রিপোর্ট</p>
                <p className="text-sm text-muted-foreground mt-2">তিন মাসের ট্রেন্ড এবং তুলনামূলক বিশ্লেষণ</p>
                <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">তৈরি করুন</Button>
              </div>
              <div className="p-4 bg-white/50 dark:bg-slate-900/50 rounded-lg hover:shadow-lg transition-all cursor-pointer">
                <p className="text-lg font-bold">📈 বার্ষিক রিপোর্ট</p>
                <p className="text-sm text-muted-foreground mt-2">সম্পূর্ণ বছরের আর্থিক সারসংক্ষেপ এবং লক্ষ্য অর্জন</p>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">তৈরি করুন</Button>
              </div>
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
