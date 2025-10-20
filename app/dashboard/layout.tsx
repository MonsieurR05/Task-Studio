"use client";


import AIAssistant from "@/components/AIAssistant";
import Sidebar from "@/components/Sidebar";
import { Bell, UserCircle } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#0f1116] text-gray-100">
      {/* Sidebar */}
      <Sidebar /> 

      {/* Main Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-gray-800 bg-[#12141b]/80 backdrop-blur">
          <h1 className="text-base font-semibold text-gray-200 tracking-tight">
            Task Management System
          </h1>
          <div className="flex items-center gap-4">
            <button className="hover:text-indigo-400 transition">
              <Bell size={18} />
            </button>
            <div className="h-7 w-px bg-gray-700" />
            <button className="flex items-center gap-2 hover:text-indigo-400 transition">
              <UserCircle size={22} />
              <span className="text-sm font-medium text-gray-300">Profile</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto relative">
          {children}

          {/* AI Assistant always accessible in dashboard */}
          <div className="fixed bottom-6 right-6">
            <AIAssistant />
          </div>
        </main>
      </div>
    </div>
  );
}
