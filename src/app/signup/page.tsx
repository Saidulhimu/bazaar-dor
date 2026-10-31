"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটো মিলছে না!");
      return;
    }

    setLoading(true);
    const { error } = await signUp.email({ name, email, password });

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
    <div className="max-w-md mx-auto py-12">
      <div className="card bg-white shadow-md border border-gray-100">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="text-center text-sm text-gray-500 mb-6">
            নিচে তথ্য দিয়ে সাইন আপ করে শুরু করুন
          </p>

          <form onSubmit={handleEmailSignUp} className="flex flex-col gap-3">
            <div>
              <label className="label py-1">
                <span className="label-text text-sm">নাম</span>
              </label>
              <input
                type="text"
                placeholder="আপনার নাম"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input input-bordered w-full"
              />
            </div>
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
                placeholder="কমপক্ষে ৮ অক্ষর"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label py-1">
                <span className="label-text text-sm">পাসওয়ার্ড নিশ্চিত করুন</span>
              </label>
              <input
                type="password"
                placeholder="আবার লিখুন"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                "অ্যাকাউন্ট তৈরি করুন"
              )}
            </button>
          </form>

          <div className="divider text-xs text-gray-400">অথবা</div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleGoogleSignUp}
              type="button"
              className="btn btn-outline btn-sm gap-2"
            >
              <FcGoogle size={18} /> Google
            </button>
            <button
              onClick={handleGithubSignUp}
              type="button"
              className="btn btn-outline btn-sm gap-2"
            >
              <FaGithub size={18} /> GitHub
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-5">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="text-green-700 font-medium">
              সাইন ইন করুন
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