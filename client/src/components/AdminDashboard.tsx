import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { User } from '../../../server/src/schema';

interface AdminDashboardProps {
  user: User;
  token: string | null;
  activeView: string;
  setActiveView: (view: string) => void;
}

export function AdminDashboard({ user, token, activeView, setActiveView }: AdminDashboardProps) {
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
                Welcome, {user.full_name}! 👨‍💼
              </CardTitle>
              <CardDescription className="text-blue-100">
                System administration and oversight dashboard
              </CardDescription>
            </div>
            <div className="text-6xl opacity-20">
              👨‍💼
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-gray-600">Total Users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1,247</div>
            <p className="text-xs text-gray-500 mt-1">👥 Active accounts</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-gray-600">Daily Transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-600">342</div>
            <p className="text-xs text-gray-500 mt-1">💳 Processed today</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-gray-600">System Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-600">{formatCurrency(5200000)}</div>
            <p className="text-xs text-gray-500 mt-1">📊 This month</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-gray-600">System Health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.8%</div>
            <p className="text-xs text-gray-500 mt-1">⚡ Uptime</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-blue-50 border border-blue-200">
          <TabsTrigger 
            value="overview" 
            className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <span>📊</span>
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger 
            value="users" 
            className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <span>👥</span>
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger 
            value="transactions" 
            className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <span>💳</span>
            <span className="hidden sm:inline">Transactions</span>
          </TabsTrigger>
          <TabsTrigger 
            value="reports" 
            className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <span>📈</span>
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
          >
            <span>⚙️</span>
            <span className="hidden sm:inline">System</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 System Overview</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system events and user activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800 border-green-200">✅</Badge>
                        <span className="text-sm">New user registration</span>
                      </div>
                      <span className="text-xs text-gray-500">2 min ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">💳</Badge>
                        <span className="text-sm">Payment processed</span>
                      </div>
                      <span className="text-xs text-gray-500">5 min ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">⚠️</Badge>
                        <span className="text-sm">Low stock alert</span>
                      </div>
                      <span className="text-xs text-gray-500">12 min ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>Key performance indicators for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">28</div>
                      <div className="text-xs text-gray-500">Active Orders</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-sky-600">156</div>
                      <div className="text-xs text-gray-500">Online Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-600">{formatCurrency(87000)}</div>
                      <div className="text-xs text-gray-500">Revenue Today</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">98.5%</div>
                      <div className="text-xs text-gray-500">Success Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">👥 User Management</h3>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                ➕ Add New User
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">823</div>
                    <div className="text-sm text-gray-600">🎓 Students</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sky-600">412</div>
                    <div className="text-sm text-gray-600">👨‍👩‍👧‍👦 Parents</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-600">8</div>
                    <div className="text-sm text-gray-600">👨‍🍳 Managers</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">4</div>
                    <div className="text-sm text-gray-600">👨‍💼 Admins</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
              <CardHeader>
                <CardTitle>User Directory</CardTitle>
                <CardDescription>Manage all system users and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">👥</div>
                  <p className="text-gray-600">User management interface coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Complete user administration tools and role management
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">💳 Transaction Monitoring</h3>
            <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
              <CardHeader>
                <CardTitle>Real-time Transaction Log</CardTitle>
                <CardDescription>Monitor all financial activities and payment processing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">💳</div>
                  <p className="text-gray-600">Transaction monitoring dashboard coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Real-time payment tracking and fraud detection
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📈 System Reports</h3>
            <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
              <CardHeader>
                <CardTitle>Analytics & Insights</CardTitle>
                <CardDescription>Comprehensive system performance and usage reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-gray-600">Advanced reporting system coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Detailed analytics, trends, and business intelligence
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">⚙️ System Configuration</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Monitor server performance and resource usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">🖥️ Server Status</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Online</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">💾 Database</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Healthy</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">🔒 Security</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Secure</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur shadow-light-blue border-blue-100">
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                  <CardDescription>Manage global settings and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">📧 Email Notifications</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Enabled</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">🔐 Two-Factor Auth</span>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">Required</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">🕒 Auto-backup</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Daily</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}