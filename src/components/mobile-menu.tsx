import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/studio", label: "Studio" },
  { to: "/atelier", label: "Atelier" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Écrire" },
] as const;

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden size-11 flex flex-col items-center justify-center gap-[5px] rounded-full border border-foreground/20 hover:border-accent transition-colors relative z-[130]"
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

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[125] md:hidden transition-opacity duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ mixBlendMode: "normal" }}
      >
        <div className="absolute inset-0 bg-background" />
        <div className="relative h-full w-full flex flex-col justify-between px-6 pt-24 pb-10">
          <nav className="flex flex-col gap-6">
            {NAV.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-accent" }}
                className="font-display text-5xl uppercase tracking-tighter leading-none hover:text-accent transition-colors"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 500ms ${i * 60}ms, transform 500ms ${i * 60}ms`,
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-50 space-y-2">
            <div>CMALIA MANAGEMENT ™</div>
            <a href="mailto:cmalia.management@gmail.com" className="block hover:text-accent">
              CMALIA.MANAGEMENT@GMAIL.COM
            </a>
            <a
              href="https://instagram.com/cmalia.management"
              target="_blank"
              rel="noreferrer"
              className="block hover:text-accent"
            >
              INSTAGRAM
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
