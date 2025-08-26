import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { trpc } from '@/utils/trpc';
import type { User, Student, Transaction, TopupBalanceInput, UpdateSpendingLimitInput } from '../../../server/src/schema';

interface StudentWithUser extends Student {
  user: User;
}

interface ParentDashboardProps {
  user: User;
  token: string | null;
  activeView: string;
  setActiveView: (view: string) => void;
}

export function ParentDashboard({ user, token, activeView, setActiveView }: ParentDashboardProps) {
  const [children, setChildren] = useState<StudentWithUser[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);
  const [childTransactions, setChildTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTopupLoading, setIsTopupLoading] = useState(false);
  const [isLimitLoading, setIsLimitLoading] = useState(false);
  const [topupAmount, setTopupAmount] = useState<string>('');
  const [newSpendingLimit, setNewSpendingLimit] = useState<string>('');

  const loadChildrenData = useCallback(async () => {
    try {
      // NOTE: These are stub implementations since parent endpoints are not implemented yet
      // In real implementation, these would call actual tRPC endpoints
      
      // Mock children data
      const mockChildren: StudentWithUser[] = [
        {
          id: 1,
          user_id: 5,
          student_id: 'STD001',
          class_name: '10A',
          balance: 85000,
          spending_limit: 50000,
          created_at: new Date(),
          updated_at: new Date(),
          user: {
            id: 5,
            username: 'ahmad_rizki',
            email: 'ahmad.rizki@student.school.edu',
            password_hash: 'hashed',
            role: 'student',
            full_name: 'Ahmad Rizki',
            phone: null,
            created_at: new Date(),
            updated_at: new Date(),
          },
        },
        {
          id: 2,
          user_id: 6,
          student_id: 'STD002',
          class_name: '8B',
          balance: 42000,
          spending_limit: 30000,
          created_at: new Date(),
          updated_at: new Date(),
          user: {
            id: 6,
            username: 'sari_indah',
            email: 'sari.indah@student.school.edu',
            password_hash: 'hashed',
            role: 'student',
            full_name: 'Sari Indah',
            phone: null,
            created_at: new Date(),
            updated_at: new Date(),
          },
        },
      ];

      await new Promise(resolve => setTimeout(resolve, 1000));
      setChildren(mockChildren);
      
      if (mockChildren.length > 0 && !selectedChildId) {
        setSelectedChildId(mockChildren[0].id);
      }
    } catch (error) {
      console.error('Failed to load children data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedChildId]);

  const loadChildTransactions = useCallback(async () => {
    if (!selectedChildId) return;

    try {
      // Mock transaction data for selected child
      const mockTransactions: Transaction[] = [
        {
          id: 1,
          student_id: selectedChildId,
          order_id: 1,
          type: 'purchase',
          amount: -23000,
          description: 'Nasi Gudeg + Es Teh Manis',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        },
        {
          id: 2,
          student_id: selectedChildId,
          order_id: null,
          type: 'topup',
          amount: 100000,
          description: 'Balance top-up from parent',
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        },
        {
          id: 3,
          student_id: selectedChildId,
          order_id: 2,
          type: 'purchase',
          amount: -15000,
          description: 'Ayam Bakar + Es Jeruk',
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        },
        {
          id: 4,
          student_id: selectedChildId,
          order_id: null,
          type: 'topup',
          amount: 75000,
          description: 'Weekly allowance top-up',
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        },
      ];

      await new Promise(resolve => setTimeout(resolve, 500));
      setChildTransactions(mockTransactions);
    } catch (error) {
      console.error('Failed to load child transactions:', error);
    }
  }, [selectedChildId]);

  useEffect(() => {
    loadChildrenData();
  }, [loadChildrenData]);

  useEffect(() => {
    if (selectedChildId) {
      loadChildTransactions();
    }
  }, [selectedChildId, loadChildTransactions]);

  const handleTopup = async () => {
    if (!selectedChildId || !topupAmount) return;

    const amount = parseFloat(topupAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setIsTopupLoading(true);
    try {
      // NOTE: This is a stub implementation
      // In real implementation: await trpc.topupBalance.mutate({ student_id: selectedChildId, amount })
      
      const topupData: TopupBalanceInput = {
        student_id: selectedChildId,
        amount: amount,
        description: `Balance top-up from parent: ${user.full_name}`,
      };

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update local state
      setChildren((prev: StudentWithUser[]) =>
        prev.map((child: StudentWithUser) =>
          child.id === selectedChildId
            ? { ...child, balance: child.balance + amount }
            : child
        )
      );

      setTopupAmount('');
      loadChildTransactions(); // Refresh transactions
      alert(`✅ Successfully topped up ${formatPrice(amount)} to ${getSelectedChild()?.user.full_name}'s account!`);
    } catch (error) {
      console.error('Failed to top up balance:', error);
      alert('❌ Failed to top up balance. Please try again.');
    } finally {
      setIsTopupLoading(false);
    }
  };

  const handleUpdateSpendingLimit = async () => {
    if (!selectedChildId || newSpendingLimit === '') return;

    const limit = newSpendingLimit === '0' ? null : parseFloat(newSpendingLimit);
    if (limit !== null && (isNaN(limit) || limit <= 0)) {
      alert('Please enter a valid spending limit or 0 to remove limit');
      return;
    }

    setIsLimitLoading(true);
    try {
      // NOTE: This is a stub implementation
      // In real implementation: await trpc.updateSpendingLimit.mutate({ student_id: selectedChildId, spending_limit: limit })
      
      const limitData: UpdateSpendingLimitInput = {
        student_id: selectedChildId,
        spending_limit: limit,
      };

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setChildren((prev: StudentWithUser[]) =>
        prev.map((child: StudentWithUser) =>
          child.id === selectedChildId
            ? { ...child, spending_limit: limit }
            : child
        )
      );

      setNewSpendingLimit('');
      alert(`✅ Spending limit updated for ${getSelectedChild()?.user.full_name}!`);
    } catch (error) {
      console.error('Failed to update spending limit:', error);
      alert('❌ Failed to update spending limit. Please try again.');
    } finally {
      setIsLimitLoading(false);
    }
  };

  const getSelectedChild = () => {
    return children.find((child: StudentWithUser) => child.id === selectedChildId);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'topup': return '💰';
      case 'purchase': return '🛒';
      case 'refund': return '↩️';
      default: return '💳';
    }
  };

  const calculateSpendingPercentage = (child: StudentWithUser) => {
    if (!child.spending_limit) return 0;
    const spent = child.spending_limit - child.balance;
    return Math.max(0, Math.min(100, (spent / child.spending_limit) * 100));
  };

  const selectedChild = getSelectedChild();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your children's data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Parent Dashboard 👨‍👩‍👧‍👦</h2>
            <p className="opacity-90">Welcome back, {user.full_name}!</p>
            <p className="text-sm opacity-75">Manage your children's canteen accounts</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Managing</p>
            <p className="text-2xl font-bold">{children.length} {children.length === 1 ? 'Child' : 'Children'}</p>
          </div>
        </div>
      </div>

      {children.length === 0 ? (
        <Alert>
          <AlertDescription>
            No children accounts found. Contact school administration to link your children's accounts.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          {/* Children Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {children.map((child: StudentWithUser) => (
              <Card
                key={child.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedChildId === child.id
                    ? 'ring-2 ring-blue-500 bg-blue-50'
                    : 'hover:shadow-md bg-white/90 backdrop-blur'
                }`}
                onClick={() => setSelectedChildId(child.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{child.user.full_name}</CardTitle>
                    <Badge variant="secondary">{child.class_name}</Badge>
                  </div>
                  <CardDescription>Student ID: {child.student_id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Balance:</span>
                      <span className="font-bold text-green-600">{formatPrice(child.balance)}</span>
                    </div>
                    
                    {child.spending_limit && (
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Spending:</span>
                          <span>{Math.round(calculateSpendingPercentage(child))}%</span>
                        </div>
                        <Progress value={calculateSpendingPercentage(child)} className="h-2" />
                        <p className="text-xs text-gray-500">Limit: {formatPrice(child.spending_limit)}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedChild && (
            <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <span>📊</span>
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="topup" className="flex items-center space-x-2">
                  <span>💰</span>
                  <span>Top Up</span>
                </TabsTrigger>
                <TabsTrigger value="transactions" className="flex items-center space-x-2">
                  <span>📋</span>
                  <span>Transactions</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card className="bg-white/95 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{selectedChild.user.full_name}'s Account 👤</span>
                      <Badge className="bg-blue-100 text-blue-800">Class {selectedChild.class_name}</Badge>
                    </CardTitle>
                    <CardDescription>Student ID: {selectedChild.student_id}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-700 font-medium">Current Balance</p>
                        <p className="text-2xl font-bold text-green-600">{formatPrice(selectedChild.balance)}</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-purple-700 font-medium">Daily Spending Limit</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {selectedChild.spending_limit ? formatPrice(selectedChild.spending_limit) : 'No Limit'}
                        </p>
                      </div>
                    </div>

                    {selectedChild.spending_limit && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Spending Progress</span>
                          <span className="text-sm text-gray-600">
                            {Math.round(calculateSpendingPercentage(selectedChild))}% used
                          </span>
                        </div>
                        <Progress value={calculateSpendingPercentage(selectedChild)} className="h-3" />
                        <p className="text-xs text-gray-500">
                          Remaining today: {formatPrice(Math.max(0, selectedChild.spending_limit - (selectedChild.spending_limit - selectedChild.balance)))}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="topup" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white/95 backdrop-blur">
                    <CardHeader>
                      <CardTitle>💰 Top Up Balance</CardTitle>
                      <CardDescription>Add money to {selectedChild.user.full_name}'s account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="topup-amount">Amount (IDR)</Label>
                        <Input
                          id="topup-amount"
                          type="number"
                          placeholder="Enter amount to top up"
                          value={topupAmount}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTopupAmount(e.target.value)}
                          min="1000"
                          step="1000"
                          disabled={isTopupLoading}
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        {[25000, 50000, 100000].map((amount) => (
                          <Button
                            key={amount}
                            variant="outline"
                            size="sm"
                            onClick={() => setTopupAmount(amount.toString())}
                            disabled={isTopupLoading}
                          >
                            {formatPrice(amount).replace('Rp', '')}
                          </Button>
                        ))}
                      </div>

                      <Button
                        className="w-full"
                        onClick={handleTopup}
                        disabled={isTopupLoading || !topupAmount}
                      >
                        {isTopupLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Processing...</span>
                          </div>
                        ) : (
                          `Top Up ${topupAmount ? formatPrice(parseFloat(topupAmount) || 0) : ''}`
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/95 backdrop-blur">
                    <CardHeader>
                      <CardTitle>🚦 Spending Limit</CardTitle>
                      <CardDescription>Set daily spending limit for {selectedChild.user.full_name}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="spending-limit">Daily Limit (IDR) - Enter 0 to remove limit</Label>
                        <Input
                          id="spending-limit"
                          type="number"
                          placeholder={selectedChild.spending_limit ? selectedChild.spending_limit.toString() : "Enter spending limit"}
                          value={newSpendingLimit}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSpendingLimit(e.target.value)}
                          min="0"
                          step="5000"
                          disabled={isLimitLoading}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {[25000, 50000, 0].map((amount) => (
                          <Button
                            key={amount}
                            variant="outline"
                            size="sm"
                            onClick={() => setNewSpendingLimit(amount.toString())}
                            disabled={isLimitLoading}
                          >
                            {amount === 0 ? 'No Limit' : formatPrice(amount).replace('Rp', '')}
                          </Button>
                        ))}
                      </div>

                      <Button
                        className="w-full"
                        onClick={handleUpdateSpendingLimit}
                        disabled={isLimitLoading || newSpendingLimit === ''}
                      >
                        {isLimitLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Updating...</span>
                          </div>
                        ) : (
                          'Update Spending Limit'
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{selectedChild.user.full_name}'s Transactions 📋</h3>
                  <Button variant="outline" size="sm" onClick={loadChildTransactions}>
                    Refresh
                  </Button>
                </div>

                {childTransactions.length === 0 ? (
                  <Alert>
                    <AlertDescription>
                      No transactions found for this child yet.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-3">
                    {childTransactions.map((transaction: Transaction) => (
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
          )}
        </>
      )}
    </div>
  );
}