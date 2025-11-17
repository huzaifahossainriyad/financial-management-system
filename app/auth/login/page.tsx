'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Simple validation
      if (!email || !password) {
        setError('ইমেইল এবং পাসওয়ার্ড উভয়ই প্রয়োজন')
        setLoading(false)
        return
      }

      if (password.length < 6) {
        setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে')
        setLoading(false)
        return
      }

      // Store login info in localStorage
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userEmail', email)
      localStorage.setItem('userName', email.split('@')[0])

      // Redirect to dashboard
      router.push('/')
    } catch (err) {
      setError('লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">💰</div>
          <h1 className="text-4xl font-bold text-white mb-2">আর্থিক ব্যবস্থাপনা</h1>
          <p className="text-blue-100">Financial Management System</p>
        </div>

        {/* Login Card */}
        <Card className="bg-white/95 dark:bg-slate-900/95 backdrop-blur border-0 shadow-2xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-center">লগইন করুন</CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              আপনার অ্যাকাউন্টে প্রবেশ করুন
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">ইমেইল</label>
                <input
                  type="email"
                  placeholder="আপনার ইমেইল প্রবেশ করুন"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">পাসওয়ার্ড</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="আপনার পাসওয়ার্ড প্রবেশ করুন"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all"
              >
                {loading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
              </Button>

              {/* Demo Credentials */}
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">📝 ডেমো অ্যাকাউন্ট:</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">ইমেইল: demo@example.com</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">পাসওয়ার্ড: demo123</p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/80 text-sm">
            © 2025 Financial Management System
          </p>
          <p className="text-white/60 text-xs mt-1">
            Created by <strong>RIYAD HOSSAIN HUZAIFA</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
