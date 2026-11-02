// Données de démonstration (remplacez par votre API plus tard)

export const heroSlides = [
  {
    id: 'h1',
    kind: 'urgent',
    scene: 'village',
    title: 'Fortes pluies : la vigilance jaune maintenue dans trois districts',
    excerpt:
      "Les autorités appellent à la prudence près des zones inondables. Aucun ordre d'évacuation générale n'a été émis.",
    source: 'BNGRC',
    time: 'Il y a 2 h',
    official: true
  },
  {
    id: 'h2',
    kind: 'fact',
    scene: 'city',
    title: "Non, les écoles d'Analamanga ne seront pas toutes fermées demain",
    excerpt: 'Une capture d’écran modifiée circule sur Facebook. Le ministère confirme que les cours sont maintenus.',
    source: 'Madagascar Cheky',
    time: 'Il y a 4 h'
  },
  {
    id: 'h3',
    kind: 'health',
    scene: 'crowd',
    title: 'Campagne de vaccination : les centres officiels ouverts cette semaine',
    excerpt: 'Retrouvez les horaires vérifiés et les établissements agréés par le ministère de la Santé publique.',
    source: 'Ministère de la Santé',
    time: 'Hier, 18:20'
  }
];

export const news = [
  {
    id: 'n1',
    kind: 'fact',
    scene: 'city',
    media: 'video',
    title: "Non, les écoles d'Analamanga ne seront pas toutes fermées demain",
    excerpt: 'Une capture d’écran modifiée circule sur Facebook. Le ministère confirme que les cours sont maintenus.',
    source: 'Madagascar Cheky',
    time: 'Il y a 4 h'
  },
  {
    id: 'n2',
    kind: 'health',
    scene: 'crowd',
    media: 'image',
    title: 'Campagne de vaccination : les centres officiels ouverts cette semaine',
    excerpt: 'Retrouvez les horaires vérifiés et les établissements agréés par le ministère de la Santé publique.',
    source: 'Ministère de la Santé',
    time: 'Hier, 18:20'
  },
  {
    id: 'n3',
    kind: 'society',
    scene: 'road',
    media: null,
    title: 'Le point sur les nouvelles démarches administratives en ligne',
    excerpt: 'Ce qui change réellement, les sites officiels à utiliser et les faux formulaires à éviter.',
    source: 'Service public',
    time: 'Il y a 2 jours'
  },
  {
    id: 'n4',
    kind: 'urgent',
    scene: 'village',
    media: 'image',
    title: 'Cyclone : le bulletin de Météo Madagascar à retenir',
    excerpt: 'Trois points essentiels du dernier bulletin, et les messages alarmistes qui n’ont aucune source.',
    source: 'Météo Madagascar',
    time: 'Il y a 5 h'
  },
  {
    id: 'n5',
    kind: 'fact',
    scene: 'road',
    media: null,
    title: 'Pénurie de carburant : la rumeur démentie par les distributeurs',
    excerpt: 'Les stocks sont suffisants selon les opérateurs. Une vidéo ancienne est réutilisée hors contexte.',
    source: 'Madagascar Cheky',
    time: 'Il y a 1 jour'
  },
  {
    id: 'n6',
    kind: 'health',
    scene: 'city',
    media: 'video',
    title: 'Paludisme : où se faire dépister gratuitement à Antananarivo',
    excerpt: 'Liste des centres de santé de base partenaires et horaires confirmés cette semaine.',
    source: 'Ministère de la Santé',
    time: 'Il y a 1 jour'
  }
];

export const kindMeta = {
  urgent: { label: 'URGENCE', cls: 'bg-red-600' },
  fact: { label: 'FACT-CHECKING', cls: 'bg-brand-600' },
  health: { label: 'SANTÉ', cls: 'bg-emerald-600' },
  society: { label: 'SOCIÉTÉ', cls: 'bg-indigo-600' }
};

// Statistiques par sujet
export const statsBySubject = {
  all: {
    kpis: { reliability: 89, trend: '+3,2% ce mois', viral: 142, minutes: 4 },
    versus: { rumor: '“50 victimes”', shares: 'Message partagé 12 400 fois sur Facebook', official: '2 victimes', by: 'Rapport vérifié et publié par le BNGRC' },
    regions: [
      { name: 'Analamanga', level: 'Élevé', value: 84 },
      { name: 'Atsinanana', level: 'Modéré', value: 63 },
      { name: 'Vakinankaratra', level: 'Faible', value: 41 },
      { name: 'Boeny', level: 'Faible', value: 32 }
    ],
    insight: 'Les fausses alertes météo diminuent, mais les rumeurs sanitaires progressent.'
  },
  sante: {
    kpis: { reliability: 84, trend: '+1,1% ce mois', viral: 47, minutes: 6 },
    versus: { rumor: '“Le vaccin est payant”', shares: 'Message partagé 8 200 fois sur Facebook', official: 'Gratuit', by: 'Confirmé par le ministère de la Santé' },
    regions: [
      { name: 'Analamanga', level: 'Élevé', value: 72 },
      { name: 'Atsimo-Andrefana', level: 'Modéré', value: 58 },
      { name: 'Vakinankaratra', level: 'Modéré', value: 49 },
      { name: 'Boeny', level: 'Faible', value: 28 }
    ],
    insight: 'Les rumeurs sanitaires progressent, surtout autour de la vaccination.'
  },
  meteo: {
    kpis: { reliability: 93, trend: '+4,5% ce mois', viral: 38, minutes: 3 },
    versus: { rumor: '“50 victimes”', shares: 'Message partagé 12 400 fois sur Facebook', official: '2 victimes', by: 'Rapport vérifié et publié par le BNGRC' },
    regions: [
      { name: 'Atsinanana', level: 'Élevé', value: 81 },
      { name: 'Analamanga', level: 'Modéré', value: 60 },
      { name: 'Sava', level: 'Modéré', value: 52 },
      { name: 'Boeny', level: 'Faible', value: 24 }
    ],
    insight: 'Les fausses alertes météo diminuent grâce aux bulletins officiels relayés plus vite.'
  },
  elections: {
    kpis: { reliability: 81, trend: '-0,8% ce mois', viral: 31, minutes: 7 },
    versus: { rumor: '“Le scrutin est reporté”', shares: 'Message partagé 5 900 fois sur Facebook', official: 'Calendrier maintenu', by: 'Communiqué officiel de la CENI' },
    regions: [
      { name: 'Analamanga', level: 'Élevé', value: 77 },
      { name: 'Diana', level: 'Modéré', value: 55 },
      { name: 'Boeny', level: 'Faible', value: 38 },
      { name: 'Anosy', level: 'Faible', value: 29 }
    ],
    insight: 'Les rumeurs sur le calendrier restent concentrées dans la capitale.'
  },
  economie: {
    kpis: { reliability: 87, trend: '+2,0% ce mois', viral: 26, minutes: 5 },
    versus: { rumor: '“Le carburant va doubler”', shares: 'Message partagé 6 700 fois sur Facebook', official: 'Prix inchangés', by: 'Communiqué du ministère de l’Énergie' },
    regions: [
      { name: 'Analamanga', level: 'Élevé', value: 69 },
      { name: 'Atsimo-Andrefana', level: 'Modéré', value: 51 },
      { name: 'Atsinanana', level: 'Faible', value: 40 },
      { name: 'Boeny', level: 'Faible', value: 33 }
    ],
    insight: 'Les rumeurs sur les prix augmentent à chaque annonce économique.'
  }
};

export const subjects = [
  { id: 'all', label: 'Tous les sujets' },
  { id: 'sante', label: 'Santé' },
  { id: 'meteo', label: 'Cyclones & météo' },
  { id: 'elections', label: 'Élections' },
  { id: 'economie', label: 'Économie' }
];

export const contacts = [
  { id: 'c1', cat: 'URGENCES', icon: 'siren', name: 'BNGRC', desc: 'Risques et catastrophes', phone: '+261 34 05 565 65' },
  { id: 'c2', cat: 'SÉCURITÉ', icon: 'shield', name: 'Police nationale', desc: 'Urgences et signalements', phone: '117' },
  { id: 'c3', cat: 'SÉCURITÉ', icon: 'building', name: 'Gendarmerie nationale', desc: 'Assistance et interventions', phone: '119' },
  { id: 'c4', cat: 'URGENCES', icon: 'siren', name: 'Pompiers', desc: 'Incendies et secours', phone: '118' },
  { id: 'c5', cat: 'SANTÉ', icon: 'heart', name: 'Ministère de la Santé', desc: 'Numéro vert santé', phone: '910' },
  { id: 'c6', cat: 'MÉTÉO', icon: 'weather', name: 'Météo Madagascar', desc: 'Bulletins météorologiques', phone: '+261 20 22 356 44' }
];

export const initialDrafts = [
  {
    id: 'd1',
    score: 91,
    sources: 3,
    title: 'Vigilance météo : ce que dit réellement le bulletin officiel',
    lead: 'Alors que plusieurs messages alarmistes circulent, Madagascar Cheky fait le point sur les prévisions confirmées par les services compétents.',
    body:
      'Les publications relayées depuis ce matin évoquent une fermeture généralisée des établissements et des évacuations immédiates.\n\nAprès vérification auprès des sources officielles, aucune consigne générale de ce type n’a été communiquée. La vigilance reste toutefois recommandée dans les zones identifiées par le BNGRC.'
  },
  {
    id: 'd2',
    score: 88,
    sources: 2,
    title: 'Vaccination : les centres agréés de la semaine',
    lead: 'Le ministère de la Santé publie la liste des centres ouverts et leurs horaires.',
    body: 'Les centres officiels accueillent le public du lundi au vendredi. Méfiez-vous des messages demandant un paiement : la vaccination est gratuite.'
  },
  {
    id: 'd3',
    score: 94,
    sources: 4,
    title: 'Faux communiqué sur la fermeture des écoles : le démenti du ministère',
    lead: 'Un document circule sur les réseaux sociaux. Il est faux.',
    body: 'Le ministère de l’Éducation nationale confirme que les cours sont maintenus dans toutes les écoles d’Analamanga.'
  }
];

export const initialHistory = [
  { id: 'a1', theme: 'cyclones', themeLabel: 'CYCLONES & MÉTÉO', title: 'Vigilance météo : les faits vérifiés', when: 'Modifié il y a 1 jour' },
  { id: 'a2', theme: 'sante', themeLabel: 'SANTÉ PUBLIQUE', title: 'Vaccination : liste des centres agréés', when: 'Modifié il y a 2 jours' },
  { id: 'a3', theme: 'education', themeLabel: 'ÉDUCATION', title: 'Faux communiqué sur la fermeture des écoles', when: 'Modifié il y a 3 jours' }
];

export const initialFolders = [
  { id: 'cyclones', name: 'Cyclones & météo' },
  { id: 'sante', name: 'Santé publique' },
  { id: 'elections', name: 'Élections' },
  { id: 'securite', name: 'Sécurité' }
];
