'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'
import ProtectedPage from '@/components/ProtectedPage'

interface Category {
  id: string
  name: string
  icon: string
  color: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    icon: '🏷️',
    color: '#3b82f6',
  })

  const defaultCategories: Category[] = [
    { id: '1', name: 'খাদ্য', icon: '🍔', color: '#f97316' },
    { id: '2', name: 'পরিবহন', icon: '🚗', color: '#06b6d4' },
    { id: '3', name: 'বিনোদন', icon: '🎬', color: '#ec4899' },
    { id: '4', name: 'স্বাস্থ্য', icon: '⚕️', color: '#10b981' },
    { id: '5', name: 'শিক্ষা', icon: '📚', color: '#8b5cf6' },
  ]

  useEffect(() => {
    const saved = localStorage.getItem('categories')
    if (saved) {
      setCategories(JSON.parse(saved))
    } else {
      setCategories(defaultCategories)
      localStorage.setItem('categories', JSON.stringify(defaultCategories))
    }
  }, [])

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) return

    const newCategory: Category = {
      id: Date.now().toString(),
      name: formData.name,
      icon: formData.icon,
      color: formData.color,
    }

    const updated = [...categories, newCategory]
    setCategories(updated)
    localStorage.setItem('categories', JSON.stringify(updated))

    setFormData({ name: '', icon: '🏷️', color: '#3b82f6' })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    const updated = categories.filter((c) => c.id !== id)
    setCategories(updated)
    localStorage.setItem('categories', JSON.stringify(updated))
  }

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">🏷️ ক্যাটাগরি</h1>
                <p className="text-slate-600">আপনার খরচের ক্যাটাগরি পরিচালনা করুন - Created by RIYAD HOSSAIN HUZAIFA</p>
              </div>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                নতুন ক্যাটাগরি
              </Button>
            </div>
          </div>

          {/* Add Category Form */}
          {showForm && (
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg mb-8">
              <CardHeader>
                <CardTitle>নতুন ক্যাটাগরি যোগ করুন</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddCategory} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">নাম</label>
                      <input
                        type="text"
                        placeholder="ক্যাটাগরির নাম"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">আইকন</label>
                      <input
                        type="text"
                        placeholder="ইমোজি"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">রঙ</label>
                      <input
                        type="color"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">
                      যোগ করুন
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                    >
                      বাতিল
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-4xl">{category.icon}</div>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{category.name}</h3>
                  <div
                    className="w-full h-2 rounded-full mt-4"
                    style={{ backgroundColor: category.color }}
                  ></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-muted-foreground border-t mt-12 bg-white/50">
        <p>© 2025 Financial Management System - Created by <strong>RIYAD HOSSAIN HUZAIFA</strong></p>
      </footer>
    </ProtectedPage>
  )
}
