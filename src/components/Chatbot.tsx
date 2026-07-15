import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useChatMessages } from "./chatbot/useChatMessages";
import { ChatToggle } from "./chatbot/ChatToggle";
import { ChatWindow } from "./chatbot/ChatWindow";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const { messages, input, setInput, loading, send, clearChat, bottomRef } =
    useChatMessages();

  return (
    <>
      <ChatToggle isOpen={isOpen} onOpen={() => setIsOpen(true)} />

      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            input={input}
            setInput={setInput}
            loading={loading}
            send={send}
            clearChat={clearChat}
            expanded={expanded}
            onToggleExpand={() => setExpanded((e) => !e)}
            onClose={() => setIsOpen(false)}
            bottomRef={bottomRef}
          />
        )}
      </AnimatePresence>
    </>
  );
}
