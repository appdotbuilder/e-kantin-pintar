import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { trpc } from '@/utils/trpc';
import type { AuthResponse, LoginInput } from '../../../server/src/schema';

interface LoginFormProps {
  onLogin: (authData: AuthResponse) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LoginInput>({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // NOTE: This is a stub implementation since authentication endpoints are not implemented yet
      // In a real implementation, this would call trpc.login.mutate(formData)
      
      // Simulate authentication based on demo credentials
      const mockUsers = {
        'student1': { 
          user: { 
            id: 1, 
            username: 'student1', 
            email: 'student1@school.edu',
            password_hash: 'hashed_password',
            role: 'student' as const, 
            full_name: 'Ahmad Rizki',
            phone: '081234567890',
            created_at: new Date(),
            updated_at: new Date(),
          }, 
          token: 'mock_student_token' 
        },
        'parent1': { 
          user: { 
            id: 2, 
            username: 'parent1', 
            email: 'parent1@email.com',
            password_hash: 'hashed_password',
            role: 'parent' as const, 
            full_name: 'Siti Nurhaliza',
            phone: '081234567891',
            created_at: new Date(),
            updated_at: new Date(),
          }, 
          token: 'mock_parent_token' 
        },
        'manager1': { 
          user: { 
            id: 3, 
            username: 'manager1', 
            email: 'manager1@school.edu',
            password_hash: 'hashed_password',
            role: 'canteen_manager' as const, 
            full_name: 'Budi Santoso',
            phone: '081234567892',
            created_at: new Date(),
            updated_at: new Date(),
          }, 
          token: 'mock_manager_token' 
        },
        'admin1': { 
          user: { 
            id: 4, 
            username: 'admin1', 
            email: 'admin1@school.edu',
            password_hash: 'hashed_password',
            role: 'admin' as const, 
            full_name: 'Dr. Indira Sari',
            phone: '081234567893',
            created_at: new Date(),
            updated_at: new Date(),
          }, 
          token: 'mock_admin_token' 
        },
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (formData.password === 'password123' && mockUsers[formData.username as keyof typeof mockUsers]) {
        const authData = mockUsers[formData.username as keyof typeof mockUsers];
        onLogin(authData);
      } else {
        setError('Invalid username or password. Use demo accounts with password: password123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={formData.username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData((prev: LoginInput) => ({ ...prev, username: e.target.value }))
          }
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData((prev: LoginInput) => ({ ...prev, password: e.target.value }))
          }
          required
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Signing in...</span>
          </div>
        ) : (
          'Sign In 🔓'
        )}
      </Button>
    </form>
  );
}