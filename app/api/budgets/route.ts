/**
 * GET /api/budgets
 * Fetch all budgets for the current user
 * 
 * POST /api/budgets
 * Create a new budget
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

/**
 * GET handler - Fetch all budgets
 * Returns budgets for current month/year
 */
export async function GET(request: NextRequest) {
  try {
    // Demo user ID (in real app, get from session)
    const userId = 'demo-user-1'

    // Get current month and year
    const now = new Date()
    const month = now.getMonth() + 1
    const year = now.getFullYear()

    // Fetch budgets from database using raw SQL to avoid Prisma schema issues
    const budgets = await prisma.$queryRaw`
      SELECT id, "userId", category, "limitAmount", spent, month, year, "createdAt", "updatedAt"
      FROM "Budget"
      WHERE "userId" = ${userId} AND month = ${month} AND year = ${year}
      ORDER BY category ASC
    `

    // Format response
    const formattedBudgets = Array.isArray(budgets) ? budgets.map((budget: any) => ({
      id: budget.id,
      category: budget.category,
      limit: parseFloat(budget.limitAmount.toString()),
      spent: parseFloat(budget.spent.toString()),
      remaining: parseFloat(budget.limitAmount.toString()) - parseFloat(budget.spent.toString()),
      month: budget.month,
      year: budget.year,
    })) : []

    return NextResponse.json(formattedBudgets)
  } catch (error) {
    console.error('Error fetching budgets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch budgets' },
      { status: 500 }
    )
  }
}

/**
 * POST handler - Create a new budget
 * Expects: { category, limit, month, year }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { category, limit, month, year } = body

    // Validate required fields
    if (!category || !limit || !month || !year) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Demo user ID (in real app, get from session)
    const userId = 'demo-user-1'

    // Create budget in database using raw SQL to avoid Prisma schema issues
    const result = await prisma.$queryRaw`
      INSERT INTO "Budget" ("id", "userId", category, "limitAmount", spent, month, year, "createdAt", "updatedAt")
      VALUES (gen_random_uuid(), ${userId}, ${category}, ${limit}, 0, ${month}, ${year}, NOW(), NOW())
      RETURNING id, "userId", category, "limitAmount", spent, month, year
    `

    const budget = Array.isArray(result) && result.length > 0 ? result[0] : null

    if (!budget) {
      throw new Error('Failed to create budget')
    }

    // Format response
    const formattedBudget = {
      id: budget.id,
      category: budget.category,
      limit: parseFloat(budget.limitAmount.toString()),
      spent: parseFloat(budget.spent.toString()),
      remaining: parseFloat(budget.limitAmount.toString()),
      month: budget.month,
      year: budget.year,
    }

    return NextResponse.json(formattedBudget, { status: 201 })
  } catch (error) {
    console.error('Error creating budget:', error)
    return NextResponse.json(
      { error: 'Failed to create budget' },
      { status: 500 }
    )
  }
}

/**
 * DELETE handler - Delete a budget
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Delete budget from database
    await prisma.$queryRaw`
      DELETE FROM "Budget" WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting budget:', error)
    return NextResponse.json(
      { error: 'Failed to delete budget' },
      { status: 500 }
    )
  }
}
