import { db } from '../db';
import { menuItemsTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { type MenuItem } from '../schema';

export const getMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const results = await db.select()
      .from(menuItemsTable)
      .where(eq(menuItemsTable.is_available, true))
      .orderBy(menuItemsTable.category, menuItemsTable.name)
      .execute();

    return results.map(item => ({
      ...item,
      price: parseFloat(item.price)
    }));
  } catch (error) {
    console.error('Failed to fetch menu items:', error);
    throw error;
  }
};