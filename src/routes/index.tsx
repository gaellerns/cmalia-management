import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import workCyborg from "@/assets/home-profile-polaroids.png";
import workBrutalist from "@/assets/work-brutalist.jpg";
import gestionReseaux from "@/assets/gestion-reseaux-sociaux.png";
import marseilleLandscape from "@/assets/marseille-landscape.png";
import {
  MorphWord,
  Magnetic,
  VinylBadge,
  StickyNote,
  CursorTrail,
  Tilt,
  SecretCmalia,
  BrutalistBackground,
  InkSplat,
} from "@/components/cmalia-universe";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CMALIA Management — Studio de community management éditorial · Marseille" },
      {
        name: "description",
        content:
          "CMALIA Management. Studio éditorial qui prend soin de quelques marques à la fois. Direction de comptes, contenus & présence en ligne — pensée à Marseille.",
      },
      { property: "og:title", content: "CMALIA Management — Studio éditorial." },
      {
        property: "og:description",
        content:
          "Une présence en ligne qui te ressemble vraiment. Quelques projets, beaucoup de soin.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=Instrument+Serif:ital@0;1&display=swap",
      },
    ],
  }),
  component: Index,
});

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

function Reveal({
  children,
  className = "",
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <As ref={ref} className={`${seen ? "in-view" : ""} ${className}`}>
      {children}
    </As>
  );
}

function SplitWords({
  text,
  className = "",
  stagger = 80,
}: {
  text: string;
  className?: string;
  stagger?: number;
}) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="reveal-mask mr-[0.22em]" style={{ ["--reveal-delay" as any]: `${i * stagger}ms` }}>
          <span>{w}</span>
        </span>
      ))}
    </span>
  );
}

function Index() {
  const [introDone, setIntroDone] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [now, setNow] = useState("");
  const [hoverService, setHoverService] = useState<number | null>(null);
  const [cursorLabel, setCursorLabel] = useState<string>("");
  const cursorRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrollPct(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(
        d.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Paris",
        }),
      );
    };
    tick();
    const i = setInterval(tick, 30000);
    return () => clearInterval(i);
  }, []);

  // smooth cursor + blob follow
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
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${m.tx}px, ${m.ty}px, 0) translate(-50%, -50%)`;
      }
      if (blobRef.current) {
        const bx = m.x * 0.05;
        const by = m.y * 0.05;
        blobRef.current.style.transform = `translate3d(${bx}px, ${by}px, 0)`;
      }
      if (previewRef.current && hoverService !== null) {
        previewRef.current.style.transform = `translate3d(${m.x + 30}px, ${m.y - 180}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [hoverService]);

  const services = [
    {
      n: "01",
      t: "Direction éditoriale",
      d: "On pose la voix, le rythme, l'univers visuel. Une ligne qui te ressemble, qu'on lit même sans le logo.",
      img: workCyborg,
      tag: "Voix & univers",
    },
    {
      n: "02",
      t: "Gestion réseaux sociaux",
      d: "Instagram, TikTok, LinkedIn, Pinterest, Facebook... tous tes réseaux, pensés ensemble. Planification, écriture, publication, réponses. Présence régulière, sans pilote automatique ni IA déguisée.",
      img: gestionReseaux,
      tag: "Présence quotidienne",
    },
    {
      n: "03",
      t: "Conseil ponctuel",
      d: "Tu gères déjà, mais tu veux un regard extérieur. Une session, un audit, un plan clair et sans engagement.",
      img: workBrutalist,
      tag: "Regard extérieur",
    },
  ];

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

      {/* Brutalist parallax background — home variant */}
      <div
        ref={blobRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-transform duration-700 ease-out"
      >
        <BrutalistBackground variant="home" scrollPct={scrollPct} />
      </div>

      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
        }}
      />

      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[110] bg-foreground/5">
        <div
          className="h-full bg-accent transition-[width] duration-150"
          style={{ width: `${scrollPct}%` }}
        />
      </div>

      {/* Intro envelope */}
      {!introDone && (
        <div className="fixed inset-0 z-[140] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-surface border-b border-white/10 animate-env-top flex items-end justify-center pb-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.5em] opacity-30">
              CMALIA — bienvenue
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-surface border-t border-white/10 animate-env-bottom flex items-start justify-center pt-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.5em] opacity-30">
              Marseille — 43.296°N
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-6 mix-blend-difference">
        <a
          href="#top"
          onMouseEnter={() => setCursorLabel("retour")}
          onMouseLeave={() => setCursorLabel("")}
          className="font-display text-2xl md:text-3xl tracking-tighter uppercase group leading-none flex items-baseline gap-1"
        >
          <span className="inline-block group-hover:rotate-[-6deg] transition-transform duration-500 origin-bottom-left">
            cmalia
          </span>
          <span className="text-accent text-[10px] font-mono tracking-widest group-hover:translate-y-[-4px] transition-transform duration-500">
            ™
          </span>
        </a>
        <div className="flex gap-8 items-center font-mono text-[10px] uppercase tracking-[0.2em]">
          <div className="hidden md:flex gap-8 items-center">
            {[
              ["/studio", "Studio"],
              ["/atelier", "Atelier"],
              ["/journal", "Journal"],
              ["/contact", "Écrire"],
            ].map(([href, label]) => (
              <Link
                key={href}
                to={href}
                onMouseEnter={() => setCursorLabel(label)}
                onMouseLeave={() => setCursorLabel("")}
                className="hover:text-accent transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-accent after:transition-all after:duration-500"
              >
                {label}
              </Link>
            ))}
          </div>
          <span className="hidden md:inline font-mono text-[10px] opacity-50 tabular-nums">
            MRS · {now}
          </span>
          <a
            href="#contact"
            onMouseEnter={() => setCursorLabel("on parle ?")}
            onMouseLeave={() => setCursorLabel("")}
            className="size-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-accent hover:border-accent hover:scale-110 transition-all duration-500 relative overflow-hidden"
          >
            <span className="font-bold text-xs">→</span>
          </a>
        </div>
      </nav>

      <main id="top" className="relative animate-content-reveal z-10">
        {/* HERO */}
        <section className="px-6 pt-40 pb-24 min-h-screen flex flex-col justify-between relative">
          <Reveal className="flex flex-col md:flex-row justify-between items-start gap-6 font-mono text-[10px] uppercase tracking-widest">
            <div className="text-accent fade-up">[ CMALIA Management — studio éditorial, Marseille ]</div>
            <div className="opacity-60 max-w-xs fade-up" style={{ ["--reveal-delay" as any]: "200ms" }}>
              ◉ Quelques projets à la fois. <br />
              Le temps de bien faire, et l'envie de bien faire.
            </div>
          </Reveal>

          <div className="relative w-full mt-12">
            <Reveal as="h1" className="font-display text-[16vw] md:text-[13vw] leading-[0.82] uppercase tracking-tighter">
              <span className="block">
                <SplitWords text="Créer du lien," />
              </span>
              <span className="block">
                <span className="reveal-mask mr-[0.22em]" style={{ ["--reveal-delay" as any]: "320ms" }}>
                  <span>pas</span>
                </span>
                <span className="reveal-mask mr-[0.22em]" style={{ ["--reveal-delay" as any]: "400ms" }}>
                  <span>du</span>
                </span>
                <span className="reveal-mask" style={{ ["--reveal-delay" as any]: "480ms" }}>
                  <span className="text-stroke italic font-[Instrument_Serif] not-italic-fallback">
                    <MorphWord words={["bruit.", "vide.", "filler.", "show.", "bullshit."]} />
                  </span>
                </span>
              </span>
            </Reveal>

            <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mt-16 border-t border-foreground/10 pt-8">
              <p className="md:col-span-6 font-display text-2xl md:text-4xl uppercase leading-[0.98] tracking-tight fade-up">
                J'AIDE LES MARQUES, CRÉATEURS ET PROJETS INDÉPENDANTS À CONSTRUIRE <span className="text-accent">UNE PRÉSENCE EN LIGNE&nbsp;</span>QUI LEUR RESSEMBLE&nbsp;VRAIMENT.
              </p>
              <div
                className="md:col-span-3 md:col-start-8 text-muted-foreground text-sm leading-relaxed fade-up"
                style={{ ["--reveal-delay" as any]: "200ms" }}
              >
                Moins de contenu pour remplir. <br />
                Plus de contenu qui compte. <br />
                <span className="text-foreground/80">
                  Si tu aimes ce que je fais, écris-moi : je ne prospecte pas, je préfère qu'on se trouve.
                </span>
              </div>
              <div
                className="md:col-span-2 flex flex-col gap-3 fade-up"
                style={{ ["--reveal-delay" as any]: "400ms" }}
              >
                <Magnetic strength={0.5}>
                  <a
                    href="#studio"
                    onMouseEnter={() => setCursorLabel("le studio")}
                    onMouseLeave={() => setCursorLabel("")}
                    className="group block"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-3">
                      <span className="group-hover:text-accent transition-colors">Mon approche</span>
                      <div className="h-px w-8 bg-foreground/20 group-hover:w-16 group-hover:bg-accent transition-all duration-500" />
                    </div>
                  </a>
                </Magnetic>
                <Magnetic strength={0.5}>
                  <a
                    href="#contact"
                    onMouseEnter={() => setCursorLabel("book now")}
                    onMouseLeave={() => setCursorLabel("")}
                    className="group block"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-3">
                      <span className="text-accent group-hover:translate-x-1 inline-block transition-transform">
                        Book now
                      </span>
                      <div className="h-px w-8 bg-accent/40 group-hover:w-16 group-hover:bg-accent transition-all duration-500" />
                    </div>
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          <div className="absolute bottom-6 right-6 hidden md:flex flex-col items-end gap-2 font-mono text-[10px] uppercase tracking-widest opacity-50 animate-float-slow">
            <span>↓ scroll</span>
            <span className="tabular-nums">{Math.round(scrollPct)}%</span>
          </div>
        </section>

        {/* Marquee 1 */}
        <div className="py-8 overflow-hidden border-y border-white/10 bg-accent text-accent-foreground">
          <div className="animate-marquee whitespace-nowrap flex">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-12 pr-12 shrink-0">
                <span className="font-display text-5xl uppercase">Cohérence</span>
                <span className="font-display text-5xl">✦</span>
                <span className="font-display text-5xl uppercase">Sensibilité</span>
                <span className="font-display text-5xl">✦</span>
                <span className="font-display text-5xl uppercase">Patience</span>
                <span className="font-display text-5xl">✦</span>
                <span className="font-display text-5xl uppercase">Soin</span>
                <span className="font-display text-5xl">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* STUDIO / Manifeste */}
        <section
          id="studio"
          className="px-6 py-32 bg-surface border-b border-white/5 relative"
        >
          <Reveal className="flex justify-between items-baseline mb-16 border-b border-foreground/10 pb-4 fade-up">
            <span className="font-mono text-xs opacity-50">N°01 — Studio</span>
            <span className="font-mono text-xs opacity-50">À propos</span>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <Reveal className="md:col-span-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-8 fade-up">
                PAS UNE USINE À CONTENU.
              </div>
              <h2 className="font-display text-5xl md:text-8xl uppercase tracking-tighter leading-[0.86] mb-16">
                <SplitWords text="JE CROIS AUX COMPTES" />
                <br />
                <span className="reveal-mask"><span>QUI ONT</span></span>{" "}
                <span className="reveal-mask"><span>QUELQUE</span></span>{" "}
                <span className="reveal-mask"><span className="text-stroke italic">CHOSE&nbsp;</span></span>{" "}
                <span className="reveal-mask"><span>À DIRE.</span></span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed max-w-xl border-l border-accent/30 pl-8 fade-up">
                <p>
                  Derrière CMalia, il y a une seule personne. Pas un open space, pas un dashboard
                  d'agence. Juste une attention vraie, donnée à un petit nombre de projets.
                </p>
                <br />
                <p>
                  Je prends le temps d'écouter avant de poster. De comprendre ce que tu fais,
                  pourquoi tu le fais, à qui tu parles, puis on construit ensemble une présence
                  qui tient sur la durée.
                </p>
                <br />
                <p className="text-foreground">
                  Pas de recette miracle, pas de growth hack. Juste un travail régulier, sensible,
                  et un univers qui finit par te ressembler complètement.
                </p>
              </div>
            </Reveal>

            <div className="md:col-span-5 flex flex-col gap-12 justify-between">
              <Reveal>
                <Tilt className="fade-up" max={10}>
                  <div
                    className="relative overflow-hidden aspect-[4/5] ring-1 ring-white/5 group"
                    onMouseEnter={() => setCursorLabel("intention")}
                    onMouseLeave={() => setCursorLabel("")}
                  >
                    <img
                      src={workCyborg}
                      alt="CMALIA — direction éditoriale"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                      style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                    />
                    <div className="absolute top-4 left-4 bg-accent px-3 py-1 text-accent-foreground font-mono text-[10px] font-bold tracking-widest">
                      REF:01 — ABOUT ME
                    </div>
                    <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-widest text-white/80 bg-black/40 backdrop-blur px-2 py-1">
                      GAËLLE · MMXXVI
                    </div>
                  </div>
                </Tilt>
              </Reveal>
              <Reveal as="blockquote" className="relative fade-up">
                <span className="font-display text-[10rem] leading-none text-accent/30 absolute -top-12 -left-2">
                  «
                </span>
                <p className="font-display text-3xl md:text-4xl uppercase leading-[0.98] pl-8 tracking-tight">
                  Le meilleur contenu n'est pas <br />
                  forcément <span className="text-stroke italic">le plus bruyant</span>.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* MÉTHODE */}
        <section id="methode" className="px-6 py-32 relative">
          <Reveal className="flex justify-between items-baseline mb-16 border-b border-foreground/10 pb-4 fade-up">
            <span className="font-mono text-xs opacity-50">N°02 — Méthode</span>
            <span className="font-mono text-xs opacity-50">En trois temps</span>
          </Reveal>

          <Reveal className="max-w-5xl mx-auto text-center mb-24">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-8 fade-up">
              Comment on travaille ensemble
            </div>
            <h2 className="font-display text-5xl md:text-8xl uppercase leading-[0.86] tracking-tighter">
              <SplitWords text="Observer." /> <br />
              <SplitWords text="Construire." /> <br />
              <span className="text-accent reveal-mask"><span>Faire vivre.</span></span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 max-w-7xl mx-auto">
            {[
              {
                n: "01",
                t: "Observer",
                d: "Avant tout, j'écoute. Qui tu es, ce que tu fais déjà, ce qui te touche, ce qui te ressemble. Pas de template, pas d'audit Excel, une vraie conversation.",
              },
              {
                n: "02",
                t: "Construire",
                d: "On pose ensemble la ligne éditoriale, les piliers, les références. Un univers qu'on peut décliner partout sans le perdre en route.",
              },
              {
                n: "03",
                t: "Faire vivre",
                d: "Au quotidien : créer, publier, ajuster, échanger. Présent, mais discret. La régularité, sans la lourdeur.",
              },
            ].map((s, i) => (
              <Reveal
                key={s.n}
                className="bg-background p-10 group hover:bg-accent hover:text-accent-foreground transition-colors fade-up"
              >
                <div
                  onMouseEnter={() => setCursorLabel(`étape ${s.n}`)}
                  onMouseLeave={() => setCursorLabel("")}
                >
                  <div className="flex justify-between items-start mb-16">
                    <div className="font-mono text-xs opacity-50 group-hover:opacity-100">
                      [{s.n}]
                    </div>
                    <div className="size-2 rounded-full bg-accent/60 group-hover:bg-background group-hover:scale-150 transition-all" />
                  </div>
                  <div className="font-display text-4xl md:text-5xl uppercase mb-6 tracking-tighter leading-[0.9]">
                    {s.t}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-accent-foreground/85">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Marquee 2 — slower / soft */}
        <div className="py-10 overflow-hidden border-y border-white/5">
          <div className="animate-marquee-reverse whitespace-nowrap flex">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-16 pr-16 shrink-0">
                <span className="font-display text-[9vw] uppercase text-stroke">Prendre le temps</span>
                <span className="font-display text-[9vw] text-accent/60">✦</span>
                <span className="font-display text-[9vw] uppercase text-stroke-accent">de bien faire</span>
                <span className="font-display text-[9vw] text-accent/60">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* ATELIER / Services */}
        <section
          id="atelier"
          className="px-6 py-32 relative bg-surface border-y border-white/5"
        >
          <Reveal className="flex justify-between items-baseline mb-16 border-b border-foreground/10 pb-4 fade-up">
            <span className="font-mono text-xs opacity-50">N°03 — Atelier</span>
            <span className="font-mono text-xs opacity-50">TROIS choses</span>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-20">
            <Reveal className="md:col-span-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-8 fade-up">
                Ce que je fais, pour de vrai
              </div>
              <h2 className="font-display text-6xl md:text-9xl uppercase tracking-tighter leading-[0.86]">
                <SplitWords text="TROIS façons" /> <br />
                <span className="text-accent reveal-mask"><span>de travailler</span></span>{" "}
                <span className="reveal-mask"><span>ensemble.</span></span>
              </h2>
            </Reveal>
            <Reveal className="md:col-span-4 fade-up">
              <p className="text-muted-foreground leading-relaxed border-l border-accent/30 pl-6 max-w-md">
                Je travaille avec un nombre limité de projets pour préserver une collaboration attentive.
                Réponse personnelle sous 48h, promis.
              </p>
            </Reveal>
          </div>

          <div className="relative" onMouseLeave={() => { setHoverService(null); setCursorLabel(""); }}>
            {services.map((s, i) => (
              <Link
                key={s.n}
                to="/atelier"
                search={{ service: i }}
                onMouseEnter={() => { setHoverService(i); setCursorLabel("voir →"); }}
                className="grid grid-cols-12 gap-8 items-center py-10 border-t border-white/10 group hover:pl-6 transition-all duration-700 relative"
              >
                <span className="col-span-2 md:col-span-1 font-mono text-xs opacity-40 group-hover:text-accent transition-colors">
                  [{s.n}]
                </span>
                <h3 className="col-span-10 md:col-span-5 font-display text-3xl md:text-6xl uppercase tracking-tighter group-hover:text-accent transition-colors leading-none">
                  {s.t}
                </h3>
                <p className="col-span-12 md:col-span-4 text-muted-foreground leading-relaxed">
                  {s.d}
                </p>
                <span className="hidden md:block col-span-2 font-mono text-[10px] uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-accent transition-all md:text-right">
                  {s.tag} →
                </span>
              </Link>
            ))}
            <div className="border-t border-white/10" />
          </div>

          {/* floating cursor-bound preview */}
          <div
            ref={previewRef}
            className={`pointer-events-none hidden md:block fixed top-0 left-0 z-[80] w-72 aspect-[3/4] ring-1 ring-accent/30 overflow-hidden transition-opacity duration-500 ${
              hoverService !== null ? "opacity-100" : "opacity-0"
            }`}
          >
            {hoverService !== null && (
              <>
                <img
                  src={services[hoverService].img}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-accent/15 mix-blend-multiply" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end font-mono text-[10px] uppercase tracking-widest text-white">
                  <span>{services[hoverService].tag}</span>
                  <span>0{hoverService + 1}/04</span>
                </div>
              </>
            )}
          </div>
        </section>

        {/* JOURNAL */}
        <section id="journal" className="px-6 py-32 border-b border-white/5">
          <Reveal className="flex justify-between items-baseline mb-16 border-b border-foreground/10 pb-4 fade-up">
            <span className="font-mono text-xs opacity-50">N°04 — Journal</span>
            <span className="font-mono text-xs opacity-50">Notes & coulisses</span>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <Reveal className="md:col-span-7">
              <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] tracking-tighter">
                <SplitWords text="Notes, réflexions" /> <br />
                <span className="text-stroke italic">et coulisses.</span>
              </h2>
            </Reveal>
            <Reveal className="md:col-span-4 md:col-start-9 self-end fade-up">
              <p className="text-muted-foreground leading-relaxed">
                Quelques textes courts, écrits entre deux projets. Sur la voix éditoriale,
                le rythme de publication, et tout ce qui ne se voit pas dans un feed.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {[
              { tag: "Identité", t: "Pourquoi votre marque mérite mieux qu'un calendrier éditorial.", slug: "au-dela-du-calendrier-editorial" },
              { tag: "Éditorial", t: "Le silence stratégique : poster moins, dire plus.", slug: "silence-strategique" },
              { tag: "Coulisses", t: "Une journée typique au studio CMALIA.", slug: "une-journee-au-studio" },
              { tag: "Veille", t: "Les comptes qui m'inspirent en ce moment.", slug: "comptes-qui-minspirent" },
            ].map((a, i) => (
              <Reveal key={i} className="bg-background">
                <Link
                  to="/journal/$slug"
                  params={{ slug: a.slug }}
                  onMouseEnter={() => setCursorLabel("lire")}
                  onMouseLeave={() => setCursorLabel("")}
                  className="block p-10 group hover:bg-accent hover:text-accent-foreground transition-colors fade-up h-full"
                >
                  <div className="flex justify-between items-baseline mb-8 font-mono text-[10px] uppercase tracking-widest">
                    <span className="text-accent group-hover:text-accent-foreground">{a.tag}</span>
                    <span className="opacity-50 group-hover:opacity-100">0{i + 1} →</span>
                  </div>
                  <p className="font-display text-2xl md:text-4xl uppercase leading-[0.95] tracking-tight">
                    {a.t}
                  </p>
                </Link>
              </Reveal>
            ))}

          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="px-6 py-32 border-b border-white/5 relative">
          <Reveal className="flex justify-between items-baseline mb-16 border-b border-foreground/10 pb-4 fade-up">
            <span className="font-mono text-xs opacity-50">N°05 — Correspondance</span>
            <span className="font-mono text-xs opacity-50">Book now</span>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <Reveal className="md:col-span-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-8 fade-up">
                VOUS AVEZ UN BEAU PROJET ?
              </div>
              <h2 className="font-display text-6xl md:text-[9vw] uppercase tracking-tighter leading-[0.82] mb-12">
                <SplitWords text="ON SE" /> <br />
                <span className="text-accent reveal-mask"><span>CALL ?</span></span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed max-w-md mb-12 border-l border-accent/30 pl-6 fade-up">
                <p>
                  Si votre priorité est de construire une présence cohérente, sensible et durable,
                  on a probablement des choses à se dire.
                </p>
                <br />
                <p className="text-foreground/85">
                  Je travaille avec un nombre limité de projets pour préserver une collaboration
                  attentive. Réponse personnelle sous 48h, promis.
                </p>
              </div>
              <a
                href="mailto:cmalia.management@gmail.com"
                suppressHydrationWarning
                onMouseEnter={() => setCursorLabel("écrire")}
                onMouseLeave={() => setCursorLabel("")}
                className="inline-flex items-center gap-4 bg-accent text-accent-foreground px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
              >
                BOOK NOW — CMALIA.MANAGEMENT@GMAIL.COM
                <span>→</span>
              </a>
              <div className="mt-16 flex flex-wrap gap-8 font-mono text-[10px] uppercase tracking-widest">
                <a href="https://instagram.com/cmalia.management" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors group inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform" />
                  INSTAGRAM CMALIA.MANAGEMENT
                </a>
                <span className="opacity-40 italic">ET SEULEMENT ICI.</span>
              </div>
            </Reveal>

            <Reveal as="form" className="md:col-span-6 space-y-8 fade-up">
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-50 mb-2">
                Ou via ce formulaire — réponse sous 48h
              </div>
              {[
                { l: "Nom", t: "text", n: "name" },
                { l: "Projet", t: "text", n: "project" },
                { l: "Instagram ou site web", t: "text", n: "link" },
                { l: "Ce que vous souhaitez développer", t: "text", n: "goal" },
                { l: "Budget envisagé", t: "text", n: "budget" },
              ].map((f, i) => (
                <div
                  key={f.n}
                  className="border-b border-white/10 pb-3 focus-within:border-accent transition-colors group"
                >
                  <label className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-2 flex items-center gap-4">
                    <span className="text-accent">0{i + 1}</span> {f.l}
                  </label>
                  <input
                    type={f.t}
                    name={f.n}
                    className="w-full bg-transparent border-0 outline-none text-lg font-light placeholder:text-muted-foreground/30"
                  />
                </div>
              ))}
              <button
                type="submit"
                onMouseEnter={() => setCursorLabel("envoyer")}
                onMouseLeave={() => setCursorLabel("")}
                className="w-full bg-foreground text-background py-4 font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Envoyer →
              </button>
            </Reveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-16 relative">
          <Reveal className="relative aspect-[16/5] mb-16 hidden md:block group fade-up">
            <img
              src={marseilleLandscape}
              alt="Illustration de Marseille"
              loading="lazy"
              className="w-full h-full object-contain group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[14vw] uppercase leading-none tracking-tighter mix-blend-difference text-foreground">
                cmalia <span className="text-accent">·</span> management
              </span>
            </div>
          </Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-t border-white/10 pt-12">
            <div className="flex flex-col gap-3 max-w-xs">
              <div className="font-display text-2xl uppercase tracking-tighter">
                CMALIA MANAGEMENT™
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground leading-relaxed">
                POUR LES PROJETS QUI PRÉFÈRENT LA COHÉRENCE AU BRUIT.<br />
                MARSEILLE - PARTOUT AILLEURS,
              </p>
            </div>
            <div className="flex gap-8 font-mono text-[10px] uppercase tracking-widest">
              <a href="#" className="hover:text-accent transition-colors">
                INSTAGRAM
              </a>
              <a href="#contact" className="hover:text-accent transition-colors">
                CONTACT
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                MENTIONS LÉGALES
              </a>
            </div>
            <div className="font-mono text-[10px] opacity-40 uppercase tracking-widest tabular-nums">
              © MMXXVI · MARSEILLE · {now}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
