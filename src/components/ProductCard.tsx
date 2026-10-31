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
        <div className="flex items-center gap-3">
          <span className="text-3xl shrink-0">{product.image}</span>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {product.nameBn}
            </h3>
            <p className="text-xs text-gray-500">{getUnitBn(product.unit)}</p>
          </div>
        </div>
        <div className="flex items-end justify-between mt-3">
          <div>
            <p className="text-xs text-gray-400">আজকের দাম</p>
            <p className="font-bold text-gray-900">
              {formatPrice(product.today)} টাকা
            </p>
          </div>
          <span className={`badge ${badgeClass} gap-1`}>
            {arrow} {product.change.pct}%
          </span>
        </div>
      </div>
    </Link>
  );
}