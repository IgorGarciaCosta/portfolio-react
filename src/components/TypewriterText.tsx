import { useEffect, useState } from "react";

interface Props {
  text: string;
  speed?: number; // ms entre caracteres (padrão 100 ms)
  className?: string;
}

export default function TypewriterText({
  text,
  speed = 100,
  className = "",
}: Props) {
  const [visible, setVisible] = useState(0);
  const finished = visible >= text.length;

  /* animação de digitação */
  useEffect(() => {
    setVisible(0);
    const id = setInterval(() => {
      setVisible((v) => {
        if (v >= text.length) {
          clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <span className={`font-mono whitespace-pre ${className}`}>
      {text.slice(0, visible)}
      {/* cursor proporcional à fonte */}
      <span
        className={`inline-block h-[1em] w-0.5 align-baseline bg-current ${
          finished ? "animate-caret" : ""
        }`}
      />
    </span>
  );
}
