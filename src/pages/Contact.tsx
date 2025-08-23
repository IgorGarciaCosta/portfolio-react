import { useState } from "react";
import { motion } from "framer-motion";

/* react-icons – apenas os ícones necessários (tree-shaking no build) */
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiArtstation } from "react-icons/si";

/* -------------------------------------------------------------
 * Contact links + icons.  O tipo React.ReactNode aceita qualquer
 * JSX, então podemos armazenar o ícone junto com label e url.
 * ------------------------------------------------------------*/
type ContactLink = {
  label: string;
  url: string;
  color: string;
  icon: React.ReactNode;
};

const CONTACT_LINKS: ContactLink[] = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/igor-garcia-5a449a1b5/",
    color: "text-blue-600 dark:text-blue-400",
    icon: <FaLinkedin />,
  },
  {
    label: "GitHub",
    url: "https://github.com/IgorGarciaCosta",
    color: "text-gray-800 dark:text-gray-200",
    icon: <FaGithub />,
  },
  {
    label: "ArtStation",
    url: "https://igorgarcia6.artstation.com/",
    color: "text-pink-600 dark:text-pink-400",
    icon: <SiArtstation />,
  },
];

/* -------------------- form state type ---------------------*/
type FormState = {
  name: string;
  email: string;
  message: string;
};

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
    // TODO: integrate with EmailJS / Formspree / API
    setSent(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-xl space-y-8"
    >
      <h1 className="text-3xl font-extrabold">Contact</h1>

      {/* ---------- static links with icons ---------- */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Reach me at</h2>

        <ul className="flex flex-col gap-1">
          {CONTACT_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 underline-offset-4 hover:underline ${link.color}`}
              >
                {/* Ícone */}
                <span className="text-lg">{link.icon}</span>
                {/* Texto */}
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* -------------- feedback after submit --------------*/}
      {sent ? (
        <p className="rounded bg-green-100 p-4 text-green-700 dark:bg-green-900/40 dark:text-green-300">
          Thank you! Your message has been sent ✨
        </p>
      ) : (
        /* ------------------ contact form ------------------*/
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
              className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
              placeholder="you@email.com"
            />
          </div>

          {/* Message */}
          <div>
            <label className="mb-1 block text-sm font-medium">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full resize-none rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
              placeholder="How can I help you?"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="rounded bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      )}
    </motion.section>
  );
}
