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
  const [formData, setFormData] = useState<LoginInput>({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const authResponse = await trpc.login.mutate(formData);
      onLogin(authResponse);
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid username or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (username: string) => {
    setFormData({
      username,
      password: 'password123'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">
            ❌ {error}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium text-gray-700">
          Username
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={formData.username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData((prev: LoginInput) => ({ ...prev, username: e.target.value }))
          }
          required
          className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData((prev: LoginInput) => ({ ...prev, password: e.target.value }))
          }
          required
          className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Signing In...
          </>
        ) : (
          '🔐 Sign In'
        )}
      </Button>

      <div className="pt-4 border-t border-blue-100">
        <p className="text-sm text-gray-600 mb-3 text-center">Quick Demo Login:</p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fillDemoCredentials('student1')}
            className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            🎓 Student
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fillDemoCredentials('parent1')}
            className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            👨‍👩‍👧‍👦 Parent
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fillDemoCredentials('manager1')}
            className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            👨‍🍳 Manager
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fillDemoCredentials('admin1')}
            className="text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            👨‍💼 Admin
          </Button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          All demo accounts use password: <code className="bg-blue-100 text-blue-800 px-1 rounded">password123</code>
        </p>
      </div>
    </form>
  );
}