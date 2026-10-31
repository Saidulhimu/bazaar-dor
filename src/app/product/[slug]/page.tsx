import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getUnitBn, type Product } from "@/lib/utils";

async function getProduct(slug: string): Promise<Product | null> {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  const products: Product[] = await res.json();
  return products.find((p) => p.slug === slug) || null;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const marketsByDivision = product.markets.reduce((acc, market) => {
    if (!acc[market.division]) acc[market.division] = [];
    acc[market.division].push(market);
    return acc;
  }, {} as Record<string, typeof product.markets>);

  const allMins = product.markets.map((m) => m.min);
  const allMaxs = product.markets.map((m) => m.max);
  const minPrice = Math.min(...allMins);
  const maxPrice = Math.max(...allMaxs);
  const avgPrice = Math.round(
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      product.markets.length
  );

  const badgeClass =
    product.change.dir === "up"
      ? "badge-error"
      : product.change.dir === "down"
      ? "badge-success"
      : "badge-ghost";
  const arrow =
    product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li>
            <Link href={`/category/${product.category}`}>
              {product.categoryIcon} {product.categoryNameBn}
            </Link>
          </li>
          <li className="text-gray-500">{product.nameBn}</li>
        </ul>
      </div>

      <div className="card bg-white shadow-sm border border-gray-100 mb-6">
        <div className="card-body">
          <div className="flex items-start gap-4">
            <span className="text-5xl">{product.image}</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                আজকের বাজার সারসংক্ষেপ — {marketCountText(product)}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="badge badge-outline">
                  {product.categoryIcon} {product.categoryNameBn}
                </span>
                <span className="badge badge-outline">
                  {getUnitBn(product.unit)}
                </span>
                <span className={`badge ${badgeClass}`}>
                  {arrow} {product.change.pct}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <PriceStatCard label="সর্বনিম্ন" value={minPrice} />
        <PriceStatCard label="সর্বোচ্চ" value={maxPrice} />
        <PriceStatCard label="গড়" value={avgPrice} />
        <PriceStatCard label="আজকের দাম" value={product.today} highlight />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="space-y-6">
          {Object.entries(marketsByDivision).map(([division, markets]) => (
            <div key={division}>
              <h3 className="font-semibold text-gray-700 mb-2">{division}</h3>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>বাজার</th>
                      <th>সর্বনিম্ন</th>
                      <th>সর্বোচ্চ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {markets.map((market, idx) => (
                      <tr key={idx}>
                        <td>{market.market}</td>
                        <td>{formatPrice(market.min)} টাকা</td>
                        <td>{formatPrice(market.max)} টাকা</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          মূল্য তুলনা
        </h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>আজ</th>
                <th>গতকাল</th>
                <th>গত সপ্তাহ</th>
                <th>গত মাস</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold">
                  {formatPrice(product.today)} টাকা
                </td>
                <td>{formatPrice(product.yesterday)} টাকা</td>
                <td>{formatPrice(product.lastWeek)} টাকা</td>
                <td>{formatPrice(product.lastMonth)} টাকা</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function marketCountText(product: Product): string {
  return `${product.markets.length}টি বাজারের তথ্য`;
}

function PriceStatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`card border ${
        highlight
          ? "bg-green-50 border-green-200"
          : "bg-white border-gray-100"
      } shadow-sm`}
    >
      <div className="card-body p-4 text-center">
        <p className="text-xs text-gray-500">{label}</p>
        <p
          className={`text-lg font-bold ${
            highlight ? "text-green-700" : "text-gray-900"
          }`}
        >
          {formatPrice(value)} টাকা
        </p>
      </div>
    </div>
  );
}