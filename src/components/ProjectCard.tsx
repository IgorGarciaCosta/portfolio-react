/* ----------------- components/ProjectCard.tsx ----------------- */
import { useState } from "react";
import { ResponsiveIframe } from "@/components/ResponsiveIframe";
import { ImageCarousel } from "@/components/ImageCarousel";
import {
  FaPlay,
  FaGithub,
  FaExternalLinkAlt,
  FaTelegram,
} from "react-icons/fa";

/* gera URL de thumbnail do YouTube (sempre existe a hqdefault) */
function ytThumb(embed: string) {
  const id = embed.split("/embed/")[1]?.split("?")[0] ?? "";
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

type Tag = "Unreal / C++" | "Web" | "Backend" | "Tools" | "VR" | "C#";

type ProjectLink = {
  label: string;
  url: string;
  icon: "github" | "telegram" | "external";
};

type Props = {
  title: string;
  description: string;
  videoSrc?: string;
  images?: string[];
  tags: Tag[];
  links?: ProjectLink[];
};

export type { Tag, ProjectLink };

const LINK_ICON = {
  github: FaGithub,
  telegram: FaTelegram,
  external: FaExternalLinkAlt,
} as const;

export function ProjectCard({
  title,
  description,
  videoSrc,
  images,
  tags,
  links,
}: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <article
      className="flex flex-col overflow-hidden rounded-xl shadow-md transition-all duration-300
                 bg-gray-100 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100"
    >
      {/* media: image carousel OR video facade */}
      {images && images.length > 0 ? (
        <ImageCarousel images={images} alt={title} />
      ) : videoSrc ? (
        playing ? (
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
        )
      ) : null}

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

        {/* project links */}
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {links.map((link) => {
              const Icon = LINK_ICON[link.icon];
              return (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-gray-200 px-2.5 py-1 text-xs font-medium
                             text-gray-800 transition-colors hover:bg-gray-300
                             dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  <Icon className="text-sm" />
                  {link.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
