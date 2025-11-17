'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileText, Calendar, Filter } from 'lucide-react'
import { useState } from 'react'

export default function ReportsPage() {
  const [reportType, setReportType] = useState('monthly')
  const [selectedMonth, setSelectedMonth] = useState('2025-11')

  const reports = [
    {
      id: 1,
      title: 'নভেম্বর ২০২৫ মাসিক রিপোর্ট',
      type: 'monthly',
      date: '2025-11-17',
      income: 38000,
      expense: 23000,
      savings: 15000,
      categories: 6,
      transactions: 12,
    },
    {
      id: 2,
      title: 'অক্টোবর ২০২৫ মাসিক রিপোর্ট',
      type: 'monthly',
      date: '2025-10-31',
      income: 35000,
      expense: 21000,
      savings: 14000,
      categories: 6,
      transactions: 10,
    },
    {
      id: 3,
      title: 'তৃতীয় ত্রৈমাসিক ২০২৫ রিপোর্ট',
      type: 'quarterly',
      date: '2025-09-30',
      income: 105000,
      expense: 62000,
      savings: 43000,
      categories: 6,
      transactions: 35,
    },
  ]

  const handleDownloadPDF = (report) => {
    // Create a simple PDF content
    const content = `
Financial Report - ${report.title}
Date: ${report.date}

Summary:
- Total Income: ৳${report.income.toLocaleString()}
- Total Expense: ৳${report.expense.toLocaleString()}
- Net Savings: ৳${report.savings.toLocaleString()}
- Categories: ${report.categories}
- Transactions: ${report.transactions}

Generated on: ${new Date().toLocaleString()}
    `
    
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
    element.setAttribute('download', `${report.title.replace(/\s+/g, '_')}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleDownloadExcel = (report) => {
    // Create CSV content
    const csvContent = `
Report Title,${report.title}
Date,${report.date}
Report Type,${report.type === 'monthly' ? 'Monthly' : report.type === 'quarterly' ? 'Quarterly' : 'Yearly'}

Summary
Total Income,৳${report.income.toLocaleString()}
Total Expense,৳${report.expense.toLocaleString()}
Net Savings,৳${report.savings.toLocaleString()}
Categories,${report.categories}
Transactions,${report.transactions}

Generated on,${new Date().toLocaleString()}
    `
    
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent))
    element.setAttribute('download', `${report.title.replace(/\s+/g, '_')}.csv`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const filteredReports = reports.filter(r => {
    if (reportType === 'all') return true
    return r.type === reportType
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              📄 রিপোর্ট এবং ডাউনলোড
            </h1>
            <p className="text-muted-foreground mt-2">আপনার আর্থিক রিপোর্ট তৈরি করুন এবং ডাউনলোড করুন</p>
          </div>
          <Button className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 shadow-lg">
            <Download className="w-4 h-4 mr-2" />
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
              {/* Report Type */}
              <div>
                <label className="text-sm font-medium mb-2 block">রিপোর্টের ধরন</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors"
                >
                  <option value="all">সব ধরনের</option>
                  <option value="monthly">মাসিক</option>
                  <option value="quarterly">ত্রৈমাসিক</option>
                  <option value="yearly">বার্ষিক</option>
                </select>
              </div>

              {/* Month Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">মাস নির্বাচন করুন</label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors"
                />
              </div>

              {/* Action Button */}
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
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <Card key={report.id} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">📊</div>
                        <div>
                          <p className="font-bold text-lg">{report.title}</p>
                          <div className="flex gap-3 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {report.date}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">
                              {report.type === 'monthly' ? 'মাসিক' : report.type === 'quarterly' ? 'ত্রৈমাসিক' : 'বার্ষিক'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleDownloadPDF(report)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        ডাউনলোড
                      </Button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-4 border-t">
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

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2 border-t">
                      <Button 
                        onClick={() => handleDownloadPDF(report)}
                        variant="outline" 
                        className="flex-1"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        PDF ডাউনলোড করুন
                      </Button>
                      <Button 
                        onClick={() => handleDownloadExcel(report)}
                        variant="outline" 
                        className="flex-1"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Excel ডাউনলোড করুন
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="pt-12 pb-12 text-center">
                <p className="text-lg text-muted-foreground">কোনো রিপোর্ট পাওয়া যায়নি</p>
                <p className="text-sm text-muted-foreground mt-2">নতুন রিপোর্ট তৈরি করতে উপরের বোতাম ক্লিক করুন</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Report Templates */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-0 shadow-lg">
          <CardHeader>
            <CardTitle>📋 রিপোর্ট টেমপ্লেট</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/50 dark:bg-slate-900/50 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="font-semibold mb-2">📅 মাসিক রিপোর্ট</p>
                <p className="text-sm text-muted-foreground mb-3">প্রতি মাসের আয়, খরচ এবং সঞ্চয়ের বিস্তারিত রিপোর্ট</p>
                <Button variant="outline" size="sm" className="w-full">তৈরি করুন</Button>
              </div>
              <div className="p-4 bg-white/50 dark:bg-slate-900/50 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-semibold mb-2">📊 ত্রৈমাসিক রিপোর্ট</p>
                <p className="text-sm text-muted-foreground mb-3">তিন মাসের ট্রেন্ড এবং তুলনামূলক বিশ্লেষণ</p>
                <Button variant="outline" size="sm" className="w-full">তৈরি করুন</Button>
              </div>
              <div className="p-4 bg-white/50 dark:bg-slate-900/50 rounded-lg border border-green-200 dark:border-green-800">
                <p className="font-semibold mb-2">📈 বার্ষিক রিপোর্ট</p>
                <p className="text-sm text-muted-foreground mb-3">সম্পূর্ণ বছরের আর্থিক সারসংক্ষেপ এবং লক্ষ্য অর্জন</p>
                <Button variant="outline" size="sm" className="w-full">তৈরি করুন</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
