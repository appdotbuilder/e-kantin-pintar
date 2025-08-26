import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { trpc } from '@/utils/trpc';
import type { MenuItem } from '../../../server/src/schema';

export function MenuBrowser() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      // NOTE: This is a stub implementation since menu endpoints are not implemented yet
      // In a real implementation, this would call trpc.getMenuItems.query()
      
      // Mock menu data for demonstration
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

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMenuItems(mockMenuItems);
    } catch (error) {
      console.error('Failed to load menu items:', error);
    } finally {
      setIsLoading(false);
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

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'main_course': return 'Main Course';
      case 'snack': return 'Snacks';
      case 'beverage': return 'Beverages';
      case 'dessert': return 'Desserts';
      default: return 'All Items';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getAvailabilityBadge = (item: MenuItem) => {
    if (!item.is_available) {
      return <Badge variant="secondary" className="bg-gray-100">Not Available</Badge>;
    }
    if (item.stock_quantity === 0) {
      return <Badge variant="destructive">Sold Out</Badge>;
    }
    if (item.stock_quantity <= 5) {
      return <Badge variant="outline" className="border-orange-300 text-orange-600">Low Stock</Badge>;
    }
    return <Badge variant="default" className="bg-green-100 text-green-700 border-green-200">Available</Badge>;
  };

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter((item: MenuItem) => item.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading delicious menu...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Today's Menu 📋</h2>
        <p className="text-gray-600">Discover our delicious Indonesian cuisine</p>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="all" className="flex items-center space-x-1">
            <span>🍴</span>
            <span>All</span>
          </TabsTrigger>
          <TabsTrigger value="main_course" className="flex items-center space-x-1">
            <span>🍽️</span>
            <span>Main</span>
          </TabsTrigger>
          <TabsTrigger value="snack" className="flex items-center space-x-1">
            <span>🥙</span>
            <span>Snacks</span>
          </TabsTrigger>
          <TabsTrigger value="beverage" className="flex items-center space-x-1">
            <span>🥤</span>
            <span>Drinks</span>
          </TabsTrigger>
          <TabsTrigger value="dessert" className="flex items-center space-x-1">
            <span>🍨</span>
            <span>Desserts</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory}>
          {filteredItems.length === 0 ? (
            <Alert>
              <AlertDescription>
                No items available in this category yet. Check back soon!
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item: MenuItem) => (
                <Card key={item.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/90 backdrop-blur border-0">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{getCategoryIcon(item.category)}</span>
                      {getAvailabilityBadge(item)}
                    </div>
                    <CardTitle className="text-lg text-gray-900">{item.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-600 line-clamp-2">
                      {item.description || 'Delicious Indonesian cuisine'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-orange-600">
                        {formatPrice(item.price)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Stock: {item.stock_quantity}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      disabled={!item.is_available || item.stock_quantity === 0}
                      variant="outline"
                    >
                      {item.is_available && item.stock_quantity > 0 ? (
                        '🔐 Login to Order'
                      ) : (
                        'Currently Unavailable'
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}