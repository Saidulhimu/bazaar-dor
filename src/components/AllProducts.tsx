import ProductCard from "./ProductCard";
import { type Product } from "@/lib/utils";

export default function AllProducts({ products }: { products: Product[] }) {
  const limitedProducts = products.slice(0, 12);

  return (
    <section id="সব-পণ্য" className="max-w-7xl mx-auto px-4 py-8 scroll-mt-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">সব পণ্য</h2>
      <p className="text-gray-500 text-sm mb-4">
        আজকের বাজারের সব পণ্যের দাম দেখুন
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {limitedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}