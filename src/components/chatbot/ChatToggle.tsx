import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import type { ChatPalette } from "./types";

interface ChatToggleProps {
  isOpen: boolean;
  onOpen: () => void;
  isDark: boolean;
  palette: ChatPalette;
}

export function ChatToggle({
  isOpen,
  onOpen,
  isDark,
  palette,
}: ChatToggleProps) {
  const [showGreeting, setShowGreeting] = useState(false);

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

  const handleOpen = () => {
    setShowGreeting(false);
    onOpen();
  };

  return (
    <>
      {/* Proactive greeting bubble */}
      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div
            key="greeting"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={handleOpen}
            className={`fixed bottom-20 left-6 z-50 max-w-[220px] cursor-pointer rounded-xl px-3 py-2 text-xs
                        ${isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}
                        shadow-lg ${palette.border} border`}
          >
            👋 Hey! Want to know about Igor's work?
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-toggle"
            onClick={handleOpen}
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
    </>
  );
}
