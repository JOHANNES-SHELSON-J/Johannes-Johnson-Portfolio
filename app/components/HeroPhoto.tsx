"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

function clampNumber(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export default function HeroPhoto({
  src = "/Johannes Portfolio Image.jpeg",
  alt = "Johannes Johnson",
}: {
  src?: string;
  alt?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Motion values for tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Smooth springs
  const sx = useSpring(mx, { stiffness: 180, damping: 18 });
  const sy = useSpring(my, { stiffness: 180, damping: 18 });

  // Map mouse position to rotations
  const rotateY = useTransform(sx as MotionValue<number>, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(sy as MotionValue<number>, [-0.5, 0.5], [10, -10]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
    const y = (e.clientY - r.top) / r.height - 0.5; // -0.5..0.5

    mx.set(clampNumber(x, -0.5, 0.5));
    my.set(clampNumber(y, -0.5, 0.5));
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="relative"
      animate={{ y: [0, -6, 0] }} // subtle float
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Animated data grid background */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[26px] opacity-55"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(59,130,246,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.22) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          filter: "blur(0.2px)",
        }}
        animate={{ backgroundPosition: ["0px 0px", "120px 120px"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* Glow behind */}
      <div className="absolute -inset-6 rounded-[26px] bg-blue-500/15 blur-2xl" />

      {/* The photo card */}
      <motion.div
        className="relative rounded-[22px] border border-white/10 bg-black/20 overflow-hidden
                   shadow-[0_0_60px_-18px_rgba(59,130,246,0.65)]"
        style={{ transform: "translateZ(30px)" }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.25 }}
      >
        <img
          src={src}
          alt={alt}
          className="w-72 h-72 sm:w-80 sm:h-80 object-cover rounded-[22px]
                     scale-110"  /* zoom-in */
          style={{ objectPosition: "center 20%" }}
        />

        {/* subtle highlight sheen */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(600px circle at var(--x) var(--y), rgba(255,255,255,0.10), transparent 35%)",
          }}
          onMouseMove={(e) => {
            const el = e.currentTarget;
            const r = el.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width) * 100;
            const y = ((e.clientY - r.top) / r.height) * 100;
            el.style.setProperty("--x", `${x}%`);
            el.style.setProperty("--y", `${y}%`);
          }}
        />
      </motion.div>
    </motion.div>
  );
}