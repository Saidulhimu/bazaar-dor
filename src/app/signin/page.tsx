"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn.email({
      email,
      password,
      callbackURL: callbackUrl,
    });

    if (error) {
      toast.error(error.message || "সাইন ইন ব্যর্থ!");
      setLoading(false);
    } else {
      toast.success("সাইন ইন সফল! ");
      router.push(callbackUrl);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn.social({ provider: "google", callbackURL: callbackUrl });
  };

  const handleGithubSignIn = async () => {
    await signIn.social({ provider: "github", callbackURL: callbackUrl });
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="card bg-white shadow-md border border-gray-100">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            সাইন ইন
          </h1>
          <p className="text-center text-sm text-gray-500 mb-6">
            নিবন্ধিত ইমেইল ও পাসওয়ার্ড দিয়ে প্রোফাইল অ্যাক্সেস করুন
          </p>

          <form onSubmit={handleEmailSignIn} className="flex flex-col gap-3">
            <div>
              <label className="label py-1">
                <span className="label-text text-sm">ইমেইল</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label py-1">
                <span className="label-text text-sm">পাসওয়ার্ড</span>
              </label>
              <input
                type="password"
                placeholder="আপনার পাসওয়ার্ড"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-success text-white w-full mt-2"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "সাইন ইন"
              )}
            </button>
          </form>

          <div className="divider text-xs text-gray-400">অথবা</div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="btn btn-outline btn-sm gap-2"
            >
              <FcGoogle size={18} /> Google
            </button>
            <button
              onClick={handleGithubSignIn}
              type="button"
              className="btn btn-outline btn-sm gap-2"
            >
              <FaGithub size={18} /> GitHub
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-5">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="text-green-700 font-medium">
              সাইন আপ করুন
            </Link>
          </p>
        </div>
      </div>

      <p className="text-center text-sm text-gray-400 mt-4">
        <Link href="/" className="hover:text-gray-600">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">লোড হচ্ছে...</div>}>
      <SignInForm />
    </Suspense>
  );
}