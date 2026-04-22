import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed inset-x-0 top-0 z-[51] h-[3px] bg-gradient-to-r from-blue-500 to-blue-600"
    />
  );
}
