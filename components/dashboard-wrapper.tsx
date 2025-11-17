/**
 * Dashboard Wrapper Component
 * 
 * This wrapper ensures Dashboard is only rendered on the client side
 * to avoid hydration mismatches with the LanguageProvider context
 */

'use client'

import { Dashboard } from './dashboard'
import { useEffect, useState } from 'react'

export function DashboardWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <Dashboard />
}
