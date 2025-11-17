-- Create User table
CREATE TABLE "User" (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  password TEXT,
  language TEXT DEFAULT 'en',
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Category table
CREATE TABLE "Category" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT DEFAULT 'expense',
  color TEXT DEFAULT '#3b82f6',
  icon TEXT DEFAULT 'tag',
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("userId", name)
);

-- Create Transaction table
CREATE TABLE "Transaction" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  type TEXT DEFAULT 'expense',
  amount DECIMAL(12, 2) NOT NULL,
  description TEXT,
  date TIMESTAMP NOT NULL,
  "categoryId" TEXT REFERENCES "Category"(id) ON DELETE SET NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Budget table
CREATE TABLE "Budget" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  "limitAmount" DECIMAL(12, 2) NOT NULL,
  spent DECIMAL(12, 2) DEFAULT 0,
  month INT NOT NULL,
  year INT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("userId", category, month, year)
);

-- Create indexes
CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");
CREATE INDEX "Transaction_categoryId_idx" ON "Transaction"("categoryId");
CREATE INDEX "Transaction_date_idx" ON "Transaction"(date);
CREATE INDEX "Category_userId_idx" ON "Category"("userId");
CREATE INDEX "Budget_userId_idx" ON "Budget"("userId");
