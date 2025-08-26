import { db } from '../db';
import { usersTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { type LoginInput, type AuthResponse } from '../schema';

export const login = async (input: LoginInput): Promise<AuthResponse> => {
  try {
    const results = await db.select()
      .from(usersTable)
      .where(eq(usersTable.username, input.username))
      .limit(1)
      .execute();

    if (results.length === 0) {
      throw new Error('Invalid username or password');
    }

    const user = results[0];

    // In a real application, you would hash and compare the password
    // For demo purposes, we'll use a simple password check
    if (input.password !== 'password123') {
      throw new Error('Invalid username or password');
    }

    // Generate a simple token (in production, use JWT or similar)
    const token = `token_${user.id}_${Date.now()}`;

    return {
      user,
      token
    };
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};