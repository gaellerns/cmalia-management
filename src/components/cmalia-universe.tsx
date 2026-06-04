import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------- Morphing Word ---------- */
export function MorphWord({
  words,
  interval = 2400,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return (
    <span className={`relative inline-block align-baseline ${className}`}>
      <span className="invisible">{words.reduce((a, b) => (a.length > b.length ? a : b))}</span>
      {words.map((w, idx) => (
        <span
          key={w}
          className="absolute left-0 top-0 transition-all duration-700"
          style={{
            opacity: idx === i ? 1 : 0,
            transform: idx === i ? "translateY(0) skewY(0)" : "translateY(40%) skewY(6deg)",
            filter: idx === i ? "blur(0)" : "blur(6px)",
          }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

/* ---------- Magnetic Wrapper ---------- */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = `translate(0,0)`;
    };
    const parent = el.parentElement!;
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return (
    <div className={`inline-block ${className}`}>
      <div ref={ref} className="transition-transform duration-500 ease-out will-change-transform">
        {children}
      </div>
    </div>
  );
}

/* ---------- Vinyl Sticker (rotates with scroll) ---------- */
export function VinylBadge() {
  const ref = useRef<HTMLDivElement>(null);
  const vinylLabel = "studio • cmalia managment •";
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      ref.current.style.transform = `rotate(${window.scrollY * 0.35}deg)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed bottom-6 left-6 z-[90] hidden md:block pointer-events-none">
      <div
        ref={ref}
        className="size-32 rounded-full bg-accent text-accent-foreground flex items-center justify-center will-change-transform shadow-[0_10px_40px_-10px_oklch(0.68_0.27_350/0.6)]"
        style={{ transition: "transform 100ms linear" }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible">
          <defs>
            <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text className="fill-current font-mono uppercase" style={{ fontSize: 7.25, letterSpacing: 1.6 }}>
            <textPath href="#circ" startOffset="50%" textAnchor="middle">
              {vinylLabel}
            </textPath>
          </text>
        </svg>
        <div className="size-3 rounded-full bg-background z-10" />
      </div>
    </div>
  );
}

/* ---------- Draggable Sticky Note ---------- */
export function StickyNote({
  anchor = "top-left",
  offset = { x: 40, y: 40 },
  rotate = -4,
  color = "accent",
  children,
}: {
  anchor?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  offset?: { x: number; y: number };
  rotate?: number;
  color?: "accent" | "paper" | "ink";
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef<{ x: number; y: number } | null>(null);
  const drag = useRef<{ ox: number; oy: number } | null>(null);
  const [grabbed, setGrabbed] = useState(false);

  useEffect(() => {
    // compute viewport-anchored absolute position once on client
    const w = window.innerWidth;
    const h = window.innerHeight;
    const noteW = 208;
    const noteH = 110;
    let x = offset.x;
    let y = offset.y;
    if (anchor.includes("right")) x = w - noteW - offset.x;
    if (anchor.includes("bottom")) y = h - noteH - offset.y;
    pos.current = { x, y };

    const apply = () => {
      if (ref.current && pos.current)
        ref.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) rotate(${rotate}deg)`;
    };
    apply();
    const move = (e: MouseEvent) => {
      if (!drag.current || !pos.current) return;
      pos.current.x = e.clientX - drag.current.ox;
      pos.current.y = e.clientY - drag.current.oy;
      apply();
    };
    const up = () => {
      drag.current = null;
      setGrabbed(false);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [rotate, anchor, offset.x, offset.y]);

  const bg =
    color === "accent"
      ? "bg-accent text-accent-foreground"
      : color === "ink"
        ? "bg-foreground text-background"
        : "bg-[oklch(0.96_0.02_85)] text-[oklch(0.13_0.005_30)]";

  return (
    <div
      ref={ref}
      onMouseDown={(e) => {
        if (!pos.current) return;
        drag.current = { ox: e.clientX - pos.current.x, oy: e.clientY - pos.current.y };
        setGrabbed(true);
      }}
      className={`fixed top-0 left-0 z-[85] w-52 p-4 ${bg} shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] select-none hidden md:block will-change-transform opacity-0 data-[ready=true]:opacity-100 transition-opacity duration-700 ${
        grabbed ? "cursor-grabbing scale-105" : "cursor-grab"
      }`}
      data-ready={pos.current ? "true" : "false"}
      style={{ transition: grabbed ? "none" : "transform 400ms cubic-bezier(0.16,1,0.3,1), opacity 700ms" }}
    >
      <div className="font-mono text-[9px] uppercase tracking-widest opacity-70 mb-2 flex justify-between">
        <span>note</span>
        <span>↗ drag</span>
      </div>
      <div className="font-display text-lg uppercase leading-[1]">{children}</div>
    </div>
  );
}

/* ---------- Cursor Trail ---------- */
export function CursorTrail() {
  const dots = useRef<HTMLDivElement[]>([]);
  const points = useRef(Array.from({ length: 12 }, () => ({ x: 0, y: 0 })));

  useEffect(() => {
    let x = 0,
      y = 0;
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    const loop = () => {
      let px = x,
        py = y;
      points.current.forEach((p, i) => {
        p.x += (px - p.x) * 0.32;
        p.y += (py - p.y) * 0.32;
        const el = dots.current[i];
        if (el) {
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${
            1 - i / points.current.length
          })`;
          el.style.opacity = `${1 - i / points.current.length}`;
        }
        px = p.x;
        py = p.y;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] hidden md:block">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) dots.current[i] = el;
          }}
          className="absolute top-0 left-0 size-1.5 rounded-full bg-accent will-change-transform"
          style={{ mixBlendMode: "screen" }}
        />
      ))}
    </div>
  );
}

/* ---------- Tilt Card ---------- */
export function Tilt({
  children,
  className = "",
  max = 12,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -2 * max;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 2 * max;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const leave = () => {
      el.style.transform = `perspective(900px) rotateX(0) rotateY(0)`;
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [max]);
  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- Secret Word: type "cmalia" ---------- */
export function SecretCmalia() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let buf = "";
    const key = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        buf = (buf + e.key.toLowerCase()).slice(-8);
        if (buf.includes("cmalia")) {
          setOpen(true);
          buf = "";
        }
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  if (!open) return null;
  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[200] bg-accent text-accent-foreground flex flex-col items-center justify-center cursor-pointer p-6"
      style={{ animation: "scale-reveal 0.6s cubic-bezier(0.16,1,0.3,1) forwards" }}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.6em] mb-6 opacity-70">
        ✦ mot de passe accepté ✦
      </div>
      <h2 className="font-display text-[14vw] md:text-[10vw] uppercase tracking-tighter leading-[0.85] text-center">
        Bienvenue <br />
        <span className="italic">dans la maison.</span>
      </h2>
      <p className="mt-8 max-w-md text-center text-sm leading-relaxed opacity-80">
        Tu viens de trouver l'entrée discrète. C'est exactement comme ça que je travaille :
        sans bruit, pour ceux qui cherchent. Écris-moi : <strong>cmalia.management@gmail.com</strong>
      </p>
      <div className="mt-10 font-mono text-[10px] uppercase tracking-widest opacity-60">
        clique ou échap pour refermer
      </div>
    </div>
  );
}

/* ---------- Brutalist Parallax Background (per-page variants) ---------- */
export type BgVariant = "home" | "studio" | "atelier" | "journal" | "contact" | "legal";

const VARIANTS: Record<BgVariant, {
  words: [string, string];
  grid: number;
  stripeRotate: number;
  stripeTop: string;
  stripeColor: string;
  blocks: Array<{ kind: "square" | "circle" | "line" | "cross" | "tri"; top: string; side: "left" | "right"; offset: string; size: string; rotate: number; tone: string }>;
  ticker: string;
}> = {
  home: {
    words: ["CMALIA", "MANAGEMENT"],
    grid: 80,
    stripeRotate: -8,
    stripeTop: "33%",
    stripeColor: "bg-accent/70",
    blocks: [
      { kind: "square", top: "40vh", side: "right", offset: "10vw", size: "10rem", rotate: 12, tone: "border-2 border-accent/40" },
      { kind: "square", top: "120vh", side: "left", offset: "8vw", size: "6rem", rotate: 0, tone: "bg-accent/30" },
      { kind: "line", top: "180vh", side: "right", offset: "20vw", size: "8rem", rotate: 0, tone: "bg-foreground/40 h-[2px]" },
      { kind: "circle", top: "240vh", side: "left", offset: "30vw", size: "14rem", rotate: -6, tone: "border border-foreground/15 rounded-full" },
    ],
    ticker: "STUDIO ÉDITORIAL · MARSEILLE · DEPUIS MMXXIII · ",
  },
  studio: {
    words: ["STUDIO", "GAËLLE"],
    grid: 64,
    stripeRotate: 12,
    stripeTop: "50%",
    stripeColor: "bg-accent/50",
    blocks: [
      { kind: "circle", top: "30vh", side: "left", offset: "12vw", size: "12rem", rotate: 0, tone: "border-2 border-accent/30 rounded-full" },
      { kind: "cross", top: "90vh", side: "right", offset: "14vw", size: "5rem", rotate: 0, tone: "text-accent/40" },
      { kind: "square", top: "150vh", side: "left", offset: "20vw", size: "8rem", rotate: 18, tone: "border border-foreground/20" },
      { kind: "line", top: "210vh", side: "right", offset: "10vw", size: "16rem", rotate: -8, tone: "bg-accent/40 h-1" },
    ],
    ticker: "À PROPOS · GAËLLE · MARSEILLE · ",
  },
  atelier: {
    words: ["SERVICES", "ATELIER"],
    grid: 96,
    stripeRotate: 4,
    stripeTop: "20%",
    stripeColor: "bg-accent/40",
    blocks: [
      { kind: "tri", top: "25vh", side: "right", offset: "6vw", size: "10rem", rotate: 0, tone: "text-accent/40" },
      { kind: "square", top: "85vh", side: "left", offset: "5vw", size: "12rem", rotate: -10, tone: "border-2 border-foreground/15" },
      { kind: "circle", top: "150vh", side: "right", offset: "18vw", size: "6rem", rotate: 0, tone: "bg-accent/30 rounded-full" },
      { kind: "cross", top: "230vh", side: "left", offset: "22vw", size: "6rem", rotate: 0, tone: "text-foreground/30" },
    ],
    ticker: "GESTION · STRATÉGIE · CONTENU · ",
  },
  journal: {
    words: ["JOURNAL", "NOTES"],
    grid: 48,
    stripeRotate: -3,
    stripeTop: "65%",
    stripeColor: "bg-foreground/20",
    blocks: [
      { kind: "line", top: "20vh", side: "left", offset: "10vw", size: "20rem", rotate: 0, tone: "bg-accent/40 h-[3px]" },
      { kind: "line", top: "60vh", side: "right", offset: "8vw", size: "14rem", rotate: 0, tone: "bg-accent/30 h-[2px]" },
      { kind: "square", top: "130vh", side: "left", offset: "30vw", size: "5rem", rotate: 45, tone: "border-2 border-accent/40" },
      { kind: "circle", top: "200vh", side: "right", offset: "15vw", size: "16rem", rotate: 0, tone: "border border-foreground/15 rounded-full" },
    ],
    ticker: "ÉDITO · COULISSES · NOTES · ",
  },
  contact: {
    words: ["ÉCRIRE", "BONJOUR"],
    grid: 72,
    stripeRotate: -14,
    stripeTop: "45%",
    stripeColor: "bg-accent/60",
    blocks: [
      { kind: "circle", top: "20vh", side: "right", offset: "12vw", size: "18rem", rotate: 0, tone: "border-2 border-accent/30 rounded-full" },
      { kind: "square", top: "100vh", side: "left", offset: "10vw", size: "4rem", rotate: 22, tone: "bg-accent/40" },
      { kind: "tri", top: "180vh", side: "right", offset: "20vw", size: "8rem", rotate: 0, tone: "text-accent/35" },
    ],
    ticker: "CMALIA.MANAGEMENT@GMAIL.COM · MARSEILLE · ",
  },
  legal: {
    words: ["MENTIONS", "LÉGALES"],
    grid: 120,
    stripeRotate: 0,
    stripeTop: "50%",
    stripeColor: "bg-foreground/15",
    blocks: [
      { kind: "square", top: "30vh", side: "left", offset: "10vw", size: "8rem", rotate: 0, tone: "border border-foreground/20" },
      { kind: "line", top: "90vh", side: "right", offset: "10vw", size: "10rem", rotate: 0, tone: "bg-foreground/30 h-[1px]" },
    ],
    ticker: "MENTIONS LÉGALES · ",
  },
};

export function BrutalistBackground({ variant = "home", scrollPct }: { variant?: BgVariant; scrollPct: number }) {
  const cfg = VARIANTS[variant];
  return (
    <>
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: `${cfg.grid}px ${cfg.grid}px`,
          transform: `translateY(${scrollPct * 0.6}px)`,
        }}
      />
      {/* Diagonal stripe */}
      <div
        className={`absolute -left-1/4 w-[160vw] h-[14vh] ${cfg.stripeColor} origin-left`}
        style={{
          top: cfg.stripeTop,
          transform: `rotate(${cfg.stripeRotate}deg) translateY(${-scrollPct * 2}px)`,
          clipPath: "polygon(0 0, 100% 0, 98% 100%, 2% 100%)",
        }}
      />
      {/* Outlined mega words — parallax */}
      <div
        className="absolute top-[18vh] -left-4 font-display text-[28vw] leading-[0.8] uppercase tracking-tighter text-stroke-accent select-none whitespace-nowrap opacity-30"
        style={{ transform: `translateY(${-scrollPct * 4}px)` }}
      >
        {cfg.words[0]}
      </div>
      <div
        className="absolute top-[78vh] -right-10 font-display text-[22vw] leading-[0.8] uppercase tracking-tighter text-stroke select-none whitespace-nowrap opacity-25"
        style={{ transform: `translateY(${-scrollPct * 6}px) rotate(${cfg.stripeRotate / 2}deg)` }}
      >
        {cfg.words[1]}
      </div>
      {/* Rotating circular ticker — top center, scroll-driven */}
      <div
        className="absolute top-[30vh] left-1/2 -translate-x-1/2 size-[60vw] max-w-[700px] opacity-[0.12] pointer-events-none"
        style={{ transform: `translate(-50%, 0) rotate(${scrollPct * 3.6}deg)` }}
      >
        <svg viewBox="0 0 200 200" className="size-full">
          <defs>
            <path id={`ring-${variant}`} d="M100,100 m-90,0 a90,90 0 1,1 180,0 a90,90 0 1,1 -180,0" />
          </defs>
          <text className="fill-current font-mono uppercase" style={{ fontSize: 6, letterSpacing: 6 }}>
            <textPath href={`#ring-${variant}`}>
              {(cfg.ticker + cfg.ticker + cfg.ticker).slice(0, 220)}
            </textPath>
          </text>
        </svg>
      </div>
      {/* Hard-edged blocks */}
      {cfg.blocks.map((b, i) => {
        const sideStyle =
          b.side === "left" ? { left: b.offset } : { right: b.offset };
        const t = `translateY(${-scrollPct * (1 + (i % 3) * 0.6)}px) rotate(${b.rotate}deg)`;
        if (b.kind === "cross") {
          return (
            <div key={i} className={`absolute ${b.tone}`} style={{ top: b.top, ...sideStyle, width: b.size, height: b.size, transform: t }}>
              <svg viewBox="0 0 100 100" className="size-full"><path d="M10 10 L90 90 M90 10 L10 90" stroke="currentColor" strokeWidth="3" fill="none" /></svg>
            </div>
          );
        }
        if (b.kind === "tri") {
          return (
            <div key={i} className={`absolute ${b.tone}`} style={{ top: b.top, ...sideStyle, width: b.size, height: b.size, transform: t }}>
              <svg viewBox="0 0 100 100" className="size-full"><polygon points="50,5 95,95 5,95" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
            </div>
          );
        }
        return (
          <div
            key={i}
            className={`absolute ${b.tone}`}
            style={{ top: b.top, ...sideStyle, width: b.size, height: b.kind === "line" ? undefined : b.size, transform: t }}
          />
        );
      })}
    </>
  );
}

/* ---------- Ink Splat: spawns on click anywhere ---------- */
export function InkSplat() {
  const [splats, setSplats] = useState<Array<{ id: number; x: number; y: number }>>([]);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // ignore clicks on inputs/links for cleanliness
      const tag = (e.target as HTMLElement)?.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
      const id = Date.now() + Math.random();
      setSplats((s) => [...s, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setSplats((s) => s.filter((p) => p.id !== id)), 900);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-[105] hidden md:block">
      {splats.map((s) => (
        <span
          key={s.id}
          className="absolute block size-2 rounded-full bg-accent"
          style={{
            left: s.x,
            top: s.y,
            transform: "translate(-50%,-50%)",
            animation: "ink-splat 900ms cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        />
      ))}
      <style>{`@keyframes ink-splat { 0% { transform: translate(-50%,-50%) scale(0.4); opacity:1 } 60%{opacity:.6} 100% { transform: translate(-50%,-50%) scale(14); opacity:0 } }`}</style>
    </div>
  );
}

/* ---------- Text Scrambler (hover to reveal) ---------- */
export function Scramble({ text, className = "" }: { text: string; className?: string }) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);
  const chars = "█▓▒░!?#%&@*+=/\\<>";
  const scramble = () => {
    let frame = 0;
    cancelAnimationFrame(raf.current);
    const step = () => {
      frame++;
      const o = text
        .split("")
        .map((c, i) => (i < frame / 2 ? c : c === " " ? " " : chars[Math.floor(Math.random() * chars.length)]))
        .join("");
      setOut(o);
      if (frame / 2 < text.length) raf.current = requestAnimationFrame(step);
      else setOut(text);
    };
    raf.current = requestAnimationFrame(step);
  };
  return (
    <span ref={ref} onMouseEnter={scramble} className={`inline-block ${className}`}>
      {out}
    </span>
  );
}
