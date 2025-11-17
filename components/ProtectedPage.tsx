'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
      
      if (!loggedIn) {
        router.push('/auth/login')
      } else {
        setIsLoggedIn(true)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <div className="text-6xl mb-4">💰</div>
          <p className="text-lg text-muted-foreground">লোড হচ্ছে...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return null
  }

  return <>{children}</>
}
