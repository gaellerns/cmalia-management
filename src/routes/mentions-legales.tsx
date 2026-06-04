import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, SectionHead } from "@/components/site-shell";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — CMalia Management" },
      { name: "description", content: "Mentions légales du studio CMalia Management — éditeur, hébergement, propriété intellectuelle, données personnelles." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MentionsPage,
});

function MentionsPage() {
  return (
    <SiteShell bgVariant="legal" pageNumber="N°05 — Légal" pageTitle="Mentions légales">
      <section className="px-6 pt-24 pb-16">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-8">
          Pour la forme — mais bien faite.
        </div>
        <h1 className="font-display text-[14vw] md:text-[9vw] leading-[0.84] uppercase tracking-tighter">
          Mentions <br />
          <span className="text-stroke italic">légales.</span>
        </h1>
      </section>

      <section className="px-6 py-16 max-w-3xl">
        <SectionHead n="01" label="Éditeur du site" />
        <div className="space-y-4 text-muted-foreground leading-relaxed mb-16">
          <p><strong className="text-foreground">CMalia Management</strong>, micro-entreprise.</p>
          <p>Community management & direction éditoriale.</p>
          <p>Siège basé à Marseille, France.</p>
          <p>Contact : <a href="mailto:cmalia.management@gmail.com" className="text-accent hover:underline">cmalia.management@gmail.com</a></p>
          <p>Instagram : <a href="https://instagram.com/cmalia.management" target="_blank" rel="noreferrer" className="text-accent hover:underline">@cmalia.management</a></p>
          <p>Numéro SIRET : 953 945 144 00012.</p>
        </div>

        <SectionHead n="02" label="Directrice de la publication" />
        <p className="text-muted-foreground leading-relaxed mb-16">
          Gaëlle Ranasy, fondatrice et seule responsable éditoriale de CMalia Management.
        </p>

        <SectionHead n="03" label="Hébergement" />
        <p className="text-muted-foreground leading-relaxed mb-16">
          Site hébergé par Lovable / Cloudflare Workers, infrastructure mondiale.
        </p>

        <SectionHead n="04" label="Propriété intellectuelle" />
        <p className="text-muted-foreground leading-relaxed mb-16">
          L'ensemble des contenus de ce site (textes, visuels, identité, code) est la propriété
          exclusive de CMalia Management, sauf mention contraire. Toute reproduction,
          adaptation ou diffusion, même partielle, est interdite sans accord écrit préalable.
        </p>

        <SectionHead n="05" label="Données personnelles" />
        <div className="space-y-4 text-muted-foreground leading-relaxed mb-16">
          <p>
            Ce site ne pose ni cookie de tracking, ni outil d'analyse tiers. Les informations
            transmises via le formulaire de contact sont reçues directement par mail et utilisées
            uniquement pour répondre à votre demande.
          </p>
          <p>
            Aucune donnée n'est stockée dans une base, ni partagée avec un tiers.
            Conformément au RGPD, vous pouvez demander à tout moment la suppression de vos
            échanges par simple mail à <a href="mailto:cmalia.management@gmail.com" className="text-accent hover:underline">cmalia.management@gmail.com</a>.
          </p>
        </div>

        <SectionHead n="06" label="Responsabilité" />
        <p className="text-muted-foreground leading-relaxed mb-16">
          CMalia Management s'efforce de garantir l'exactitude des informations diffusées,
          sans pouvoir en assurer la complétude absolue. Les liens externes sont fournis à
          titre indicatif et n'engagent pas la responsabilité du studio.
        </p>

        <div className="border-t border-white/10 pt-8 font-mono text-[10px] uppercase tracking-widest opacity-50">
          DERNIÈRE MISE À JOUR : JUIN 2026
        </div>
      </section>
    </SiteShell>
  );
}
