import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell, SectionHead } from "@/components/site-shell";
import { Magnetic, MorphWord } from "@/components/cmalia-universe";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Écrire à CMALIA · Réponse sous 48h" },
      { name: "description", content: "Écris-moi pour parler de ton projet. Réponse personnelle sous 48h. Nombre limité de collaborations — pour pouvoir bien faire." },
      { property: "og:title", content: "Contact — CMALIA" },
      { property: "og:description", content: "Écris-moi. Réponse sous 48h, en personne." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [budget, setBudget] = useState(2500);
  const [sent, setSent] = useState(false);

  return (
    <SiteShell bgVariant="contact" pageNumber="N°04 — Correspondance" pageTitle="Écrire au studio">
      {/* Hero */}
      <section className="px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-8 whitespace-pre-line">
              {"VOUS AVEZ UN BEAU PROJET ?\nON SE FIXE UN RENDEZ-VOUS ?"}
            </div>
            <h1 className="font-display text-[14vw] md:text-[11vw] leading-[0.84] uppercase tracking-tighter">
              On se <br />
              <span className="text-accent">
                <MorphWord words={["trouve ?", "call ?", "parle ?", "voit ?"]} />
              </span>
            </h1>
          </div>
          <div className="md:col-span-4 text-muted-foreground leading-relaxed border-l border-accent/30 pl-6 whitespace-pre-line">
            {"Si votre priorité est de construire une présence cohérente, sensible et durable, on a probablement des choses à se dire.\n\n\n\n\nJe travaille avec un nombre limité de projets pour préserver une collaboration attentive. Réponse personnelle sous 48h, promis.\n\nBOOK NOW : CMALIA.MANAGEMENT@GMAIL.COM  INSTAGRAM :\nCMALIA.MANAGEMENT\nET NUL PART AILLEURS."}
          </div>
        </div>
      </section>

      {/* Three ways */}
      <section className="px-6 py-16 border-y border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {[
            { n: "01", t: "\nBOOK NOW", v: "CMALIA.MANAGEMENT\n@GMAIL.COM", href: "mailto:cmalia.management@gmail.com", sub: "" },
            { n: "02", t: "INSTAGRAM", v: "CMALIA.MANAGEMENT", href: "#", sub: " ET NUL PART AILLEURS." },
            { n: "03", t: "OU VIA CE FORMULAIRE", v: "RÉPONSE SOUS 48H", href: "#", sub: "" },
          ].map((c) => (
            <a key={c.n} href={c.href} className="bg-background p-10 group hover:bg-accent hover:text-accent-foreground transition-colors">
              <div className="flex justify-between mb-12 font-mono text-[10px] uppercase tracking-widest">
                <span className="opacity-50">[{c.n}]</span>
                <span className="opacity-50 group-hover:opacity-100">{c.sub}</span>
              </div>
              <div className="font-display text-2xl uppercase mb-4 tracking-tighter whitespace-pre-wrap">{c.t}</div>
              <div className="font-display text-xl md:text-2xl tracking-tighter whitespace-pre-wrap">{c.v}</div>
              <div className="mt-12 font-mono text-[10px] uppercase tracking-widest text-accent group-hover:text-accent-foreground inline-flex flex-col items-start gap-2">
                <span className="mb-2">OUVRIR</span>
                <span className="inline-block group-hover:translate-x-2 transition-transform text-xl">→</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="px-6 py-24">
        <SectionHead n="Ou ce formulaire" label="Réponse sous 48h" />
        {sent ? (
          <div className="text-center py-32 space-y-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">Bien reçu ✦</div>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter">Merci. <br /><span className="text-stroke italic">À très vite.</span></h2>
            <p className="text-muted-foreground max-w-md mx-auto">Je te réponds personnellement sous 48h ouvrées. Promis.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-5xl mx-auto"
          >
            {[
              { l: "NOM", n: "name", c: "md:col-span-6" },
              { l: "PROJET", n: "project", c: "md:col-span-6" },
              { l: "INSTAGRAM OU SITE WEB", n: "link", c: "md:col-span-12" },
            ].map((f, i) => (
              <div key={f.n} className={`${f.c} border-b border-white/10 pb-3 focus-within:border-accent transition-colors`}>
                <label className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-2 flex items-center gap-4">
                  <span className="text-accent">0{i + 1}</span> {f.l}
                </label>
                <input name={f.n} className="w-full bg-transparent border-0 outline-none text-lg font-light placeholder:text-muted-foreground/30" />
              </div>
            ))}

            {/* Custom budget slider */}
            <div className="md:col-span-12 border-b border-white/10 pb-6 pt-2">
              <label className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-4 flex items-center justify-between">
                <span className="flex items-center gap-4"><span className="text-accent">04</span> CE QUE VOUS SOUHAITEZ DÉVELOPPER</span>
                <span className="font-display text-3xl uppercase text-accent tabular-nums">
                  {budget >= 1500 ? "1500+ €" : `${budget} €`}
                </span>
              </label>
              <input
                type="range"
                min={500}
                max={1500}
                step={100}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-[oklch(0.68_0.27_350)]"
              />
              <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest opacity-40 mt-2">
                <span>500 €</span>
                <span>1000 €</span>
                <span>1500+ €</span>
              </div>
            </div>

            <div className="md:col-span-12 border-b border-white/10 pb-3 focus-within:border-accent transition-colors">
              <label className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-2 flex items-center gap-4">
                <span className="text-accent">05</span> BUDGET ENVISAGÉ
              </label>
              <textarea
                name="goal"
                rows={5}
                placeholder="Quelques lignes : ce qui te touche, ce que tu veux faire, où tu en es."
                className="w-full bg-transparent border-0 outline-none text-lg font-light resize-none placeholder:text-muted-foreground/30"
              />
            </div>

            <div className="md:col-span-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-4">
              <p className="text-xs text-muted-foreground max-w-md">
                En envoyant ce formulaire, tu acceptes que je te réponde par mail.
                Aucune donnée n'est stockée ailleurs que dans ma boîte.
              </p>
              <Magnetic strength={0.4}>
                <button type="submit" className="inline-flex items-center gap-4 bg-accent text-accent-foreground px-10 py-5 font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors">
                  ENVOYER <span>→</span>
                </button>
              </Magnetic>
            </div>
          </form>
        )}
      </section>

      {/* FAQ */}
      <section className="px-6 py-24 border-t border-white/10">
        <SectionHead n="FAQ" label="Les questions qu'on me pose souvent" />
        <div className="max-w-4xl mx-auto divide-y divide-white/10">
          {[
            { q: "Tu travailles avec qui ?", a: "Avec les petites marques indépendantes et les petits créateurs, mais surtout avec ceux qui ont des projets où on a quelque chose à raconter, pas juste à vendre." },
            { q: "Tu es à Marseille, tu travailles à distance ?", a: "Basée à Marseille, je travaille à distance sans problème partout en France et ailleurs. Visio, mail, téléphone : tout passe très bien." },
            { q: "Tu utilises ChatGPT ou des outils IA ?", a: "Pour la recherche, parfois. Pour écrire à ta place, jamais. La voix éditoriale, c'est précisément ce qu'aucune IA ne fait bien." },
            { q: "Combien de temps avant de voir des résultats ?", a: "Trois à six mois pour une présence cohérente, douze mois pour un univers qui tient seul. CMalia n'est pas un service de growth." },
            { q: "Pourquoi tu ne prospectes pas ?", a: "Parce que les meilleures collaborations viennent de gens qui ont déjà aimé ce qu'ils ont vu. Tout le reste est un malentendu de départ." },
          ].map((f, i) => (
            <details key={i} className="py-6 group">
              <summary className="cursor-pointer flex justify-between items-baseline list-none">
                <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tighter group-hover:text-accent transition-colors">
                  {f.q}
                </h3>
                <span className="font-mono text-2xl text-accent group-open:rotate-45 transition-transform duration-500">+</span>
              </summary>
              <p className="text-muted-foreground leading-relaxed mt-4 max-w-2xl">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
