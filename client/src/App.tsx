import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { trpc } from '@/utils/trpc';
import { LoginForm } from '@/components/LoginForm';
import { StudentDashboard } from '@/components/StudentDashboard';
import { ParentDashboard } from '@/components/ParentDashboard';
import { CanteenManagerDashboard } from '@/components/CanteenManagerDashboard';
import { AdminDashboard } from '@/components/AdminDashboard';
import { MenuBrowser } from '@/components/MenuBrowser';
// Using type-only import for better TypeScript compliance
import type { User, AuthResponse } from '../../server/src/schema';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<string>('menu');

  // Check for stored auth on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = useCallback((authData: AuthResponse) => {
    setUser(authData.user);
    setToken(authData.token);
    localStorage.setItem('auth_token', authData.token);
    localStorage.setItem('auth_user', JSON.stringify(authData.user));
    
    // Set default view based on role
    switch (authData.user.role) {
      case 'student':
        setActiveView('menu');
        break;
      case 'parent':
        setActiveView('children');
        break;
      case 'canteen_manager':
        setActiveView('orders');
        break;
      case 'admin':
        setActiveView('overview');
        break;
      default:
        setActiveView('menu');
    }
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setToken(null);
    setActiveView('menu');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading E-Kantin Pintar...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b-2 border-orange-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🍽️</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">E-Kantin Pintar</h1>
                  <p className="text-sm text-gray-600">Smart Canteen for Modern Schools</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="menu" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="menu" className="flex items-center space-x-2">
                  <span>🍽️</span>
                  <span>Browse Menu</span>
                </TabsTrigger>
                <TabsTrigger value="login" className="flex items-center space-x-2">
                  <span>🔐</span>
                  <span>Login</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="menu">
                <div className="mb-6">
                  <Alert className="bg-orange-50 border-orange-200">
                    <AlertDescription className="text-orange-800">
                      👋 Welcome! Browse our delicious menu below. Login to place orders and access more features.
                    </AlertDescription>
                  </Alert>
                </div>
                <MenuBrowser />
              </TabsContent>

              <TabsContent value="login">
                <div className="max-w-md mx-auto">
                  <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white text-2xl">🔐</span>
                      </div>
                      <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                      <CardDescription>
                        Sign in to access your E-Kantin Pintar account
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <LoginForm onLogin={handleLogin} />
                    </CardContent>
                    <CardFooter className="text-center">
                      <div className="w-full space-y-2 text-sm text-gray-600">
                        <p><strong>Demo Accounts:</strong></p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <Badge variant="secondary">Student: student1</Badge>
                          <Badge variant="secondary">Parent: parent1</Badge>
                          <Badge variant="secondary">Manager: manager1</Badge>
                          <Badge variant="secondary">Admin: admin1</Badge>
                        </div>
                        <p className="text-xs text-gray-500">Password: password123</p>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t-2 border-orange-200 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-2xl">🏫</span>
                <span className="font-semibold text-gray-700">E-Kantin Pintar</span>
              </div>
              <p className="text-gray-600 mb-2">Cashless payments • Pre-orders • QR pickup • Smart management</p>
              <p className="text-sm text-gray-500">Built with ❤️ for Indonesian schools</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return '🎓';
      case 'parent': return '👨‍👩‍👧‍👦';
      case 'canteen_manager': return '👨‍🍳';
      case 'admin': return '👨‍💼';
      default: return '👤';
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'student': return 'Student';
      case 'parent': return 'Parent';
      case 'canteen_manager': return 'Canteen Manager';
      case 'admin': return 'Administrator';
      default: return 'User';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-orange-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🍽️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">E-Kantin Pintar</h1>
                <p className="text-xs text-gray-600">Smart Canteen System</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getRoleIcon(user.role)}</span>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                  <p className="text-xs text-gray-600">{getRoleName(user.role)}</p>
                </div>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout 🚪
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {user.role === 'student' && (
          <StudentDashboard 
            user={user} 
            token={token} 
            activeView={activeView} 
            setActiveView={setActiveView} 
          />
        )}
        {user.role === 'parent' && (
          <ParentDashboard 
            user={user} 
            token={token} 
            activeView={activeView} 
            setActiveView={setActiveView} 
          />
        )}
        {user.role === 'canteen_manager' && (
          <CanteenManagerDashboard 
            user={user} 
            token={token} 
            activeView={activeView} 
            setActiveView={setActiveView} 
          />
        )}
        {user.role === 'admin' && (
          <AdminDashboard 
            user={user} 
            token={token} 
            activeView={activeView} 
            setActiveView={setActiveView} 
          />
        )}
      </main>
    </div>
  );
}

export default App;