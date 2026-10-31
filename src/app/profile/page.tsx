"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <p className="text-gray-600 mb-4">আপনি লগইন করেননি।</p>
        <Link href="/signin" className="btn btn-success text-white">
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  const avatarUrl =
    session.user.image ||
    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
      session.user.name || session.user.email
    )}&backgroundColor=16a34a`;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-xl font-bold text-gray-900 mb-1">আমার প্রোফাইল</h1>
      <p className="text-sm text-gray-500 mb-4">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
      </p>

      <div className="card bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-24 bg-gray-200"></div>

        <div className="card-body flex-row items-center justify-between flex-wrap gap-3 -mt-2">
          <div className="flex items-center gap-3">
            <Image
              src={avatarUrl}
              alt={session.user.name || "User"}
              width={64}
              height={64}
              unoptimized
              className="w-16 h-16 rounded-full border-4 border-white shadow"
            />
            <div>
              <p className="font-semibold text-gray-900">{session.user.name}</p>
              <p className="text-sm text-gray-500">{session.user.email}</p>
            </div>
          </div>
          <Link
            href="/profile/update"
            className="btn btn-sm bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
          >
            ✏️ প্রোফাইল এডিট
          </Link>
        </div>
      </div>
    </div>
  );
}