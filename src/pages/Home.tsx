export default function Home() {
  return (
    <section className="flex flex-col items-center text-center gap-4">
      <h1 className="text-4xl md:text-6xl font-extrabold">
        Olá, eu sou <span className="text-blue-500">Seu Nome</span>.
      </h1>
      <p className="max-w-xl text-lg text-gray-600 dark:text-gray-300">
        Engenheiro C++ especialista em Jogos / VR, agora criando experiências
        web de alta performance.
      </p>
      <a
        href="#projects"
        className="mt-6 inline-block rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Ver projetos
      </a>
    </section>
  );
}
