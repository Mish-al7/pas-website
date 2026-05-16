export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-12 px-6 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <div className="flex items-center gap-2 font-display text-2xl">
            <span className="inline-block h-2 w-2 rounded-full bg-amber shadow-[0_0_12px_var(--amber)]" />
            PAS AI
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Personal health intelligence from the wearable you already own.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-12 text-xs uppercase tracking-[0.2em] text-muted-foreground md:grid-cols-3">
          <div className="space-y-3">
            <div className="text-foreground">Product</div>
            <a className="block hover:text-foreground" href="#signal">Signal</a>
            <a className="block hover:text-foreground" href="#engine">Engine</a>
            <a className="block hover:text-foreground" href="#specs">Specs</a>
          </div>
          <div className="space-y-3">
            <div className="text-foreground">Company</div>
            <a className="block hover:text-foreground" href="#">Manifesto</a>
            <a className="block hover:text-foreground" href="#">Science</a>
            <a className="block hover:text-foreground" href="#">Press</a>
          </div>
          <div className="space-y-3">
            <div className="text-foreground">Support</div>
            <a className="block hover:text-foreground" href="#">Contact</a>
            <a className="block hover:text-foreground" href="#">Help centre</a>
            <a className="block hover:text-foreground" href="#">Privacy</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1600px] items-center justify-between px-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:px-10">
        <span>© 2026 PAS AI</span>
        <span>You, compared to you.</span>
      </div>
    </footer>
  );
}
