/**
 * Financial Management System - Dashboard Wrapper
 * Created by: Riyad Hossain Huzaifa
 * Date: November 2025
 * 
 * Dashboard Wrapper Component
 * Wraps dashboard content with animations and layout
 */

'use client'

import { motion } from 'framer-motion'
import DashboardContent from './dashboard-content'

export function DashboardWrapper() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">আর্থিক ড্যাশবোর্ড</h1>
          <p className="text-muted-foreground">আপনার আর্থিক অবস্থা এক নজরে দেখুন</p>
        </motion.div>

        <DashboardContent />
      </div>
    </motion.div>
  )
}
