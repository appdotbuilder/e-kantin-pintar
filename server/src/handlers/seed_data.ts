import { db } from '../db';
import { usersTable, studentsTable, menuItemsTable } from '../db/schema';

export const seedData = async () => {
  try {
    // Insert demo users
    await db.insert(usersTable).values([
      {
        username: 'student1',
        email: 'student1@school.edu',
        password_hash: 'hashed_password123', // In production, this would be properly hashed
        role: 'student',
        full_name: 'Sari Indah',
        phone: '081234567890',
      },
      {
        username: 'parent1',
        email: 'parent1@email.com',
        password_hash: 'hashed_password123',
        role: 'parent',
        full_name: 'Budi Santoso',
        phone: '081234567891',
      },
      {
        username: 'manager1',
        email: 'manager1@school.edu',
        password_hash: 'hashed_password123',
        role: 'canteen_manager',
        full_name: 'Chef Maria',
        phone: '081234567892',
      },
      {
        username: 'admin1',
        email: 'admin1@school.edu',
        password_hash: 'hashed_password123',
        role: 'admin',
        full_name: 'Dr. Ahmad',
        phone: '081234567893',
      },
    ]);

    // Insert demo students
    await db.insert(studentsTable).values([
      {
        user_id: 1, // student1
        student_id: 'STD2024001',
        class_name: '12 IPA 1',
        balance: '50000',
        spending_limit: '25000',
      },
    ]);

    // Insert demo menu items
    await db.insert(menuItemsTable).values([
      {
        name: 'Nasi Gudeg',
        description: 'Traditional Javanese dish with gudeg, chicken, and rice',
        price: '15000',
        category: 'main_course',
        is_available: true,
        stock_quantity: 25,
      },
      {
        name: 'Nasi Rendang',
        description: 'Spicy beef rendang with steamed rice',
        price: '18000',
        category: 'main_course',
        is_available: true,
        stock_quantity: 20,
      },
      {
        name: 'Keripik Singkong',
        description: 'Crispy cassava chips with spicy seasoning',
        price: '8000',
        category: 'snack',
        is_available: true,
        stock_quantity: 50,
      },
      {
        name: 'Es Teh Manis',
        description: 'Sweet iced tea, refreshing and traditional',
        price: '5000',
        category: 'beverage',
        is_available: true,
        stock_quantity: 100,
      },
      {
        name: 'Es Cendol',
        description: 'Traditional Indonesian dessert with coconut milk',
        price: '10000',
        category: 'dessert',
        is_available: true,
        stock_quantity: 30,
      },
    ]);

    console.log('Demo data seeded successfully!');
  } catch (error) {
    console.error('Failed to seed data:', error);
    throw error;
  }
};