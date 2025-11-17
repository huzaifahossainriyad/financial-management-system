/**
 * GET /api/transactions
 * Fetch all transactions for the current user
 * 
 * POST /api/transactions
 * Create a new transaction
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

/**
 * GET handler - Fetch all transactions
 * Returns transactions sorted by date (newest first)
 */
export async function GET(request: NextRequest) {
  try {
    // In a real app, you would get the user ID from the session/JWT
    // For now, we'll use a demo user ID
    const userId = 'demo-user-1'

    // Fetch transactions from database
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { date: 'desc' },
      take: 100, // Limit to 100 most recent transactions
    })

    // Format response
    const formattedTransactions = transactions.map((tx) => ({
      id: tx.id,
      type: tx.type,
      amount: parseFloat(tx.amount.toString()),
      description: tx.description,
      date: tx.date.toISOString(),
      category: tx.category?.name,
    }))

    return NextResponse.json(formattedTransactions)
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}

/**
 * POST handler - Create a new transaction
 * Expects: { type, amount, description?, date, categoryId? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, amount, description, date, categoryId } = body

    // Validate required fields
    if (!type || !amount || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Demo user ID (in real app, get from session)
    const userId = 'demo-user-1'

    // Create transaction in database
    const transaction = await prisma.transaction.create({
      data: {
        userId,
        type,
        amount: parseFloat(amount),
        description,
        date: new Date(date),
        categoryId: categoryId || null,
      },
      include: { category: true },
    })

    // Format response
    const formattedTransaction = {
      id: transaction.id,
      type: transaction.type,
      amount: parseFloat(transaction.amount.toString()),
      description: transaction.description,
      date: transaction.date.toISOString(),
      category: transaction.category?.name,
    }

    return NextResponse.json(formattedTransaction, { status: 201 })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    )
  }
}
