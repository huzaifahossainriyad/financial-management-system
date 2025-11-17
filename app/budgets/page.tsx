'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2, AlertCircle, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  color?: string
  icon?: string
}

interface Budget {
  id: string
  name: string
  limit: number
  category: Category
  spent: number
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    limit: '',
    categoryId: '',
  })

  useEffect(() => {
    fetchBudgets()
    fetchCategories()
  }, [])

  const fetchBudgets = async () => {
    try {
      const response = await fetch('/api/budgets')
      const data = await response.json()
      setBudgets(data)
    } catch (error) {
      console.error('Error fetching budgets:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data.filter((cat: Category) => cat.type === 'expense'))
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          limit: parseFloat(formData.limit),
        }),
      })

      if (response.ok) {
        setFormData({
          name: '',
          limit: '',
          categoryId: '',
        })
        setShowForm(false)
        fetchBudgets()
      }
    } catch (error) {
      console.error('Error creating budget:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('আপনি কি এই বাজেট মুছতে চান?')) {
      try {
        await fetch(`/api/budgets/${id}`, { method: 'DELETE' })
        fetchBudgets()
      } catch (error) {
        console.error('Error deleting budget:', error)
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

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)
  const percentageUsed = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0

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
            বাজেট
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            আপনার খরচের সীমা নির্ধারণ এবং ট্র্যাক করুন
          </p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm)
            setFormData({
              name: '',
              limit: '',
              categoryId: '',
            })
          }}
          className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          বাজেট যোগ করুন
        </Button>
      </motion.div>

      {/* Overall Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800 shadow-lg">
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
              মোট বাজেট
            </p>
            <motion.p
              className="text-3xl font-bold text-blue-600 dark:text-blue-400"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ৳{totalBudget.toLocaleString()}
            </motion.p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-orange-200 dark:border-orange-800 shadow-lg">
            <p className="text-sm font-medium text-orange-700 dark:text-orange-300 mb-2">
              মোট খরচ
            </p>
            <motion.p
              className="text-3xl font-bold text-orange-600 dark:text-orange-400"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
            >
              ৳{totalSpent.toLocaleString()}
            </motion.p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }}>
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-pink-800 shadow-lg">
            <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">
              ব্যবহৃত শতাংশ
            </p>
            <motion.p
              className="text-3xl font-bold text-purple-600 dark:text-purple-400"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            >
              {percentageUsed.toFixed(1)}%
            </motion.p>
          </Card>
        </motion.div>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    বাজেটের নাম
                  </label>
                  <Input
                    type="text"
                    placeholder="যেমন: মাসিক খাবার"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Limit */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    বাজেটের সীমা
                  </label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.limit}
                    onChange={(e) =>
                      setFormData({ ...formData, limit: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    ক্যাটাগরি
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  >
                    <option value="">ক্যাটাগরি নির্বাচন করুন</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
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

      {/* Budgets List */}
      {loading ? (
        <motion.div
          className="text-center py-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-slate-600 dark:text-slate-400">বাজেট লোড হচ্ছে...</p>
        </motion.div>
      ) : budgets.length === 0 ? (
        <motion.div
          className="text-center py-8"
          variants={itemVariants}
        >
          <p className="text-slate-600 dark:text-slate-400">
            এখনও কোনো বাজেট নেই। প্রথম বাজেট যোগ করুন!
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {budgets.map((budget, index) => {
            const percentage = (budget.spent / budget.limit) * 100
            const isOverBudget = budget.spent > budget.limit
            const remaining = budget.limit - budget.spent

            return (
              <motion.div
                key={budget.id}
                variants={cardVariants}
                whileHover="hover"
                custom={index}
              >
                <Card className={`p-6 ${budget.category.color || 'bg-slate-100'} text-white shadow-lg hover:shadow-xl transition-all duration-300 group relative h-full`}>
                  {/* Delete Button */}
                  <motion.button
                    onClick={() => handleDelete(budget.id)}
                    className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/30 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>

                  {/* Icon */}
                  <motion.div
                    className="text-4xl mb-3"
                    animate={{ rotate: [0, 5, -5, 0], y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {budget.category.icon || '📊'}
                  </motion.div>

                  {/* Name */}
                  <h3 className="text-xl font-bold mb-2">{budget.name}</h3>
                  <p className="text-sm opacity-90 mb-4">{budget.category.name}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">অগ্রগতি</span>
                      <motion.span
                        className={`text-sm font-bold ${
                          isOverBudget ? 'text-red-200' : 'text-green-200'
                        }`}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {percentage.toFixed(0)}%
                      </motion.span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          isOverBudget
                            ? 'bg-red-400'
                            : percentage > 75
                            ? 'bg-yellow-400'
                            : 'bg-green-400'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>খরচ হয়েছে:</span>
                      <motion.span
                        className="font-bold"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ৳{budget.spent.toLocaleString()}
                      </motion.span>
                    </div>
                    <div className="flex justify-between">
                      <span>সীমা:</span>
                      <span className="font-bold">৳{budget.limit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-white/20">
                      <span>বাকি:</span>
                      <motion.span
                        className={`font-bold ${
                          isOverBudget ? 'text-red-200' : 'text-green-200'
                        }`}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                      >
                        {isOverBudget ? '-' : ''}৳{Math.abs(remaining).toLocaleString()}
                      </motion.span>
                    </div>
                  </div>

                  {/* Over Budget Warning */}
                  {isOverBudget && (
                    <motion.div
                      className="mt-4 p-3 bg-red-500/30 rounded-lg flex items-center gap-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-xs font-bold">বাজেট অতিক্রম করেছে!</span>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </motion.div>
  )
}
