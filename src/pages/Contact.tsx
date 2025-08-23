import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você enviaria para um serviço (EmailJS, Formspree, API própria…)
    setSent(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-xl"
    >
      <h1 className="mb-6 text-3xl font-extrabold">Contato</h1>

      {sent ? (
        <p className="rounded bg-green-100 p-4 text-green-700 dark:bg-green-900/40 dark:text-green-300">
          Obrigado! Sua mensagem foi enviada ✨
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Nome</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
              placeholder="voce@email.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Mensagem</label>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full resize-none rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
              placeholder="Em que posso ajudar?"
            />
          </div>

          <button
            type="submit"
            className="rounded bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
          >
            Enviar
          </button>
        </form>
      )}
    </motion.section>
  );
}
