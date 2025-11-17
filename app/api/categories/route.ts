/**
 * GET /api/categories
 * Fetch all categories for the current user
 * 
 * POST /api/categories
 * Create a new category
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

/**
 * GET handler - Fetch all categories
 * Returns categories sorted by type and name
 */
export async function GET(request: NextRequest) {
  try {
    // Demo user ID (in real app, get from session)
    const userId = 'demo-user-1'

    // Fetch categories from database
    const categories = await prisma.category.findMany({
      where: { userId },
      orderBy: [{ type: 'asc' }, { name: 'asc' }],
    })

    // Format response
    const formattedCategories = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      type: cat.type,
      color: cat.color,
      icon: cat.icon,
    }))

    return NextResponse.json(formattedCategories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

/**
 * POST handler - Create a new category
 * Expects: { name, type, color?, icon? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, type, color, icon } = body

    // Validate required fields
    if (!name || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Demo user ID (in real app, get from session)
    const userId = 'demo-user-1'

    // Create category in database
    const category = await prisma.category.create({
      data: {
        userId,
        name,
        type,
        color: color || '#3b82f6',
        icon: icon || 'tag',
      },
    })

    // Format response
    const formattedCategory = {
      id: category.id,
      name: category.name,
      type: category.type,
      color: category.color,
      icon: category.icon,
    }

    return NextResponse.json(formattedCategory, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
