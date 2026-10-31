"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ!");
      setLoading(false);
    } else {
      toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন।");
      router.push("/signin");
    }
  };

  const handleGoogleSignUp = async () => {
    await signIn.social({ provider: "google", callbackURL: "/" });
  };

  const handleGithubSignUp = async () => {
    await signIn.social({ provider: "github", callbackURL: "/" });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-white shadow-md border border-gray-100">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
            রেজিস্টার করুন
          </h1>

          <div className="flex flex-col gap-2 mb-4">
            <button
              onClick={handleGoogleSignUp}
              type="button"
              className="btn btn-outline w-full"
            >
              🔵 Google দিয়ে রেজিস্টার
            </button>
            <button
              onClick={handleGithubSignUp}
              type="button"
              className="btn btn-outline w-full"
            >
              ⚫ GitHub দিয়ে রেজিস্টার
            </button>
          </div>

          <div className="divider text-xs text-gray-400">অথবা ইমেইল দিয়ে</div>

          <form onSubmit={handleEmailSignUp} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="নাম"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="ইমেইল"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full"
            />
            <input
              type="password"
              placeholder="পাসওয়ার্ড"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="input input-bordered w-full"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn btn-success text-white w-full"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "রেজিস্টার"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            আগে থেকে অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="text-green-700 font-medium">
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}