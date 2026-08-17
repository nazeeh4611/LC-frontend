"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { CartItem, Product } from "@/types";

const STORAGE_KEY = "lc_cart_v1";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => { ok: boolean; message?: string };
  removeItem: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, quantity = product.minimumOrderQuantity || 1) => {
    if (product.isQuoteOnly || product.price === undefined) {
      return { ok: false, message: "This is a quote-only product. Please submit a quote request instead." };
    }
    if (product.stock <= 0) {
      return { ok: false, message: "This product is currently out of stock." };
    }

    let result = { ok: true, message: undefined as string | undefined };

    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product._id);
      const requestedQty = (existing?.quantity ?? 0) + quantity;

      if (requestedQty > product.stock) {
        result = { ok: false, message: `Only ${product.stock} units of "${product.name}" are available.` };
        return prev;
      }
      if (requestedQty < product.minimumOrderQuantity) {
        result = {
          ok: false,
          message: `"${product.name}" requires a minimum order quantity of ${product.minimumOrderQuantity}.`,
        };
        return prev;
      }

      if (existing) {
        return prev.map((i) => (i.productId === product._id ? { ...i, quantity: requestedQty } : i));
      }

      return [
        ...prev,
        {
          productId: product._id,
          slug: product.slug,
          name: product.name,
          sku: product.sku,
          image: product.thumbnail ?? product.images[0]?.url,
          price: product.price!,
          quantity: requestedQty,
          minimumOrderQuantity: product.minimumOrderQuantity || 1,
          stock: product.stock,
        },
      ];
    });

    return result;
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const increaseQuantity = useCallback((productId: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity: Math.min(i.stock, i.quantity + 1) } : i
      )
    );
  }, []);

  const decreaseQuantity = useCallback((productId: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId
          ? { ...i, quantity: Math.max(i.minimumOrderQuantity, i.quantity - 1) }
          : i
      )
    );
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId
          ? { ...i, quantity: Math.min(i.stock, Math.max(i.minimumOrderQuantity, quantity)) }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    setQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
