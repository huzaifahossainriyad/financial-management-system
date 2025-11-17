/**
 * Financial Management System - Budgets
 * Created by: Riyad Hossain Huzaifa
 * Date: November 2025
 * 
 * Budgets Page
 * Create and manage monthly budgets
 */

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { Plus, Trash2, AlertTriangle } from "lucide-react";

interface Budget {
  id: string;
  name: string;
  limit: number;
  spent: number;
  categoryId: string;
  category?: {
    name: string;
    emoji: string;
  };
}

interface Category {
  id: string;
  name: string;
  emoji: string;
  type: "income" | "expense";
}

export default function BudgetsPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    limit: "",
    categoryId: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [budRes, catRes] = await Promise.all([
        fetch("/api/budgets"),
        fetch("/api/categories"),
      ]);
      const budgets = await budRes.json();
      const categories = await catRes.json();
      setBudgets(budgets);
      setCategories(categories.filter((c: Category) => c.type === "expense"));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.limit || !formData.categoryId) return;

    try {
      const response = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          limit: parseFloat(formData.limit),
        }),
      });

      if (response.ok) {
        setFormData({ name: "", limit: "", categoryId: "" });
        fetchData();
      }
    } catch (error) {
      console.error("Error adding budget:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/budgets/${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const budgetPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4 md:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-bold text-foreground mb-2">{t.budgets}</h1>
          <p className="text-muted-foreground">{t.manageBudgets}</p>
        </motion.div>

        {/* Overview Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" variants={itemVariants}>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">{t.totalBudget}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                ৳{totalBudget.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="text-orange-700 dark:text-orange-300">{t.spent}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                ৳{totalSpent.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="text-purple-700 dark:text-purple-300">{t.percentage}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {budgetPercentage.toFixed(1)}%
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{t.addBudget}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label>{t.budgetName}</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.enterBudgetName}
                    />
                  </div>

                  <div>
                    <Label>{t.category}</Label>
                    <Select value={formData.categoryId} onValueChange={(value) => setFormData({ ...formData, categoryId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.selectCategory} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.emoji} {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>{t.limit}</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.limit}
                      onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    {t.add}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Budgets List */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t.yourBudgets}</CardTitle>
                <CardDescription>{t.trackYourBudgets}</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-muted-foreground">{t.loading}</p>
                ) : budgets.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">{t.noBudgets}</p>
                ) : (
                  <div className="space-y-4">
                    {budgets.map((budget, index) => {
                      const percentage = (budget.spent / budget.limit) * 100;
                      const isOverBudget = budget.spent > budget.limit;

                      return (
                        <motion.div
                          key={budget.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`p-4 rounded-lg border ${
                            isOverBudget
                              ? "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
                              : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold">{budget.category?.emoji} {budget.name}</p>
                              <p className="text-sm text-muted-foreground">{budget.category?.name}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(budget.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>৳{budget.spent.toLocaleString()} / ৳{budget.limit.toLocaleString()}</span>
                              <span className={isOverBudget ? "text-red-600 dark:text-red-400 font-semibold" : ""}>
                                {percentage.toFixed(1)}%
                              </span>
                            </div>
                            <Progress value={Math.min(percentage, 100)} className="h-2" />
                            {isOverBudget && (
                              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mt-2">
                                <AlertTriangle className="w-4 h-4" />
                                <span>{t.overBudget}: ৳{(budget.spent - budget.limit).toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
