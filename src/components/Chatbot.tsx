import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import type { ChatPalette } from "./chatbot/types";
import { useChatMessages } from "./chatbot/useChatMessages";
import { ChatToggle } from "./chatbot/ChatToggle";
import { ChatWindow } from "./chatbot/ChatWindow";

export function Chatbot() {
  const { applied } = useTheme();
  const isDark = applied === "dark";

  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const {
    messages,
    input,
    setInput,
    loading,
    chipsVisible,
    send,
    clearChat,
    bottomRef,
  } = useChatMessages();

  const palette: ChatPalette = isDark
    ? {
        bg: "bg-gray-950",
        header: "from-blue-600 to-indigo-700",
        bubble: "bg-gray-800 text-gray-100",
        userBubble: "bg-blue-600 text-white",
        input:
          "bg-gray-900 text-white placeholder-gray-500 focus:ring-blue-500",
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

  const sizeClasses = expanded
    ? "sm:h-[600px] sm:w-[480px] max-sm:inset-0 max-sm:h-full max-sm:w-full max-sm:rounded-none"
    : "h-[450px] w-[350px] max-sm:inset-0 max-sm:h-full max-sm:w-full max-sm:rounded-none";

  return (
    <>
      <ChatToggle
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        isDark={isDark}
        palette={palette}
      />

      {isOpen && (
        <ChatWindow
          messages={messages}
          input={input}
          setInput={setInput}
          loading={loading}
          chipsVisible={chipsVisible}
          send={send}
          clearChat={clearChat}
          expanded={expanded}
          onToggleExpand={() => setExpanded((e) => !e)}
          onClose={() => setIsOpen(false)}
          palette={palette}
          isDark={isDark}
          sizeClasses={sizeClasses}
          bottomRef={bottomRef}
        />
      )}
    </>
  );
}
