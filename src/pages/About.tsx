import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-3xl space-y-6"
    >
      <h1 className="text-3xl font-extrabold">Sobre mim</h1>

      {/* Foto (substitua o src quando tiver) */}
      <img
        src="https://via.placeholder.com/160"
        alt="Foto de perfil"
        className="mx-auto rounded-full shadow-lg dark:shadow-gray-800 w-40 h-40 object-cover"
      />

      <p className="leading-7 text-gray-600 dark:text-gray-300">
        Olá! Eu sou <strong>Seu Nome</strong>, desenvolvedor front-end
        apaixonado por criar experiências web rápidas, acessíveis e visualmente
        atraentes. Tenho background em engenharia de software e anos de
        experiência com C++, jogos e VR — agora convertido para o ecossistema
        React, TypeScript e Three.js.
      </p>

      <p className="leading-7 text-gray-600 dark:text-gray-300">
        Fora do código curto trilhas de montanha, destrincho cafés especiais e
        contribuo para projetos open-source quando possível.
      </p>

      {/* Skills rápidas */}
      <div className="flex flex-wrap gap-3 pt-2">
        {["React", "TypeScript", "Tailwind", "Three.js", "Node.js"].map(
          (tag) => (
            <span
              key={tag}
              className="rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
            >
              {tag}
            </span>
          )
        )}
      </div>
    </motion.section>
  );
}
