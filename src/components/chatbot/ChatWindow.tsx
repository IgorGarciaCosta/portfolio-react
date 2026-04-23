import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoClose,
  IoSend,
  IoTrashOutline,
  IoExpand,
  IoContract,
} from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import type { Message, ChatPalette } from "./types";
import { QUICK_REPLIES } from "./types";
import { ChatMessage } from "./ChatMessage";

/* ------------------------------------------------------------------ */
/*  Typing dots                                                        */
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
/*  ChatWindow                                                         */
/* ------------------------------------------------------------------ */
interface ChatWindowProps {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  loading: boolean;
  chipsVisible: boolean;
  send: (overrideText?: string) => void;
  clearChat: () => void;
  expanded: boolean;
  onToggleExpand: () => void;
  onClose: () => void;
  palette: ChatPalette;
  isDark: boolean;
  sizeClasses: string;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatWindow({
  messages,
  input,
  setInput,
  loading,
  chipsVisible,
  send,
  clearChat,
  expanded,
  onToggleExpand,
  onClose,
  palette,
  isDark,
  sizeClasses,
  bottomRef,
}: ChatWindowProps) {
  const inputRef = useRef<HTMLInputElement>(null);

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
    <AnimatePresence>
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
        {/* Header */}
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
            <ChatMessage key={i} message={m} palette={palette} />
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

        {/* Input */}
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
    </AnimatePresence>
  );
}
