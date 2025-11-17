'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash2 } from 'lucide-react'

interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  emoji: string
  color: string
}

const EMOJIS = ['🍔', '🚗', '🏠', '💊', '📚', '🎮', '✈️', '🎬']
const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'indigo', 'cyan']

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense',
    emoji: EMOJIS[0],
    color: COLORS[0],
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setFormData({
          name: '',
          type: 'expense',
          emoji: EMOJIS[0],
          color: COLORS[0],
        })
        fetchCategories()
      }
    } catch (error) {
      console.error('Error adding category:', error)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      await fetch(`/api/categories/${id}`, { method: 'DELETE' })
      fetchCategories()
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  const expenseCategories = categories.filter((c) => c.type === 'expense')
  const incomeCategories = categories.filter((c) => c.type === 'income')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">🏷️ ক্যাটাগরি</h1>
          <p className="text-muted-foreground">আপনার লেনদেন ক্যাটাগরি পরিচালনা করুন</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Category Form */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>নতুন ক্যাটাগরি</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div>
                  <Label>নাম</Label>
                  <Input
                    placeholder="ক্যাটাগরির নাম"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label>ধরন</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as 'income' | 'expense' })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">আয়</SelectItem>
                      <SelectItem value="expense">খরচ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>ইমোজি</Label>
                  <Select value={formData.emoji} onValueChange={(value) => setFormData({ ...formData, emoji: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {EMOJIS.map((emoji) => (
                        <SelectItem key={emoji} value={emoji}>
                          {emoji}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>রঙ</Label>
                  <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COLORS.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  যোগ করুন
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Categories List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>সমস্ত ক্যাটাগরি</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">লোড হচ্ছে...</p>
              ) : categories.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">এখনও কোনো ক্যাটাগরি নেই</p>
              ) : (
                <div className="space-y-4">
                  {expenseCategories.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">খরচ ক্যাটাগরি</h3>
                      <div className="space-y-2">
                        {expenseCategories.map((category) => (
                          <div key={category.id} className="flex items-center justify-between p-3 rounded-lg border bg-red-50 dark:bg-red-950">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{category.emoji}</span>
                              <span className="font-medium">{category.name}</span>
                            </div>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="p-1 hover:bg-red-200 dark:hover:bg-red-800 rounded"
                            >
                              <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {incomeCategories.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">আয় ক্যাটাগরি</h3>
                      <div className="space-y-2">
                        {incomeCategories.map((category) => (
                          <div key={category.id} className="flex items-center justify-between p-3 rounded-lg border bg-green-50 dark:bg-green-950">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{category.emoji}</span>
                              <span className="font-medium">{category.name}</span>
                            </div>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="p-1 hover:bg-green-200 dark:hover:bg-green-800 rounded"
                            >
                              <Trash2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
