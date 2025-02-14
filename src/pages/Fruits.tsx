
import { useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import { Product, CartItem } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const products: Product[] = [
  {
    id: 1,
    name: "Fresh Apples",
    price: 120,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 3,
    name: "Ripe Bananas",
    price: 60,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 6,
    name: "Sweet Oranges",
    price: 100,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 7,
    name: "Kimb",
    price: 60,
    category: "Fruits",
    image: "/lovable-uploads/f53b054c-4d95-49df-a190-2f047be2ae7d.png",
  },
  {
    id: 8,
    name: "Fresh Strawberries",
    price: 180,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 9,
    name: "Premium Walnuts",
    price: 850,
    category: "Dry Fruits",
    image: "/lovable-uploads/f25493b1-e7f7-49f4-a74a-56ea2dc644b7.png",
  },
  {
    id: 10,
    name: "Sweet Cherries",
    price: 400,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1528821154947-1aa3d1b74941?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 11,
    name: "Ripe Pears",
    price: 160,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 12,
    name: "Premium Almonds",
    price: 900,
    category: "Dry Fruits",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 13,
    name: "Fresh Apricots",
    price: 220,
    category: "Fruits",
    image: "/lovable-uploads/3542fba2-eb2b-48b6-8e5c-c0647d299345.png",
  },
  {
    id: 14,
    name: "Premium Saffron",
    price: 1500,
    category: "Spices",
    image: "/lovable-uploads/21aec9ac-aa2a-4466-95ff-dbb8db795e86.png",
  },
  {
    id: 15,
    name: "Sweet Mangoes",
    price: 200,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 16,
    name: "Fresh Citrus",
    price: 140,
    category: "Fruits",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=3000",
  },
  {
    id: 17,
    name: "Natural Honey",
    price: 450,
    category: "Natural Products",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=3000",
  }
];

const Fruits = () => {
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
          <h1 className="font-playfair text-5xl font-bold text-gray-800 mb-4 tracking-tight">
            Fresh Fruits
          </h1>
          <p className="font-poppins text-gray-600 max-w-2xl mx-auto">
            Discover fresh, locally sourced fruits delivered right to your doorstep.
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

export default Fruits;
