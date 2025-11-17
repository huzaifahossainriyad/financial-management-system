'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import { useState } from 'react'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'খাবার', type: 'expense', color: '#ef4444', icon: '🍔', count: 2 },
    { id: 2, name: 'পরিবহন', type: 'expense', color: '#f97316', icon: '🚗', count: 0 },
    { id: 3, name: 'বিনোদন', type: 'expense', color: '#eab308', icon: '🎬', count: 0 },
    { id: 4, name: 'স্বাস্থ্য', type: 'expense', color: '#22c55e', icon: '⚕️', count: 0 },
    { id: 5, name: 'শিক্ষা', type: 'expense', color: '#3b82f6', icon: '📚', count: 0 },
    { id: 6, name: 'অন্যান্য', type: 'expense', color: '#8b5cf6', icon: '📌', count: 1 },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredCategories = categories.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || cat.type === filterType
    return matchesSearch && matchesType
  })

  const expenseCategories = categories.filter(c => c.type === 'expense')
  const incomeCategories = categories.filter(c => c.type === 'income')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🏷️ ক্যাটাগরি ব্যবস্থাপনা
            </h1>
            <p className="text-muted-foreground mt-2">আপনার লেনদেন ক্যাটাগরি তৈরি এবং পরিচালনা করুন</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            নতুন ক্যাটাগরি
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">মোট ক্যাটাগরি</p>
              <p className="text-3xl font-bold mt-2">{categories.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">খরচ ক্যাটাগরি</p>
              <p className="text-3xl font-bold mt-2 text-red-600">{expenseCategories.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">আয় ক্যাটাগরি</p>
              <p className="text-3xl font-bold mt-2 text-green-600">{incomeCategories.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
          <CardHeader>
            <CardTitle>অনুসন্ধান এবং ফিল্টার</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="ক্যাটাগরি খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors"
              >
                <option value="all">সব ধরনের</option>
                <option value="income">আয়</option>
                <option value="expense">খরচ</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Categories Grid */}
        <div className="space-y-6">
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="group relative"
                >
                  <div
                    className="absolute inset-0 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition duration-1000"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <Card className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur border-0 shadow-lg hover:shadow-2xl transition-all transform group-hover:scale-105">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-5xl">{category.icon}</div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">ক্যাটাগরি নাম</p>
                          <p className="text-xl font-bold text-foreground">{category.name}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">ধরন</p>
                            <p className={`font-semibold ${
                              category.type === 'expense' ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {category.type === 'expense' ? 'খরচ' : 'আয়'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">লেনদেন</p>
                            <p className="text-lg font-bold">{category.count}</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded"
                              style={{ backgroundColor: category.color }}
                            ></div>
                            <span className="text-xs text-muted-foreground">{category.color}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="pt-12 pb-12 text-center">
                <p className="text-lg text-muted-foreground">কোনো ক্যাটাগরি পাওয়া যায়নি</p>
                <p className="text-sm text-muted-foreground mt-2">নতুন ক্যাটাগরি যোগ করতে উপরের বোতাম ক্লিক করুন</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
