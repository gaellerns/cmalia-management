import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const NAV = [
  { to: "/", label: "Accueil", n: "00" },
  { to: "/studio", label: "Studio", n: "01" },
  { to: "/atelier", label: "Atelier", n: "02" },
  { to: "/journal", label: "Journal", n: "03" },
  { to: "/contact", label: "Écrire", n: "04" },
] as const;

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const tick = () =>
      setNow(
        new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Paris",
        }),
      );
    tick();
    const i = setInterval(tick, 30000);
    return () => clearInterval(i);
  }, []);

  const overlay = (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[200] md:hidden transition-opacity duration-500 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{ isolation: "isolate" }}
    >
      {/* Solid backdrop — sits outside the nav's mix-blend-difference layer */}
      <div className="absolute inset-0 bg-background" />

      {/* Subtle grain to match the site */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
        }}
      />

      {/* Accent ink splat, echoes desktop background */}
      <div
        aria-hidden
        className={`absolute -top-24 -right-24 size-72 rounded-full blur-3xl transition-all duration-1000 ${
          open ? "opacity-40 scale-100" : "opacity-0 scale-50"
        }`}
        style={{ background: "oklch(0.68 0.27 350 / 0.5)" }}
      />

      <div className="relative h-full w-full flex flex-col justify-between px-6 pt-24 pb-10 text-foreground">
        {/* Top strip: index + clock, mirrors desktop header */}
        <div
          className="absolute top-6 left-6 right-20 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 500ms 100ms, transform 500ms 100ms",
          }}
        >
          <span>MENU · 05</span>
          <span className="tabular-nums text-accent">MRS · {now}</span>
        </div>

        <nav className="flex flex-col gap-5 mt-6">
          {NAV.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              activeProps={{ className: "text-accent" }}
              className="group relative flex items-baseline gap-4 hover:text-accent transition-colors"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 600ms ${150 + i * 70}ms cubic-bezier(0.2,0.8,0.2,1), transform 600ms ${150 + i * 70}ms cubic-bezier(0.2,0.8,0.2,1)`,
              }}
            >
              <span className="font-mono text-[10px] tracking-[0.3em] text-foreground/40 group-hover:text-accent transition-colors w-6">
                {item.n}
              </span>
              <span className="relative overflow-hidden">
                <span className="font-display text-[3.25rem] leading-[0.9] uppercase tracking-tighter inline-block transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:-rotate-1 origin-bottom-left">
                  {item.label}
                </span>
                <span className="absolute left-0 -bottom-0.5 h-px w-full bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </span>
              <span className="ml-auto font-mono text-[10px] tracking-widest text-foreground/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-500">
                →
              </span>
            </Link>
          ))}
        </nav>

        <div
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/70 space-y-3"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 700ms 500ms, transform 700ms 500ms",
          }}
        >
          <div className="h-px w-12 bg-accent" />
          <div className="text-foreground/50">CMALIA MANAGEMENT ™ · MRS</div>
          <a
            href="mailto:cmalia.management@gmail.com"
            className="block hover:text-accent transition-colors"
          >
            CMALIA.MANAGEMENT@GMAIL.COM
          </a>
          <a
            href="https://instagram.com/cmalia.management"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-accent transition-colors group"
          >
            INSTAGRAM
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
              ↗
            </span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden size-11 flex flex-col items-center justify-center gap-[5px] rounded-full border border-foreground/20 hover:border-accent transition-colors relative z-[210]"
      >
        <span
          className={`block h-px w-5 bg-current transition-transform duration-300 ${
            open ? "translate-y-[3px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-px w-5 bg-current transition-transform duration-300 ${
            open ? "-translate-y-[3px] -rotate-45" : ""
          }`}
        />
      </button>

      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
