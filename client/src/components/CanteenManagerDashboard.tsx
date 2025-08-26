import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { User } from '../../../server/src/schema';

interface CanteenManagerDashboardProps {
  user: User;
  token: string | null;
  activeView: string;
  setActiveView: (view: string) => void;
}

export function CanteenManagerDashboard({ user, token, activeView, setActiveView }: CanteenManagerDashboardProps) {
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
                Welcome, Chef {user.full_name}! 👨‍🍳
              </CardTitle>
              <CardDescription className="text-blue-100">
                Manage your canteen operations and serve delicious meals
              </CardDescription>
            </div>
            <div className="text-6xl opacity-20">
              🍳
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-gray-600">Pending Orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">5</div>
            <p className="text-xs text-gray-500 mt-1">🔄 Need attention</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-gray-600">Today's Orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">28</div>
            <p className="text-xs text-gray-500 mt-1">📋 Completed</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-gray-600">Revenue Today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-600">{formatCurrency(420000)}</div>
            <p className="text-xs text-gray-500 mt-1">💰 Sales</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-gray-600">Menu Items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-600">24</div>
            <p className="text-xs text-gray-500 mt-1">🍽️ Available</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-blue-50 border border-blue-200">
          <TabsTrigger 
            value="orders" 
            className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <span>📋</span>
            <span className="hidden sm:inline">Orders</span>
          </TabsTrigger>
          <TabsTrigger 
            value="menu" 
            className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <span>🍽️</span>
            <span className="hidden sm:inline">Menu</span>
          </TabsTrigger>
          <TabsTrigger 
            value="inventory" 
            className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <span>📦</span>
            <span className="hidden sm:inline">Inventory</span>
          </TabsTrigger>
          <TabsTrigger 
            value="reports" 
            className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <span>📊</span>
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📋 Live Order Queue</h3>
            
            <div className="grid gap-4">
              <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100 border-l-4 border-l-orange-400">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #12345</CardTitle>
                      <CardDescription>Sari Indah (12 IPA 1) • 2 minutes ago</CardDescription>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                      🔄 Pending
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
                  <div className="border-t border-blue-100 pt-3 flex justify-between items-center">
                    <span className="font-semibold">Total: {formatCurrency(20000)}</span>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        ✅ Confirm
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        ❌ Decline
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100 border-l-4 border-l-blue-400">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #12344</CardTitle>
                      <CardDescription>Ahmad Rizky (10 IPS 2) • 5 minutes ago</CardDescription>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      🔄 Preparing
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">🍛 Nasi Rendang (1x)</span>
                      <span className="font-medium">{formatCurrency(18000)}</span>
                    </div>
                  </div>
                  <div className="border-t border-blue-100 pt-3 flex justify-between items-center">
                    <span className="font-semibold">Total: {formatCurrency(18000)}</span>
                    <Button 
                      size="sm" 
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      🍽️ Ready for Pickup
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="menu" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">🍽️ Menu Management</h3>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                ➕ Add New Item
              </Button>
            </div>
            
            <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
              <CardHeader>
                <CardTitle>Today's Menu Items</CardTitle>
                <CardDescription>Manage availability, pricing, and stock levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🚧</div>
                  <p className="text-gray-600">Menu management interface coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Add, edit, and manage all your delicious menu items
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="mt-6">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📦 Inventory Management</h3>
            <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
              <CardHeader>
                <CardTitle>Stock Levels & Supplies</CardTitle>
                <CardDescription>Monitor ingredient availability and restock alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📦</div>
                  <p className="text-gray-600">Inventory tracking system coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Real-time stock monitoring and automated reorder points
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Sales & Analytics</h3>
            <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
              <CardHeader>
                <CardTitle>Revenue & Performance Insights</CardTitle>
                <CardDescription>Track sales trends, popular items, and customer preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-gray-600">Advanced analytics dashboard coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Comprehensive reports for business optimization
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}