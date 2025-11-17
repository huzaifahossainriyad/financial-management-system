'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, FileText } from 'lucide-react'
import ProtectedPage from '@/components/ProtectedPage'

interface Transaction {
  id: string
  title: string
  amount: number
  category: string
  date: string
  type: 'income' | 'expense'
}

export default function ReportsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))

  useEffect(() => {
    const saved = localStorage.getItem('transactions')
    if (saved) {
      setTransactions(JSON.parse(saved))
    }
  }, [])

  const getMonthlyTransactions = () => {
    return transactions.filter((t) => t.date.startsWith(selectedMonth))
  }

  const calculateStats = (trans: Transaction[]) => {
    const income = trans
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    const expense = trans
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    return {
      income,
      expense,
      balance: income - expense,
      count: trans.length,
    }
  }

  const monthlyTransactions = getMonthlyTransactions()
  const stats = calculateStats(monthlyTransactions)

  const downloadPDF = () => {
    const content = `
আর্থিক রিপোর্ট - ${selectedMonth}
Created by: RIYAD HOSSAIN HUZAIFA

মাসিক সারসংক্ষেপ:
- মোট আয়: ৳${stats.income.toLocaleString()}
- মোট খরচ: ৳${stats.expense.toLocaleString()}
- নেট ব্যালেন্স: ৳${stats.balance.toLocaleString()}
- মোট লেনদেন: ${stats.count}

বিস্তারিত লেনদেন:
${monthlyTransactions
  .map(
    (t) =>
      `${t.date} | ${t.title} | ${t.category} | ${t.type === 'income' ? '+' : '-'}৳${t.amount}`
  )
  .join('\n')}
    `

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
    element.setAttribute('download', `report-${selectedMonth}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const downloadExcel = () => {
    let csv = 'তারিখ,শিরোনাম,ক্যাটাগরি,ধরন,পরিমাণ\n'
    monthlyTransactions.forEach((t) => {
      csv += `${t.date},"${t.title}","${t.category}","${t.type}",${t.amount}\n`
    })

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv))
    element.setAttribute('download', `report-${selectedMonth}.csv`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">📄 রিপোর্ট এবং ডাউনলোড</h1>
            <p className="text-slate-600">আপনার আর্থিক রিপোর্ট তৈরি এবং ডাউনলোড করুন - Created by RIYAD HOSSAIN HUZAIFA</p>
          </div>

          {/* Filter Section */}
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle>ফিল্টার এবং অনুসন্ধান</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">মাস নির্বাচন করুন</label>
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={() => setSelectedMonth(new Date().toISOString().slice(0, 7))}
                    variant="outline"
                    className="w-full"
                  >
                    এই মাস
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Report */}
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle>{selectedMonth} মাসিক রিপোর্ট</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-600 font-medium">মোট আয়</p>
                  <p className="text-2xl font-bold text-green-700">৳{stats.income.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-600 font-medium">মোট খরচ</p>
                  <p className="text-2xl font-bold text-red-700">৳{stats.expense.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-600 font-medium">মোট সঞ্চয়</p>
                  <p className="text-2xl font-bold text-blue-700">৳{stats.balance.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-600 font-medium">লেনদেন</p>
                  <p className="text-2xl font-bold text-purple-700">{stats.count}</p>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={downloadPDF}
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  PDF ডাউনলোড করুন
                </Button>
                <Button
                  onClick={downloadExcel}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Excel ডাউনলোড করুন
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transactions List */}
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardHeader>
              <CardTitle>বিস্তারিত লেনদেন ({monthlyTransactions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {monthlyTransactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-900">তারিখ</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900">শিরোনাম</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900">ক্যাটাগরি</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900">ধরন</th>
                        <th className="text-right py-3 px-4 font-semibold text-slate-900">পরিমাণ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4 text-slate-600">{transaction.date}</td>
                          <td className="py-3 px-4 text-slate-900 font-medium">{transaction.title}</td>
                          <td className="py-3 px-4 text-slate-600">{transaction.category}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                transaction.type === 'income'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {transaction.type === 'income' ? 'আয়' : 'খরচ'}
                            </span>
                          </td>
                          <td
                            className={`py-3 px-4 text-right font-semibold ${
                              transaction.type === 'income'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {transaction.type === 'income' ? '+' : '-'}৳{transaction.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-slate-500 text-center py-8">এই মাসে কোন লেনদেন নেই</p>
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
