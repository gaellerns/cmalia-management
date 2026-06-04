import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, SectionHead } from "@/components/site-shell";
import { Tilt, Magnetic, MorphWord } from "@/components/cmalia-universe";
import workCyborg from "@/assets/studio-profile.png";
import workBrutalist from "@/assets/work-brutalist.jpg";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — CMalia Management · Une personne, quelques projets" },
      { name: "description", content: "Le studio CMalia : une seule personne, un nombre limité de projets, beaucoup d'écoute. Studio éditorial Marseille." },
      { property: "og:title", content: "Studio — CMalia Management" },
      { property: "og:description", content: "Une personne, quelques projets, beaucoup d'écoute." },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <SiteShell bgVariant="studio" pageNumber="REF:01 — ABOUT ME" pageTitle="Le studio · à propos">
      {/* Hero */}
      <section className="px-6 pt-24 pb-24 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-8">
              Une personne, quelques projets, beaucoup d'écoute.
            </div>
            <h1 className="font-display text-[14vw] md:text-[10vw] leading-[0.84] uppercase tracking-tighter">
              Pas une agence. <br />
              <span className="text-stroke italic">Un studio.</span>
            </h1>
          </div>
          <div className="md:col-span-4 text-muted-foreground leading-relaxed border-l border-accent/30 pl-6">
            Derrière CMalia, il y a moi :&nbsp;<strong className="text-foreground">Gaëlle</strong>.
            Pas d'open space, pas de stagiaire qui répond à ta place, pas de dashboard
            tape-à-l'œil. Juste un téléphone, une boîte mail, et beaucoup d'attention.
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="px-6 py-24 bg-surface border-y border-white/5">
        <SectionHead n="01 / 03" label="Les piliers" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {[
            { n: "01", t: "Écouter", d: "Avant tout. Comprendre ce que tu fais, pourquoi, à qui tu parles, ce qui te touche. Une vraie conversation." },
            { n: "02", t: "Construire", d: "Une ligne éditoriale qui te ressemble, des piliers de contenu, un ton, un rythme. Un univers qui tient debout sans toi dans la pièce." },
            { n: "03", t: "Préserver", d: "Maintenir la cohérence dans la durée. Refuser ce qui ne va pas, ajuster ce qui dérive." },
          ].map((p) => (
            <div key={p.n} className="bg-background p-10 group hover:bg-accent hover:text-accent-foreground transition-colors">
              <div className="font-mono text-xs opacity-50 mb-12 group-hover:opacity-100">[{p.n}]</div>
              <div className="font-display text-5xl uppercase mb-6 tracking-tighter">{p.t}</div>
              <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-accent-foreground/85">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Big quote */}
      <section className="px-6 py-32 text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-10">Ce qu'on construit</div>
        <h2 className="font-display text-5xl md:text-9xl uppercase tracking-tighter leading-[0.86] max-w-6xl mx-auto">
          Une présence <br />
          <span className="text-accent">
            <MorphWord words={["sensible.", "cohérente.", "honnête.", "durable.", "vraie."]} />
          </span>
        </h2>
      </section>

      {/* Image + bio split */}
      <section className="px-6 py-24 border-y border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Tilt max={8}>
              <div className="relative aspect-[3/4] overflow-hidden ring-1 ring-white/5">
                <img src={workCyborg} alt="Gaëlle — CMalia Management" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest bg-black/40 backdrop-blur px-2 py-1 text-white/80">
                  Basée à Marseille · à distance partout
                </div>
              </div>
            </Tilt>
          </div>
          <div className="md:col-span-7 space-y-8">
            <h3 className="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-[0.92]">
              TROIS ANS <br /> <span className="text-stroke">D'ÉCOUTE</span> AVANT <br /> DE POSTER.
            </h3>
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed max-w-xl border-l border-accent/30 pl-6">
              <p>
                J'ai géré des comptes pour des restaurateurs, des éditeurs indépendants, des sportifs, des artistes... <br />
                J'ai vu ce qui fonctionne, et surtout ce qui s'use.
              </p>
              <p>
                CMalia est né d'une fatigue : celle des contenus jetables, des calendriers
                qui pilotent à la place du fond, des « stratégies » qui ne tiennent pas trois mois.
              </p>
              <p className="text-foreground">
                J'ai voulu un studio à mon échelle. Quelques projets à la fois, le temps de
                bien faire, et l'envie de durer. C'est tout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values list */}
      <section className="px-6 py-32">
        <SectionHead n="02 / 03" label="Ce sur quoi je ne bouge pas" />
        <div className="divide-y divide-white/10">
          {[
            ["TON VRAI, PAS TON VENDEUR.", "On parle comme toi tu parles. Pas de copywriting Linkedin, pas d'IA déguisée."],
            ["LE SILENCE EST UNE STRATÉGIE.", "On poste quand on a quelque chose à dire. Le reste du temps, on prépare."],
            ["Pas de cold DM, pas de growth hack.", "Une présence qui se mérite, pas qui s'achète en plug-in."],
            ["RÉPONSE PERSONNELLE, TOUJOURS.", "C'est moi qui réponds à tes messages. Pas un bot."],
            ["Refuser si ça ne colle pas.", "Mieux vaut un projet en moins qu'un projet bâclé."],
          ].map(([t, d], i) => (
            <div key={i} className="py-10 grid grid-cols-12 gap-6 items-baseline group hover:pl-4 transition-all duration-700">
              <span className="col-span-2 md:col-span-1 font-mono text-xs opacity-40 group-hover:text-accent">0{i + 1}</span>
              <h4 className="col-span-10 md:col-span-6 font-display text-2xl md:text-4xl uppercase tracking-tighter leading-[0.95] group-hover:text-accent transition-colors">{t}</h4>
              <p className="col-span-12 md:col-span-5 text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 text-center bg-surface border-y border-white/5">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-8">La suite</div>
        <h2 className="font-display text-6xl md:text-[12vw] uppercase tracking-tighter leading-[0.85] mb-12">
          On regarde <br /> <span className="italic font-[Instrument_Serif] not-italic-fallback">l'atelier ?</span>
        </h2>
        <Magnetic strength={0.5}>
          <Link to="/atelier" className="inline-flex items-center gap-4 bg-accent text-accent-foreground px-10 py-5 font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors">
            Voir l'atelier <span>→</span>
          </Link>
        </Magnetic>
      </section>
    </SiteShell>
  );
}
