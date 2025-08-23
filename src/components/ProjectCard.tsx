import { ResponsiveIframe } from "@/components/ResponsiveIframe";

type Props = {
  title: string;
  description: string;
  videoSrc: string;
};

export function ProjectCard({ title, description, videoSrc }: Props) {
  return (
    <article
      /* container do card */
      className="group relative mx-auto w-full max-w-3xl overflow-hidden
                 flex flex-col gap-6 rounded-lg p-6 md:flex-row"
    >
      {/* ───── GRADIENT OVERLAY QUE SE MOVE ───── */}
      <span
        className="
          pointer-events-none
          absolute top-0 right-0 h-full w-full
          translate-x-full opacity-0  /* começa fora do card, invisível   */
          bg-gradient-to-l from-blue-600/25 to-transparent
          transition-all duration-500 ease-out             /* move + fade */
          group-hover:translate-x-0 group-hover:opacity-100
          dark:from-blue-500/30
        "
      />

      {/* lado esquerdo – título + descrição */}
      <div className="flex-1 space-y-2">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>

      {/* lado direito – player */}
      <div className="mx-auto w-full max-w-xl md:mx-0 md:w-96">
        <ResponsiveIframe src={videoSrc} title={title} />
      </div>
    </article>
  );
}
