import Markdown from "react-markdown";
import type { Message, ChatPalette } from "./types";

interface ChatMessageProps {
  message: Message;
  palette: ChatPalette;
}

export function ChatMessage({ message, palette }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={
        isUser ? "flex flex-col items-end" : "flex flex-col items-start"
      }
    >
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 ${
          isUser ? palette.userBubble : palette.bubble
        }`}
      >
        {!isUser ? (
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
            {message.text}
          </Markdown>
        ) : (
          <span className="whitespace-pre-wrap">{message.text}</span>
        )}
      </div>
      <span className={`mt-0.5 text-[10px] ${palette.timestamp}`}>
        {message.time}
      </span>
    </div>
  );
}
