"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.updateUser({
      name: name ?? session?.user?.name ?? "",
    });

    if (error) {
      toast.error("আপডেট ব্যর্থ!");
    } else {
      toast.success("প্রোফাইল আপডেট হয়েছে! 🎉");
      router.push("/profile");
    }
    setLoading(false);
  };

  if (!session) return null;

  const avatarUrl =
    session.user.image ||
    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
      session.user.name || session.user.email
    )}&backgroundColor=16a34a`;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-xl font-bold text-gray-900 mb-1">আমার প্রোফাইল</h1>
      <p className="text-sm text-gray-500 mb-4">
        আপনার অ্যাকাউন্টের তথ্য এখানে পরিবর্তন করুন
      </p>

      <div className="card bg-white shadow-sm border border-gray-100 overflow-hidden mb-4">
        <div className="h-24 bg-gray-200"></div>
        <div className="card-body flex-row items-center gap-3 -mt-2">
          <img
            src={avatarUrl}
            alt={session.user.name || "User"}
            className="w-16 h-16 rounded-full border-4 border-white shadow"
          />
          <div>
            <p className="font-semibold text-gray-900">{session.user.name}</p>
            <p className="text-sm text-gray-500">{session.user.email}</p>
          </div>
        </div>
      </div>

      <div className="card bg-white shadow-sm border border-gray-100">
        <div className="card-body">
          <h2 className="font-semibold text-gray-900 mb-4">তথ্য</h2>
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div>
              <label className="label py-1">
                <span className="label-text text-sm">নাম</span>
              </label>
              <input
                type="text"
                value={name ?? session.user.name ?? ""}
                onChange={(e) => setName(e.target.value)}
                required
                className="input input-bordered w-full"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-success text-white w-full"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "আপডেট করুন"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}