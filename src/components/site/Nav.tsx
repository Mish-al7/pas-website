import { motion } from "framer-motion";
import { EarlyAccessDialog } from "./EarlyAccessDialog";

export function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="flex items-center gap-2 font-display text-xl tracking-tight">
          <span className="inline-block h-2 w-2 rounded-full bg-amber shadow-[0_0_12px_var(--amber)]" />
          <span>PAS AI</span>
        </a>
        <nav className="hidden items-center gap-10 text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex">
          {["Product", "Signal", "Engine", "Specs"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="group relative transition hover:text-foreground">
              {l}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <EarlyAccessDialog>
          <button className="group relative overflow-hidden rounded-full border border-border-strong px-5 py-2 text-xs uppercase tracking-[0.2em] transition hover:border-amber">
            <span className="relative z-10">Get early access</span>
            <span className="absolute inset-0 -translate-x-full bg-amber transition-transform duration-500 group-hover:translate-x-0" />
            <span className="absolute inset-0 flex items-center justify-center text-amber-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="text-xs uppercase tracking-[0.2em]">Get early access</span>
            </span>
          </button>
        </EarlyAccessDialog>
      </div>
    </motion.header>
  );
}
