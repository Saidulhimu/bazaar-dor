"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <p className="text-gray-600 mb-4">আপনি লগইন করেননি।</p>
        <Link href="/signin" className="btn btn-success text-white">
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  // ৩. Session আছে
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-white shadow-md border border-gray-100">
        <div className="card-body items-center text-center">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name}
              className="w-20 h-20 rounded-full"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-green-100 text-green-700 text-3xl font-bold flex items-center justify-center">
              {session.user.name?.charAt(0) || "U"}
            </div>
          )}

          <h1 className="text-xl font-bold text-gray-900 mt-4">
            {session.user.name}
          </h1>
          <p className="text-gray-500 text-sm">{session.user.email}</p>

          <Link
            href="/profile/update"
            className="btn btn-success text-white mt-6 w-full"
          >
            তথ্য আপডেট করুন
          </Link>
        </div>
      </div>
    </div>
  );
}