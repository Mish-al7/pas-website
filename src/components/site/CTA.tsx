import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { EarlyAccessDialog } from "./EarlyAccessDialog";

export function CTA() {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 20 });
  const y = useSpring(my, { stiffness: 200, damping: 20 });

  return (
    <section className="relative overflow-hidden py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Closed beta — Cohort 01
          </p>
          <h2 className="mx-auto mt-8 max-w-5xl font-display display-tight text-6xl font-light md:text-[10vw]">
            Meet the version
            <br />
            of <span className="italic text-amber">you</span>
            <br />
            you've never met.
          </h2>

          <div className="mt-16 flex flex-col items-center justify-center gap-6">
            <EarlyAccessDialog>
              <motion.button
                ref={ref}
                onMouseMove={(e) => {
                  const r = ref.current!.getBoundingClientRect();
                  mx.set((e.clientX - r.left - r.width / 2) * 0.4);
                  my.set((e.clientY - r.top - r.height / 2) * 0.4);
                }}
                onMouseLeave={() => { mx.set(0); my.set(0); }}
                style={{ x, y }}
                className="group relative overflow-hidden rounded-full bg-amber px-12 py-5 text-sm font-medium uppercase tracking-[0.3em] text-amber-foreground"
              >
                <motion.span style={{ x: useTransform(x, (v) => v * 0.5), y: useTransform(y, (v) => v * 0.5) }} className="relative z-10 flex items-center gap-3">
                  Request access
                  <Arrow />
                </motion.span>
                <span className="absolute inset-0 bg-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.button>
            </EarlyAccessDialog>
          </div>

          <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Free during beta · iOS & Android · Your data never leaves your device
          </p>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-500 group-hover:translate-x-1">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
