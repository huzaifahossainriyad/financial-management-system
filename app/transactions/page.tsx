'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'

interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  color?: string
  icon?: string
}

interface Transaction {
  id: string
  name: string
  amount: number
  type: 'income' | 'expense'
  category: Category
  date: string
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    categoryId: '',
    date: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transRes, catRes] = await Promise.all([
          fetch('/api/transactions'),
          fetch('/api/categories'),
        ])
        const trans = await transRes.json()
        const cats = await catRes.json()
        setTransactions(trans)
        setCategories(cats)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      })

      if (response.ok) {
        setFormData({
          name: '',
          amount: '',
          type: 'expense',
          categoryId: '',
          date: new Date().toISOString().split('T')[0],
        })
        setShowForm(false)
        const res = await fetch('/api/transactions')
        const data = await res.json()
        setTransactions(data)
      }
    } catch (error) {
      console.error('Error creating transaction:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('আপনি কি এই লেনদেন মুছতে চান?')) {
      try {
        await fetch(`/api/transactions/${id}`, { method: 'DELETE' })
        const res = await fetch('/api/transactions')
        const data = await res.json()
        setTransactions(data)
      } catch (error) {
        console.error('Error deleting transaction:', error)
      }
    }
  }

  const filteredCategories = categories.filter(cat => cat.type === formData.type)

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
    hover: {
      x: 10,
      transition: { duration: 0.2 },
    },
  }

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

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
            লেনদেন
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            আপনার আয় এবং খরচ পরিচালনা করুন
          </p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm)
            setFormData({
              name: '',
              amount: '',
              type: 'expense',
              categoryId: '',
              date: new Date().toISOString().split('T')[0],
            })
          }}
          className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          লেনদেন যোগ করুন
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                  মোট আয়
                </p>
                <motion.p
                  className="text-3xl font-bold text-green-600 dark:text-green-400"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ৳{totalIncome.toLocaleString()}
                </motion.p>
              </div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <TrendingUp className="w-12 h-12 text-green-600 dark:text-green-400" />
              </motion.div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <Card className="p-6 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-red-200 dark:border-red-800 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700 dark:text-red-300 mb-1">
                  মোট খরচ
                </p>
                <motion.p
                  className="text-3xl font-bold text-red-600 dark:text-red-400"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                >
                  ৳{totalExpense.toLocaleString()}
                </motion.p>
              </div>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <TrendingDown className="w-12 h-12 text-red-600 dark:text-red-400" />
              </motion.div>
            </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    লেনদেনের নাম
                  </label>
                  <Input
                    type="text"
                    placeholder="যেমন: খাবার কেনা"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    পরিমাণ
                  </label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
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
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        type: e.target.value as 'income' | 'expense',
                        categoryId: '',
                      })
                    }}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="expense">খরচ</option>
                    <option value="income">আয়</option>
                  </select>
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
                    {filteredCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    তারিখ
                  </label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false)
                  }}
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

      {/* Transactions List */}
      {loading ? (
        <motion.div
          className="text-center py-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-slate-600 dark:text-slate-400">লেনদেন লোড হচ্ছে...</p>
        </motion.div>
      ) : transactions.length === 0 ? (
        <motion.div
          className="text-center py-8"
          variants={itemVariants}
        >
          <p className="text-slate-600 dark:text-slate-400">
            এখনও কোনো লেনদেন নেই। প্রথম লেনদেন যোগ করুন!
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="space-y-4"
          variants={containerVariants}
        >
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              variants={cardVariants}
              whileHover="hover"
              custom={index}
            >
              <Card className={`p-4 ${transaction.category?.color || 'bg-slate-100'} text-white shadow-lg hover:shadow-xl transition-all duration-300 group`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <motion.div
                      className="text-3xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {transaction.category?.icon || '📝'}
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-lg">{transaction.name}</h3>
                      <p className="text-sm opacity-90">
                        {transaction.category?.name} • {new Date(transaction.date).toLocaleDateString('bn-BD')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <motion.div
                      className="text-right"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <p className="text-2xl font-bold">
                        {transaction.type === 'income' ? '+' : '-'}৳{transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-xs opacity-90">
                        {transaction.type === 'income' ? 'আয়' : 'খরচ'}
                      </p>
                    </motion.div>

                    <motion.button
                      onClick={() => handleDelete(transaction.id)}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
