const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient()

const DEFAULT_CATEGORIES = [
  { name: 'খাবার', type: 'expense', color: 'bg-red-500', icon: '🍔' },
  { name: 'পরিবহন', type: 'expense', color: 'bg-blue-500', icon: '🚗' },
  { name: 'বাড়ি', type: 'expense', color: 'bg-yellow-500', icon: '🏠' },
  { name: 'কাজ', type: 'income', color: 'bg-green-500', icon: '💼' },
  { name: 'বিনোদন', type: 'expense', color: 'bg-purple-500', icon: '🎮' },
  { name: 'শিক্ষা', type: 'expense', color: 'bg-indigo-500', icon: '📚' },
  { name: 'স্বাস্থ্য', type: 'expense', color: 'bg-pink-500', icon: '🏥' },
  { name: 'ভ্রমণ', type: 'expense', color: 'bg-cyan-500', icon: '✈️' },
]

async function seed() {
  try {
    // Delete existing categories
    await db.category.deleteMany({})
    
    // Create default categories
    for (const category of DEFAULT_CATEGORIES) {
      await db.category.create({
        data: {
          name: category.name,
          type: category.type,
          color: category.color,
          icon: category.icon,
          userId: '1',
        },
      })
    }
    console.log('✅ Categories seeded successfully')
  } catch (error) {
    console.error('❌ Error seeding categories:', error)
  } finally {
    await db.$disconnect()
  }
}

seed()
