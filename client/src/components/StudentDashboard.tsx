import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MenuBrowser } from './MenuBrowser';
import type { User } from '../../../server/src/schema';

interface StudentDashboardProps {
  user: User;
  token: string | null;
  activeView: string;
  setActiveView: (view: string) => void;
}

export function StudentDashboard({ user, token, activeView, setActiveView }: StudentDashboardProps) {
  const [balance] = useState(50000); // Mock balance in IDR
  const [spendingLimit] = useState(25000); // Mock spending limit

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-sky-500 text-white border-0 shadow-light-blue-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">
                Welcome back, {user.full_name}! 🎓
              </CardTitle>
              <CardDescription className="text-blue-100">
                Ready to order some delicious meals today?
              </CardDescription>
            </div>
            <div className="text-6xl opacity-20">
              🍽️
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Balance & Limits Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-gray-600">Account Balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(balance)}</div>
            <p className="text-xs text-gray-500 mt-1">💳 Available for spending</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-gray-600">Daily Limit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-600">{formatCurrency(spendingLimit)}</div>
            <p className="text-xs text-gray-500 mt-1">📊 Set by parent</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-gray-600">Orders Today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-600">2</div>
            <p className="text-xs text-gray-500 mt-1">🛒 Completed orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-blue-50 border border-blue-200">
          <TabsTrigger 
            value="menu" 
            className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <span>🍽️</span>
            <span className="hidden sm:inline">Menu</span>
          </TabsTrigger>
          <TabsTrigger 
            value="orders" 
            className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <span>📋</span>
            <span className="hidden sm:inline">My Orders</span>
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <span>📊</span>
            <span className="hidden sm:inline">History</span>
          </TabsTrigger>
          <TabsTrigger 
            value="profile" 
            className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <span>👤</span>
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="mt-6">
          <MenuBrowser />
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📋 My Current Orders</h3>
            
            {/* Mock current order */}
            <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Order #12345</CardTitle>
                    <CardDescription>Placed 10 minutes ago</CardDescription>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    🔄 Preparing
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">🍱 Nasi Gudeg (1x)</span>
                    <span className="font-medium">{formatCurrency(15000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">🥤 Es Teh Manis (1x)</span>
                    <span className="font-medium">{formatCurrency(5000)}</span>
                  </div>
                </div>
                <div className="border-t border-blue-100 pt-2 flex justify-between items-center">
                  <span className="font-semibold">Total: {formatCurrency(20000)}</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    📱 View QR Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="text-center py-8">
              <p className="text-gray-500">No more active orders</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Transaction History</h3>
            
            <div className="space-y-3">
              {/* Mock transaction history */}
              <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">🍱 Lunch Order #12344</p>
                      <p className="text-sm text-gray-600">Today, 12:30 PM</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">-{formatCurrency(18000)}</p>
                      <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                        ✅ Completed
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">💳 Balance Top-up</p>
                      <p className="text-sm text-gray-600">Yesterday, 8:00 AM</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">+{formatCurrency(50000)}</p>
                      <Badge variant="default" className="bg-blue-100 text-blue-800 border-blue-200">
                        💰 Top-up
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <div className="max-w-2xl space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">👤 My Profile</h3>
            
            <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
              <CardHeader>
                <CardTitle>Student Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Full Name</label>
                    <p className="text-gray-900">{user.full_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Student ID</label>
                    <p className="text-gray-900">STD2024001</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Class</label>
                    <p className="text-gray-900">12 IPA 1</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">🔔 Order Notifications</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">📱 QR Code Auto-refresh</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">💳 Low Balance Alert</span>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">@ {formatCurrency(10000)}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}