import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { trpc } from '@/utils/trpc';
import type { MenuItem, CreateOrderInput } from '../../../server/src/schema';

interface CartItem extends MenuItem {
  cartQuantity: number;
}

interface CartManagerProps {
  studentId: number;
  balance: number;
  spendingLimit: number | null;
  onOrderComplete: () => void;
}

export function CartManager({ studentId, balance, spendingLimit, onOrderComplete }: CartManagerProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      // NOTE: This is a stub implementation since menu endpoints are not implemented yet
      // In real implementation, this would call trpc.getMenuItems.query()
      
      // Using the same mock data as MenuBrowser for consistency
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
          name: 'Gado-gado Jakarta',
          description: 'Mixed vegetables with peanut sauce, tofu, and boiled egg',
          price: 12000,
          category: 'main_course',
          image_url: null,
          is_available: true,
          stock_quantity: 20,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: 'Risoles Mayo',
          description: 'Crispy spring rolls filled with vegetables and mayonnaise',
          price: 5000,
          category: 'snack',
          image_url: null,
          is_available: true,
          stock_quantity: 30,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          name: 'Martabak Mini',
          description: 'Mini Indonesian stuffed pancake with sweet or savory filling',
          price: 8000,
          category: 'snack',
          image_url: null,
          is_available: true,
          stock_quantity: 20,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
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
        {
          id: 7,
          name: 'Es Jeruk Peras',
          description: 'Fresh squeezed orange juice with ice',
          price: 7000,
          category: 'beverage',
          image_url: null,
          is_available: true,
          stock_quantity: 25,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          name: 'Es Cendol',
          description: 'Traditional Indonesian dessert with pandan noodles and coconut milk',
          price: 6000,
          category: 'dessert',
          image_url: null,
          is_available: true,
          stock_quantity: 15,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      await new Promise(resolve => setTimeout(resolve, 800));
      setMenuItems(mockMenuItems);
    } catch (error) {
      console.error('Failed to load menu items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prev: CartItem[]) => {
      const existingItem = prev.find((item: CartItem) => item.id === menuItem.id);
      if (existingItem) {
        return prev.map((item: CartItem) =>
          item.id === menuItem.id
            ? { ...item, cartQuantity: Math.min(item.cartQuantity + 1, item.stock_quantity) }
            : item
        );
      } else {
        return [...prev, { ...menuItem, cartQuantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (itemId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems((prev: CartItem[]) =>
      prev.map((item: CartItem) =>
        item.id === itemId
          ? { ...item, cartQuantity: Math.min(Math.max(quantity, 1), item.stock_quantity) }
          : item
      )
    );
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prev: CartItem[]) => prev.filter((item: CartItem) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total: number, item: CartItem) => total + (item.price * item.cartQuantity), 0);
  };

  const canAfford = (amount: number) => {
    return balance >= amount && (!spendingLimit || amount <= spendingLimit);
  };

  const placeOrder = async () => {
    if (cartItems.length === 0) return;

    setIsPlacingOrder(true);
    try {
      // NOTE: This is a stub implementation since order endpoints are not implemented yet
      // In real implementation, this would call trpc.createOrder.mutate()
      
      const orderData: CreateOrderInput = {
        student_id: studentId,
        items: cartItems.map((item: CartItem) => ({
          menu_item_id: item.id,
          quantity: item.cartQuantity,
        })),
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and refresh parent data
      clearCart();
      onOrderComplete();
      
      // Show success message (in real app, this would be handled by a toast/notification)
      alert('🎉 Order placed successfully! Check your Orders tab for updates.');
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('❌ Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
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

  const filteredMenuItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter((item: MenuItem) => item.category === selectedCategory);

  const cartTotal = calculateTotal();
  const isCartValid = cartItems.length > 0 && canAfford(cartTotal);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading menu for ordering...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Menu Items */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Add to Cart 🛒</h3>
          <div className="flex space-x-2">
            {['all', 'main_course', 'snack', 'beverage', 'dessert'].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs"
              >
                {category === 'all' ? '🍴 All' : 
                 category === 'main_course' ? '🍽️ Main' :
                 category === 'snack' ? '🥙 Snacks' :
                 category === 'beverage' ? '🥤 Drinks' : '🍨 Desserts'}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMenuItems.map((item: MenuItem) => {
            const cartItem = cartItems.find((ci: CartItem) => ci.id === item.id);
            const inCart = cartItem ? cartItem.cartQuantity : 0;
            const canAdd = item.is_available && item.stock_quantity > inCart;

            return (
              <Card key={item.id} className="bg-white/90 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{getCategoryIcon(item.category)}</span>
                    <Badge variant={item.stock_quantity > 5 ? 'default' : 'destructive'} className="text-xs">
                      Stock: {item.stock_quantity}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{item.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-600">
                      {formatPrice(item.price)}
                    </span>
                    {inCart > 0 && (
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateCartQuantity(item.id, inCart - 1)}
                          className="h-8 w-8 p-0"
                        >
                          -
                        </Button>
                        <span className="font-medium w-8 text-center">{inCart}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateCartQuantity(item.id, inCart + 1)}
                          disabled={!canAdd}
                          className="h-8 w-8 p-0"
                        >
                          +
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => addToCart(item)}
                    disabled={!canAdd}
                  >
                    {inCart > 0 ? `Add More (${inCart} in cart)` : 'Add to Cart'}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Cart Summary */}
      <div className="space-y-4">
        <Card className="bg-white/95 backdrop-blur border-2 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Cart 🛒</span>
              <Badge variant="secondary">{cartItems.length} items</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                Your cart is empty<br />
                Add some delicious items! 🍽️
              </p>
            ) : (
              <>
                {cartItems.map((item: CartItem) => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-xs text-gray-600">
                        {formatPrice(item.price)} × {item.cartQuantity}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-orange-600 text-sm">
                        {formatPrice(item.price * item.cartQuantity)}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-orange-600">{formatPrice(cartTotal)}</span>
                  </div>
                  
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Your Balance:</span>
                      <span className={balance >= cartTotal ? 'text-green-600' : 'text-red-600'}>
                        {formatPrice(balance)}
                      </span>
                    </div>
                    {spendingLimit && (
                      <div className="flex justify-between">
                        <span>Spending Limit:</span>
                        <span>{formatPrice(spendingLimit)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {!isCartValid && cartItems.length > 0 && (
                  <Alert className="bg-red-50 border-red-200">
                    <AlertDescription className="text-red-800 text-sm">
                      {balance < cartTotal ? '💰 Insufficient balance' : '🚫 Exceeds spending limit'}
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </CardContent>
          <CardFooter className="space-y-2">
            {cartItems.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="w-full"
              >
                Clear Cart 🗑️
              </Button>
            )}
            <Button
              className="w-full"
              onClick={placeOrder}
              disabled={!isCartValid || isPlacingOrder}
            >
              {isPlacingOrder ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Placing Order...</span>
                </div>
              ) : (
                `Place Order ${cartTotal > 0 ? formatPrice(cartTotal) : ''} 📋`
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}