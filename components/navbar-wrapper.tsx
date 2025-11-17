/**
 * Navbar Wrapper Component
 * 
 * This wrapper ensures Navbar is only rendered on the client side
 * to avoid hydration mismatches with the LanguageProvider context
 */

'use client'

import { Navbar } from './navbar'
import { useEffect, useState } from 'react'

export function NavbarWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <Navbar />
}
