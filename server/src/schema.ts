import { z } from 'zod';

// Enum schemas
export const userRoleSchema = z.enum(['student', 'parent', 'canteen_manager', 'admin']);
export const orderStatusSchema = z.enum(['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']);
export const transactionTypeSchema = z.enum(['topup', 'purchase', 'refund']);
export const categorySchema = z.enum(['main_course', 'snack', 'beverage', 'dessert']);

// User schemas
export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  password_hash: z.string(),
  role: userRoleSchema,
  full_name: z.string(),
  phone: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type User = z.infer<typeof userSchema>;

export const createUserInputSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: userRoleSchema,
  full_name: z.string(),
  phone: z.string().nullable().optional(),
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

// Student schemas
export const studentSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  student_id: z.string(),
  class_name: z.string(),
  balance: z.number(),
  spending_limit: z.number().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Student = z.infer<typeof studentSchema>;

export const createStudentInputSchema = z.object({
  user_id: z.number(),
  student_id: z.string(),
  class_name: z.string(),
  balance: z.number().nonnegative().default(0),
  spending_limit: z.number().positive().nullable().optional(),
});

export type CreateStudentInput = z.infer<typeof createStudentInputSchema>;

// Parent-Student relationship schemas
export const parentStudentSchema = z.object({
  id: z.number(),
  parent_id: z.number(),
  student_id: z.number(),
  created_at: z.coerce.date(),
});

export type ParentStudent = z.infer<typeof parentStudentSchema>;

export const createParentStudentInputSchema = z.object({
  parent_id: z.number(),
  student_id: z.number(),
});

export type CreateParentStudentInput = z.infer<typeof createParentStudentInputSchema>;

// Menu Item schemas
export const menuItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  category: categorySchema,
  image_url: z.string().nullable(),
  is_available: z.boolean(),
  stock_quantity: z.number().int().nonnegative(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type MenuItem = z.infer<typeof menuItemSchema>;

export const createMenuItemInputSchema = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
  price: z.number().positive(),
  category: categorySchema,
  image_url: z.string().nullable().optional(),
  is_available: z.boolean().default(true),
  stock_quantity: z.number().int().nonnegative(),
});

export type CreateMenuItemInput = z.infer<typeof createMenuItemInputSchema>;

export const updateMenuItemInputSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  price: z.number().positive().optional(),
  category: categorySchema.optional(),
  image_url: z.string().nullable().optional(),
  is_available: z.boolean().optional(),
  stock_quantity: z.number().int().nonnegative().optional(),
});

export type UpdateMenuItemInput = z.infer<typeof updateMenuItemInputSchema>;

// Order schemas
export const orderSchema = z.object({
  id: z.number(),
  student_id: z.number(),
  total_amount: z.number(),
  status: orderStatusSchema,
  qr_code: z.string().nullable(),
  pickup_time: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Order = z.infer<typeof orderSchema>;

export const createOrderInputSchema = z.object({
  student_id: z.number(),
  items: z.array(z.object({
    menu_item_id: z.number(),
    quantity: z.number().int().positive(),
  })),
});

export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;

export const updateOrderStatusInputSchema = z.object({
  id: z.number(),
  status: orderStatusSchema,
});

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusInputSchema>;

// Order Item schemas
export const orderItemSchema = z.object({
  id: z.number(),
  order_id: z.number(),
  menu_item_id: z.number(),
  quantity: z.number().int(),
  unit_price: z.number(),
  total_price: z.number(),
  created_at: z.coerce.date(),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

// Transaction schemas
export const transactionSchema = z.object({
  id: z.number(),
  student_id: z.number(),
  order_id: z.number().nullable(),
  type: transactionTypeSchema,
  amount: z.number(),
  description: z.string().nullable(),
  created_at: z.coerce.date(),
});

export type Transaction = z.infer<typeof transactionSchema>;

export const createTransactionInputSchema = z.object({
  student_id: z.number(),
  order_id: z.number().nullable().optional(),
  type: transactionTypeSchema,
  amount: z.number(),
  description: z.string().nullable().optional(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionInputSchema>;

// Balance Top-up schemas
export const topupBalanceInputSchema = z.object({
  student_id: z.number(),
  amount: z.number().positive(),
  description: z.string().optional(),
});

export type TopupBalanceInput = z.infer<typeof topupBalanceInputSchema>;

// Authentication schemas
export const loginInputSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const authResponseSchema = z.object({
  user: userSchema,
  token: z.string(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

// Spending limit schemas
export const updateSpendingLimitInputSchema = z.object({
  student_id: z.number(),
  spending_limit: z.number().positive().nullable(),
});

export type UpdateSpendingLimitInput = z.infer<typeof updateSpendingLimitInputSchema>;

// Report schemas
export const reportFilterSchema = z.object({
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional(),
  student_id: z.number().optional(),
  transaction_type: transactionTypeSchema.optional(),
});

export type ReportFilter = z.infer<typeof reportFilterSchema>;