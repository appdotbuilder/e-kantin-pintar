import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { trpc } from '@/utils/trpc';
import type { MenuItem } from '../../../server/src/schema';

export function MenuBrowser() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const loadMenuItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const items = await trpc.getMenuItems.query();
      setMenuItems(items);
    } catch (error) {
      console.error('Failed to load menu items:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMenuItems();
  }, [loadMenuItems]);

  const filteredItems = menuItems.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const categories = ['all', 'main_course', 'snack', 'beverage', 'dessert'];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'main_course': return '🍱';
      case 'snack': return '🍿';
      case 'beverage': return '🥤';
      case 'dessert': return '🍨';
      default: return '🍽️';
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

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading delicious menu items...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🍽️ Today's Menu</h2>
        <p className="text-gray-600">Discover fresh and delicious meals prepared daily</p>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-blue-50 border border-blue-200">
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <span>{getCategoryIcon(category)}</span>
              <span className="hidden sm:inline">{getCategoryName(category)}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-6">
            {filteredItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No items available in this category yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item: MenuItem) => (
                  <Card 
                    key={item.id} 
                    className="hover:shadow-lg transition-all duration-200 border-0 bg-white/90 backdrop-blur shadow-light-blue hover:shadow-light-blue-lg"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1">{item.name}</CardTitle>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge 
                              variant="secondary" 
                              className="bg-blue-100 text-blue-800 border-blue-200"
                            >
                              {getCategoryIcon(item.category)} {getCategoryName(item.category)}
                            </Badge>
                            <Badge 
                              variant={item.stock_quantity > 0 ? "default" : "destructive"}
                              className={item.stock_quantity > 0 ? "bg-green-100 text-green-800 border-green-200" : ""}
                            >
                              {item.stock_quantity > 0 ? `${item.stock_quantity} left` : 'Out of stock'}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {formatPrice(item.price)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {item.description && (
                        <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {item.description}
                        </CardDescription>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Added: {item.created_at.toLocaleDateString('id-ID')}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          disabled={item.stock_quantity === 0}
                          className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                        >
                          {item.stock_quantity > 0 ? '🛒 Add to Order' : '❌ Unavailable'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <div className="text-center py-6 border-t border-blue-100">
        <p className="text-sm text-gray-600 mb-2">
          💡 <strong>Pro tip:</strong> Login to place orders and enjoy cashless payments!
        </p>
        <p className="text-xs text-gray-500">
          Fresh meals prepared daily • Halal certified • Nutritious ingredients
        </p>
      </div>
    </div>
  );
}