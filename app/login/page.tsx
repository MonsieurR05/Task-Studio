"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res?.error) {
      toast.success("✅ Logged in successfully!");
      setTimeout(() => router.push("/dashboard"), 1000);
    } else {
      toast.error("Invalid email or password.");
    }

    setLoading(false);
  };

  return (
    <main className="flex items-center justify-center h-screen bg-[#0f1116] text-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-[#14161c] p-8 rounded-xl border border-gray-800 w-96 space-y-4 shadow-lg shadow-black/30"
      >
        <h1 className="text-2xl font-bold text-center mb-2">Sign In</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed text-white py-2 rounded-md font-semibold transition-all duration-150"
        >
          {loading ? (
            <>
              <Spinner /> Signing in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-400 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </main>
  );
}
