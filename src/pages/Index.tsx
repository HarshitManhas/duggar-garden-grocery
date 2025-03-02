
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import { Product, CartItem } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Carrot, Apple } from "lucide-react";

const products: Product[] = [
  {
    id: 1,
    name: "Fresh Apples",
    price: 120,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 2,
    name: "Organic Carrots",
    price: 40,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 3,
    name: "Ripe Bananas",
    price: 60,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 4,
    name: "Fresh Tomatoes",
    price: 80,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 5,
    name: "Green Spinach",
    price: 30,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 6,
    name: "Sweet Oranges",
    price: 100,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=3000",
  },
];

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCartClick={() => setIsCartOpen(true)}
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Fresh from Farm to Your Table
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Discover fresh, locally sourced fruits and vegetables delivered right to your doorstep.
            Support local farmers while enjoying the finest produce.
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            <Link to="/vegetables">
              <Button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 text-lg">
                <Carrot className="mr-2 h-6 w-6" />
                Browse Vegetables
              </Button>
            </Link>
            <Link to="/fruits">
              <Button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 text-lg">
                <Apple className="mr-2 h-6 w-6" />
                Browse Fruits
              </Button>
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default Index;
