import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, Wallet, Plus } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">💰 আর্থিক ড্যাশবোর্ড</h1>
          <p className="text-muted-foreground">আপনার আর্থিক অবস্থা এক নজরে দেখুন</p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
                মোট আয়
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                ৳0
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">
                মোট খরচ
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                ৳800
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                ব্যালেন্স
              </CardTitle>
              <Wallet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                ৳-800
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>সাম্প্রতিক লেনদেন</CardTitle>
              </div>
              <Link href="/transactions">
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  যোগ করুন
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between p-3 rounded-lg border bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
                  <div className="flex-1">
                    <p className="font-medium">eta kinlam</p>
                    <p className="text-sm text-muted-foreground">2025-11-17T00:00:00.000Z</p>
                  </div>
                  <p className="font-bold text-red-600 dark:text-red-400">-৳150</p>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
                  <div className="flex-1">
                    <p className="font-medium">2025-11-17T00:00:00.000Z</p>
                    <p className="text-sm text-muted-foreground">-৳500</p>
                  </div>
                  <p className="font-bold text-red-600 dark:text-red-400">-৳500</p>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
                  <div className="flex-1">
                    <p className="font-medium">123</p>
                    <p className="text-sm text-muted-foreground">2025-11-16T00:00:00.000Z</p>
                  </div>
                  <p className="font-bold text-red-600 dark:text-red-400">-৳150</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/transactions">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl mb-2">💳</div>
                <p className="font-semibold">লেনদেন</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/categories">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl mb-2">🏷️</div>
                <p className="font-semibold">ক্যাটাগরি</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/budgets">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl mb-2">🎯</div>
                <p className="font-semibold">বাজেট</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/analytics">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl mb-2">📊</div>
                <p className="font-semibold">বিশ্লেষণ</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
