import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

type Props = {
  images: string[];
  alt: string;
};

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

/* -------- lightbox (portal) -------- */
function Lightbox({
  images,
  alt,
  startIndex,
  onClose,
}: {
  images: string[];
  alt: string;
  startIndex: number;
  onClose: () => void;
}) {
  const [[page, direction], setPage] = useState([startIndex, 0]);

  const paginate = useCallback(
    (dir: number) =>
      setPage(([prev]) => {
        const next = (prev + dir + images.length) % images.length;
        return [next, dir];
      }),
    [images.length],
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, paginate]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white
                   transition-colors hover:bg-black/70"
      >
        <FaTimes className="text-lg" />
      </button>

      {/* image */}
      <div
        className="relative flex h-[90vh] w-[90vw] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
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
            className="absolute max-h-full max-w-full object-contain"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3
                         text-white transition-colors hover:bg-black/70"
            >
              <FaChevronLeft />
            </button>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3
                         text-white transition-colors hover:bg-black/70"
            >
              <FaChevronRight />
            </button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage([i, i > page ? 1 : -1])}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    i === page ? "bg-white" : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>,
    document.body,
  );
}

/* -------- inline carousel -------- */
export function ImageCarousel({ images, alt }: Props) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const paginate = useCallback(
    (dir: number) =>
      setPage(([prev]) => {
        const next = (prev + dir + images.length) % images.length;
        return [next, dir];
      }),
    [images.length],
  );

  return (
    <>
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
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 h-full w-full cursor-zoom-in object-contain"
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

      {/* lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={images}
            alt={alt}
            startIndex={page}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
