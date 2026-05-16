import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* Interactive sound visualization — bars react to cursor proximity */
export function SoundViz() {
  const ref = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(-9999);
  const cursorY = useMotionValue(-9999);
  const [active, setActive] = useState(false);

  const BARS = 64;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      cursorX.set(e.clientX - r.left);
      cursorY.set(e.clientY - r.top);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [cursorX, cursorY]);

  return (
    <section id="signal" className="relative overflow-hidden border-y border-border bg-surface py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              02 — Signal, learned
            </p>
            <h2 className="mt-6 font-display display-tight text-5xl font-light md:text-7xl">
              It learns you
              <br />
              <span className="italic text-muted-foreground">before it speaks.</span>
            </h2>
          </div>
          <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
            Multiple continuous biometric streams from your wearable, folded
            into a single living baseline. Move across the field — this is
            what your body looks like to PAS AI.
          </p>
        </div>

        <div
          ref={ref}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          data-cursor
          className="relative h-[60vh] min-h-[400px] w-full cursor-none overflow-hidden rounded-sm border border-border bg-background"
        >
          <div className="absolute inset-0 flex items-end justify-between gap-[2px] px-6 pb-6">
            {Array.from({ length: BARS }).map((_, i) => (
              <Bar key={i} index={i} total={BARS} cursorX={cursorX} cursorY={cursorY} active={active} />
            ))}
          </div>

          <div className="pointer-events-none absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <div>Live baseline · 1 Hz</div>
            <div className="mt-1 text-amber">{active ? "● learning" : "○ idle"}</div>
          </div>

          <div className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <div className="text-right">channels</div>
            <div className="mt-1 text-right">σ-tuned to you</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bar({
  index,
  total,
  cursorX,
  cursorY,
  active,
}: {
  index: number;
  total: number;
  cursorX: ReturnType<typeof useMotionValue<number>>;
  cursorY: ReturnType<typeof useMotionValue<number>>;
  active: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const w = typeof window !== "undefined" ? window.innerWidth : 1200;
  const barX = ((index + 0.5) / total) * Math.min(w, 1520);

  // baseline pulse
  const [phase] = useState(() => Math.random() * Math.PI * 2);

  const dist = useTransform([cursorX, cursorY], ([x, y]: number[]) => {
    const r = ref.current?.parentElement?.getBoundingClientRect();
    const localX = (index + 0.5) * ((r?.width ?? 1) / total);
    const dx = localX - x;
    const dy = (r?.height ?? 0) / 2 - y;
    return Math.sqrt(dx * dx + dy * dy);
  });

  const rawHeight = useTransform(dist, (d) => {
    const influence = Math.max(0, 1 - d / 240);
    return 6 + influence * 280 + Math.sin(Date.now() / 400 + phase) * (active ? 10 : 4);
  });

  const height = useSpring(rawHeight, { stiffness: 300, damping: 20, mass: 0.4 });

  // tick to keep idle pulse moving
  const [, setT] = useState(0);
  useEffect(() => {
    let r = 0;
    const loop = () => { setT((v) => v + 1); r = requestAnimationFrame(loop); };
    r = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(r);
  }, []);

  const opacity = useTransform(dist, (d) => 0.3 + Math.max(0, 1 - d / 300) * 0.7);

  return (
    <motion.div
      ref={ref}
      style={{ height, opacity, background: "var(--gradient-amber)" }}
      className="w-[6px] flex-1 rounded-full"
    />
  );
}
