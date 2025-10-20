"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        toast.success("🎉 Account created successfully!");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        const data = await res.json();
        toast.error(data.error || "Signup failed. Try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex items-center justify-center h-screen bg-[#0f1116] text-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-[#14161c] p-8 rounded-xl border border-gray-800 w-96 space-y-4 shadow-lg shadow-black/30"
      >
        <h1 className="text-2xl font-bold text-center mb-2">Create Account</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
        />
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
              <Spinner /> Creating account...
            </>
          ) : (
            "Sign Up"
          )}
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-400 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </main>
  );
}
