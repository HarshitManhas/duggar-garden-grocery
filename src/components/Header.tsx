
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onCartClick: () => void;
  cartItemsCount: number;
}

const Header = ({ onCartClick, cartItemsCount }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Duggar Krishi Mart
        </h1>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onCartClick}
          className="relative"
        >
          <ShoppingCart className="h-6 w-6" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
