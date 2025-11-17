/**
 * DELETE /api/budgets/[id]
 * Delete a specific budget
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

/**
 * DELETE handler - Delete a budget by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json(
        { error: 'Budget ID is required' },
        { status: 400 }
      )
    }

    // Delete budget using raw SQL to avoid Prisma schema issues
    await prisma.$executeRaw`DELETE FROM "Budget" WHERE id = ${id}`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting budget:', error)
    return NextResponse.json(
      { error: 'Failed to delete budget' },
      { status: 500 }
    )
  }
}
