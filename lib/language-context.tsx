/**
 * Language Context Provider
 * 
 * This context manages the current language state across the entire application.
 * It allows any component to access and change the language without prop drilling.
 */

'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Language } from './translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

/**
 * Language Provider Component
 * Wraps the application to provide language context to all child components
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bn')) {
      setLanguageState(savedLanguage)
    }
    setMounted(true)
  }, [])

  // Update language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

/**
 * Hook to use language context
 * Must be used within a LanguageProvider
 */
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
