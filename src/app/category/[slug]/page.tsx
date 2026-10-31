"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";
import { type Product, type Category } from "@/lib/utils";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(false);
      try {
        const [productsRes, categoryRes] = await Promise.all([
          fetch(
            `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`
          ),
          fetch(
            `https://openapi.programming-hero.com/api/bazardor/categories/${slug}`
          ),
        ]);

        if (!categoryRes.ok) {
          setError(true);
          setLoading(false);
          return;
        }

        const productsData: Product[] = await productsRes.json();
        const categoryData: Category = await categoryRes.json();

        setProducts(productsData);
        setCategory(categoryData);
      } catch (err) {
        console.error("Failed to fetch category data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return a.today - b.today;
    if (sortBy === "price-desc") return b.today - a.today;
    return 0;
  });

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-8">
        <div className="skeleton h-20 w-full mb-6 rounded-lg"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton h-28 w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !category || products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-16 text-center">
        <p className="text-5xl mb-4">🔍</p>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          কোনো পণ্য পাওয়া যায়নি
        </h2>
        <p className="text-gray-500 mb-6">এই ক্যাটাগরিতে এখন কোনো তথ্য নেই।</p>
        <Link href="/" className="btn btn-success text-white">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // Success state
  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="card bg-white border border-gray-100 shadow-sm mb-4">
        <div className="card-body p-5">
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-2xl">{category.icon}</span> {category.nameBn}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            এই ক্যাটাগরির সব পণ্যের তালিকা ও আজকের দাম
          </p>
        </div>
      </div>

      <div className="flex justify-end items-center gap-2 mb-4">
        <span className="text-sm text-gray-500">সাজান</span>
        <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}