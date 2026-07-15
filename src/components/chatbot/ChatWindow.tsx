import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  IoClose,
  IoSend,
  IoTrashOutline,
  IoExpand,
  IoContract,
} from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import type { Message } from "./types";
import { QUICK_REPLIES } from "./types";
import { ChatMessage } from "./ChatMessage";

/* ------------------------------------------------------------------ */
/*  Typing dots                                                        */
/* ------------------------------------------------------------------ */
const dotVariants = {
  initial: { y: 0 },
  animate: { y: [0, -5, 0] },
};

function TypingDots() {
  return (
    <div className="mr-auto flex max-w-[80%] items-center gap-1.5 rounded-2xl bg-gray-200 px-4 py-3 dark:bg-gray-800">
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
          className="block h-2 w-2 rounded-full bg-gray-500 dark:bg-gray-400"
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ChatWindow                                                         */
/* ------------------------------------------------------------------ */
interface ChatWindowProps {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  loading: boolean;
  send: (overrideText?: string) => void;
  clearChat: () => void;
  expanded: boolean;
  onToggleExpand: () => void;
  onClose: () => void;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatWindow({
  messages,
  input,
  setInput,
  loading,
  send,
  clearChat,
  expanded,
  onToggleExpand,
  onClose,
  bottomRef,
}: ChatWindowProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const sizeClasses = expanded
    ? "sm:h-[600px] sm:w-[480px]"
    : "h-[450px] w-[350px]";

  /* focus input when chat opens */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /* close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <motion.div
      key="chat-window"
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.92 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`fixed bottom-6 left-6 z-50 flex flex-col
                    max-sm:inset-0 max-sm:h-full max-sm:w-full max-sm:rounded-none
                    rounded-2xl bg-white shadow-2xl shadow-black/15 dark:bg-gray-950 dark:shadow-black/40
                    sm:rounded-2xl ${sizeClasses} transition-all duration-200`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between rounded-t-2xl max-sm:rounded-t-none
                      bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-white
                      dark:from-blue-600 dark:to-indigo-700`}
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
            onClick={onToggleExpand}
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
            onClick={onClose}
            aria-label="Close chat"
            className="rounded p-1.5 transition-colors hover:bg-white/20"
          >
            <IoClose className="text-lg" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        role="log"
        aria-live="polite"
        className="chatbot-scrollbar flex-1 space-y-3 overflow-y-auto p-4 text-sm"
      >
        {messages.map((m, i) => (
          <ChatMessage key={i} message={m} />
        ))}

        {/* Quick-reply chips */}
        {messages.length === 1 && !loading && (
          <div className="flex flex-wrap gap-2 pt-1">
            {QUICK_REPLIES.map((label) => (
              <button
                key={label}
                onClick={() => send(label)}
                className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-200 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {loading && <TypingDots />}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-gray-200 px-3 py-2 dark:border-gray-800">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a message…"
          className="flex-1 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-blue-400 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-blue-500"
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
  );
}
