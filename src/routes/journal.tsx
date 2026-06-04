import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { SiteShell, SectionHead } from "@/components/site-shell";
import { Tilt } from "@/components/cmalia-universe";
import { articles } from "@/lib/journal-articles";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Notes & coulisses · CMALIA Management" },
      { name: "description", content: "Textes courts sur la voix éditoriale, le rythme de publication, le silence stratégique. Le journal du studio CMALIA." },
      { property: "og:title", content: "Journal — CMALIA" },
      { property: "og:description", content: "Notes, réflexions et coulisses." },
    ],
  }),
  component: JournalRouteComponent,
});



function JournalRouteComponent() {
  const { pathname } = useLocation();

  if (pathname !== "/journal") {
    return <Outlet />;
  }

  return <JournalPage />;
}

function JournalPage() {
  const [featured, ...rest] = articles;
  return (
    <SiteShell bgVariant="journal" pageNumber="N°03 — Journal" pageTitle="Notes & coulisses">
      {/* Hero */}
      <section className="px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-8">
              Quelques textes, écrits entre deux projets.
            </div>
            <h1 className="font-display text-[14vw] md:text-[11vw] leading-[0.84] uppercase tracking-tighter">
              Le <span className="text-stroke italic">journal.</span>
            </h1>
          </div>
          <div className="md:col-span-4 text-muted-foreground leading-relaxed border-l border-accent/30 pl-6">
            Pas un blog SEO. Pas un calendrier de contenus.
            Des notes courtes, parfois longues, toujours sincères,
            sur ce que je vois passer dans le métier.
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="px-6 py-12">
        <Link to="/journal/$slug" params={{ slug: featured.slug }} className="grid grid-cols-1 md:grid-cols-12 gap-8 group">
          <div className="md:col-span-7">
            <Tilt max={5}>
              <div className="aspect-[16/10] overflow-hidden ring-1 ring-white/5 relative">
                <img src={featured.img} alt={featured.t} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground font-mono text-[10px] uppercase tracking-widest px-3 py-1">
                  À LA UNE
                </div>
              </div>
            </Tilt>
          </div>
          <div className="md:col-span-5 flex flex-col justify-end space-y-6">
            <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest">
              <span className="text-accent">{featured.tag}</span>
              <span className="opacity-50">{featured.date}</span>
              <span className="opacity-50">· {featured.read}</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-[0.95] group-hover:text-accent transition-colors">
              {featured.t}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{featured.excerpt}</p>
            <span className="font-mono text-xs uppercase tracking-widest text-accent inline-flex items-center gap-3">
              Lire l'article <span className="inline-block group-hover:translate-x-2 transition-transform">→</span>
            </span>
          </div>
        </Link>
      </section>

      {/* Grid */}
      <section className="px-6 py-24 border-t border-white/10">
        <SectionHead n="Tous les textes" label="Cinq autres notes" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {rest.map((a) => (
            <Link key={a.slug} to="/journal/$slug" params={{ slug: a.slug }} className="bg-background p-8 group hover:bg-accent hover:text-accent-foreground transition-colors flex flex-col justify-between min-h-[320px]">
              <div className="flex justify-between items-baseline font-mono text-[10px] uppercase tracking-widest">
                <span className="text-accent group-hover:text-accent-foreground">{a.tag}</span>
                <span className="opacity-50 group-hover:opacity-100">{a.date}</span>
              </div>
              <div className="space-y-4 my-12">
                <p className="font-display text-2xl uppercase leading-[0.95] tracking-tight">{a.t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-accent-foreground/85">{a.excerpt}</p>
              </div>
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest">
                <span className="opacity-50 group-hover:opacity-100">{a.read} de lecture</span>
                <span className="text-accent group-hover:text-accent-foreground">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter strip */}
      <section className="px-6 py-32 bg-surface border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">Recevoir les notes</div>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9]">
            Une note <br /> par <span className="italic font-[Instrument_Serif] not-italic-fallback">mois.</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Pas de séquence, pas de funnel, pas de scarcity bidon. Une note par mois — quand il y a quelque chose à dire.
          </p>
          <form className="flex max-w-md mx-auto border-b border-white/20 focus-within:border-accent transition-colors">
            <input type="email" placeholder="ton.email@bien-fait.fr" className="flex-1 bg-transparent border-0 outline-none py-3 text-lg font-light placeholder:text-muted-foreground/40" />
            <button type="submit" className="px-4 font-mono text-xs uppercase tracking-widest hover:text-accent">→</button>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}
