"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { type Category } from "@/lib/utils";
import BanglaDate from "./BanglaDate";
import PriceTicker from "./PriceTicker";

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories"
        );
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল!");
          router.push("/");
        },
      },
    });
  };

  const avatarUrl = session
    ? session.user.image ||
      `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
        session.user.name || session.user.email
      )}&backgroundColor=16a34a`
    : "";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="bg-green-600 text-white rounded-lg w-8 h-8 flex items-center justify-center text-lg">
            🛒
          </span>
          <span className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">বাজার দর</span>
            <BanglaDate className="text-xs text-gray-400" />
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-3 ">
          {isPending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : session ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost gap-2 px-2">
                <Image
                  src={avatarUrl}
                  alt=""
                  width={28}
                  height={28}
                  unoptimized
                  className="w-7 h-7 rounded-full"
                />
                <span className="font-medium text-gray-700">
                  {session.user.name?.split(" ")[0] || "প্রোফাইল"}
                </span>
                <span className="text-xs text-gray-400">▾</span>
              </div>
              <ul className="dropdown-content menu bg-white rounded-box z-10 w-56 p-2 shadow-lg border mt-2">
                <li className="px-3 py-2 border-b border-gray-50 mb-1 pointer-events-none">
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-gray-900">
                      {session.user.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {session.user.email}
                    </span>
                  </div>
                </li>
                <li>
                  <Link href="/profile">👤 আমার প্রোফাইল</Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="text-red-600">
                    ↪ সাইন আউট
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-success btn-sm text-white">
                সাইন আপ
              </Link>
            </>
          )}
        </div>

        <button
          className="lg:hidden btn btn-ghost btn-sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      <nav className="hidden lg:block border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 overflow-x-auto py-2">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`text-sm whitespace-nowrap px-3 py-1.5 rounded-full transition ${
                  isActive
                    ? "bg-green-600 text-white font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat.icon} {cat.nameBn}
              </Link>
            );
          })}
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 px-4 py-3 space-y-2">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`block text-sm py-1.5 px-2 rounded-lg ${
                  isActive ? "bg-green-600 text-white" : "text-gray-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.icon} {cat.nameBn}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-gray-100 flex gap-2">
            {session ? (
              <>
                <Link href="/profile" className="btn btn-ghost btn-sm flex-1">
                  প্রোফাইল
                </Link>
                <button
                  onClick={handleSignOut}
                  className="btn btn-sm flex-1 text-red-600"
                >
                  সাইন আউট
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" className="btn btn-ghost btn-sm flex-1">
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="btn btn-success btn-sm flex-1 text-white"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <PriceTicker />
    </header>
  );
}