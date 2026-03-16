import { useState, useCallback, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/Sidebar";
import { CursorTrail } from "@/components/layout/CursorTrail";
import { GradientMesh } from "@/components/shared/GradientMesh";
import { SearchOverlay } from "@/components/shared/SearchOverlay";
import { CartDrawer } from "@/components/sections/CartDrawer";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";
import { Home } from "@/pages/Home";
import { useScrollSection } from "@/hooks/use-scroll-section";
import type { Product, CartItem } from "@/lib/mock-data";

const queryClient = new QueryClient();

function AppContent() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { activeSection } = useScrollSection();

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !searchOpen && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [searchOpen]);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((productId: number, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, qty } : item
        )
      );
    }
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="relative min-h-screen">
      {/* Background gradient mesh */}
      <GradientMesh />

      {/* Cursor particle trail */}
      <CursorTrail />

      {/* Fixed sidebar navigation */}
      <Sidebar
        onSearchClick={() => setSearchOpen(true)}
        onCartClick={() => setCartOpen(true)}
        cartCount={cartCount}
      />

      {/* Main content area — offset by sidebar width */}
      <main className="ml-16 relative z-10">
        <Home onAddToCart={addToCart} />
      </main>

      {/* Search overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Cart drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
      />

      {/* WhatsApp floating button */}
      <WhatsAppFloat activeSection={activeSection} />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
