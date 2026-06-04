import silenceStrategique from "@/assets/silence-strategique.png";
import workBrutalist from "@/assets/work-brutalist.jpg";

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
    t: "Le silence stratégique : poster moins, dire plus.",
    excerpt:
      "Pourquoi publier trois fois par semaine sans tension vide la marque plus vite que ne rien publier.",
    date: "12 Nov 2024",
    read: "2 min",
    img: silenceStrategique,
    featured: true,
    intro:
      "Il y a, dans la plupart des marques que je rencontre, une peur très étrange : celle de disparaître si elles ne publient pas. Trois posts par semaine. Une story par jour. Un reel dès qu'un trend passe. Et au bout d'un an, plus personne ne sait vraiment ce que la marque raconte — y compris elle-même.",
    body: [
      {
        type: "p",
        text:
          "Je travaille avec une poignée de marques, créateurs et indépendants. Aucun n'a jamais grandi parce qu'il publiait plus. Tous ont grandi parce qu'à un moment donné, ils ont arrêté de publier pour publier.",
      },
      { type: "h2", text: "Le bruit n'est pas une preuve de travail." },
      {
        type: "p",
        text:
          "Le rythme rassure, surtout le rythme régulier. Trois fois par semaine, ça sonne sérieux. Ça sonne pro. Ça donne l'impression qu'il se passe quelque chose. Mais une fréquence n'est pas une voix. Un calendrier n'est pas une ligne. Et un compte qui parle sans cesse pour ne rien dire finit par devenir un bruit de fond — y compris pour ses abonnés les plus fidèles.",
      },
      {
        type: "p",
        text:
          "La marque qui me fait revenir, ce n'est pas celle qui poste tous les jours. C'est celle qui, quand elle poste, m'oblige à m'arrêter trois secondes. Ces trois secondes valent plus que sept stories oubliées dans la journée.",
      },
      { type: "h2", text: "Le silence stratégique, ce n'est pas l'absence." },
      {
        type: "p",
        text:
          "Je ne parle pas de disparaître pendant six mois. Je parle de tenir une cadence honnête : publier quand on a quelque chose à dire, et accepter que parfois, pendant deux semaines, on n'a rien à dire. Ce n'est pas un échec. C'est une preuve d'exigence.",
      },
      {
        type: "quote",
        text:
          "Le silence stratégique, c'est l'inverse du growth hack. C'est croire que ce que tu vas dire mérite qu'on l'attende.",
      },
      {
        type: "p",
        text:
          "Concrètement, dans la plupart de mes accompagnements, on commence par baisser le rythme. Pas pour faire moins. Pour faire mieux. On enlève d'abord ce qui ne sert pas la ligne, avant d'ajouter quoi que ce soit. Et presque toujours, l'engagement remonte. Pas parce qu'on a trouvé le bon trend — parce qu'on a arrêté de diluer.",
      },
      { type: "h2", text: "Ce que ça change pour la marque." },
      {
        type: "list",
        items: [
          "Chaque publication compte, et donc se travaille.",
          "L'audience comprend ce que la marque défend, parce que la marque s'autorise enfin à le dire clairement.",
          "Le créateur — humain — arrête d'être épuisé par sa propre communication.",
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
          "Écrit un dimanche soir à Marseille, après une semaine sans avoir rien publié pour CMALIA — et c'était très bien comme ça.",
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
    date: "29 Oct 2024",
    read: "1 min",
    img: workBrutalist,
    intro:
      "Le calendrier éditorial est devenu la première chose qu'on vend aux marques. C'est rassurant, ça se met dans un Notion, ça se coche. Et pourtant, c'est presque toujours l'étape qu'il faudrait faire en dernier.",
    body: [
      { type: "h2", text: "Le calendrier, c'est l'outil. Pas la pensée." },
      {
        type: "p",
        text:
          "Avant de savoir quand publier, il faut savoir pourquoi. Avant de savoir quoi publier, il faut savoir d'où on parle. Un calendrier éditorial sans ligne, c'est une étagère sans livres — bien rangée, parfaitement vide.",
      },
      {
        type: "p",
        text:
          "La plupart des marques que j'accompagne arrivent avec un planning très propre et une voix très floue. On peut décrire trois mois de posts à venir sans pouvoir dire en une phrase ce que la marque défend. C'est exactement à l'envers.",
      },
      { type: "h2", text: "Construire une ligne, vraiment." },
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
          "Une ligne, c'est ce qui te permet de refuser un bon sujet parce qu'il n'est pas le tien.",
      },
      { type: "h2", text: "Le planning vient après." },
      {
        type: "p",
        text:
          "Quand la ligne est posée, le calendrier devient évident — et beaucoup plus court. On ne cherche plus quoi dire. On cherche juste quand le dire. Et souvent, on découvre qu'on n'a pas besoin de publier autant qu'on le pensait pour exister clairement.",
      },
      {
        type: "note",
        text:
          "Si ton planning te tient en laisse plutôt que de te servir, c'est probablement que la ligne en dessous est trop molle.",
      },
    ],
  },
  {
    slug: "une-journee-au-studio",
    n: "03",
    tag: "Coulisses",
    t: "Une journée typique au studio.",
    excerpt:
      "Pas de open space, pas de daily à 9h. Comment se déroule réellement une journée seule à l'atelier.",
    date: "14 Oct 2024",
    read: "1 min",
    img: silenceStrategique,
    intro:
      "On me demande souvent à quoi ressemble une journée quand on travaille seule, depuis Marseille, sans équipe et sans bureau partagé. Voilà, sans filtre.",
    body: [
      { type: "h2", text: "Matin — lent, mais pas vide." },
      {
        type: "p",
        text:
          "Je commence rarement avant 9h30. Café, dix minutes à regarder la lumière, puis une heure d'écriture — toujours pour un client, jamais pour moi. C'est le meilleur moment de la journée, je le donne au travail le plus exigeant : la voix.",
      },
      { type: "h2", text: "Milieu de journée — la matière." },
      {
        type: "p",
        text:
          "Vers 11h, j'ouvre les conversations clients. Pas de Slack. Des messages longs, peu nombreux, structurés. Une vraie réponse vaut mieux que dix accusés de réception. L'après-midi, c'est la production : maquettes, captions, sélections d'images, retouches.",
      },
      { type: "h2", text: "Fin d'après-midi — la marche." },
      {
        type: "p",
        text:
          "Vers 17h, je sors. Toujours. Marseille aide beaucoup pour ça. Une heure debout, sans écran, sans téléphone, c'est ce qui me permet de revenir le lendemain avec un avis tranché plutôt qu'une bouillie d'idées.",
      },
      {
        type: "quote",
        text:
          "Le travail créatif ne se fait pas en restant assis. Il se digère en marchant.",
      },
      { type: "h2", text: "Le soir — rarement du travail." },
      {
        type: "p",
        text:
          "Je n'ai pas de notifs après 19h. Pas par discipline militante — par hygiène. Une marque qui me paie pour avoir un jugement clair a besoin que je dorme.",
      },
      {
        type: "note",
        text:
          "Aucune journée ne ressemble exactement à celle-là. Mais aucune ne contient de réunion à 9h.",
      },
    ],
  },
  {
    slug: "comptes-qui-minspirent",
    n: "04",
    tag: "Veille",
    t: "Les comptes qui m'inspirent en ce moment.",
    excerpt:
      "Cinq comptes Instagram qui font les choses bien — et ce qu'on peut en apprendre.",
    date: "30 Sept 2024",
    read: "2 min",
    img: workBrutalist,
    intro:
      "Je ne suis pas beaucoup de comptes. Trois cents, peut-être. Mais ceux que je garde, je les garde longtemps. Voici cinq d'entre eux, choisis pour ce qu'ils nous apprennent — pas seulement parce qu'ils sont beaux.",
    body: [
      { type: "h2", text: "01 — Une marque qui se tait souvent." },
      {
        type: "p",
        text:
          "Un studio de céramique qui poste deux fois par mois, parfois moins. Chaque image est sèche, frontale, sans légende interminable. La leçon : le silence entre deux posts fait partie de la composition.",
      },
      { type: "h2", text: "02 — Un créateur qui n'explique rien." },
      {
        type: "p",
        text:
          "Pas de carrousel pédagogique, pas de « 5 choses à savoir ». Juste un point de vue assumé, écrit court. La leçon : on n'est pas obligé d'enseigner pour être pris au sérieux.",
      },
      { type: "h2", text: "03 — Une marque mode qui n'utilise jamais de mannequin." },
      {
        type: "p",
        text:
          "Que des objets, des plis, des matières. Aucun visage. Et pourtant on sait exactement à qui ça parle. La leçon : on peut construire un imaginaire fort en enlevant, pas en ajoutant.",
      },
      { type: "h2", text: "04 — Un compte qui ne joue jamais le jeu." },
      {
        type: "p",
        text:
          "Pas de reel, pas de trend, pas d'audio à la mode. Une grille de photos, et c'est tout. Le compte grandit lentement, mais sans rien lâcher. La leçon : refuser le format dominant est une stratégie, pas un caprice.",
      },
      { type: "h2", text: "05 — Une indépendante qui écrit comme elle parle." },
      {
        type: "p",
        text:
          "Captions longues, ponctuation libre, parfois une faute. Elle ne corrige pas — c'est sa signature. La leçon : la voix vaut mieux que la propreté.",
      },
      {
        type: "quote",
        text:
          "Suivre moins, mais suivre longtemps. C'est probablement le meilleur conseil de veille que je puisse donner.",
      },
      {
        type: "note",
        text:
          "Je ne cite pas les noms volontairement. Si je vous les donne, vous allez aller les copier. L'idée, c'est plutôt de chercher les vôtres.",
      },
    ],
  },
  {
    slug: "refuser-un-projet",
    n: "05",
    tag: "Méthode",
    t: "Refuser un projet n'est pas un luxe, c'est une discipline.",
    excerpt:
      "Comment je décide à qui je dis non, et pourquoi c'est ce qui permet de bien faire le reste.",
    date: "12 Sept 2024",
    read: "1 min",
    img: silenceStrategique,
    intro:
      "On m'écrit chaque semaine. Je dis non, souvent. Pas par arrogance — par cohérence avec ce que CMALIA prétend être : un studio qui travaille avec peu, et bien.",
    body: [
      { type: "h2", text: "Dire oui à tout, c'est diluer tout le monde." },
      {
        type: "p",
        text:
          "Quand un studio accepte tous les projets, il ne sert plus aucun client correctement. Le suivant paie pour le précédent. La fatigue paie pour la fatigue. À la fin, personne n'a eu le studio qu'il imaginait.",
      },
      { type: "h2", text: "Mes trois filtres." },
      {
        type: "list",
        items: [
          "Est-ce que je comprends la marque en moins de cinq minutes ? Si non, ce n'est pas pour moi — pas encore.",
          "Est-ce que je peux défendre ce qu'elle vend, devant n'importe qui, sans me forcer ? Si non, je ne peux pas écrire pour elle.",
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
          "Je réponds toujours. Je dis pourquoi, brièvement. Je recommande, si je peux. Refuser n'est pas ghoster. C'est une forme de respect — pour la personne en face, et pour le travail qu'elle mérite.",
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
    t: "L'IA dans la création de contenu : ce que je refuse, ce que j'accepte.",
    excerpt:
      "Position claire sur l'usage d'outils génératifs dans une pratique éditoriale honnête.",
    date: "20 Août 2024",
    read: "2 min",
    img: workBrutalist,
    intro:
      "On me pose la question de plus en plus souvent, alors je préfère y répondre une fois, clairement, plutôt que d'esquiver à chaque rendez-vous. Voici, sans posture, comment je travaille avec — et surtout sans — les outils génératifs.",
    body: [
      { type: "h2", text: "Ce que je refuse, sans exception." },
      {
        type: "p",
        text:
          "Je n'écris pas de caption avec une IA. Je ne génère pas de « ligne éditoriale » à partir d'un prompt. Je ne livre jamais à un client un texte qu'une machine a écrit à ma place, même retouché. Ce serait mentir sur ce qu'il achète, et trahir ce que CMALIA prétend être : une voix humaine, tenue par une personne, à un endroit, à un moment.",
      },
      {
        type: "p",
        text:
          "Je refuse aussi les images générées pour représenter des produits, des lieux, ou des personnes. Une marque qui montre une chose qui n'existe pas perd le droit moral d'utiliser le mot « authentique » dans les cinq années qui suivent.",
      },
      { type: "h2", text: "Ce que j'accepte, à condition que ça reste invisible au client." },
      {
        type: "p",
        text:
          "J'utilise des outils pour ce qu'ils font bien : transcrire un audio, nettoyer une liste, comparer deux versions d'un même paragraphe, traduire un brouillon vite fait. Ce sont des assistants, pas des auteurs. Le résultat livré n'est jamais le leur. C'est le mien, simplement produit un peu plus vite.",
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
          "Tenir cette position coûte du temps. Plus que ça : elle coûte des clients. Certains veulent juste du volume, vite, pas cher. Je ne suis pas en compétition avec ça, et je ne prétends pas l'être. Mais je crois — vraiment — que dans cinq ans, les marques qui auront résisté à l'industrialisation de leur voix seront celles qu'on lit encore.",
      },
      { type: "h2", text: "Et pour mes propres textes ?" },
      {
        type: "p",
        text:
          "Ce que vous lisez sur ce site, je l'ai écrit. Phrase par phrase, à Marseille, souvent le soir. Je relis le lendemain, je coupe, je remets, je doute. C'est plus long. C'est probablement moins « optimisé ». Mais c'est moi — et c'est exactement ce que je vends.",
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
