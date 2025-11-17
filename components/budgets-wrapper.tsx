/**
 * Budgets Wrapper Component
 * 
 * This wrapper ensures Budgets page is only rendered on the client side
 * to avoid hydration mismatches with the LanguageProvider context
 */

'use client'

import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/translations'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

interface Budget {
  id: string
  category: string
  limit: number
  spent: number
  remaining: number
  month: number
  year: number
}

export function BudgetsWrapper() {
  const { language } = useLanguage()
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    category: '',
    limit: '',
  })

  // Get current month and year
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear()

  // Fetch budgets
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await fetch('/api/budgets')
        if (response.ok) {
          const data = await response.json()
          setBudgets(data)
        }
      } catch (error) {
        console.error('Error fetching budgets:', error)
        toast.error(t(language, 'common.error'))
      } finally {
        setLoading(false)
      }
    }

    fetchBudgets()
  }, [language])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.category || !formData.limit) {
      toast.error(t(language, 'common.error'))
      return
    }

    try {
      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: formData.category,
          limit: parseFloat(formData.limit),
          month: currentMonth,
          year: currentYear,
        }),
      })

      if (response.ok) {
        const newBudget = await response.json()
        setBudgets([...budgets, newBudget])
        setFormData({
          category: '',
          limit: '',
        })
        setDialogOpen(false)
        toast.success(t(language, 'common.success'))
      }
    } catch (error) {
      console.error('Error creating budget:', error)
      toast.error(t(language, 'common.error'))
    }
  }

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm(t(language, 'common.confirmDelete'))) return

    try {
      const response = await fetch(`/api/budgets/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setBudgets(budgets.filter((budget) => budget.id !== id))
        toast.success(t(language, 'common.success'))
      }
    } catch (error) {
      console.error('Error deleting budget:', error)
      toast.error(t(language, 'common.error'))
    }
  }

  // Calculate progress percentage
  const getProgressPercentage = (spent: number, limit: number) => {
    return Math.min((spent / limit) * 100, 100)
  }

  // Get progress color
  const getProgressColor = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100
    if (percentage >= 100) return 'bg-red-500'
    if (percentage >= 80) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t(language, 'budgets.title')}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {language === 'bn' ? `${currentMonth} মাস, ${currentYear}` : `${currentMonth}/${currentYear}`}
          </p>
        </div>
        
        {/* Add Budget Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {t(language, 'budgets.addNew')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t(language, 'budgets.addNew')}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t(language, 'budgets.category')}
                </label>
                <Input
                  type="text"
                  placeholder={t(language, 'budgets.category')}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>

              {/* Limit */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t(language, 'budgets.limit')}
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.limit}
                  onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                  required
                />
              </div>

              {/* Submit */}
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  {t(language, 'common.cancel')}
                </Button>
                <Button type="submit">
                  {t(language, 'common.save')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Budgets List */}
      {loading ? (
        <p className="text-muted-foreground">{t(language, 'common.loading')}</p>
      ) : budgets.length === 0 ? (
        <p className="text-muted-foreground">{t(language, 'budgets.noBudgets')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgets.map((budget) => {
            const percentage = getProgressPercentage(budget.spent, budget.limit)
            const progressColor = getProgressColor(budget.spent, budget.limit)

            return (
              <Card key={budget.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{budget.category}</h3>
                  <button
                    onClick={() => handleDelete(budget.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      ৳{budget.spent.toFixed(2)} / ৳{budget.limit.toFixed(2)}
                    </span>
                    <span className="text-sm font-medium">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${progressColor}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                {/* Remaining */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {t(language, 'budgets.remaining')}
                  </span>
                  <span className={`font-semibold ${budget.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ৳{budget.remaining.toFixed(2)}
                  </span>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
