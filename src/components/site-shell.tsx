import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import marseilleLandscape from "@/assets/marseille-landscape.png";
import {
  VinylBadge,
  StickyNote,
  CursorTrail,
  SecretCmalia,
  BrutalistBackground,
  InkSplat,
  type BgVariant,
} from "./cmalia-universe";

const NAV = [
  { to: "/studio", label: "Studio" },
  { to: "/atelier", label: "Atelier" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Écrire" },
] as const;

export function SiteShell({
  children,
  pageNumber,
  pageTitle,
  bgVariant = "studio",
}: {
  children: ReactNode;
  pageNumber: string;
  pageTitle: string;
  bgVariant?: BgVariant;
}) {
  const [scrollPct, setScrollPct] = useState(0);
  const [now, setNow] = useState("");
  const [cursorLabel, setCursorLabel] = useState("");
  const cursorRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const sigilRef = useRef<SVGSVGElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrollPct(pct);
      if (sigilRef.current) sigilRef.current.style.transform = `rotate(${h.scrollTop * 0.2}deg)`;
      if (railRef.current) railRef.current.style.transform = `translateY(${-h.scrollTop * 0.4}px)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" }));
    };
    tick();
    const i = setInterval(tick, 30000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    const loop = () => {
      const m = mouse.current;
      m.tx += (m.x - m.tx) * 0.18;
      m.ty += (m.y - m.ty) * 0.18;
      if (cursorRef.current)
        cursorRef.current.style.transform = `translate3d(${m.tx}px, ${m.ty}px, 0) translate(-50%, -50%)`;
      if (blobRef.current)
        blobRef.current.style.transform = `translate3d(${m.x * 0.05}px, ${m.y * 0.05}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="bg-background text-foreground font-body min-h-screen relative overflow-x-hidden cursor-hide">
      <SecretCmalia />
      <CursorTrail />
      <InkSplat />
      <VinylBadge />
      <StickyNote anchor="bottom-right" offset={{ x: 32, y: 180 }} rotate={6} color="paper">
        ps : je ne prospecte pas. écris-moi si ça te parle.
      </StickyNote>
      <StickyNote anchor="top-right" offset={{ x: 32, y: 140 }} rotate={-7} color="ink">
        tape « cmalia »<br />pour entrer.
      </StickyNote>

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[120] hidden md:flex items-center justify-center"
      >
        <div
          className={`rounded-full bg-accent text-accent-foreground font-mono uppercase text-[9px] tracking-widest flex items-center justify-center transition-all duration-300 ease-out ${
            cursorLabel ? "size-24 opacity-100" : "size-3 opacity-90"
          }`}
        >
          {cursorLabel && <span className="px-3 text-center leading-tight">{cursorLabel}</span>}
        </div>
      </div>

      {/* Brutalist parallax background — varies per page */}
      <div
        ref={blobRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-transform duration-700 ease-out"
      >
        <BrutalistBackground variant={bgVariant} scrollPct={scrollPct} />
      </div>

      {/* Grain */}
      <div
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
        }}
      />

      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[110] bg-foreground/5">
        <div className="h-full bg-accent transition-[width] duration-150" style={{ width: `${scrollPct}%` }} />
      </div>

      {/* Side rail — scroll-driven text spine */}
      <div className="fixed top-0 left-3 h-screen z-[75] hidden lg:flex items-center pointer-events-none overflow-hidden">
        <div ref={railRef} className="font-mono text-[9px] uppercase tracking-[0.6em] opacity-30 whitespace-nowrap will-change-transform"
             style={{ writingMode: "vertical-rl", transform: "translateY(0)" }}>
          CMALIA MANAGEMENT ™ · MRS · À DISTANCE · COHÉRENCE · SILENCE · SOIN · DEPUIS MMXXIII · CMALIA MANAGEMENT ™ · MRS · À DISTANCE · COHÉRENCE · SILENCE · SOIN · DEPUIS MMXXIII
        </div>
      </div>

      {/* Animated SVG sigil — top right corner */}
      <div className="fixed top-24 right-4 z-[70] hidden md:block pointer-events-none">
        <svg ref={sigilRef} viewBox="0 0 60 60" className="size-12 will-change-transform" style={{ transition: "transform 100ms linear" }}>
          <circle cx="30" cy="30" r="28" fill="none" stroke="oklch(0.68 0.27 350)" strokeWidth="0.5" />
          <circle cx="30" cy="30" r="20" fill="none" stroke="oklch(0.68 0.27 350)" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="30" y1="2" x2="30" y2="58" stroke="oklch(0.68 0.27 350)" strokeWidth="0.5" />
          <line x1="2" y1="30" x2="58" y2="30" stroke="oklch(0.68 0.27 350)" strokeWidth="0.5" />
          <circle cx="30" cy="30" r="3" fill="oklch(0.68 0.27 350)" />
        </svg>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-6 mix-blend-difference">
        <Link
          to="/"
          onMouseEnter={() => setCursorLabel("accueil")}
          onMouseLeave={() => setCursorLabel("")}
          className="font-display text-2xl md:text-3xl tracking-tighter uppercase group leading-none flex items-baseline gap-1"
        >
          <span className="inline-block group-hover:rotate-[-6deg] transition-transform duration-500 origin-bottom-left">
            cmalia
          </span>
          <span className="text-accent text-[10px] font-mono tracking-widest group-hover:translate-y-[-4px] transition-transform duration-500">
            ™
          </span>
        </Link>
        <div className="flex gap-8 items-center font-mono text-[10px] uppercase tracking-[0.2em]">
          <div className="hidden md:flex gap-8 items-center">
            {NAV.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onMouseEnter={() => setCursorLabel(label)}
                onMouseLeave={() => setCursorLabel("")}
                activeProps={{ className: "text-accent" }}
                className="hover:text-accent transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-accent after:transition-all after:duration-500"
              >
                {label}
              </Link>
            ))}
          </div>
          <span className="hidden md:inline font-mono text-[10px] opacity-50 tabular-nums">
            MRS · {now}
          </span>
          <Link
            to="/contact"
            onMouseEnter={() => setCursorLabel("on parle ?")}
            onMouseLeave={() => setCursorLabel("")}
            className="size-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:scale-110 transition-all duration-500"
          >
            <span className="font-bold text-xs">→</span>
          </Link>
        </div>
      </nav>

      <main id="top" className="relative animate-content-reveal z-10">
        {/* Page header strip */}
        <header className="px-6 pt-32 pb-4 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground border-b border-white/5">
          <span>{pageNumber}</span>
          <span className="text-accent">{pageTitle}</span>
          <span className="tabular-nums">{Math.round(scrollPct)}%</span>
        </header>
        {children}

        {/* Footer */}
        <footer className="px-6 py-16 border-t border-white/5 mt-32 relative">
          <div className="relative aspect-[16/6] mb-16 hidden md:block group -mx-6">
            <img src={marseilleLandscape} alt="Illustration de Marseille" loading="lazy" className="w-full h-full object-contain group-hover:scale-105 transition-all duration-1000" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-display text-5xl uppercase tracking-tighter text-foreground mix-blend-difference whitespace-nowrap">
              Cohérence · <span className="text-stroke">Silence</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div className="md:col-span-2 space-y-6">
              <div className="font-display text-3xl md:text-4xl uppercase tracking-tighter leading-[0.95]">
                POUR LES PROJETS QUI PRÉFÈRENT <br />
                <span className="text-accent">LA COHÉRENCE</span> AU BRUIT.
              </div>
              <div className="border-l-2 border-accent pl-4 max-w-md">
                <div className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-2">MISSION</div>
                <p className="text-muted-foreground leading-relaxed">
                  Aider une poignée de marques, créateurs et indépendants à construire une présence en ligne sensible, durable et fidèle à ce qu'ils sont. Sans cri, sans hack, sans copier-coller.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-3">INSTAGRAM</div>
              <a href="https://instagram.com/cmalia.management" target="_blank" rel="noreferrer" className="block hover:text-accent transition-colors text-xs">INSTAGRAM CMALIA.MANAGEMENT</a>
              <span className="block text-muted-foreground/60 text-[10px] italic">ET SEULEMENT ICI.</span>
            </div>
            <div className="space-y-2">
              <div className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-3">ÉCRIRE</div>
              <a href="mailto:cmalia.management@gmail.com" className="block hover:text-accent transition-colors uppercase">CMALIA.MANAGEMENT@GMAIL.COM</a>
              <Link to="/contact" className="block hover:text-accent transition-colors uppercase text-xs">CONTACT</Link>
              <Link to="/mentions-legales" className="block hover:text-accent transition-colors uppercase text-xs">MENTIONS LÉGALES</Link>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-white/5 font-mono text-[10px] uppercase tracking-widest opacity-40 flex flex-col md:flex-row gap-2 md:gap-0 justify-between whitespace-pre-line">
            <span>GAËLLE · MARSEILLE{"\n"}&nbsp;</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* Section number header — reusable across pages */
export function SectionHead({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex justify-between items-baseline mb-16 border-b border-foreground/10 pb-4">
      <span className="font-mono text-xs opacity-50">{n}</span>
      <span className="font-mono text-xs opacity-50">{label}</span>
    </div>
  );
}
