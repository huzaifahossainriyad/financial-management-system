'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2, Target, Zap, Award } from 'lucide-react'
import { motion } from 'framer-motion'

interface Goal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: 'savings',
  })

  useEffect(() => {
    // Load goals from localStorage
    const savedGoals = localStorage.getItem('financial-goals')
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals))
    }
    setLoading(false)
  }, [])

  const saveGoals = (newGoals: Goal[]) => {
    setGoals(newGoals)
    localStorage.setItem('financial-goals', JSON.stringify(newGoals))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newGoal: Goal = {
      id: Date.now().toString(),
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount),
      deadline: formData.deadline,
      category: formData.category,
    }
    saveGoals([...goals, newGoal])
    setFormData({
      name: '',
      targetAmount: '',
      currentAmount: '',
      deadline: '',
      category: 'savings',
    })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      saveGoals(goals.filter((g) => g.id !== id))
    }
  }

  const handleUpdateProgress = (id: string, newAmount: number) => {
    const updated = goals.map((g) =>
      g.id === id ? { ...g, currentAmount: newAmount } : g
    )
    saveGoals(updated)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getDaysRemaining = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diff = deadlineDate.getTime() - today.getTime()
    const days = Math.ceil(diff / (1000 * 3600 * 24))
    return days
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
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  }

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
            Financial Goals
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Set and track your financial objectives
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          Add Goal
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
                {/* Goal Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Goal Name
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Emergency Fund"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="savings">Savings</option>
                    <option value="investment">Investment</option>
                    <option value="vacation">Vacation</option>
                    <option value="education">Education</option>
                    <option value="home">Home</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Target Amount */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Target Amount
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={formData.targetAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, targetAmount: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Current Amount */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Current Amount
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={formData.currentAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, currentAmount: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                {/* Deadline */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Deadline
                  </label>
                  <Input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData({ ...formData, deadline: e.target.value })
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
                  onClick={() => setShowForm(false)}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:scale-105 transition-transform duration-300"
                >
                  Save Goal
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      {/* Goals List */}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      ) : goals.length === 0 ? (
        <motion.div variants={itemVariants}>
          <Card className="p-12 text-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 shadow-lg">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-4"
            >
              <Target className="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto" />
            </motion.div>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              No goals yet. Start by creating your first financial goal!
            </p>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          className="space-y-4"
          variants={containerVariants}
        >
          {goals.map((goal) => {
            const percentage = getProgressPercentage(goal.currentAmount, goal.targetAmount)
            const daysRemaining = getDaysRemaining(goal.deadline)
            const isCompleted = percentage >= 100
            const isOverdue = daysRemaining < 0

            return (
              <motion.div
                key={goal.id}
                variants={cardVariants}
                whileHover="hover"
              >
                <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {goal.name}
                        </h3>
                        {isCompleted && (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Award className="w-5 h-5 text-yellow-500" />
                          </motion.div>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
                      </p>
                    </div>
                    <motion.button
                      onClick={() => handleDelete(goal.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                      </span>
                      <motion.span
                        className="text-sm font-bold text-slate-900 dark:text-white"
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {Math.round(percentage)}%
                      </motion.span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${
                          isCompleted
                            ? 'from-green-500 to-emerald-600'
                            : 'from-blue-500 to-indigo-600'
                        } rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <motion.div
                          className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ✓ Completed
                        </motion.div>
                      ) : isOverdue ? (
                        <div className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
                          ⚠️ Overdue
                        </div>
                      ) : (
                        <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                          {daysRemaining} days left
                        </div>
                      )}
                    </div>
                    <motion.button
                      onClick={() => {
                        const newAmount = goal.currentAmount + (goal.targetAmount * 0.1)
                        handleUpdateProgress(goal.id, Math.min(newAmount, goal.targetAmount))
                      }}
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-all duration-300 flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Zap className="w-3 h-3" />
                      Add 10%
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </motion.div>
  )
}
