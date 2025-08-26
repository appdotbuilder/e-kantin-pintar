import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { trpc } from '@/utils/trpc';
import type { 
  User, 
  Student, 
  Order, 
  Transaction, 
  MenuItem,
  ReportFilter 
} from '../../../server/src/schema';

interface AdminStats {
  totalStudents: number;
  totalParents: number;
  totalRevenue: number;
  totalOrders: number;
  activeMenuItems: number;
  avgOrderValue: number;
}

interface AdminDashboardProps {
  user: User;
  token: string | null;
  activeView: string;
  setActiveView: (view: string) => void;
}

export function AdminDashboard({ user, token, activeView, setActiveView }: AdminDashboardProps) {
  const [stats, setStats] = useState<AdminStats>({
    totalStudents: 0,
    totalParents: 0,
    totalRevenue: 0,
    totalOrders: 0,
    activeMenuItems: 0,
    avgOrderValue: 0,
  });
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [topMenuItems, setTopMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reportFilter, setReportFilter] = useState<ReportFilter>({});
  const [reportData, setReportData] = useState<Transaction[]>([]);

  const loadDashboardData = useCallback(async () => {
    try {
      // NOTE: These are stub implementations since admin endpoints are not implemented yet
      // In real implementation, these would call actual tRPC endpoints for admin data
      
      // Mock admin statistics
      const mockStats: AdminStats = {
        totalStudents: 150,
        totalParents: 135,
        totalRevenue: 2450000, // IDR 2.45M
        totalOrders: 89,
        activeMenuItems: 24,
        avgOrderValue: 27000,
      };

      // Mock recent users
      const mockRecentUsers: User[] = [
        {
          id: 5,
          username: 'new_student1',
          email: 'student@example.com',
          password_hash: 'hashed',
          role: 'student',
          full_name: 'Andi Pratama',
          phone: '081234567890',
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000),
          updated_at: new Date(),
        },
        {
          id: 6,
          username: 'new_parent1',
          email: 'parent@example.com',
          password_hash: 'hashed',
          role: 'parent',
          full_name: 'Ibu Sari Dewi',
          phone: '081234567891',
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          updated_at: new Date(),
        },
      ];

      // Mock recent orders
      const mockRecentOrders: Order[] = [
        {
          id: 1,
          student_id: 1,
          total_amount: 23000,
          status: 'completed',
          qr_code: 'QR001',
          pickup_time: new Date(Date.now() - 30 * 60 * 1000),
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
          updated_at: new Date(),
        },
        {
          id: 2,
          student_id: 2,
          total_amount: 18000,
          status: 'ready',
          qr_code: 'QR002',
          pickup_time: null,
          created_at: new Date(Date.now() - 45 * 60 * 1000),
          updated_at: new Date(),
        },
        {
          id: 3,
          student_id: 3,
          total_amount: 31000,
          status: 'preparing',
          qr_code: 'QR003',
          pickup_time: null,
          created_at: new Date(Date.now() - 15 * 60 * 1000),
          updated_at: new Date(),
        },
      ];

      // Mock recent transactions
      const mockRecentTransactions: Transaction[] = [
        {
          id: 1,
          student_id: 1,
          order_id: 1,
          type: 'purchase',
          amount: -23000,
          description: 'Order #1 - Nasi Gudeg + Es Teh',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: 2,
          student_id: 2,
          order_id: null,
          type: 'topup',
          amount: 100000,
          description: 'Balance top-up from parent',
          created_at: new Date(Date.now() - 4 * 60 * 60 * 1000),
        },
        {
          id: 3,
          student_id: 3,
          order_id: 2,
          type: 'purchase',
          amount: -18000,
          description: 'Order #2 - Ayam Bakar',
          created_at: new Date(Date.now() - 6 * 60 * 60 * 1000),
        },
      ];

      // Mock top menu items
      const mockTopMenuItems: MenuItem[] = [
        {
          id: 1,
          name: 'Nasi Gudeg Yogya',
          description: 'Traditional Yogyakarta jackfruit curry',
          price: 15000,
          category: 'main_course',
          image_url: null,
          is_available: true,
          stock_quantity: 25,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Es Teh Manis',
          description: 'Traditional Indonesian sweet iced tea',
          price: 3000,
          category: 'beverage',
          image_url: null,
          is_available: true,
          stock_quantity: 50,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats(mockStats);
      setRecentUsers(mockRecentUsers);
      setRecentOrders(mockRecentOrders);
      setRecentTransactions(mockRecentTransactions);
      setTopMenuItems(mockTopMenuItems);
      setReportData(mockRecentTransactions);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'confirmed':
        return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>;
      case 'preparing':
        return <Badge className="bg-orange-100 text-orange-800">Preparing</Badge>;
      case 'ready':
        return <Badge className="bg-green-100 text-green-800">Ready</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return '🎓';
      case 'parent': return '👨‍👩‍👧‍👦';
      case 'canteen_manager': return '👨‍🍳';
      case 'admin': return '👨‍💼';
      default: return '👤';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'topup': return '💰';
      case 'purchase': return '🛒';
      case 'refund': return '↩️';
      default: return '💳';
    }
  };

  const generateReport = async () => {
    // NOTE: This is a stub implementation
    // In real implementation: await trpc.generateReport.query(reportFilter)
    
    try {
      // Filter existing transaction data based on report criteria
      let filteredData = recentTransactions;
      
      if (reportFilter.transaction_type) {
        filteredData = filteredData.filter(t => t.type === reportFilter.transaction_type);
      }
      
      if (reportFilter.start_date) {
        filteredData = filteredData.filter(t => t.created_at >= reportFilter.start_date!);
      }
      
      if (reportFilter.end_date) {
        filteredData = filteredData.filter(t => t.created_at <= reportFilter.end_date!);
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setReportData(filteredData);
      alert(`✅ Report generated! Found ${filteredData.length} transactions.`);
    } catch (error) {
      console.error('Failed to generate report:', error);
      alert('❌ Failed to generate report. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Admin Dashboard 👨‍💼</h2>
            <p className="opacity-90">Welcome back, {user.full_name}!</p>
            <p className="text-sm opacity-75">School-wide canteen oversight and management</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">System Status</p>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-lg font-semibold">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-white/90 backdrop-blur text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.totalStudents}</div>
            <div className="text-sm text-gray-600">Students</div>
          </CardContent>
        </Card>
        <Card className="bg-white/90 backdrop-blur text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.totalParents}</div>
            <div className="text-sm text-gray-600">Parents</div>
          </CardContent>
        </Card>
        <Card className="bg-white/90 backdrop-blur text-center">
          <CardContent className="p-4">
            <div className="text-lg font-bold text-green-600">{formatPrice(stats.totalRevenue).replace('Rp', '').replace(/\s/g, '')}</div>
            <div className="text-sm text-gray-600">Revenue</div>
          </CardContent>
        </Card>
        <Card className="bg-white/90 backdrop-blur text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{stats.totalOrders}</div>
            <div className="text-sm text-gray-600">Orders</div>
          </CardContent>
        </Card>
        <Card className="bg-white/90 backdrop-blur text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-teal-600">{stats.activeMenuItems}</div>
            <div className="text-sm text-gray-600">Menu Items</div>
          </CardContent>
        </Card>
        <Card className="bg-white/90 backdrop-blur text-center">
          <CardContent className="p-4">
            <div className="text-lg font-bold text-red-600">{formatPrice(stats.avgOrderValue).replace('Rp', '').replace(/\s/g, '')}</div>
            <div className="text-sm text-gray-600">Avg. Order</div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <span>📊</span>
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <span>👥</span>
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center space-x-2">
            <span>📋</span>
            <span>Orders</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center space-x-2">
            <span>📈</span>
            <span>Reports</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle>Recent Transactions 💳</CardTitle>
                <CardDescription>Latest financial activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentTransactions.slice(0, 5).map((transaction: Transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <span>{getTransactionIcon(transaction.type)}</span>
                      <div>
                        <p className="text-sm font-medium">{transaction.description}</p>
                        <p className="text-xs text-gray-500">
                          {transaction.created_at.toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                    <span className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{formatPrice(transaction.amount)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Performance */}
            <Card className="bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle>System Performance 📈</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Order Success Rate</span>
                    <span>98.5%</span>
                  </div>
                  <Progress value={98.5} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Prep Time</span>
                    <span>8.2 min</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Student Satisfaction</span>
                    <span>4.7/5.0</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Menu Item Availability</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Popular Items */}
          <Card className="bg-white/95 backdrop-blur">
            <CardHeader>
              <CardTitle>Popular Menu Items 🏆</CardTitle>
              <CardDescription>Most ordered items this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topMenuItems.map((item: MenuItem) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-orange-600">42</p>
                      <p className="text-xs text-gray-500">orders</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">User Management 👥</h3>
            <Button variant="outline" size="sm" onClick={loadDashboardData}>
              Refresh Data
            </Button>
          </div>

          <Card className="bg-white/95 backdrop-blur">
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Newly registered accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user: User) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{getRoleIcon(user.role)}</span>
                          <span className="font-medium">{user.full_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {user.role.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.created_at.toLocaleDateString('id-ID')}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Order Management 📋</h3>
            <Button variant="outline" size="sm" onClick={loadDashboardData}>
              Refresh Orders
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {recentOrders.map((order: Order) => (
              <Card key={order.id} className="bg-white/90 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    {getOrderStatusBadge(order.status)}
                  </div>
                  <CardDescription>
                    Student ID: {order.student_id} • 
                    {order.created_at.toLocaleDateString('id-ID')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-600">
                      {formatPrice(order.total_amount)}
                    </span>
                    {order.pickup_time && (
                      <div className="text-right text-xs text-gray-500">
                        Picked up:<br />
                        {order.pickup_time.toLocaleTimeString('id-ID')}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="bg-white/95 backdrop-blur">
            <CardHeader>
              <CardTitle>Generate Reports 📈</CardTitle>
              <CardDescription>Create detailed transaction and activity reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={reportFilter.start_date?.toISOString().split('T')[0] || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setReportFilter((prev: ReportFilter) => ({
                        ...prev,
                        start_date: e.target.value ? new Date(e.target.value) : undefined
                      }))
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={reportFilter.end_date?.toISOString().split('T')[0] || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setReportFilter((prev: ReportFilter) => ({
                        ...prev,
                        end_date: e.target.value ? new Date(e.target.value) : undefined
                      }))
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Transaction Type</Label>
                  <Select
                    value={reportFilter.transaction_type || ''}
                    onValueChange={(value: any) =>
                      setReportFilter((prev: ReportFilter) => ({
                        ...prev,
                        transaction_type: value || undefined
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      <SelectItem value="topup">Top-ups</SelectItem>
                      <SelectItem value="purchase">Purchases</SelectItem>
                      <SelectItem value="refund">Refunds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={generateReport} className="w-full">
                Generate Report 📊
              </Button>
            </CardContent>
          </Card>

          {reportData.length > 0 && (
            <Card className="bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle>Report Results</CardTitle>
                <CardDescription>
                  Found {reportData.length} transactions matching your criteria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {reportData.map((transaction: Transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getTransactionIcon(transaction.type)}</span>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-600">
                            Student ID: {transaction.student_id} • 
                            {transaction.created_at.toLocaleDateString('id-ID')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{formatPrice(transaction.amount)}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{transaction.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Amount:</span>
                    <span className="font-bold text-lg">
                      {formatPrice(reportData.reduce((sum: number, t: Transaction) => sum + t.amount, 0))}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}