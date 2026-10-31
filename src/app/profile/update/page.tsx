"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.updateUser({
      name: name,
    });

    if (error) {
      toast.error("আপডেট ব্যর্থ!");
    } else {
      toast.success("প্রোফাইল আপডেট হয়েছে...");
      router.push("/profile");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-white shadow-md border border-gray-100">
        <div className="card-body">
          <h1 className="text-xl font-bold text-gray-900 mb-6">
            তথ্য আপডেট করুন
          </h1>

          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div>
              <label className="label">
                <span className="label-text">নাম</span>
              </label>
              <input
                type="text"
                value={name}
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