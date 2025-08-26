import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { trpc } from '@/utils/trpc';
import type { 
  User, 
  MenuItem, 
  Order, 
  OrderItem,
  CreateMenuItemInput, 
  UpdateMenuItemInput,
  UpdateOrderStatusInput 
} from '../../../server/src/schema';

interface OrderWithItems extends Order {
  items: (OrderItem & { menu_item: MenuItem })[];
  student_name: string;
}

interface CanteenManagerDashboardProps {
  user: User;
  token: string | null;
  activeView: string;
  setActiveView: (view: string) => void;
}

export function CanteenManagerDashboard({ user, token, activeView, setActiveView }: CanteenManagerDashboardProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingItem, setIsCreatingItem] = useState(false);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  // Form states
  const [newItem, setNewItem] = useState<CreateMenuItemInput>({
    name: '',
    description: null,
    price: 0,
    category: 'main_course',
    image_url: null,
    is_available: true,
    stock_quantity: 0,
  });

  const loadData = useCallback(async () => {
    try {
      // NOTE: These are stub implementations since canteen endpoints are not implemented yet
      // In real implementation, these would call actual tRPC endpoints
      
      // Mock menu items
      const mockMenuItems: MenuItem[] = [
        {
          id: 1,
          name: 'Nasi Gudeg Yogya',
          description: 'Traditional Yogyakarta jackfruit curry with rice, chicken, and egg',
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
          name: 'Ayam Bakar Padang',
          description: 'Grilled chicken with spicy Padang sauce and steamed rice',
          price: 18000,
          category: 'main_course',
          image_url: null,
          is_available: true,
          stock_quantity: 15,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
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

      // Mock orders
      const mockOrders: OrderWithItems[] = [
        {
          id: 1,
          student_id: 1,
          total_amount: 23000,
          status: 'confirmed',
          qr_code: 'QR001',
          pickup_time: null,
          created_at: new Date(Date.now() - 15 * 60 * 1000),
          updated_at: new Date(),
          student_name: 'Ahmad Rizki',
          items: [
            {
              id: 1,
              order_id: 1,
              menu_item_id: 1,
              quantity: 1,
              unit_price: 15000,
              total_price: 15000,
              created_at: new Date(),
              menu_item: mockMenuItems[0],
            },
            {
              id: 2,
              order_id: 1,
              menu_item_id: 3,
              quantity: 2,
              unit_price: 3000,
              total_price: 6000,
              created_at: new Date(),
              menu_item: mockMenuItems[2],
            },
          ],
        },
        {
          id: 2,
          student_id: 2,
          total_amount: 18000,
          status: 'preparing',
          qr_code: 'QR002',
          pickup_time: null,
          created_at: new Date(Date.now() - 30 * 60 * 1000),
          updated_at: new Date(),
          student_name: 'Sari Indah',
          items: [
            {
              id: 3,
              order_id: 2,
              menu_item_id: 2,
              quantity: 1,
              unit_price: 18000,
              total_price: 18000,
              created_at: new Date(),
              menu_item: mockMenuItems[1],
            },
          ],
        },
        {
          id: 3,
          student_id: 1,
          total_amount: 33000,
          status: 'ready',
          qr_code: 'QR003',
          pickup_time: null,
          created_at: new Date(Date.now() - 45 * 60 * 1000),
          updated_at: new Date(),
          student_name: 'Ahmad Rizki',
          items: [
            {
              id: 4,
              order_id: 3,
              menu_item_id: 1,
              quantity: 2,
              unit_price: 15000,
              total_price: 30000,
              created_at: new Date(),
              menu_item: mockMenuItems[0],
            },
            {
              id: 5,
              order_id: 3,
              menu_item_id: 3,
              quantity: 1,
              unit_price: 3000,
              total_price: 3000,
              created_at: new Date(),
              menu_item: mockMenuItems[2],
            },
          ],
        },
      ];

      await new Promise(resolve => setTimeout(resolve, 1000));
      setMenuItems(mockMenuItems);
      setOrders(mockOrders);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateMenuItem = async () => {
    if (!newItem.name || newItem.price <= 0) {
      alert('Please fill in all required fields');
      return;
    }

    setIsCreatingItem(true);
    try {
      // NOTE: This is a stub implementation
      // In real implementation: await trpc.createMenuItem.mutate(newItem)
      
      const createdItem: MenuItem = {
        id: Math.max(...menuItems.map(i => i.id)) + 1,
        name: newItem.name,
        description: newItem.description || null,
        price: newItem.price,
        category: newItem.category,
        image_url: newItem.image_url || null,
        is_available: newItem.is_available,
        stock_quantity: newItem.stock_quantity,
        created_at: new Date(),
        updated_at: new Date(),
      };

      await new Promise(resolve => setTimeout(resolve, 1000));
      setMenuItems((prev: MenuItem[]) => [...prev, createdItem]);
      
      // Reset form
      setNewItem({
        name: '',
        description: null,
        price: 0,
        category: 'main_course',
        image_url: null,
        is_available: true,
        stock_quantity: 0,
      });
      
      alert('✅ Menu item created successfully!');
    } catch (error) {
      console.error('Failed to create menu item:', error);
      alert('❌ Failed to create menu item. Please try again.');
    } finally {
      setIsCreatingItem(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId: number, newStatus: string) => {
    setIsUpdatingOrder(true);
    try {
      // NOTE: This is a stub implementation
      // In real implementation: await trpc.updateOrderStatus.mutate({ id: orderId, status: newStatus })
      
      const updateData: UpdateOrderStatusInput = {
        id: orderId,
        status: newStatus as any,
      };

      await new Promise(resolve => setTimeout(resolve, 800));
      
      setOrders((prev: OrderWithItems[]) =>
        prev.map((order: OrderWithItems) =>
          order.id === orderId
            ? { ...order, status: newStatus as any, updated_at: new Date() }
            : order
        )
      );
      
      alert(`✅ Order #${orderId} status updated to ${newStatus}!`);
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('❌ Failed to update order status. Please try again.');
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  const toggleItemAvailability = async (itemId: number) => {
    try {
      // NOTE: This is a stub implementation
      setMenuItems((prev: MenuItem[]) =>
        prev.map((item: MenuItem) =>
          item.id === itemId
            ? { ...item, is_available: !item.is_available, updated_at: new Date() }
            : item
        )
      );
      
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error('Failed to toggle availability:', error);
    }
  };

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
        return <Badge className="bg-green-100 text-green-800 border-green-200">🎉 Ready</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">✅ Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">❌ Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'main_course': return '🍽️';
      case 'snack': return '🥙';
      case 'beverage': return '🥤';
      case 'dessert': return '🍨';
      default: return '🍴';
    }
  };

  const getOrdersByStatus = (status: string) => {
    return orders.filter((order: OrderWithItems) => order.status === status);
  };

  const todayRevenue = orders
    .filter((order: OrderWithItems) => order.status === 'completed')
    .reduce((sum: number, order: OrderWithItems) => sum + order.total_amount, 0);

  const activeOrders = orders.filter((order: OrderWithItems) => 
    ['pending', 'confirmed', 'preparing', 'ready'].includes(order.status)
  );

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading canteen management dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Canteen Manager Dashboard 👨‍🍳</h2>
            <p className="opacity-90">Welcome back, {user.full_name}!</p>
            <p className="text-sm opacity-75">Manage your canteen operations</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-right">
            <div>
              <p className="text-sm opacity-90">Active Orders</p>
              <p className="text-2xl font-bold">{activeOrders.length}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Today's Revenue</p>
              <p className="text-xl font-bold">{formatPrice(todayRevenue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white/90 backdrop-blur text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{getOrdersByStatus('confirmed').length}</div>
            <div className="text-sm text-gray-600">New Orders</div>
          </CardContent>
        </Card>
        <Card className="bg-white/90 backdrop-blur text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{getOrdersByStatus('preparing').length}</div>
            <div className="text-sm text-gray-600">Preparing</div>
          </CardContent>
        </Card>
        <Card className="bg-white/90 backdrop-blur text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{getOrdersByStatus('ready').length}</div>
            <div className="text-sm text-gray-600">Ready</div>
          </CardContent>
        </Card>
        <Card className="bg-white/90 backdrop-blur text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{menuItems.filter(i => i.is_available).length}</div>
            <div className="text-sm text-gray-600">Available Items</div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders" className="flex items-center space-x-2">
            <span>📋</span>
            <span>Orders</span>
          </TabsTrigger>
          <TabsTrigger value="menu" className="flex items-center space-x-2">
            <span>🍽️</span>
            <span>Menu</span>
          </TabsTrigger>
          <TabsTrigger value="add-item" className="flex items-center space-x-2">
            <span>➕</span>
            <span>Add Item</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Order Management 📋</h3>
            <Button variant="outline" size="sm" onClick={loadData}>
              Refresh Orders
            </Button>
          </div>

          {activeOrders.length === 0 ? (
            <Alert>
              <AlertDescription>
                No active orders at the moment. New orders will appear here automatically! 🎉
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {activeOrders.map((order: OrderWithItems) => (
                <Card key={order.id} className="bg-white/95 backdrop-blur">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      {getOrderStatusBadge(order.status)}
                    </div>
                    <CardDescription>
                      Student: <strong>{order.student_name}</strong> • 
                      {' '}Ordered: {order.created_at.toLocaleTimeString('id-ID', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <span>{getCategoryIcon(item.menu_item.category)}</span>
                            <span className="font-medium">{item.menu_item.name}</span>
                            <span className="text-gray-600">×{item.quantity}</span>
                          </div>
                          <span className="font-semibold text-orange-600">
                            {formatPrice(item.total_price)}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">Total:</span>
                      <span className="font-bold text-xl text-orange-600">
                        {formatPrice(order.total_amount)}
                      </span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="space-y-2">
                    <div className="w-full flex space-x-2">
                      {order.status === 'confirmed' && (
                        <Button
                          className="flex-1"
                          onClick={() => handleUpdateOrderStatus(order.id, 'preparing')}
                          disabled={isUpdatingOrder}
                        >
                          Start Preparing 👨‍🍳
                        </Button>
                      )}
                      {order.status === 'preparing' && (
                        <Button
                          className="flex-1"
                          onClick={() => handleUpdateOrderStatus(order.id, 'ready')}
                          disabled={isUpdatingOrder}
                        >
                          Mark Ready 🎉
                        </Button>
                      )}
                      {order.status === 'ready' && (
                        <Button
                          className="flex-1"
                          onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                          disabled={isUpdatingOrder}
                        >
                          Complete Order ✅
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateOrderStatus(order.id, 'cancelled')}
                        disabled={isUpdatingOrder}
                        className="text-red-600 hover:text-red-700"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="menu" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Menu Management 🍽️</h3>
            <Button variant="outline" size="sm" onClick={loadData}>
              Refresh Menu
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item: MenuItem) => (
              <Card key={item.id} className="bg-white/90 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{getCategoryIcon(item.category)}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant={item.stock_quantity > 5 ? 'default' : 'destructive'}>
                        Stock: {item.stock_quantity}
                      </Badge>
                      <Switch
                        checked={item.is_available}
                        onCheckedChange={() => toggleItemAvailability(item.id)}
                      />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {item.description || 'No description available'}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-orange-600">
                      {formatPrice(item.price)}
                    </div>
                    <Badge 
                      variant={item.is_available ? 'default' : 'secondary'}
                      className={item.is_available ? 'bg-green-100 text-green-700' : ''}
                    >
                      {item.is_available ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Edit Item ✏️
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="add-item" className="space-y-4">
          <Card className="bg-white/95 backdrop-blur">
            <CardHeader>
              <CardTitle>Add New Menu Item ➕</CardTitle>
              <CardDescription>Create a new item for your canteen menu</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="item-name">Item Name *</Label>
                  <Input
                    id="item-name"
                    placeholder="e.g., Nasi Gudeg Special"
                    value={newItem.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewItem((prev: CreateMenuItemInput) => ({ ...prev, name: e.target.value }))
                    }
                    disabled={isCreatingItem}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="item-price">Price (IDR) *</Label>
                  <Input
                    id="item-price"
                    type="number"
                    placeholder="15000"
                    value={newItem.price || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewItem((prev: CreateMenuItemInput) => ({ 
                        ...prev, 
                        price: parseFloat(e.target.value) || 0 
                      }))
                    }
                    min="100"
                    step="500"
                    disabled={isCreatingItem}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="item-category">Category *</Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value: any) =>
                      setNewItem((prev: CreateMenuItemInput) => ({ ...prev, category: value }))
                    }
                    disabled={isCreatingItem}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main_course">🍽️ Main Course</SelectItem>
                      <SelectItem value="snack">🥙 Snack</SelectItem>
                      <SelectItem value="beverage">🥤 Beverage</SelectItem>
                      <SelectItem value="dessert">🍨 Dessert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="item-stock">Initial Stock *</Label>
                  <Input
                    id="item-stock"
                    type="number"
                    placeholder="50"
                    value={newItem.stock_quantity || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewItem((prev: CreateMenuItemInput) => ({ 
                        ...prev, 
                        stock_quantity: parseInt(e.target.value) || 0 
                      }))
                    }
                    min="0"
                    disabled={isCreatingItem}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="item-description">Description</Label>
                <Textarea
                  id="item-description"
                  placeholder="Describe your delicious item..."
                  value={newItem.description || ''}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setNewItem((prev: CreateMenuItemInput) => ({ 
                      ...prev, 
                      description: e.target.value || null 
                    }))
                  }
                  disabled={isCreatingItem}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newItem.is_available}
                  onCheckedChange={(checked: boolean) =>
                    setNewItem((prev: CreateMenuItemInput) => ({ ...prev, is_available: checked }))
                  }
                  disabled={isCreatingItem}
                />
                <Label>Available immediately</Label>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleCreateMenuItem}
                disabled={isCreatingItem || !newItem.name || newItem.price <= 0}
              >
                {isCreatingItem ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating Item...</span>
                  </div>
                ) : (
                  'Add Menu Item 🍽️'
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}