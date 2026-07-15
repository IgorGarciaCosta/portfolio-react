import { useState, useRef, useEffect } from "react";
import { type Message, welcomeMessage, now } from "./types";

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>(() => [welcomeMessage()]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  /* auto-scroll on new messages */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", text, time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const history = messages
      .slice(1)
      .map((m) => ({ role: m.role, parts: [{ text: m.text }] }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      if (!res.ok) throw new Error("Chat request failed");
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
  };

  const clearChat = () => setMessages([welcomeMessage()]);

  return {
    messages,
    input,
    setInput,
    loading,
    send,
    clearChat,
    bottomRef,
  } as const;
}
