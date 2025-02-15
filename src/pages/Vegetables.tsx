
import { useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import { Product, CartItem } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const products: Product[] = [
  {
    id: 2,
    name: "Organic Carrots",
    price: 40,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=3000",
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
    id: 18,
    name: "Fresh Broccoli",
    price: 70,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 19,
    name: "Bell Peppers",
    price: 90,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa91?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 20,
    name: "Fresh Cucumber",
    price: 45,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 21,
    name: "Purple Eggplant",
    price: 65,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1613884823276-964edc7d8ce6?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 22,
    name: "Green Lettuce",
    price: 35,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1622205313162-be1d5712a43f?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 23,
    name: "Fresh Cauliflower",
    price: 75,
    category: "Vegetables",
    image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&q=80&w=3000",
  }
];

const Vegetables = () => {
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
            Fresh Vegetables
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover fresh, locally sourced vegetables delivered right to your doorstep.
            Support local farmers while enjoying the finest produce.
          </p>
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

export default Vegetables;
