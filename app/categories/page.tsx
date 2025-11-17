'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  color?: string
  icon?: string
}

const COLORS = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-cyan-500',
]

const ICONS = ['🍔', '🚗', '🏠', '💼', '🎬', '📚', '⚕️', '✈️']

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense' as 'income' | 'expense',
    color: COLORS[0],
    icon: ICONS[0],
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

  const handleSubmit = async (e: React.FormEvent) => {
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
          color: COLORS[0],
          icon: ICONS[0],
        })
        setShowForm(false)
        fetchCategories()
      }
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('আপনি কি এই ক্যাটাগরি মুছতে চান?')) {
      try {
        await fetch(`/api/categories/${id}`, { method: 'DELETE' })
        fetchCategories()
      } catch (error) {
        console.error('Error deleting category:', error)
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  }

  const expenseCategories = categories.filter(c => c.type === 'expense')
  const incomeCategories = categories.filter(c => c.type === 'income')

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        className="flex justify-between items-center"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            ক্যাটাগরি
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            আপনার লেনদেন সংগঠিত করুন
          </p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm)
            setFormData({
              name: '',
              type: 'expense',
              color: COLORS[0],
              icon: ICONS[0],
            })
          }}
          className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          ক্যাটাগরি যোগ করুন
        </Button>
      </motion.div>

      {/* Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    ক্যাটাগরির নাম
                  </label>
                  <Input
                    type="text"
                    placeholder="যেমন: খাবার"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    ধরন
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as 'income' | 'expense',
                      })
                    }
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="expense">খরচ</option>
                    <option value="income">আয়</option>
                  </select>
                </div>

                {/* Icon */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    আইকন
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    {ICONS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    রঙ
                  </label>
                  <select
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    {COLORS.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  বাতিল করুন
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:scale-105 transition-transform duration-300"
                >
                  সংরক্ষণ করুন
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      {/* Loading State */}
      {loading ? (
        <motion.div
          className="text-center py-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-slate-600 dark:text-slate-400">ক্যাটাগরি লোড হচ্ছে...</p>
        </motion.div>
      ) : (
        <>
          {/* Expense Categories */}
          {expenseCategories.length > 0 && (
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                খরচের ক্যাটাগরি
              </h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
              >
                {expenseCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    variants={cardVariants}
                    whileHover="hover"
                    custom={index}
                  >
                    <Card className={`p-6 ${category.color || 'bg-slate-500'} text-white shadow-lg hover:shadow-xl transition-all duration-300 group relative h-full`}>
                      {/* Delete Button */}
                      <motion.button
                        onClick={() => handleDelete(category.id)}
                        className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/30 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>

                      {/* Icon */}
                      <motion.div
                        className="text-5xl mb-4"
                        animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {category.icon}
                      </motion.div>

                      {/* Name */}
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <motion.p
                        className="text-sm opacity-90"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        খরচ
                      </motion.p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Income Categories */}
          {incomeCategories.length > 0 && (
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                আয়ের ক্যাটাগরি
              </h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
              >
                {incomeCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    variants={cardVariants}
                    whileHover="hover"
                    custom={index}
                  >
                    <Card className={`p-6 ${category.color || 'bg-slate-500'} text-white shadow-lg hover:shadow-xl transition-all duration-300 group relative h-full`}>
                      {/* Delete Button */}
                      <motion.button
                        onClick={() => handleDelete(category.id)}
                        className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/30 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>

                      {/* Icon */}
                      <motion.div
                        className="text-5xl mb-4"
                        animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {category.icon}
                      </motion.div>

                      {/* Name */}
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <motion.p
                        className="text-sm opacity-90"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        আয়
                      </motion.p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Empty State */}
          {categories.length === 0 && (
            <motion.div
              className="text-center py-8"
              variants={itemVariants}
            >
              <p className="text-slate-600 dark:text-slate-400">
                এখনও কোনো ক্যাটাগরি নেই। প্রথম ক্যাটাগরি যোগ করুন!
              </p>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  )
}
