import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        পেজটি পাওয়া যায়নি
      </h1>
      <p className="text-gray-500 mb-6">
        আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে অথবা ভুল লিংক দেওয়া
        হয়েছে।
      </p>
      <Link href="/" className="btn btn-success text-white">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}