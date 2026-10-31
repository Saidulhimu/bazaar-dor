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
    <div className="max-w-5xl mx-auto py-8">
      {/* ===== Section 1: Breadcrumb ===== */}
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
        <div className="card-body flex-row items-center justify-between flex-wrap gap-4">
          <div className="flex items-start gap-4">
            <span className="text-5xl">{product.image}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {product.categoryNameBn} · {getUnitBn(product.unit)}
              </p>
            </div>
          </div>
          <div className="text-right bg-gray-50 rounded-lg px-5 py-3 border border-gray-100">
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(product.today)}
            </p>
            <p className="text-xs text-gray-400">
              টাকা / {getUnitBn(product.unit)}
            </p>
            <span className={`badge ${badgeClass} mt-1`}>
              {arrow} {product.change.pct}%
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <PriceStatCard
            label="সর্বনিম্ন"
            value={minPrice}
            color="text-green-600"
            note="সবচেয়ে কম দামে বাজার"
          />
          <PriceStatCard
            label="সর্বোচ্চ"
            value={maxPrice}
            color="text-red-600"
            note="সবচেয়ে বেশি দামে বাজার"
          />
          <PriceStatCard
            label="গড়"
            value={avgPrice}
            color="text-gray-900"
            note="প্রতি কেজি এর গড় দাম"
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="overflow-x-auto bg-white border border-gray-100 rounded-lg">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th>সর্বনিম্ন</th>
                <th>সর্বোচ্চ</th>
                <th>গড়</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((market, idx) => (
                <tr key={idx}>
                  <td>{market.market}</td>
                  <td>{market.division}</td>
                  <td>{formatPrice(market.min)} টাকা</td>
                  <td>{formatPrice(market.max)} টাকা</td>
                  <td>
                    {formatPrice(Math.round((market.min + market.max) / 2))} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3">মূল্য তুলনা</h2>
        <div className="overflow-x-auto bg-white border border-gray-100 rounded-lg">
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

function PriceStatCard({
  label,
  value,
  color,
  note,
}: {
  label: string;
  value: number;
  color: string;
  note: string;
}) {
  return (
    <div className="card bg-white border border-gray-100 shadow-sm">
      <div className="card-body p-4 text-center">
        <p className="text-xs text-gray-500">{label}</p>
        <p className={`text-lg font-bold ${color}`}>
          {formatPrice(value)} টাকা
        </p>
        <p className="text-[11px] text-gray-400">{note}</p>
      </div>
    </div>
  );
}