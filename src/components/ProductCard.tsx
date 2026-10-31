import Link from "next/link";
import { formatPrice, getUnitBn, type Product } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const badgeClass =
    product.change.dir === "up"
      ? "badge-error"
      : product.change.dir === "down"
      ? "badge-success"
      : "badge-ghost";

  const arrow =
    product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="card bg-white shadow-sm hover:shadow-md transition border border-gray-100"
    >
      <div className="card-body p-4">
        <div className="text-4xl text-center mb-2">{product.image}</div>
        <h3 className="font-semibold text-gray-900 text-center">
          {product.nameBn}
        </h3>
        <p className="text-xs text-gray-500 text-center">
          {getUnitBn(product.unit)}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-xs text-gray-400">আজকের দাম</p>
            <p className="font-bold text-gray-900">
              {formatPrice(product.today)} টাকা
            </p>
          </div>
          <span className={`badge ${badgeClass}`}>
            {arrow} {product.change.pct}%
          </span>
        </div>
      </div>
    </Link>
  );
}