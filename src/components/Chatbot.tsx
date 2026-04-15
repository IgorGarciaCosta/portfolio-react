import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChatbubbleEllipsesOutline, IoClose, IoSend } from "react-icons/io5";

interface Message {
  role: "user" | "model";
  text: string;
  isWelcome?: boolean;
}

const WELCOME_MESSAGE: Message = {
  role: "model",
  text: "Hi! I'm Igor's portfolio assistant. Ask me about his projects, skills, or experience!",
  isWelcome: true,
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    // Build history in Gemini format (exclude welcome + current message)
    const history = messages
      .filter((m) => !m.isWelcome)
      .map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "model", text: data.reply ?? "Error getting response." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Connection error. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* ---------- Toggle button ---------- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-toggle"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open chat"
            className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center
                       rounded-full bg-black text-white shadow-lg hover:bg-gray-800"
          >
            <IoChatbubbleEllipsesOutline className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ---------- Chat window ---------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-6 z-50 flex h-[450px] w-[350px] flex-col
                       rounded-2xl bg-black text-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between rounded-t-2xl border-b border-gray-800 px-4 py-3">
              <span className="text-sm font-semibold">Chat</span>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="rounded p-1 hover:bg-gray-800"
              >
                <IoClose className="text-lg" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={[
                    "max-w-[80%] whitespace-pre-wrap rounded-xl px-3 py-2",
                    m.role === "user"
                      ? "ml-auto bg-blue-600 text-white"
                      : "mr-auto bg-gray-800 text-gray-100",
                  ].join(" ")}
                >
                  {m.text}
                </div>
              ))}

              {loading && (
                <div className="mr-auto flex max-w-[80%] items-center gap-1 rounded-xl bg-gray-800 px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 border-t border-gray-800 px-3 py-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message…"
                className="flex-1 rounded-lg bg-gray-900 px-3 py-2 text-sm text-white
                           placeholder-gray-500 outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600
                           text-white transition-colors hover:bg-blue-700
                           disabled:opacity-40 disabled:hover:bg-blue-600"
              >
                <IoSend className="text-sm" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
