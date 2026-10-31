"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Feature 2: Email Sign In
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
      toast.success("সাইন ইন সফল! 🎉");
      router.push(callbackUrl);
    }
  };

  // Feature 3: Social Sign In
  const handleGoogleSignIn = async () => {
    await signIn.social({ provider: "google", callbackURL: callbackUrl });
  };

  const handleGithubSignIn = async () => {
    await signIn.social({ provider: "github", callbackURL: callbackUrl });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-white shadow-md border border-gray-100">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
            সাইন ইন করুন
          </h1>

          {/* Feature 4: Social login buttons — উপরে */}
          <div className="flex flex-col gap-2 mb-4">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="btn btn-outline w-full"
            >
              🔵 Google দিয়ে সাইন ইন
            </button>
            <button
              onClick={handleGithubSignIn}
              type="button"
              className="btn btn-outline w-full"
            >
              ⚫ GitHub দিয়ে সাইন ইন
            </button>
          </div>

          {/* Divider */}
          <div className="divider text-xs text-gray-400">অথবা ইমেইল দিয়ে</div>

          {/* Email/Password form */}
          <form onSubmit={handleEmailSignIn} className="flex flex-col gap-3">
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
                "সাইন ইন"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="text-green-700 font-medium">
              রেজিস্টার করুন
            </Link>
          </p>
        </div>
      </div>
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