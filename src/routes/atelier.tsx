import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteShell, SectionHead } from "@/components/site-shell";
import { Tilt, Magnetic } from "@/components/cmalia-universe";
import workCyborg from "@/assets/atelier-direction.png";
import gestionReseaux from "@/assets/gestion-reseaux-sociaux.png";
import conseilPonctuel from "@/assets/conseil-ponctuel.jpg";

export const Route = createFileRoute("/atelier")({
  head: () => ({
    meta: [
      { title: "Atelier — Services CMALIA · Direction éditoriale, réseaux sociaux, conseil" },
      { name: "description", content: "Trois façons de travailler ensemble : direction éditoriale, gestion de tous les réseaux sociaux, conseil ponctuel. CMALIA Management — Marseille & à distance." },
      { property: "og:title", content: "Atelier — Services CMALIA" },
      { property: "og:description", content: "Trois façons de travailler ensemble." },
    ],
  }),
  component: AtelierPage,
});

const services = [
  {
    n: "01",
    t: "Direction éditoriale",
    short: "Voix & univers",
    price: "demander un devis",
    d: "On pose la voix, le rythme, l'univers visuel. Une ligne qui te ressemble, qu'on lit même sans le logo.",
    detail: [
      "Audit de la marque (réseaux, site, prises de parole)",
      "Définition du ton, des piliers, des références",
      "Charte éditoriale écrite, partageable, vivante",
      "Modèles de formats (carrousels, captions, stories)",
    ],
    delay: "3 à 5 semaines",
    img: workCyborg,
  },
  {
    n: "02",
    t: "Gestion réseaux sociaux",
    short: "Présence quotidienne",
    price: "demander un devis",
    d: "Instagram, TikTok, LinkedIn, Pinterest, Facebook... tous tes réseaux, pensés ensemble. Planification, écriture, publication, réponses. Présence régulière, sans pilote automatique ni IA déguisée.",
    detail: [
      "Gestion de tous les réseaux sociaux (Instagram, TikTok, LinkedIn, Pinterest, Facebook…)",
      "12 à 16 publications par mois adaptées à chaque plateforme",
      "Stories quotidiennes, modération des DMs & commentaires",
      "Reporting mensuel court et qualitatif, pas vanity metrics",
    ],
    delay: "engagement 3 mois minimum",
    img: gestionReseaux,
  },
  {
    n: "03",
    t: "Conseil ponctuel",
    short: "Regard extérieur",
    price: "réserver mon appel visio",
    d: "Tu gères déjà, mais tu veux un regard extérieur. Une session, un audit, un plan clair et sans engagement.",
    detail: [
      "Visio depuis n'importe où, ou en présentiel à Marseille",
      "Préparation préalable de ton dossier",
      "Compte-rendu écrit dans la semaine",
      "Pas d'abonnement, pas de relance commerciale",
    ],
    delay: "rendez-vous sous 10 jours",
    img: conseilPonctuel,
  },
];

function AtelierPage() {
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("service");
    if (s !== null) {
      const idx = parseInt(s, 10);
      if (!isNaN(idx) && idx >= 0 && idx < services.length) {
        setOpen(idx);
      }
    }
  }, []);
  return (
    <SiteShell bgVariant="atelier" pageNumber="N°02 — ATELIER" pageTitle="TROIS FAÇONS DE TRAVAILLER">
      {/* Hero */}
      <section className="px-6 pt-24 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-8">
              Ce que je fais, pour de vrai
            </div>
            <h1 className="font-display text-[14vw] md:text-[11vw] leading-[0.84] uppercase tracking-tighter">
              Trois façons <br /> de <span className="text-stroke italic">travailler.</span>
            </h1>
          </div>
          <div className="md:col-span-4 text-muted-foreground leading-relaxed border-l border-accent/30 pl-6">
            Trois cadres clairs, pensés pour des projets différents.
            Si rien ne te correspond exactement, écris-moi quand même.
            On construit toujours sur-mesure.
          </div>
        </div>
      </section>

      {/* Expandable services */}
      <section className="px-6 pb-24 border-t border-white/10">
        {services.map((s, i) => {
          const isOpen = open === i;
          return (
            <div key={s.n} className="border-b border-white/10 group">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full grid grid-cols-12 gap-8 items-center py-10 text-left hover:pl-6 transition-all duration-700"
              >
                <span className="col-span-2 md:col-span-1 font-mono text-xs opacity-40 group-hover:text-accent">[{s.n}]</span>
                <h3 className={`col-span-10 md:col-span-5 font-display text-3xl md:text-6xl uppercase tracking-tighter leading-none transition-colors ${isOpen ? "text-accent" : "group-hover:text-accent"}`}>
                  {s.t}
                </h3>
                <p className="col-span-12 md:col-span-4 text-muted-foreground leading-relaxed text-sm">{s.d}</p>
                <span className="hidden md:flex col-span-2 justify-end items-center gap-3 font-mono text-[10px] uppercase tracking-widest opacity-50 group-hover:opacity-100">
                  {s.short}
                  <span className={`inline-block transition-transform duration-500 ${isOpen ? "rotate-45 text-accent" : ""}`}>+</span>
                </span>
              </button>
              <div
                className="grid transition-all duration-700 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
              >
                <div className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 pt-2">
                    <div className="md:col-span-5 md:col-start-2">
                      <Tilt max={6}>
                        <div className="aspect-[4/5] overflow-hidden ring-1 ring-accent/20">
                          <img src={s.img} alt={s.t} className="w-full h-full object-cover" />
                        </div>
                      </Tilt>
                    </div>
                    <div className="md:col-span-5 space-y-6">
                      <div className="flex items-baseline justify-between border-b border-white/10 pb-3">
                        <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Tarif</span>
                        {s.n === "01" || s.n === "02" || s.n === "03" ? (
                          <Link to="/contact" className="font-display text-2xl uppercase text-accent hover:opacity-80 transition-opacity">{s.price}</Link>
                        ) : (
                          <span className="font-display text-2xl uppercase text-accent">{s.price}</span>
                        )}
                      </div>
                      <div className="flex items-baseline justify-between border-b border-white/10 pb-3">
                        <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Délai</span>
                        <span className="font-mono text-xs uppercase">{s.delay}</span>
                      </div>
                      {s.n === "03" && (
                        <div className="flex items-baseline justify-between border-b border-white/10 pb-3">
                          <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Durée</span>
                          <span className="font-mono text-xs uppercase">une heure</span>
                        </div>
                      )}
                      <ul className="space-y-3">
                        {s.detail.map((d, di) => (
                          <li key={di} className="flex gap-4 text-sm text-muted-foreground leading-relaxed">
                            <span className="text-accent font-mono text-[10px] mt-1">0{di + 1}</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                      <Magnetic strength={0.4}>
                        <Link to="/contact" className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors">
                          DEMANDER CE CADRE <span>→</span>
                        </Link>
                      </Magnetic>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Marquee teaser */}
      <div className="py-8 overflow-hidden border-y border-white/10 bg-accent text-accent-foreground">
        <div className="animate-marquee whitespace-nowrap flex">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 pr-12 shrink-0">
              <span className="font-display text-5xl uppercase">Soin</span>
              <span className="font-display text-5xl">✦</span>
              <span className="font-display text-5xl uppercase">Patience</span>
              <span className="font-display text-5xl">✦</span>
              <span className="font-display text-5xl uppercase">Cohérence</span>
              <span className="font-display text-5xl">✦</span>
              <span className="font-display text-5xl uppercase">Honnêteté</span>
              <span className="font-display text-5xl">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <section className="px-6 py-32">
        <SectionHead n="02 / 02" label="Comment on travaille ensemble" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {[
            { n: "01", t: "On se trouve", d: "Tu m'écris. On échange. Si ça colle, on prend rendez-vous, visio depuis n'importe où." },
            { n: "02", t: "On cadre", d: "Devis clair, périmètre écrit, calendrier. Pas de petite ligne, pas de surprise." },
            { n: "03", t: "On démarre", d: "Travail régulier, points hebdo ou bi-mensuels, ajustements continus. Tu restes maître de ta voix." },
          ].map((s) => (
            <div key={s.n} className="bg-background p-10 group hover:bg-accent hover:text-accent-foreground transition-colors">
              <div className="font-mono text-xs opacity-50 mb-12">[{s.n}]</div>
              <div className="font-display text-4xl uppercase mb-6 tracking-tighter">{s.t}</div>
              <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-accent-foreground/85">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
