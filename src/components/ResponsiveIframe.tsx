type Props = { src: string; title: string };

export function ResponsiveIframe({ src, title }: Props) {
  /* append autoplay=1 so the video starts immediately after facade click */
  const autoSrc = src.includes("?") ? `${src}&autoplay=1` : `${src}?autoplay=1`;

  return (
    <div className="relative pb-[56.25%]">
      {/* 16:9 aspect-ratio box */}
      <iframe
        src={autoSrc}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full rounded-lg shadow"
      />
    </div>
  );
}
