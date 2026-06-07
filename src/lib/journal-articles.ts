import journalHero from "@/assets/journal-hero.png";
import silenceStrategique from "@/assets/silence-strategique.png";
import workBrutalist from "@/assets/work-brutalist.jpg";
import capturedImage from "@/assets/0b0b8a31-dc19-491d-b964-ad4df298d764.png";
import journalDay from "@/assets/journal-day.png";
import thankYouNextAsset from "@/assets/thank-you-next.png.asset.json";
const thankYouNext = thankYouNextAsset.url;

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] }
  | { type: "note"; text: string };

export type Article = {
  slug: string;
  n: string;
  tag: string;
  t: string;
  excerpt: string;
  date: string;
  read: string;
  img: string;
  featured?: boolean;
  intro: string;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "silence-strategique",
    n: "01",
    tag: "Éditorial",
    t: "LE SILENCE STRATÉGIQUE : POSTER MOINS, DIRE PLUS.",
    excerpt:
      "Pourquoi publier trois fois par semaine sans tension vide la marque plus vite que ne rien publier.",
    date: "12 DÉC 2025",
    read: "2 MIN",
    img: journalHero,
    featured: true,
    intro:
      "IL Y A, DANS LA PLUPART DES MARQUES QUE JE RENCONTRE, UNE PEUR TRÈS ÉTRANGE : CELLE DE DISPARAÎTRE SI ELLES NE PUBLIENT PAS TROIS POSTS PAR SEMAINE, UNE STORY PAR JOUR, UN REEL DÈS QU'UNE TREND PASSE. ET AU BOUT D'UN AN, PLUS PERSONNE NE SAIT VRAIMENT CE QUE LA MARQUE RACONTE, Y COMPRIS ELLE-MÊME.",
    body: [
      {
        type: "p",
        text:
          "Je travaille avec une poignée de marques, créateurs et indépendants. Aucun n'a jamais grandi parce qu'il publiait plus. Tous ont grandi parce qu'à un moment donné, ils ont arrêté de publier pour publier.",
      },
      { type: "h2", text: "LE BRUIT N'EST PAS UNE PREUVE DE TRAVAIL." },
      {
        type: "p",
        text:
          "Le rythme rassure, surtout le rythme régulier. Trois fois par semaine, ça sonne sérieux. Ça sonne pro. Ça donne l'impression qu'il se passe quelque chose. Mais une fréquence n'est pas une voix. Un calendrier n'est pas une ligne. Et un compte qui parle sans cesse pour ne rien dire finit par devenir un bruit de fond, notamment pour ses abonnés les plus fidèles.",
      },
      {
        type: "p",
        text:
          "La marque qui me fait revenir, ce n'est pas celle qui poste tous les jours. C'est celle qui, quand elle poste, m'oblige à m'arrêter trois secondes. Ces trois secondes valent plus que sept stories oubliées dans la journée.",
      },
      { type: "h2", text: "LE SILENCE STRATÉGIQUE, CE N'EST PAS L'ABSENCE." },
      {
        type: "p",
        text:
          "Je ne parle pas de disparaître pendant six mois. Je parle de tenir une cadence honnête : publier quand on a quelque chose à dire, et accepter que parfois, pendant deux semaines, on n'a rien à dire. Ce n'est pas un échec. C'est une preuve d'exigence.",
      },
      {
        type: "quote",
        text:
          "LE SILENCE STRATÉGIQUE, C'EST L'INVERSE DU GROWTH HACK. C'EST CROIRE QUE CE QUE TU VAS DIRE MÉRITE QU'ON L'ATTENDE.",
      },
      {
        type: "p",
        text:
          "Concrètement, dans la plupart de mes accompagnements, on commence par baisser le rythme. Pas pour faire moins. Pour faire mieux. On enlève d'abord ce qui ne sert pas la ligne, avant d'ajouter quoi que ce soit. Et presque toujours, l'engagement remonte. Pas parce qu'on a trouvé la bonne trend, mais parce qu'on a arrêté de diluer.",
      },
      { type: "h2", text: "CE QUE ÇA CHANGE POUR LA MARQUE." },
      {
        type: "list",
        items: [
          "Chaque publication compte, et donc se travaille.",
          "L'audience comprend ce que la marque défend, parce que la marque s'autorise enfin à le dire clairement.",
          "Le créateur « humain » arrête d'être épuisé par sa propre communication.",
          "On sort du cycle « post / vide / post / vide » qui érode la voix sans qu'on s'en rende compte.",
        ],
      },
      {
        type: "p",
        text:
          "Je ne prétends pas que ça marche pour tout le monde. Si tu vends du flash sale et que ta marge dépend du volume, publie tous les jours. Mais si tu construis quelque chose qui doit durer, le rythme n'est pas ton métier. La cohérence l'est.",
      },
      {
        type: "note",
        text:
          "Écrit un dimanche soir à Marseille, après un mois sans avoir rien publié pour CMalia. Et c'était très bien comme ça.",
      },
    ],
  },
  {
    slug: "au-dela-du-calendrier-editorial",
    n: "02",
    tag: "Identité",
    t: "Pourquoi votre marque mérite mieux qu'un calendrier éditorial.",
    excerpt:
      "Le planning ne fait pas la voix. Comment construire une ligne qui survit au planning.",
    date: "09 JAN 2026",
    read: "1 MIN DE LECTURE",
    img: workBrutalist,
    intro:
      "LE CALENDRIER ÉDITORIAL EST DEVENU LA PREMIÈRE CHOSE QU'ON VEND AUX MARQUES. C'EST RASSURANT, ÇA SE MET DANS UNE NOTION, ÇA SE COCHE. ET POURTANT, C'EST PRESQUE TOUJOURS L'ÉTAPE QU'IL FAUDRAIT FAIRE EN DERNIER.",
    body: [
      { type: "h2", text: "LE CALENDRIER, C'EST L'OUTIL. PAS LA PENSÉE." },
      {
        type: "p",
        text:
          "Avant de savoir quand publier, il faut savoir pourquoi. Avant de savoir quoi publier, il faut savoir d'où on parle. Un calendrier éditorial sans ligne, c'est une étagère sans livres : parfaitement vide.",
      },
      {
        type: "p",
        text:
          "La plupart des marques que j'accompagne arrivent avec un planning très propre et une voix très floue. On peut décrire trois mois de posts à venir sans pouvoir dire en une phrase ce que la marque défend.",
      },
      { type: "h2", text: "CONSTRUIRE UNE LIGNE, VRAIMENT." },
      {
        type: "p",
        text:
          "Une ligne éditoriale, ce n'est pas une charte de cinquante pages. C'est trois ou quatre convictions claires, qui permettent de dire oui ou non à n'importe quel sujet en moins d'une minute. Si tu hésites, c'est que la ligne n'est pas assez nette.",
      },
      {
        type: "list",
        items: [
          "Une posture : d'où tu parles, à qui, et avec quelle tension.",
          "Des sujets récurrents : trois ou quatre, pas vingt.",
          "Une grammaire : ton, longueur, mots interdits, mots signature.",
          "Un refus assumé : ce que tu ne feras jamais, même si ça performe.",
        ],
      },
      {
        type: "quote",
        text:
          "UNE LIGNE, C'EST CE QUI TE PERMET DE REFUSER UN BON SUJET PARCE QU'IL N'EST PAS LE TIEN.",
      },
      { type: "h2", text: "LE PLANNING VIENT APRÈS." },
      {
        type: "p",
        text:
          "Quand la ligne est posée, le calendrier devient évident et beaucoup plus court. On ne cherche plus quoi dire. On cherche juste quand le dire. Et souvent, on découvre qu'on n'a pas besoin de publier autant qu'on le pensait pour exister clairement.",
      },
      {
        type: "note",
        text:
          "P.S. Si ton planning te tient en laisse plutôt que de te servir, c'est probablement que la ligne en dessous est trop molle.",
      },
    ],
  },
  {
    slug: "une-journee-au-studio",
    n: "03",
    tag: "Coulisses",
    t: "UNE JOURNÉE TYPIQUE AU STUDIO.",
    excerpt:
      "Pas de open space, pas de daily à 9h. Comment se déroule réellement une journée seule à l'atelier.",
    date: "16 FÉV 2026",
    read: "1 MIN DE LECTURE",
    img: journalDay,
    intro:
      "ON ME DEMANDE SOUVENT À QUOI RESSEMBLE UNE JOURNÉE QUAND ON TRAVAILLE SEULE, SANS ÉQUIPE ET SANS BUREAU PARTAGÉ. TOUT SIMPLEMENT.",
    body: [
      { type: "h2", text: "MATIN — LENT, MAIS PAS VIDE." },
      {
        type: "p",
        text:
          "Je commence rarement avant 9h. Un café, un petit peu de rangement, puis j'écris. C'est le meilleur moment de la journée, je le donne au travail le plus exigeant : la voix.",
      },
      { type: "h2", text: "MILIEU DE JOURNÉE — LA MATIÈRE." },
      {
        type: "p",
        text:
          "Vers 11h, j'ouvre les conversations clients. Pas de Slack. Des messages longs, peu nombreux, structurés. Une vraie réponse vaut mieux que dix accusés de réception. L'après-midi, c'est la production : maquettes, captions, sélections d'images, retouches.",
      },
      { type: "h2", text: "APRÈS-MIDI — LA BALADE." },
      {
        type: "p",
        text:
          "En milieu d'après-midi, entre deux productions, je sors mon chien, Radjah. On fait une petite randonnée et on explore un peu plus les sentiers quand il en a envie. Le fait d'habiter dans les hauteurs de Marseille aide beaucoup pour ça. Une heure minimum, sans écran, c'est ce qui me permet de revenir le lendemain avec un avis tranché plutôt qu'une bouillie d'idées.",
      },
      {
        type: "quote",
        text:
          "LE TRAVAIL CRÉATIF NE SE FAIT PAS EN RESTANT ASSIS. IL SE LIBÈRE EN MARCHANT.",
      },
      { type: "h2", text: "LE SOIR — RAREMENT DU TRAVAIL." },
      {
        type: "p",
        text:
          "Je n'ai pas de notifs après 20h. Pas par discipline militante, mais seulement pour garder la tête hors de l'eau. Cela me permet de déconnecter quelques instants et de profiter des miens.",
      },
      {
        type: "note",
        text:
          "Aucune journée ne ressemble exactement à celle-là, mais ce qui est sûr c'est qu'aucune ne contient de réunion à 9h.",
      },
    ],
  },
  {
    slug: "comptes-qui-minspirent",
    n: "04",
    tag: "VEILLE",
    t: "LES COMPTES QUI M'INSPIRENT EN CE MOMENT.",
    excerpt:
      "Cinq comptes Instagram qui font les choses bien et ce qu'on peut en apprendre.",
    date: "20 MAR 2026",
    read: "2 MIN DE LECTURE",
    img: workBrutalist,
    intro:
      "JE NE SUIS PAS BEAUCOUP DE COMPTES, MAIS CEUX QUE JE GARDE, JE LES GARDE LONGTEMPS. VOICI CINQ D'ENTRE EUX, CHOISIS POUR CE QU'ILS NOUS APPRENNENT, PAS SEULEMENT PARCE QU'ILS SONT BEAUX.",
    body: [
      { type: "h2", text: "01 — UNE MARQUE QUI SE TAIT PARFOIS." },
      {
        type: "p",
        text:
          "@studiofauvette\nUn studio créatif qui deux à trois fois par mois, parfois moins. Chaque publication est accompagnée d'une légende qui va droit au but.\nLa leçon : le silence entre deux posts fait partie de la composition.",
      },
      { type: "h2", text: "02 — UN CRÉATEUR QUI N'EXPLIQUE RIEN." },
      {
        type: "p",
        text:
          "@agencecartel\nPas de carrousel pédagogique, pas de « 5 choses à savoir ».\nLa leçon : on n'est pas obligé d'enseigner pour être pris au sérieux.",
      },
      { type: "h2", text: "03 — UNE MARQUE À L'ESTHÉTIQUE CYBER-ORGANIQUE." },
      {
        type: "p",
        text:
          "@gentlemonster\nUne marque de mode mêlant luxe, futurisme sculptural et science-fiction.\nLa leçon : une image peut raconter une émotion ou un mystère sans directement mettre en avant le produit.",
      },
      { type: "h2", text: "04 — UN COMPTE QUI NE JOUE JAMAIS LE JEU." },
      {
        type: "p",
        text:
          "@annecombaz\nPas de reel, pas de trend, pas d'audio à la mode. L'envie de poster ses réalisations et ses inspirations, c'est tout. Le compte grandit lentement, mais sans rien lâcher.\nLa leçon : refuser le format dominant est une stratégie, pas un caprice.",
      },
      { type: "h2", text: "05 — UNE INDÉPENDANTE QUI ÉCRIT COMME ELLE PARLE." },
      {
        type: "p",
        text:
          "@desetoilesetdesroses\nCaptions longues, ponctuation libre, un feed chaleureux... : c'est sa signature.\nLa leçon : la voix vaut mieux que la propreté.",
      },
      {
        type: "quote",
        text:
          "SUIVRE MOINS, MAIS SUIVRE LONGTEMPS. C'EST PROBABLEMENT LE MEILLEUR CONSEIL DE VEILLE QUE JE PUISSE DONNER.",
      },
      {
        type: "note",
        text:
          "L'idée, c'est quand même de chercher vos propres inspirations.",
      },
    ],
  },
  {
    slug: "refuser-un-projet",
    n: "05",
    tag: "Méthode",
    t: "REFUSER UN PROJET N'EST PAS UN LUXE, C'EST UNE DISCIPLINE.",
    excerpt:
      "Comment je décide à qui je dis non et pourquoi c'est ce qui permet de bien faire le reste.",
    date: "12 AVR 2026",
    read: "1 MIN DE LECTURE",
    img: thankYouNext,
    intro:
      "ON M'ÉCRIT CHAQUE SEMAINE. JE DIS NON, SOUVENT. PAS PAR ARROGANCE, MAIS PAR COHÉRENCE AVEC CE QUE CMALIA PRÉTEND ÉTRE : UN STUDIO QUI TRAVAILLE AVEC PEU, ET BIEN.",
    body: [
      { type: "h2", text: "Dire oui à tout, c'est diluer tout le monde." },
      {
        type: "p",
        text:
          "Quand un studio accepte tous les projets, il ne sert plus aucun client correctement. Le suivant paie pour le précédent. La fatigue paie pour la fatigue. À la fin, personne n'a eu le résultat qu'il imaginait.",
      },
      { type: "h2", text: "Mes trois filtres." },
      {
        type: "list",
        items: [
          "Est-ce que je comprends la marque en moins de cinq minutes ? Sinon, ce n'est pas (encore) pour moi.",
          "Est-ce que je peux défendre ce qu'elle vend, devant n'importe qui, sans forcer ? Sinon, je ne peux pas écrire pour elle.",
          "Est-ce qu'il reste, dans mon agenda, l'espace mental nécessaire ? Pas le créneau. L'espace mental.",
        ],
      },
      {
        type: "quote",
        text:
          "Un « oui » donné par fatigue n'est jamais un vrai oui. C'est une dette envers le projet suivant.",
      },
      { type: "h2", text: "Refuser proprement." },
      {
        type: "p",
        text:
          "Je réponds toujours et je dis pourquoi brièvement. Je recommande si je peux. Refuser n'est pas ghoster, c'est une forme de respect pour la personne en face et pour le travail qu'elle mérite.",
      },
      {
        type: "note",
        text:
          "Si vous m'avez écrit et que j'ai dit non, ce n'est presque jamais contre votre projet. C'est souvent pour qu'il trouve quelqu'un qui pourra vraiment lui donner ce qu'il faut.",
      },
    ],
  },
  {
    slug: "ia-et-creation-de-contenu",
    n: "06",
    tag: "Éditorial",
    t: "L'IA DANS LA CRÉATION DE CONTENU : CE QUE JE REFUSE, CE QUE J'ACCEPTE.",
    excerpt:
      "Position claire sur l'usage d'outils génératifs dans une pratique éditoriale honnête.",
    date: "20 MAI 2026",
    read: "2 MIN DE LECTURE",
    img: capturedImage,
    intro:
      "On me pose la question de plus en plus souvent, alors je préfère y répondre une fois clairement, plutôt que d'esquiver à chaque rendez-vous. Voici, sans posture, comment je travaille avec (et surtout sans) les outils génératifs.",
    body: [
      { type: "h2", text: "Ce que je refuse, sans exception." },
      {
        type: "p",
        text:
          "Je ne génère pas de « ligne éditoriale » à partir d'un prompt. Je ne livre jamais à un client un texte qu'une machine a écrit à ma place. Ce serait mentir sur ce qu'il achète, et trahir ce que CMalia prétend être : une voix humaine, tenue par une personne, à un endroit, à un moment.",
      },
      {
        type: "p",
        text:
          "Je refuse aussi les contenus uniquement générés par IA pour vendre des produits ou des services. Une marque qui montre une chose qui n'existe pas perd le droit moral d'utiliser le mot « authentique » dans les cinq années qui suivent (je rigole bien sûr !).",
      },
      { type: "h2", text: "Ce que j'accepte, à condition que ça reste invisible au client." },
      {
        type: "p",
        text:
          "J'utilise des outils pour ce qu'ils font bien : transcrire un audio, nettoyer une liste, comparer deux versions d'un même paragraphe, effectuer quelques recherches vite fait. Ce sont des assistants, pas des auteurs. Le résultat livré n'est jamais le leur. C'est le mien, simplement produit un peu plus vite.",
      },
      {
        type: "quote",
        text:
          "L'IA peut faire le ménage. Elle ne peut pas avoir un avis. Et un studio éditorial, c'est d'abord quelqu'un qui a un avis.",
      },
      { type: "h2", text: "Pourquoi cette ligne est plus fragile qu'elle n'en a l'air." },
      {
        type: "p",
        text:
          "Tenir cette position coûte du temps. Plus que ça : elle coûte des clients. Certains veulent juste du volume, vite, pas cher. Je ne suis pas en compétition avec ça, et je ne prétends pas l'être. Mais je crois vraiment que dans cinq ans, les marques qui auront résisté à l'industrialisation de leur voix seront celles qu'on lit encore.",
      },
      { type: "h2", text: "Et pour mes propres textes ?" },
      {
        type: "p",
        text:
          "Ce que vous lisez sur ce site, je l'ai écrit. Phrase par phrase, à Marseille, souvent le soir. Je relis le lendemain, je coupe, je remets, je doute. C'est plus long. C'est probablement moins « optimisé ». Mais c'est moi et c'est exactement ce que je vends.",
      },
      {
        type: "note",
        text:
          "Cette position évoluera peut-être. Mais elle ne s'assouplira jamais en silence. Si elle change, je l'écrirai ici, clairement, daté.",
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
