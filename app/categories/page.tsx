'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Edit2, Trash2, Plus } from 'lucide-react'
import { useState } from 'react'

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 1, name: 'খাবার', type: 'expense', color: '#FF6B6B', icon: '🍔', transactions: 2 },
    { id: 2, name: 'পরিবহন', type: 'expense', color: '#4ECDC4', icon: '🚗', transactions: 0 },
    { id: 3, name: 'বিনোদন', type: 'expense', color: '#FFE66D', icon: '🎬', transactions: 0 },
    { id: 4, name: 'স্বাস্থ্য', type: 'expense', color: '#95E1D3', icon: '⚕️', transactions: 0 },
    { id: 5, name: 'শিক্ষা', type: 'expense', color: '#A8E6CF', icon: '📚', transactions: 0 },
    { id: 6, name: 'অন্যান্য', type: 'expense', color: '#C7CEEA', icon: '📌', transactions: 1 },
  ]

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              🏷️ ক্যাটাগরি
            </h1>
            <p className="text-muted-foreground mt-2">আপনার ক্যাটাগরি পরিচালনা করুন - Created by <strong>RIYAD HOSSAIN HUZAIFA</strong></p>
          </div>
          <Button className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            নতুন ক্যাটাগরি
          </Button>
        </div>

        {/* Search */}
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="ক্যাটাগরি খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <Card key={category.id} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                          style={{ backgroundColor: category.color + '20' }}
                        >
                          {category.icon}
                        </div>
                        <div>
                          <p className="font-bold text-lg">{category.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {category.type === 'expense' ? 'খরচ' : 'আয়'}
                          </p>
                        </div>
                      </div>
                      <div
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: category.color }}
                      />
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <p className="text-sm text-muted-foreground">লেনদেন</p>
                      <p className="font-bold">{category.transactions}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
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
            ))
          ) : (
            <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-0 shadow-lg col-span-full">
              <CardContent className="pt-12 pb-12 text-center">
                <p className="text-lg text-muted-foreground">কোনো ক্যাটাগরি পাওয়া যায়নি</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground py-4">
          <p>© 2025 Financial Management System - Created by <strong>RIYAD HOSSAIN HUZAIFA</strong></p>
        </div>
      </div>
    </div>
  )
}
