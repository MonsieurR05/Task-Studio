"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        "flex flex-col h-screen border-r border-gray-800 bg-[#14161c] transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo + collapse button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-600 rounded-md flex items-center justify-center font-bold text-white">
            🧠
          </div>
          {!collapsed && (
            <span className="font-semibold text-lg text-white">TaskStudio</span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-gray-200 transition"
          title="Collapse sidebar"
        >
          <ChevronLeft
            size={18}
            className={clsx(
              "transition-transform duration-300",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col flex-1 p-3 gap-1">
        {navItems.map(({ name, href, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={name}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all group",
                active
                  ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              )}
              title={collapsed ? name : undefined}
            >
              <Icon size={18} />
              {!collapsed && <span>{name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer (optional user avatar / version) */}
      <div className="border-t border-gray-800 p-3 text-xs text-gray-500 flex items-center justify-between">
        {!collapsed && <span>v1.0.0</span>}
        <div
          className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs"
          title="User"
        >
          N
        </div>
      </div>
    </aside>
  );
}
