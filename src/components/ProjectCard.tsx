/* ----------------- components/ProjectCard.tsx ----------------- */
import { ResponsiveIframe } from "@/components/ResponsiveIframe";
import clsx from "clsx";

/* gera URL de thumbnail do YouTube (sempre existe a hqdefault) */
function ytThumb(embed: string) {
  const id = embed.split("/embed/")[1]?.split("?")[0] ?? "";
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

type Props = {
  title: string;
  description: string;
  videoSrc: string;
  shrink?: boolean; // => cartão lateral
  active?: boolean; // => cartão central
  [key: string]: unknown;
};

export function ProjectCard({
  title,
  description,
  videoSrc,
  shrink,
  active,
  ...rest
}: Props) {
  return (
    <article
      {...rest}
      className={clsx(
        "flex flex-col overflow-hidden rounded-xl shadow-md transition-all duration-300",
        "bg-gray-100 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100",
        shrink
          ? "scale-90 opacity-40 brightness-75 hover:opacity-60"
          : "scale-100 opacity-100"
      )}
    >
      {/* vídeo (só se for o cartão ativo)  */}
      {active ? (
        <ResponsiveIframe src={videoSrc} title={title} />
      ) : (
        <img
          src={ytThumb(videoSrc)}
          alt={`${title} thumbnail`}
          className="aspect-video w-full object-cover pointer-events-none"
          /* se, por acaso, a imagem falhar -> cor sólida */
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.background =
              "rgba(0,0,0,0.4)";
          }}
        />
      )}

      <div className="space-y-2 p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {description}
        </p>
      </div>
    </article>
  );
}
