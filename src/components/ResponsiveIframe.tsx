type Props = { src: string; title: string };

export function ResponsiveIframe({ src, title }: Props) {
  return (
    <div className="relative pb-[56.25%]">
      {/* 16:9 aspect-ratio box */}
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 h-full w-full rounded-lg shadow"
      />
    </div>
  );
}
