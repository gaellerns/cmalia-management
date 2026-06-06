import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Tilt } from "@/components/cmalia-universe";
import { articles, getArticle, type Block } from "@/lib/journal-articles";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Article introuvable — CMALIA" }] };
    return {
      meta: [
        { title: `${a.t} — Journal · CMALIA` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: a.t },
        { property: "og:description", content: a.excerpt },
        { property: "og:image", content: a.img },
        { property: "twitter:image", content: a.img },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell bgVariant="journal" pageNumber="N°03 — Journal" pageTitle="Introuvable">
      <section className="px-6 py-32 max-w-3xl mx-auto text-center space-y-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">404 · note disparue</div>
        <h1 className="font-display text-6xl md:text-8xl uppercase tracking-tighter leading-[0.9]">
          Cette note <span className="text-stroke italic">n'existe pas.</span>
        </h1>
        <p className="text-muted-foreground">Elle a peut-être été retirée, ou n'a jamais été publiée.</p>
        <Link to="/journal" className="inline-block font-mono text-xs uppercase tracking-widest text-accent border-b border-accent pb-1">
          ← Revenir au journal
        </Link>
      </section>
    </SiteShell>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteShell bgVariant="journal" pageNumber="N°03 — Journal" pageTitle="Erreur">
      <section className="px-6 py-32 max-w-2xl mx-auto text-center space-y-6">
        <h1 className="font-display text-5xl uppercase tracking-tighter">Quelque chose s'est mal passé.</h1>
        <p className="text-muted-foreground text-sm">{error.message}</p>
        <button onClick={reset} className="font-mono text-xs uppercase tracking-widest text-accent border-b border-accent pb-1">
          Réessayer
        </button>
      </section>
    </SiteShell>
  ),
  component: ArticlePage,
});

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case "h2":
      return (
        <h2 key={i} className="font-display text-3xl md:text-4xl uppercase tracking-tighter leading-[0.95] mt-16 mb-6">
          {b.text}
        </h2>
      );
    case "p":
      return (
        <p key={i} className="text-lg leading-[1.7] text-foreground/85 mb-6">
          {b.text}
        </p>
      );
    case "quote":
      return (
        <blockquote key={i} className="my-12 border-l-2 border-accent pl-6 md:pl-8">
          <p className="font-display text-2xl md:text-3xl uppercase tracking-tight leading-[1.15] text-accent">
            « {b.text} »
          </p>
          {b.cite && (
            <cite className="block mt-3 font-mono text-[10px] uppercase tracking-widest opacity-50 not-italic">
              — {b.cite}
            </cite>
          )}
        </blockquote>
      );
    case "list":
      return (
        <ul key={i} className="my-8 space-y-3 pl-0 list-none">
          {b.items.map((it, j) => (
            <li key={j} className="flex flex-col gap-1 text-lg leading-[1.6] text-foreground/85">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent shrink-0 mb-1">
                {String(j + 1).padStart(2, "0")}
              </span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <aside key={i} className="my-12 border border-white/10 p-6 md:p-8 bg-white/[0.02]">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3">P.S.</div>
          <p className="text-base italic text-muted-foreground leading-relaxed">{b.text}</p>
        </aside>
      );
  }
}

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const idx = articles.findIndex((a) => a.slug === article.slug);
  const next = articles[(idx + 1) % articles.length];
  const prev = articles[(idx - 1 + articles.length) % articles.length];

  return (
    <SiteShell bgVariant="journal" pageNumber={`N°03.${article.n} — Journal`} pageTitle={article.tag}>
      {/* Header */}
      <section className="px-6 pt-16 pb-12 max-w-5xl mx-auto">
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent transition-colors mb-12"
        >
          ← RETOUR AU JOURNAL
        </Link>
        <div className="flex flex-wrap items-center gap-6 font-mono text-[10px] uppercase tracking-widest mb-8 whitespace-pre-line">
          <span className="text-accent">{article.tag}</span>
          {article.slug !== "comptes-qui-minspirent" && (
            <>
              <span className="opacity-50">{article.date === "12 DÉC 2025" ? "12 DÉCEMBRE 2025" : article.date}</span>
              <span className="opacity-50">· {article.read.includes("LECTURE") ? article.read : `${article.read} DE LECTURE`}</span>
            </>
          )}
          <span className="opacity-50">· N°{article.n}</span>
        </div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.9]">
          {article.t}
        </h1>
      </section>

      {/* Cover */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">
        <Tilt max={3}>
          <div className="aspect-[16/9] overflow-hidden ring-1 ring-white/5">
            <img src={article.img} alt={article.t} className="w-full h-full object-cover grayscale" />
          </div>
        </Tilt>
      </section>

      {/* Body */}
      <article className="px-6 py-12 max-w-3xl mx-auto">
        <p className="font-display text-2xl md:text-3xl uppercase tracking-tight leading-[1.1] text-foreground mb-12 first-letter:text-accent first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:leading-none">
          {article.intro}
        </p>
        <div className="border-t border-white/10 pt-8">
          {article.body.map(renderBlock)}
        </div>

        {/* Signature */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col gap-1 font-mono text-[10px] uppercase tracking-widest opacity-50">
          <span>GAËLLE · MARSEILLE</span>
          <span>&nbsp;</span>
        </div>
      </article>

      {/* Prev / Next */}
      <section className="px-6 py-24 border-t border-white/10 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 max-w-6xl mx-auto">
          <Link
            to="/journal/$slug"
            params={{ slug: prev.slug }}
            className="bg-background p-8 group hover:bg-accent hover:text-accent-foreground transition-colors flex flex-col gap-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 group-hover:opacity-100 whitespace-pre-line">
              {`← NOTE PRÉCÉDENTE · ${prev.tag.toUpperCase().replace(" →", "")}\n${prev.t}`}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent group-hover:text-accent-foreground mt-auto">
              {prev.read.includes("LECTURE") ? prev.read : `${prev.read} DE LECTURE`}
            </span>
          </Link>
          <Link
            to="/journal/$slug"
            params={{ slug: next.slug }}
            className="bg-background p-8 group hover:bg-accent hover:text-accent-foreground transition-colors flex flex-col gap-4 md:text-right"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 group-hover:opacity-100 whitespace-pre-line">
              {`NOTE SUIVANTE · ${next.tag.toUpperCase().replace(" →", "")} →\n${next.t}`}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent group-hover:text-accent-foreground mt-auto">
              {next.read.includes("LECTURE") ? next.read : `${next.read} DE LECTURE`}
            </span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 bg-surface border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">ET SI ON EN PARLAIT ?</div>
          <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter leading-[0.9]">
            CE TEXTE VOUS A <span className="text-stroke italic">PARLÉ</span> ?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Si ce que vous venez de lire ressemble à ce que vous cherchez pour votre marque, alors écrivez-moi un petit message. Et pour la suite ? On verra.
          </p>
          <Link
            to="/contact"
            className="inline-block font-mono text-xs uppercase tracking-widest border border-foreground/20 px-8 py-4 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all"
          >
            ÉCRIRE AU STUDIO →
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
