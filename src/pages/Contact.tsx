/* -------------- Contact.tsx (card invertido) -------------- */
import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiArtstation } from "react-icons/si";

type ContactLink = {
  label: string;
  url: string;
  bg: string;
  fg: string;
  icon: React.ReactNode;
};

const CONTACT_LINKS: ContactLink[] = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/igor-garcia-5a449a1b5/",
    bg: "bg-blue-100 dark:bg-blue-900/40",
    fg: "text-blue-700 dark:text-blue-300",
    icon: <FaLinkedin />,
  },
  {
    label: "GitHub",
    url: "https://github.com/IgorGarciaCosta",
    bg: "bg-gray-200 dark:bg-gray-800/60",
    fg: "text-gray-800 dark:text-gray-200",
    icon: <FaGithub />,
  },
  {
    label: "ArtStation",
    url: "https://igorgarcia6.artstation.com/",
    bg: "bg-pink-100 dark:bg-pink-900/40",
    fg: "text-pink-600 dark:text-pink-400",
    icon: <SiArtstation />,
  },
];

type FormState = { name: string; email: string; message: string };

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrar com backend / EmailJS
    setSent(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex min-h-[calc(100vh-6rem)] items-center px-4"
    >
      <div className="mx-auto w-full max-w-5xl md:grid md:grid-cols-2 md:gap-12">
        {/* -------- coluna esquerda -------- */}
        <div className="mb-12 flex flex-col items-center gap-8 text-center md:mb-0 md:items-start md:text-left">
          <header className="space-y-4">
            <h1 className="text-3xl font-extrabold">Let&apos;s Connect!</h1>
            <p className="max-w-xs text-gray-600 dark:text-gray-300">
              I&apos;m always open to discussing new opportunities, interesting
              projects, or just having a chat about technology and development.
            </p>
          </header>

          <ul className="flex gap-6">
            {CONTACT_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={l.label}
                  className={`
                    ${l.bg} ${l.fg}
                    flex h-14 w-14 items-center justify-center rounded-full
                    text-2xl transition-transform hover:scale-110
                  `}
                >
                  {l.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* -------- coluna direita (card) -------- */}
        <div className="mx-auto w-full max-w-lg">
          {/* card invertido: escuro no tema claro, claro no tema escuro */}
          <div className="rounded-lg bg-gray-900 p-6 text-gray-100 dark:bg-gray-50 dark:text-gray-900">
            {sent ? (
              <p className="rounded bg-green-700/20 p-4 text-green-200 dark:bg-green-100 dark:text-green-700">
                Thank you! Your message has been sent ✨
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="mb-1 block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-400 dark:bg-white dark:text-gray-900 dark:placeholder-gray-500"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-400 dark:bg-white dark:text-gray-900 dark:placeholder-gray-500"
                    placeholder="you@email.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-400 dark:bg-white dark:text-gray-900 dark:placeholder-gray-500"
                    placeholder="How can I help you?"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full rounded bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
