/* ----------------- components/ProjectCard.tsx ----------------- */
import { useState } from "react";
import { ResponsiveIframe } from "@/components/ResponsiveIframe";
import { FaPlay } from "react-icons/fa";

/* gera URL de thumbnail do YouTube (sempre existe a hqdefault) */
function ytThumb(embed: string) {
  const id = embed.split("/embed/")[1]?.split("?")[0] ?? "";
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

type Tag = "Unreal / C++" | "Web" | "Tools" | "VR";

type Props = {
  title: string;
  description: string;
  videoSrc: string;
  tags: Tag[];
};

export type { Tag };

export function ProjectCard({ title, description, videoSrc, tags }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <article
      className="flex flex-col overflow-hidden rounded-xl shadow-md transition-all duration-300
                 bg-gray-100 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100"
    >
      {/* video facade: thumbnail + play button → iframe on click */}
      {playing ? (
        <ResponsiveIframe src={videoSrc} title={title} />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group relative aspect-video w-full cursor-pointer overflow-hidden"
          aria-label={`Play ${title} video`}
        >
          <img
            src={ytThumb(videoSrc)}
            alt={`${title} thumbnail`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.background =
                "rgba(0,0,0,0.4)";
            }}
          />
          {/* play overlay */}
          <span
            className="absolute inset-0 flex items-center justify-center
                       bg-black/30 transition-colors group-hover:bg-black/40"
          >
            <span
              className="flex h-14 w-14 items-center justify-center rounded-full
                         bg-white/90 text-blue-600 shadow-lg
                         transition-transform group-hover:scale-110"
            >
              <FaPlay className="ml-1 text-xl" />
            </span>
          </span>
        </button>
      )}

      <div className="space-y-2 p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {description}
        </p>

        {/* tag pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium
                         text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
