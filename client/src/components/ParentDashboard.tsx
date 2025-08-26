import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { User } from '../../../server/src/schema';

interface ParentDashboardProps {
  user: User;
  token: string | null;
  activeView: string;
  setActiveView: (view: string) => void;
}

export function ParentDashboard({ user, token, activeView, setActiveView }: ParentDashboardProps) {
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
                Welcome, {user.full_name}! 👨‍👩‍👧‍👦
              </CardTitle>
              <CardDescription className="text-blue-100">
                Monitor and manage your children's canteen activities
              </CardDescription>
            </div>
            <div className="text-6xl opacity-20">
              👨‍👩‍👧‍👦
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-gray-600">Total Children</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">2</div>
            <p className="text-xs text-gray-500 mt-1">👧👦 Registered students</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-gray-600">Total Balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-600">{formatCurrency(85000)}</div>
            <p className="text-xs text-gray-500 mt-1">💳 Combined balance</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-gray-600">This Month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-600">{formatCurrency(150000)}</div>
            <p className="text-xs text-gray-500 mt-1">📊 Total spent</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-blue-50 border border-blue-200">
          <TabsTrigger 
            value="children" 
            className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <span>👧👦</span>
            <span className="hidden sm:inline">Children</span>
          </TabsTrigger>
          <TabsTrigger 
            value="topup" 
            className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <span>💳</span>
            <span className="hidden sm:inline">Top-up</span>
          </TabsTrigger>
          <TabsTrigger 
            value="reports" 
            className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <span>📊</span>
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <span>⚙️</span>
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="children" className="mt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">👧👦 My Children</h3>
            
            <div className="grid gap-4">
              <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Sari Indah</CardTitle>
                      <CardDescription>Class 12 IPA 1 • Student ID: STD2024001</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      ✅ Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Balance</p>
                      <p className="text-lg font-semibold text-blue-600">{formatCurrency(50000)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Daily Limit</p>
                      <p className="text-lg font-semibold text-sky-600">{formatCurrency(25000)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Orders Today</p>
                      <p className="text-lg font-semibold text-cyan-600">2</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      💳 Top-up Balance
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      📊 View Activity
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Ahmad Rizky</CardTitle>
                      <CardDescription>Class 10 IPS 2 • Student ID: STD2024002</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      ✅ Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Balance</p>
                      <p className="text-lg font-semibold text-blue-600">{formatCurrency(35000)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Daily Limit</p>
                      <p className="text-lg font-semibold text-sky-600">{formatCurrency(20000)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Orders Today</p>
                      <p className="text-lg font-semibold text-cyan-600">1</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      💳 Top-up Balance
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      📊 View Activity
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="topup" className="mt-6">
          <div className="max-w-2xl space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">💳 Top-up Balance</h3>
            <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
              <CardHeader>
                <CardTitle>Add Money to Children's Accounts</CardTitle>
                <CardDescription>
                  Instantly top-up your children's canteen balance for seamless meal purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🚧</div>
                  <p className="text-gray-600">Top-up feature coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Will support bank transfers, e-wallets, and card payments
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Spending Reports</h3>
            <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
              <CardHeader>
                <CardTitle>Monthly Spending Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-gray-600">Detailed reports and analytics coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Track spending patterns, nutritional insights, and more
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="max-w-2xl space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">⚙️ Parent Settings</h3>
            <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
              <CardHeader>
                <CardTitle>Account Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">🔔 Spending Notifications</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">📧 Weekly Reports</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">⚠️ Low Balance Alerts</span>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">@ {formatCurrency(15000)}</Badge>
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