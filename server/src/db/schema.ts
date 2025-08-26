import { pgTable, serial, varchar, text, numeric, integer, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core';

// Define enums
export const userRoleEnum = pgEnum('user_role', ['student', 'parent', 'canteen_manager', 'admin']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']);
export const transactionTypeEnum = pgEnum('transaction_type', ['topup', 'purchase', 'refund']);
export const categoryEnum = pgEnum('category', ['main_course', 'snack', 'beverage', 'dessert']);

// Users table
export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password_hash: varchar('password_hash', { length: 255 }).notNull(),
  role: userRoleEnum('role').notNull(),
  full_name: varchar('full_name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Students table
export const studentsTable = pgTable('students', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => usersTable.id).notNull(),
  student_id: varchar('student_id', { length: 50 }).notNull().unique(),
  class_name: varchar('class_name', { length: 50 }).notNull(),
  balance: numeric('balance', { precision: 10, scale: 2 }).notNull().default('0'),
  spending_limit: numeric('spending_limit', { precision: 10, scale: 2 }),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Parent-Student relationships table
export const parentStudentsTable = pgTable('parent_students', {
  id: serial('id').primaryKey(),
  parent_id: integer('parent_id').references(() => usersTable.id).notNull(),
  student_id: integer('student_id').references(() => studentsTable.id).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Menu Items table
export const menuItemsTable = pgTable('menu_items', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  category: categoryEnum('category').notNull(),
  image_url: varchar('image_url', { length: 500 }),
  is_available: boolean('is_available').notNull().default(true),
  stock_quantity: integer('stock_quantity').notNull().default(0),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Orders table
export const ordersTable = pgTable('orders', {
  id: serial('id').primaryKey(),
  student_id: integer('student_id').references(() => studentsTable.id).notNull(),
  total_amount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum('status').notNull().default('pending'),
  qr_code: varchar('qr_code', { length: 255 }),
  pickup_time: timestamp('pickup_time'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Order Items table
export const orderItemsTable = pgTable('order_items', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').references(() => ordersTable.id).notNull(),
  menu_item_id: integer('menu_item_id').references(() => menuItemsTable.id).notNull(),
  quantity: integer('quantity').notNull(),
  unit_price: numeric('unit_price', { precision: 10, scale: 2 }).notNull(),
  total_price: numeric('total_price', { precision: 10, scale: 2 }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Transactions table
export const transactionsTable = pgTable('transactions', {
  id: serial('id').primaryKey(),
  student_id: integer('student_id').references(() => studentsTable.id).notNull(),
  order_id: integer('order_id').references(() => ordersTable.id),
  type: transactionTypeEnum('type').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  description: text('description'),
  created_at: timestamp('created_at').defaultNow().notNull(),
});