/**
 * Prisma Client Singleton
 * 
 * This file exports a singleton instance of PrismaClient to prevent
 * multiple instances from being created in development mode.
 * 
 * In development, Next.js hot-reloads modules, which would create
 * a new PrismaClient instance on each reload if we didn't use this pattern.
 * This singleton pattern ensures we reuse the same client instance.
 */

import { PrismaClient } from '@prisma/client'

// Declare global type for Prisma Client singleton
const globalForPrisma = global as unknown as { prisma: PrismaClient }

/**
 * Create or retrieve the Prisma Client instance
 * 
 * - In production: Always create a new instance
 * - In development: Reuse existing instance from global scope
 */
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Log all queries in development
  })

// Store the Prisma Client in global scope during development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
