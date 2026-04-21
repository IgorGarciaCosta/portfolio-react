import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoChatbubbleEllipsesOutline,
  IoClose,
  IoSend,
  IoTrashOutline,
  IoExpand,
  IoContract,
} from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import Markdown from "react-markdown";
import { useTheme } from "@/hooks/useTheme";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Message {
  role: "user" | "model";
  text: string;
  time: string;
  isWelcome?: boolean;
}

const QUICK_REPLIES = [
  "What are Igor's skills?",
  "Tell me about his projects",
  "How can I contact Igor?",
];

const now = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const WELCOME_MESSAGE: Message = {
  role: "model",
  text: "Hi! I'm **Igor's AI assistant**. Ask me anything about his projects, skills, or experience!",
  time: now(),
  isWelcome: true,
};

/* ------------------------------------------------------------------ */
/*  Typing dots (Framer Motion)                                        */
/* ------------------------------------------------------------------ */
const dotVariants = {
  initial: { y: 0 },
  animate: { y: [0, -5, 0] },
};

function TypingDots({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`mr-auto flex max-w-[80%] items-center gap-1.5 rounded-2xl px-4 py-3 ${
        isDark ? "bg-gray-800" : "bg-gray-200"
      }`}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 0.3,
            delay: i * 0.15,
          }}
          className={`block h-2 w-2 rounded-full ${
            isDark ? "bg-gray-400" : "bg-gray-500"
          }`}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Chatbot component                                                  */
/* ------------------------------------------------------------------ */
export function Chatbot() {
  const { applied } = useTheme();
  const isDark = applied === "dark";

  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* auto-scroll on new messages */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* focus input when chat opens */
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  /* proactive greeting bubble (once per session) */
  useEffect(() => {
    if (sessionStorage.getItem("chatGreeted")) return;
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowGreeting(true);
        sessionStorage.setItem("chatGreeted", "1");
      }
    }, 10_000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  /* dismiss greeting after 6s */
  useEffect(() => {
    if (!showGreeting) return;
    const t = setTimeout(() => setShowGreeting(false), 6000);
    return () => clearTimeout(t);
  }, [showGreeting]);

  /* close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  /* ---- send message ---- */
  const send = useCallback(
    async (overrideText?: string) => {
      const text = (overrideText ?? input).trim();
      if (!text || loading) return;

      const userMsg: Message = { role: "user", text, time: now() };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setChipsVisible(false);
      setLoading(true);

      const history = messages
        .filter((m) => !m.isWelcome)
        .map((m) => ({ role: m.role, parts: [{ text: m.text }] }));

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history }),
        });
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: data.reply ?? "Error getting response.",
            time: now(),
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "model", text: "Connection error. Try again.", time: now() },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages],
  );

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const clearChat = () => {
    setMessages([{ ...WELCOME_MESSAGE, time: now() }]);
    setChipsVisible(true);
  };

  /* ---- theme-aware palette ---- */
  const palette = isDark
    ? {
        bg: "bg-gray-950",
        header: "from-blue-600 to-indigo-700",
        bubble: "bg-gray-800 text-gray-100",
        userBubble: "bg-blue-600 text-white",
        input: "bg-gray-900 text-white placeholder-gray-500 focus:ring-blue-500",
        border: "border-gray-800",
        chip: "bg-gray-800 text-gray-300 hover:bg-gray-700",
        timestamp: "text-gray-500",
        shadow: "shadow-2xl shadow-black/40",
      }
    : {
        bg: "bg-white",
        header: "from-blue-500 to-indigo-600",
        bubble: "bg-gray-100 text-gray-900",
        userBubble: "bg-blue-600 text-white",
        input:
          "bg-gray-100 text-gray-900 placeholder-gray-400 focus:ring-blue-400",
        border: "border-gray-200",
        chip: "bg-gray-100 text-gray-700 hover:bg-gray-200",
        timestamp: "text-gray-400",
        shadow: "shadow-2xl shadow-black/15",
      };

  /* ---- size classes ---- */
  const sizeClasses = expanded
    ? "sm:h-[600px] sm:w-[480px] max-sm:inset-0 max-sm:h-full max-sm:w-full max-sm:rounded-none"
    : "h-[450px] w-[350px] max-sm:inset-0 max-sm:h-full max-sm:w-full max-sm:rounded-none";

  return (
    <>
      {/* ---------- Proactive greeting bubble ---------- */}
      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div
            key="greeting"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={() => {
              setShowGreeting(false);
              setIsOpen(true);
            }}
            className={`fixed bottom-20 left-6 z-50 max-w-[220px] cursor-pointer rounded-xl px-3 py-2 text-xs
                        ${isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}
                        shadow-lg ${palette.border} border`}
          >
            👋 Hey! Want to know about Igor's work?
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- Toggle button ---------- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-toggle"
            onClick={() => {
              setShowGreeting(false);
              setIsOpen(true);
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open chat"
            className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center
                       rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white
                       shadow-lg shadow-blue-600/30 chatbot-pulse"
          >
            <IoChatbubbleEllipsesOutline className="text-2xl" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ---------- Chat window ---------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed bottom-6 left-6 z-50 flex flex-col
                        rounded-2xl ${palette.bg} ${palette.shadow}
                        sm:rounded-2xl ${sizeClasses} transition-all duration-200`}
          >
            {/* ---- Header ---- */}
            <div
              className={`flex items-center justify-between rounded-t-2xl max-sm:rounded-t-none
                          bg-gradient-to-r ${palette.header} px-4 py-3 text-white`}
            >
              <div className="flex items-center gap-2">
                <RiRobot2Line className="text-lg" />
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold">Igor's AI Assistant</span>
                  <span className="flex items-center gap-1 text-[10px] text-blue-200">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
                    Online
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  aria-label="Clear conversation"
                  title="Clear conversation"
                  className="rounded p-1.5 transition-colors hover:bg-white/20"
                >
                  <IoTrashOutline className="text-sm" />
                </button>
                <button
                  onClick={() => setExpanded((e) => !e)}
                  aria-label={expanded ? "Shrink chat" : "Expand chat"}
                  title={expanded ? "Shrink" : "Expand"}
                  className="hidden rounded p-1.5 transition-colors hover:bg-white/20 sm:flex"
                >
                  {expanded ? (
                    <IoContract className="text-sm" />
                  ) : (
                    <IoExpand className="text-sm" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="rounded p-1.5 transition-colors hover:bg-white/20"
                >
                  <IoClose className="text-lg" />
                </button>
              </div>
            </div>

            {/* ---- Messages ---- */}
            <div
              role="log"
              aria-live="polite"
              className="chatbot-scrollbar flex-1 space-y-3 overflow-y-auto p-4 text-sm"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user" ? "flex flex-col items-end" : "flex flex-col items-start"
                  }
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                      m.role === "user" ? palette.userBubble : palette.bubble
                    }`}
                  >
                    {m.role === "model" ? (
                      <Markdown
                        components={{
                          a: (props) => (
                            <a
                              {...props}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline text-blue-400 hover:text-blue-300"
                            />
                          ),
                          p: (props) => <p {...props} className="mb-1 last:mb-0" />,
                          ul: (props) => (
                            <ul {...props} className="ml-4 list-disc space-y-0.5" />
                          ),
                          ol: (props) => (
                            <ol {...props} className="ml-4 list-decimal space-y-0.5" />
                          ),
                        }}
                      >
                        {m.text}
                      </Markdown>
                    ) : (
                      <span className="whitespace-pre-wrap">{m.text}</span>
                    )}
                  </div>
                  <span className={`mt-0.5 text-[10px] ${palette.timestamp}`}>
                    {m.time}
                  </span>
                </div>
              ))}

              {/* Quick-reply chips */}
              {chipsVisible && messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_REPLIES.map((label) => (
                    <button
                      key={label}
                      onClick={() => send(label)}
                      className={`rounded-full border px-3 py-1 text-xs transition-colors
                                  ${palette.chip} ${palette.border} border`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}

              {loading && <TypingDots isDark={isDark} />}

              <div ref={bottomRef} />
            </div>

            {/* ---- Input ---- */}
            <div
              className={`flex items-center gap-2 border-t ${palette.border} px-3 py-2`}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message…"
                className={`flex-1 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1
                            ${palette.input}`}
              />
              <button
                onClick={() => send()}
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
