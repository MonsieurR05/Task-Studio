"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!prompt.trim()) return;
    const userMsg = { role: "user", text: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const reply =
        data.response ||
        data.raw?.result?.response ||
        "Sorry, I couldn’t understand that.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: reply },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "⚠️ Error contacting AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition"
      >
        <MessageCircle size={22} />
      </button>

      {/* AI Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 w-96 bg-[#111319] border border-gray-800 rounded-2xl shadow-xl flex flex-col overflow-hidden"
          >
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800 bg-[#181b22]">
              <h3 className="text-sm font-semibold text-gray-200">
                🤖 TaskStudio AI Assistant
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-300"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center">
                  Ask me to create, edit, or summarize tasks!
                </p>
              ) : (
                messages.map((m, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-md ${
                      m.role === "user"
                        ? "bg-indigo-600/20 text-indigo-300 self-end"
                        : "bg-gray-800 text-gray-200"
                    }`}
                  >
                    {m.text}
                  </div>
                ))
              )}
              {loading && (
                <p className="text-xs text-gray-500">Thinking...</p>
              )}
            </div>

            <div className="border-t border-gray-800 p-3 flex gap-2">
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendPrompt()}
                className="flex-1 bg-[#1a1d24] text-gray-200 text-sm px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ask AI something..."
              />
              <button
                onClick={sendPrompt}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
