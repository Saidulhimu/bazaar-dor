"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { getBanglaDate, type Category } from "@/lib/utils";

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
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
          window.location.href = "/";
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className="text-xl font-bold text-green-700">
            🛒 বাজার দর
          </span>
          <span className="text-xs text-gray-500">{getBanglaDate()}</span>
        </Link>

        <div className="hidden lg:flex items-center gap-3">
          {isPending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : session ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                {session.user.name || "প্রোফাইল"}
              </div>
              <ul className="dropdown-content menu bg-white rounded-box z-10 w-48 p-2 shadow-lg border">
                <li>
                  <Link href="/profile">প্রোফাইল</Link>
                </li>
                <li>
                  <button onClick={handleSignOut}>সাইন আউট</button>
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
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4 overflow-x-auto py-2">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`text-sm whitespace-nowrap px-3 py-1 rounded-full transition ${
                  isActive
                    ? "bg-green-100 text-green-700 font-semibold"
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
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="block text-sm text-gray-700 py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              {cat.icon} {cat.nameBn}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 flex gap-2">
            {session ? (
              <>
                <Link href="/profile" className="btn btn-ghost btn-sm flex-1">
                  প্রোফাইল
                </Link>
                <button onClick={handleSignOut} className="btn btn-sm flex-1">
                  সাইন আউট
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" className="btn btn-ghost btn-sm flex-1">
                  সাইন ইন
                </Link>
                <Link href="/signup" className="btn btn-success btn-sm flex-1 text-white">
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}