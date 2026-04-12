import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  images: string[];
  alt: string;
};

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export function ImageCarousel({ images, alt }: Props) {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = useCallback(
    (dir: number) =>
      setPage(([prev]) => {
        const next = (prev + dir + images.length) % images.length;
        return [next, dir];
      }),
    [images.length],
  );

  return (
    <div className="group relative aspect-video w-full overflow-hidden bg-black/10 dark:bg-black/30">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={page}
          src={images[page]}
          alt={`${alt} — screenshot ${page + 1}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </AnimatePresence>

      {/* arrows */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2
                       text-white opacity-0 transition-opacity group-hover:opacity-100
                       hover:bg-black/60 focus:opacity-100"
          >
            <FaChevronLeft className="text-sm" />
          </button>

          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2
                       text-white opacity-0 transition-opacity group-hover:opacity-100
                       hover:bg-black/60 focus:opacity-100"
          >
            <FaChevronRight className="text-sm" />
          </button>

          {/* dots */}
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage([i, i > page ? 1 : -1])}
                aria-label={`Go to image ${i + 1}`}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === page ? "bg-white" : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
