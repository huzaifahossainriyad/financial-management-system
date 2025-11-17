'use client'

import { Card } from '@/components/ui/card'
import { Lightbulb, TrendingUp, PiggyBank, Zap, Heart, Brain } from 'lucide-react'
import { motion } from 'framer-motion'

interface Tip {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  savings: string
}

const TIPS: Tip[] = [
  {
    id: 1,
    title: 'Track Every Expense',
    description: 'Keep a detailed record of all your spending. This helps identify unnecessary expenses and areas where you can cut back.',
    icon: <TrendingUp className="w-6 h-6" />,
    category: 'Tracking',
    difficulty: 'easy',
    savings: '5-10% monthly',
  },
  {
    id: 2,
    title: 'Use the 50/30/20 Rule',
    description: 'Allocate 50% of income to needs, 30% to wants, and 20% to savings. This balanced approach ensures financial stability.',
    icon: <Brain className="w-6 h-6" />,
    category: 'Budgeting',
    difficulty: 'easy',
    savings: '20% of income',
  },
  {
    id: 3,
    title: 'Automate Your Savings',
    description: 'Set up automatic transfers to a savings account. Out of sight, out of mind - you\'ll save without thinking about it.',
    icon: <Zap className="w-6 h-6" />,
    category: 'Automation',
    difficulty: 'easy',
    savings: '10-15% monthly',
  },
  {
    id: 4,
    title: 'Cut Subscription Services',
    description: 'Review all subscriptions and cancel unused ones. Many people pay for services they don\'t actively use.',
    icon: <PiggyBank className="w-6 h-6" />,
    category: 'Spending',
    difficulty: 'easy',
    savings: '500-2000 BDT/month',
  },
  {
    id: 5,
    title: 'Cook at Home',
    description: 'Prepare meals at home instead of eating out. Home-cooked meals are healthier and significantly cheaper.',
    icon: <Heart className="w-6 h-6" />,
    category: 'Lifestyle',
    difficulty: 'medium',
    savings: '3000-5000 BDT/month',
  },
  {
    id: 6,
    title: 'Build an Emergency Fund',
    description: 'Save 3-6 months of expenses in an emergency fund. This prevents debt when unexpected costs arise.',
    icon: <Lightbulb className="w-6 h-6" />,
    category: 'Planning',
    difficulty: 'hard',
    savings: 'Prevents debt',
  },
]

export default function TipsPage() {
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800'
      case 'medium':
        return 'from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 border-yellow-200 dark:border-yellow-800'
      case 'hard':
        return 'from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-red-200 dark:border-red-800'
      default:
        return 'from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800'
    }
  }

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
      case 'hard':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Tracking: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
      Budgeting: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
      Automation: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300',
      Spending: 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300',
      Lifestyle: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
      Planning: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300',
    }
    return colors[category] || 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
  }

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Money-Saving Tips
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Expert advice to help you save more and spend wisely
          </p>
        </div>
      </motion.div>

      {/* Tips Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {TIPS.map((tip) => (
          <motion.div
            key={tip.id}
            variants={cardVariants}
            whileHover="hover"
          >
            <Card className={`p-6 bg-gradient-to-br ${getDifficultyColor(tip.difficulty)} shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col`}>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <motion.div
                  className="p-3 bg-white dark:bg-slate-800 rounded-lg"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {tip.icon}
                </motion.div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyBadgeColor(tip.difficulty)}`}>
                  {tip.difficulty.charAt(0).toUpperCase() + tip.difficulty.slice(1)}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {tip.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 flex-grow">
                {tip.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(tip.category)}`}>
                  {tip.category}
                </span>
                <motion.span
                  className="text-sm font-bold text-slate-900 dark:text-white"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💰 {tip.savings}
                </motion.span>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants}>
        <Card className="p-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 border-indigo-200 dark:border-indigo-800 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            💡 Key Insights
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="text-center">
                <motion.p
                  className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  20%
                </motion.p>
                <p className="text-slate-700 dark:text-slate-300">
                  Average savings with budgeting
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="text-center">
                <motion.p
                  className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                >
                  6 months
                </motion.p>
                <p className="text-slate-700 dark:text-slate-300">
                  Recommended emergency fund
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="text-center">
                <motion.p
                  className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                >
                  50/30/20
                </motion.p>
                <p className="text-slate-700 dark:text-slate-300">
                  Ideal budget allocation
                </p>
              </div>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
