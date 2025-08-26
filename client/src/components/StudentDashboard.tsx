import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { MenuBrowser } from '@/components/MenuBrowser';
import { CartManager } from '@/components/CartManager';
import { trpc } from '@/utils/trpc';
import type { User, Student, Order, Transaction } from '../../../server/src/schema';

interface StudentDashboardProps {
  user: User;
  token: string | null;
  activeView: string;
  setActiveView: (view: string) => void;
}

export function StudentDashboard({ user, token, activeView, setActiveView }: StudentDashboardProps) {
  const [studentData, setStudentData] = useState<Student | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [spendingLimit, setSpendingLimit] = useState<number | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadStudentData = useCallback(async () => {
    try {
      // NOTE: These are stub implementations since student endpoints are not implemented yet
      // In real implementation, these would call actual tRPC endpoints
      
      // Mock student data
      const mockStudentData: Student = {
        id: 1,
        user_id: user.id,
        student_id: 'STD001',
        class_name: '10A',
        balance: 85000,
        spending_limit: 50000,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const mockOrders: Order[] = [
        {
          id: 1,
          student_id: 1,
          total_amount: 23000,
          status: 'ready',
          qr_code: 'QR123456',
          pickup_time: null,
          created_at: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          updated_at: new Date(),
        },
        {
          id: 2,
          student_id: 1,
          total_amount: 15000,
          status: 'completed',
          qr_code: 'QR123457',
          pickup_time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          updated_at: new Date(),
        },
      ];

      const mockTransactions: Transaction[] = [
        {
          id: 1,
          student_id: 1,
          order_id: 1,
          type: 'purchase',
          amount: -23000,
          description: 'Order #1 - Nasi Gudeg + Es Teh',
          created_at: new Date(Date.now() - 30 * 60 * 1000),
        },
        {
          id: 2,
          student_id: 1,
          order_id: null,
          type: 'topup',
          amount: 100000,
          description: 'Balance top-up from parent',
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      ];

      await new Promise(resolve => setTimeout(resolve, 1000));

      setStudentData(mockStudentData);
      setBalance(mockStudentData.balance);
      setSpendingLimit(mockStudentData.spending_limit);
      setRecentOrders(mockOrders);
      setRecentTransactions(mockTransactions);
    } catch (error) {
      console.error('Failed to load student data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    loadStudentData();
  }, [loadStudentData]);

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
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">⏳ Pending</Badge>;
      case 'confirmed':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">✅ Confirmed</Badge>;
      case 'preparing':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">👨‍🍳 Preparing</Badge>;
      case 'ready':
        return <Badge className="bg-green-100 text-green-800 border-green-200">🎉 Ready!</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">✅ Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">❌ Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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

  const spendingPercentage = spendingLimit ? Math.min((balance / spendingLimit) * 100, 100) : 0;

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {user.full_name}! 🎓</h2>
            <p className="opacity-90">Student ID: {studentData?.student_id} • Class: {studentData?.class_name}</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Account Balance</p>
            <p className="text-3xl font-bold">{formatPrice(balance)}</p>
          </div>
        </div>
        
        {spendingLimit && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Spending Limit Usage</span>
              <span>{Math.round(spendingPercentage)}%</span>
            </div>
            <Progress value={spendingPercentage} className="bg-white/20" />
            <p className="text-xs mt-1 opacity-75">
              Limit: {formatPrice(spendingLimit)} • Remaining: {formatPrice(Math.max(0, spendingLimit - (spendingLimit - balance)))}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="menu" className="flex items-center space-x-2">
            <span>🍽️</span>
            <span>Menu</span>
          </TabsTrigger>
          <TabsTrigger value="cart" className="flex items-center space-x-2">
            <span>🛒</span>
            <span>Cart</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center space-x-2">
            <span>📋</span>
            <span>Orders</span>
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center space-x-2">
            <span>💳</span>
            <span>History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="space-y-4">
          <Alert className="bg-blue-50 border-blue-200">
            <AlertDescription className="text-blue-800">
              💡 Browse our menu and add items to your cart. Your current balance: <strong>{formatPrice(balance)}</strong>
            </AlertDescription>
          </Alert>
          <MenuBrowser />
        </TabsContent>

        <TabsContent value="cart" className="space-y-4">
          <CartManager 
            studentId={studentData?.id || 0} 
            balance={balance}
            spendingLimit={spendingLimit}
            onOrderComplete={loadStudentData}
          />
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Your Orders 📋</h3>
            <Button variant="outline" size="sm" onClick={loadStudentData}>
              Refresh Orders
            </Button>
          </div>

          {recentOrders.length === 0 ? (
            <Alert>
              <AlertDescription>
                You haven't placed any orders yet. Visit the menu to start ordering! 🍽️
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order: Order) => (
                <Card key={order.id} className="bg-white/90 backdrop-blur">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      {getOrderStatusBadge(order.status)}
                    </div>
                    <CardDescription>
                      Placed on {order.created_at.toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-orange-600">
                          {formatPrice(order.total_amount)}
                        </p>
                      </div>
                      {order.qr_code && (
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-200 rounded border-2 border-dashed border-gray-400 flex items-center justify-center mb-2">
                            <span className="text-xs">QR</span>
                          </div>
                          <p className="text-xs text-gray-600">Pickup Code</p>
                        </div>
                      )}
                    </div>
                    {order.status === 'ready' && (
                      <Alert className="bg-green-50 border-green-200">
                        <AlertDescription className="text-green-800">
                          🎉 Your order is ready for pickup! Show the QR code to collect your food.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <h3 className="text-xl font-semibold">Transaction History 💳</h3>

          {recentTransactions.length === 0 ? (
            <Alert>
              <AlertDescription>
                No transactions yet. Your transaction history will appear here.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((transaction: Transaction) => (
                <Card key={transaction.id} className="bg-white/90 backdrop-blur">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getTransactionIcon(transaction.type)}</span>
                        <div>
                          <p className="font-medium text-gray-900">
                            {transaction.description || `${transaction.type} transaction`}
                          </p>
                          <p className="text-sm text-gray-600">
                            {transaction.created_at.toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className={`text-right font-bold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <p className="text-lg">
                          {transaction.amount > 0 ? '+' : ''}{formatPrice(transaction.amount)}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{transaction.type}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}