"use client";

import { useState, useEffect } from "react";
import { formatPrice, type Product } from "@/lib/utils";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products"
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products for ticker:", error);
      }
    }
    fetchProducts();
  }, []);

  if (products.length === 0) return null;

  const tickerItems = [...products, ...products];

  return (
    <div className="bg-gray-50 border-t border-b border-gray-100 overflow-hidden py-2">
      <div className="flex animate-marquee whitespace-nowrap pl-4">
        {tickerItems.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex items-center gap-1.5 mr-6 text-sm"
          >
            <span>{product.image}</span>
            <span className="font-medium text-gray-700">{product.nameBn}</span>
            <span className="text-gray-900">{formatPrice(product.today)} টাকা</span>
            {product.change.dir === "up" && (
              <span className="text-red-600">▲ {product.change.pct}%</span>
            )}
            {product.change.dir === "down" && (
              <span className="text-green-600">▼ {product.change.pct}%</span>
            )}
            {product.change.dir === "flat" && (
              <span className="text-gray-400">— {product.change.pct}%</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}