export interface Message {
  role: "user" | "model";
  text: string;
  time: string;
  isWelcome?: boolean;
}

export interface ChatPalette {
  bg: string;
  header: string;
  bubble: string;
  userBubble: string;
  input: string;
  border: string;
  chip: string;
  timestamp: string;
  shadow: string;
}

export const QUICK_REPLIES = [
  "What are Igor's skills?",
  "Tell me about his projects",
  "How can I contact Igor?",
];

export const now = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export const WELCOME_MESSAGE: Message = {
  role: "model",
  text: "Hi! I'm **Igor's AI assistant**. Ask me anything about his projects, skills, or experience!",
  time: now(),
  isWelcome: true,
};
