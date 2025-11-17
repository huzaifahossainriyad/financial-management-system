/**
 * Financial Management System - Translations
 * Created by: Riyad Hossain Huzaifa
 * Date: November 2025
 * 
 * Bilingual Translation System
 * Complete Bengali-English translations for the entire application
 */

export type Language = 'en' | 'bn'

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    transactions: 'Transactions',
    categories: 'Categories',
    budgets: 'Budgets',
    analytics: 'Analytics',
    reports: 'Reports',
    goals: 'Goals',
    tips: 'Tips',

    // Dashboard
    totalIncome: 'Total Income',
    totalExpense: 'Total Expense',
    balance: 'Balance',
    spendingTrend: 'Spending Trend',
    monthlyTarget: 'Monthly Target',
    savingsRate: 'Savings Rate',
    lastUpdated: 'Last Updated',
    budgetSummary: 'Budget Summary',
    alerts: 'Alerts',
    quickStats: 'Quick Stats',
    recentTransactions: 'Recent Transactions',
    allYourTransactions: 'All your transactions',
    noTransactions: 'No transactions yet',
    loading: 'Loading...',

    // Transactions
    manageTransactions: 'Manage your income and expenses',
    addTransaction: 'Add Transaction',
    income: 'Income',
    expense: 'Expense',
    type: 'Type',
    category: 'Category',
    description: 'Description',
    enterDescription: 'Enter description',
    amount: 'Amount',
    date: 'Date',
    add: 'Add',
    selectCategory: 'Select a category',

    // Categories
    manageCategories: 'Manage your transaction categories',
    addCategory: 'Add Category',
    name: 'Name',
    enterCategoryName: 'Enter category name',
    emoji: 'Emoji',
    color: 'Color',
    expenseCategories: 'Expense Categories',
    incomeCategories: 'Income Categories',
    noCategories: 'No categories yet',

    // Budgets
    manageBudgets: 'Create and manage your monthly budgets',
    addBudget: 'Add Budget',
    budgetName: 'Budget Name',
    enterBudgetName: 'Enter budget name',
    limit: 'Limit',
    totalBudget: 'Total Budget',
    spent: 'Spent',
    percentage: 'Percentage',
    yourBudgets: 'Your Budgets',
    trackYourBudgets: 'Track your budgets',
    noBudgets: 'No budgets yet',
    overBudget: 'Over Budget',
  },
  bn: {
    // Navigation
    dashboard: 'ড্যাশবোর্ড',
    transactions: 'লেনদেন',
    categories: 'ক্যাটাগরি',
    budgets: 'বাজেট',
    analytics: 'বিশ্লেষণ',
    reports: 'রিপোর্ট',
    goals: 'লক্ষ্য',
    tips: 'টিপস',

    // Dashboard
    totalIncome: 'মোট আয়',
    totalExpense: 'মোট খরচ',
    balance: 'ব্যালেন্স',
    spendingTrend: 'খরচের প্রবণতা',
    monthlyTarget: 'মাসিক লক্ষ্য',
    savingsRate: 'সঞ্চয়ের হার',
    lastUpdated: 'সর্বশেষ আপডেট',
    budgetSummary: 'বাজেট সারসংক্ষেপ',
    alerts: 'সতর্কতা',
    quickStats: 'দ্রুত পরিসংখ্যান',
    recentTransactions: 'সাম্প্রতিক লেনদেন',
    allYourTransactions: 'আপনার সমস্ত লেনদেন',
    noTransactions: 'এখনও কোনো লেনদেন নেই',
    loading: 'লোড হচ্ছে...',

    // Transactions
    manageTransactions: 'আপনার আয় এবং খরচ পরিচালনা করুন',
    addTransaction: 'লেনদেন যোগ করুন',
    income: 'আয়',
    expense: 'খরচ',
    type: 'ধরন',
    category: 'ক্যাটাগরি',
    description: 'বর্ণনা',
    enterDescription: 'বর্ণনা লিখুন',
    amount: 'পরিমাণ',
    date: 'তারিখ',
    add: 'যোগ করুন',
    selectCategory: 'একটি ক্যাটাগরি নির্বাচন করুন',

    // Categories
    manageCategories: 'আপনার লেনদেন ক্যাটাগরি পরিচালনা করুন',
    addCategory: 'ক্যাটাগরি যোগ করুন',
    name: 'নাম',
    enterCategoryName: 'ক্যাটাগরির নাম লিখুন',
    emoji: 'ইমোজি',
    color: 'রঙ',
    expenseCategories: 'খরচ ক্যাটাগরি',
    incomeCategories: 'আয় ক্যাটাগরি',
    noCategories: 'এখনও কোনো ক্যাটাগরি নেই',

    // Budgets
    manageBudgets: 'আপনার মাসিক বাজেট তৈরি এবং পরিচালনা করুন',
    addBudget: 'বাজেট যোগ করুন',
    budgetName: 'বাজেটের নাম',
    enterBudgetName: 'বাজেটের নাম লিখুন',
    limit: 'সীমা',
    totalBudget: 'মোট বাজেট',
    spent: 'খরচ করা হয়েছে',
    percentage: 'শতাংশ',
    yourBudgets: 'আপনার বাজেট',
    trackYourBudgets: 'আপনার বাজেট ট্র্যাক করুন',
    noBudgets: 'এখনও কোনো বাজেট নেই',
    overBudget: 'বাজেট অতিক্রম',
  },
}
