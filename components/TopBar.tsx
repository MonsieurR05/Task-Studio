"use client";

import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useState } from "react";

export default function TopBar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.success("👋 Logged out successfully!");
    window.location.href = "/login";
  };

  return (
    <header className="w-full h-14 bg-[#14161c] border-b border-gray-800 flex items-center justify-between px-6">
      {/* Left side — title or breadcrumbs */}
      <h2 className="text-lg font-semibold text-gray-100">Dashboard</h2>

      {/* Right side — user info */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center space-x-2 hover:bg-gray-800 px-3 py-1 rounded-md transition"
        >
          <Image
            src={session?.user?.image || "https://api.dicebear.com/7.x/identicon/svg?seed=taskstudio"}
            alt="User avatar"
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="text-sm text-gray-300">{session?.user?.name || "User"}</span>
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-[#1a1c23] border border-gray-800 rounded-md shadow-lg">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
            >
              🚪 Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
