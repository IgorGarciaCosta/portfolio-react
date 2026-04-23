import { useState, useRef, useEffect, useCallback } from "react";
import { type Message, WELCOME_MESSAGE, now } from "./types";

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);

  /* auto-scroll on new messages */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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

  const clearChat = useCallback(() => {
    setMessages([{ ...WELCOME_MESSAGE, time: now() }]);
    setChipsVisible(true);
  }, []);

  return {
    messages,
    input,
    setInput,
    loading,
    chipsVisible,
    send,
    clearChat,
    bottomRef,
  } as const;
}
