import ProductCard from "./ProductCard";
import { type Product } from "@/lib/utils";

export default function PriceFallers({ products }: { products: Product[] }) {
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct) 
    .slice(0, 6);

  if (fallers.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        আজ দাম কমেছে ▼
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {fallers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}