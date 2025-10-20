import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "TaskStudio AI",
  description: "AI-powered project and task management dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f1116] text-gray-100">
        {/* ✅ Client-side context provider */}
        <SessionWrapper>
          {children}
          <Toaster position="bottom-right" />
        </SessionWrapper>
      </body>
    </html>
  );
}
