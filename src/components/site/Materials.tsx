import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import devices from "@/assets/devices.jpg";
import architecture from "@/assets/signal-architecture.jpg";

export function Materials() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y1 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section id="engine" ref={ref} className="relative overflow-hidden py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-24 max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            03 — Engine & engineering
          </p>
          <h2 className="mt-6 font-display display-tight text-5xl font-light md:text-7xl">
            Built on the wearable
            <br />
            <span className="italic text-amber">already on your wrist.</span>
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-12">
          <motion.div style={{ y: y1 }} className="relative md:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border">
              <motion.img
                style={{ scale: scaleImg }}
                src={devices}
                alt="Apple Watch, Oura ring, Fitbit and Garmin floating in studio light"
                width={1080}
                height={1600}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.3em]">
                <div className="text-amber">Apple Watch · Fitbit · Garmin · Oura</div>
                <div className="mt-1 text-muted-foreground">read-only, encrypted ingest</div>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="md:col-span-5 md:pt-32">
            <div className="space-y-16">
              <Spec n="01" t="Connect" d="One tap to Apple Health, Fitbit, Garmin Connect, or Oura. Read-only. Nothing about you ever leaves your device unencrypted." />
              <Spec n="02" t="Learn" d="Fourteen days to map your personal baseline across HRV, resting heart rate, sleep architecture, skin temperature and recovery." />
              <Spec n="03" t="Compare" d="Every minute, your live signal is measured against the version of you that PAS AI already knows. Not the population. You." />
              <Spec n="04" t="Speak" d="When deviation crosses a clinically meaningful threshold, you get a single, plain-English notification. Otherwise, silence." />
            </div>
          </motion.div>
        </div>

        <div className="mt-32 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4 md:pt-12">
            <h3 className="font-display text-3xl font-light md:text-5xl">
              Multiple<br />signals, one self.
            </h3>
            <p className="mt-6 max-w-sm text-sm text-muted-foreground">
              HRV, RHR, SpO₂, respiratory rate, skin temperature, sleep stages,
              VO₂ max, training load woven into a single longitudinal model
              of you. The architecture is yours alone.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-8"
          >
            <img
              src={architecture}
              alt="Signal architecture — biometric streams converging into a personal baseline"
              width={1600}
              height={1080}
              loading="lazy"
              className="w-full rounded-sm border border-border"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Spec({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-border pt-8"
    >
      <div className="flex items-baseline gap-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber">{n}</span>
        <h4 className="font-display text-2xl font-light">{t}</h4>
      </div>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{d}</p>
    </motion.div>
  );
}
