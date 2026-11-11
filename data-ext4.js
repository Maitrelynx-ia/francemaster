// France Masters - Extension 4 : L'Éducation nationale (ids 2189+)
// Maternelle, primaire, collège, lycée, prépa & grandes écoles,
// et les institutions de l'Éducation nationale.
// Ce fichier est chargé après data-ext3.js et complète la collection.

(function () {
  if (typeof CARDS === 'undefined') return;
  var EXT4_CARDS = [

  // ========== MATERNELLE ==========
  { id: 2189, name: "La maternelle", description: "Le premier pas dans l'école de la République : chansons, jeux et sieste.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 32, defense: 62, views: 720000, emoji: "🧸" },
  { id: 2190, name: "La sieste", description: "Le moment sacré des petits, tapis de sol et doudou contre la poitrine.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 22, defense: 68, views: 480000, emoji: "🛏️" },
  { id: 2191, name: "La maîtresse", description: "La personne la plus importante du monde quand on a cinq ans.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 55, defense: 78, views: 950000, emoji: "👩‍🏫" },
  { id: 2192, name: "L'ATSEM", description: "L'agent territorial spécialisé des écoles maternelles, bras droit de la maîtresse.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 52, defense: 82, views: 410000, emoji: "🤝" },
  { id: 2193, name: "La récréation", description: "Le seul moment de la journée où le temps passe trop vite.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 42, defense: 40, views: 560000, emoji: "🤸" },
  { id: 2194, name: "La pâte à modeler", description: "Le premier atelier de sculpture des futurs artistes.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 18, defense: 55, views: 350000, emoji: "🎨" },
  { id: 2195, name: "L'alphabet", description: "A, B, C... la clé de tous les savoirs, apprise en chanson.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 45, defense: 70, views: 620000, emoji: "🔤" },
  { id: 2196, name: "Le goûter", description: "Le goûter de dix heures, institution de la maternelle.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 36, defense: 44, views: 300000, emoji: "🍎" },

  // ========== PRIMAIRE ==========
  { id: 2197, name: "L'école primaire", description: "De la grande section au CM2, la base de tous les savoirs.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 60, defense: 72, views: 890000, emoji: "🏫" },
  { id: 2199, name: "La dictée", description: "L'épreuve redoutée du vendredi, entre accords et homophones.", category: CATEGORIES.EDUCATION, rarity: RARITIES.SUPER_RARE.code, attack: 68, defense: 58, views: 1100000, emoji: "✍️" },
  { id: 2200, name: "Le calcul mental", description: "La table de multiplication récitée à voix haute, sans brouillon.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 55, defense: 42, views: 500000, emoji: "➕" },
  { id: 2201, name: "Le tableau noir", description: "La craie, l'éponge et la règle d'or : ne pas parler quand le maître écrit.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 42, defense: 66, views: 430000, emoji: "⬛" },
  { id: 2202, name: "Le cartable", description: "Parfois plus lourd que l'élève, il contient tout un univers.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 30, defense: 58, views: 380000, emoji: "🎒" },
  { id: 2203, name: "Le certificat d'études", description: "Le diplôme de fin de primaire d'autrefois, passé au stylo plume.", category: CATEGORIES.EDUCATION, rarity: RARITIES.SUPER_RARE.code, attack: 75, defense: 72, views: 690000, emoji: "📜" },
  { id: 2204, name: "Le maître d'école", description: "Le monsieur de l'école du village, craint et admiré d'hier à aujourd'hui.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 58, defense: 75, views: 470000, emoji: "👨‍🏫" },
  { id: 2205, name: "La sortie scolaire", description: "Le car, le pique-nique et le musée : la journée la plus attendue de l'année.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 52, defense: 60, views: 540000, emoji: "🚌" },
  { id: 2206, name: "La leçon de choses", description: "Observer une plume, un caillou ou une chenille pour comprendre le monde.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 56, defense: 64, views: 320000, emoji: "🌱" },

  // ========== COLLÈGE ==========
  { id: 2207, name: "Le collège", description: "De la sixième à la troisième, l'âge des cahiers et des changements de salle.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 65, defense: 70, views: 810000, emoji: "🏛️" },
  { id: 2208, name: "Le brevet (DNB)", description: "Le premier diplôme national de la vie d'un élève, en fin de troisième.", category: CATEGORIES.EDUCATION, rarity: RARITIES.ULTRA_RARE.code, attack: 85, defense: 80, views: 1900000, emoji: "🎓" },
  { id: 2209, name: "Le carnet de correspondance", description: "Le sésame des sorties, des retards et des mots pour les parents.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 28, defense: 76, views: 460000, emoji: "📔" },
  { id: 2210, name: "Le professeur principal", description: "Le prof qui suit la classe de près et anime les conseils.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 60, defense: 78, views: 420000, emoji: "🧑‍🏫" },
  { id: 2211, name: "Le CPE", description: "Le conseiller principal d'éducation, chef de la vie scolaire.", category: CATEGORIES.EDUCATION, rarity: RARITIES.SUPER_RARE.code, attack: 70, defense: 85, views: 380000, emoji: "🧭" },
  { id: 2212, name: "Le CDI", description: "Le centre de documentation et d'information, refuge des lecteurs.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 55, defense: 80, views: 350000, emoji: "📚" },
  { id: 2213, name: "Le conseil de classe", description: "L'instance où délégués et professeurs décident des avis et des félicitations.", category: CATEGORIES.EDUCATION, rarity: RARITIES.SUPER_RARE.code, attack: 67, defense: 82, views: 400000, emoji: "🗳️" },
  { id: 2214, name: "La demi-pension", description: "La cantine, ses frites du jeudi et ses batailles de pain.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 45, defense: 55, views: 490000, emoji: "🍽️" },
  { id: 2215, name: "Le surveillant", description: "L'œil de la permanence, entre tolérance et punitions.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 40, defense: 70, views: 370000, emoji: "👀" },
  { id: 2216, name: "Le latin", description: "L'option des curieux : décliner Caesar et lire les grands mythes.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 62, defense: 58, views: 440000, emoji: "🏺" },
  { id: 2217, name: "Le stage de troisième", description: "La première immersion dans le monde du travail, rapport à l'appui.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 55, defense: 62, views: 580000, emoji: "💼" },

  // ========== LYCÉE ==========
  { id: 2218, name: "Le lycée", description: "Du lycée général au bac pro, trois ans pour préparer l'avenir.", category: CATEGORIES.EDUCATION, rarity: RARITIES.SUPER_RARE.code, attack: 75, defense: 75, views: 950000, emoji: "🎒" },
  { id: 2219, name: "Le baccalauréat", description: "L'examen fondé par Napoléon en 1808, porte d'entrée de l'enseignement supérieur.", category: CATEGORIES.EDUCATION, rarity: RARITIES.LEGENDARY.code, attack: 97, defense: 95, views: 8600000, emoji: "🎓" },
  { id: 2220, name: "Le bac de français", description: "L'épreuve anticipée de première : commentaire, dissertation et oral.", category: CATEGORIES.EDUCATION, rarity: RARITIES.ULTRA_RARE.code, attack: 88, defense: 74, views: 1600000, emoji: "📖" },
  { id: 2221, name: "La philo au bac", description: "Quatre heures pour répondre à « Suffit-il d'être libre pour être heureux ? »", category: CATEGORIES.EDUCATION, rarity: RARITIES.ULTRA_RARE.code, attack: 90, defense: 80, views: 1400000, emoji: "🤔" },
  { id: 2222, name: "Les spécialités", description: "Au lycée général, trois puis deux matières choisies et approfondies.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 65, defense: 60, views: 520000, emoji: "🧩" },
  { id: 2223, name: "Le bac blanc", description: "La répétition générale dans les conditions réelles de l'examen.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 70, defense: 52, views: 360000, emoji: "📝" },
  { id: 2224, name: "Parcoursup", description: "La plateforme nationale d'admission en première année du supérieur.", category: CATEGORIES.EDUCATION, rarity: RARITIES.SUPER_RARE.code, attack: 78, defense: 72, views: 1250000, emoji: "💻" },
  { id: 2225, name: "Le lycée Henri-IV", description: "Au pied du Panthéon, l'un des lycées les plus sélectifs de France.", category: CATEGORIES.EDUCATION, rarity: RARITIES.LEGENDARY.code, attack: 95, defense: 90, views: 720000, emoji: "👑" },
  { id: 2226, name: "Le lycée professionnel", description: "CAP et bac pro : des métiers appris sur le tas dès le lycée.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 60, defense: 74, views: 610000, emoji: "🔧" },
  { id: 2227, name: "Le contrôle continu", description: "Depuis la réforme du bac, les notes de première comptent pour l'examen.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 62, defense: 58, views: 450000, emoji: "📈" },
  { id: 2228, name: "La terminale", description: "L'année des révisions, des faux billets d'excuse et du jour J.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 70, defense: 64, views: 470000, emoji: "🏁" },

  // ========== PRÉPA & GRANDES ÉCOLES ==========
  { id: 2229, name: "La prépa (CPGE)", description: "Deux ans de classe préparatoire aux grandes écoles, au rythme des colles.", category: CATEGORIES.EDUCATION, rarity: RARITIES.ULTRA_RARE.code, attack: 90, defense: 85, views: 980000, emoji: "🧠" },
  { id: 2230, name: "La khôlle", description: "L'interrogation orale hebdomadaire, au tableau, chrono en main.", category: CATEGORIES.EDUCATION, rarity: RARITIES.ULTRA_RARE.code, attack: 92, defense: 70, views: 540000, emoji: "🎯" },
  { id: 2231, name: "Le concours", description: "Des semaines d'épreuves écrites et d'oraux pour quelques places.", category: CATEGORIES.EDUCATION, rarity: RARITIES.ULTRA_RARE.code, attack: 94, defense: 78, views: 870000, emoji: "🏆" },
  { id: 2232, name: "MPSI/MP", description: "La filière maths-physique-informatique des prépas scientifiques.", category: CATEGORIES.EDUCATION, rarity: RARITIES.SUPER_RARE.code, attack: 88, defense: 72, views: 380000, emoji: "🧮" },
  { id: 2233, name: "PCSI/PSI", description: "La prépa des amoureux de la physique et de la chimie.", category: CATEGORIES.EDUCATION, rarity: RARITIES.SUPER_RARE.code, attack: 85, defense: 75, views: 350000, emoji: "⚛️" },
  { id: 2234, name: "ECG", description: "La prépa économique et commerciale : maths, histoire et culture générale.", category: CATEGORIES.EDUCATION, rarity: RARITIES.SUPER_RARE.code, attack: 82, defense: 78, views: 330000, emoji: "📈" },
  { id: 2235, name: "BCPST", description: "La prépa du vivant : bio, géologie et physique, vers agro et véto.", category: CATEGORIES.EDUCATION, rarity: RARITIES.SUPER_RARE.code, attack: 80, defense: 80, views: 300000, emoji: "🌿" },
  { id: 2236, name: "Khâgne", description: "La prépa lettres : dissertations de philo, d'histoire et de littérature.", category: CATEGORIES.EDUCATION, rarity: RARITIES.SUPER_RARE.code, attack: 84, defense: 82, views: 420000, emoji: "📖" },
  { id: 2237, name: "Hypokhâgne", description: "La première année de khâgne, surnommée « la bac -2 ».", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 70, defense: 68, views: 290000, emoji: "🖋️" },
  { id: 2238, name: "L'École polytechnique", description: "L'X, fondée en 1794 : l'école des ingénieurs au casoar légendaire.", category: CATEGORIES.EDUCATION, rarity: RARITIES.LEGENDARY.code, attack: 99, defense: 96, views: 1150000, emoji: "🎖️" },
  { id: 2242, name: "Le 20/20", description: "La note parfaite, si rare en prépa qu'elle devient une légende.", category: CATEGORIES.EDUCATION, rarity: RARITIES.ULTRA_RARE.code, attack: 85, defense: 40, views: 260000, emoji: "⭐" },

  // ========== L'ÉDUCATION NATIONALE ==========
  { id: 2243, name: "Le ministère de l'Éducation nationale", description: "Rue de Grenelle, il pilote le premier employeur de France : près de 870 000 agents.", category: CATEGORIES.EDUCATION, rarity: RARITIES.LEGENDARY.code, attack: 95, defense: 93, views: 2100000, emoji: "🏛️" },
  { id: 2244, name: "Le B.O.", description: "Le Bulletin officiel, la bible des textes que tout professeur doit appliquer.", category: CATEGORIES.EDUCATION, rarity: RARITIES.SUPER_RARE.code, attack: 72, defense: 88, views: 310000, emoji: "📑" },
  { id: 2245, name: "Le recteur", description: "Chancelier des universités, il représente le ministre dans son académie.", category: CATEGORIES.EDUCATION, rarity: RARITIES.ULTRA_RARE.code, attack: 85, defense: 90, views: 330000, emoji: "🎖️" },
  { id: 2246, name: "L'académie", description: "La circonscription administrative de l'éducation, une trentaine en métropole.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 70, defense: 85, views: 280000, emoji: "🗺️" },
  { id: 2247, name: "L'inspecteur", description: "L'IA-IPR observe les professeurs en classe et évalue leur enseignement.", category: CATEGORIES.EDUCATION, rarity: RARITIES.SUPER_RARE.code, attack: 80, defense: 78, views: 270000, emoji: "🔍" },
  { id: 2248, name: "Le proviseur", description: "Le chef d'établissement du lycée, premier responsable des résultats.", category: CATEGORIES.EDUCATION, rarity: RARITIES.ULTRA_RARE.code, attack: 86, defense: 88, views: 410000, emoji: "🧑‍💼" },
  { id: 2249, name: "Le principal", description: "Le chef d'établissement du collège, entre pédagogie et discipline.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 68, defense: 80, views: 340000, emoji: "🧑‍💼" },
  { id: 2250, name: "La laïcité", description: "Loi de 1905 et Charte de la laïcité : la neutralité religieuse à l'école publique.", category: CATEGORIES.EDUCATION, rarity: RARITIES.LEGENDARY.code, attack: 90, defense: 97, views: 1800000, emoji: "⚖️" },
  { id: 2251, name: "Les vacances scolaires", description: "Zones A, B et C, vacances d'été : le calendrier le plus attendu de l'année.", category: CATEGORIES.EDUCATION, rarity: RARITIES.ULTRA_RARE.code, attack: 58, defense: 99, views: 990000, emoji: "🏖️" },
  { id: 2252, name: "La carte scolaire", description: "La règle qui affecte chaque élève à l'établissement de son secteur.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 55, defense: 75, views: 300000, emoji: "🗺️" },
  { id: 2253, name: "Le redoublement", description: "Refaire une année : remède autrefois courant, devenu exception.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 40, defense: 40, views: 360000, emoji: "🔁" },
  { id: 2254, name: "Le zéro pointé", description: "La note légendaire de la copie blanche, devenue presque folklorique.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 5, defense: 5, views: 250000, emoji: "❌" },
  { id: 2255, name: "L'infirmerie", description: "Le refuge des maux de ventre mystérieux qui précèdent les contrôles.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 30, defense: 80, views: 290000, emoji: "⛑️" },
  { id: 2256, name: "Le règlement intérieur", description: "Le document que tout élève signe sans vraiment le lire.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 25, defense: 85, views: 240000, emoji: "📋" },
  { id: 2257, name: "Le CNED", description: "L'école à distance de l'Éducation nationale, du voyage à l'hospitalisation.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 60, defense: 75, views: 380000, emoji: "🏠" },
  { id: 2258, name: "La bourse des collégiens", description: "L'aide de l'État aux familles, versée sur critères de ressources.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 35, defense: 65, views: 220000, emoji: "💶" },
  { id: 2259, name: "L'agrégation", description: "Le concours le plus prestigieux pour devenir professeur.", category: CATEGORIES.EDUCATION, rarity: RARITIES.ULTRA_RARE.code, attack: 91, defense: 85, views: 430000, emoji: "🎓" },
  { id: 2260, name: "Le CAPES", description: "Le certificat d'aptitude au professorat de l'enseignement du second degré.", category: CATEGORIES.EDUCATION, rarity: RARITIES.SUPER_RARE.code, attack: 84, defense: 80, views: 400000, emoji: "📜" },
  { id: 2261, name: "Pronote", description: "L'application où l'on vérifie notes, emploi du temps et devoirs.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 50, defense: 72, views: 480000, emoji: "📱" },
  { id: 2262, name: "L'ENT", description: "L'espace numérique de travail, portail de tout l'établissement.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 45, defense: 70, views: 260000, emoji: "💻" },
  { id: 2264, name: "L'université", description: "Des amphithéâtres de licence aux laboratoires de doctorat.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 65, defense: 80, views: 760000, emoji: "🎓" },
  { id: 2265, name: "L'école buissonnière", description: "L'absence mystérieuse signalée par SMS aux parents.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 20, defense: 30, views: 340000, emoji: "🚪" },
  { id: 2266, name: "La punition collective", description: "La copie à recopier pour la faute d'un seul.", category: CATEGORIES.EDUCATION, rarity: RARITIES.COMMON.code, attack: 25, defense: 45, views: 230000, emoji: "📄" },
  { id: 2267, name: "La moyenne de la classe", description: "Le chiffre que tout élève compare aussitôt à sa propre note.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 55, defense: 50, views: 270000, emoji: "📊" },
  { id: 2268, name: "L'UNSS", description: "L'Union nationale du sport scolaire : les championnats entre établissements.", category: CATEGORIES.EDUCATION, rarity: RARITIES.RARE.code, attack: 58, defense: 55, views: 250000, emoji: "⚽" },

  ];
  for (var i = 0; i < EXT4_CARDS.length; i++) CARDS.push(EXT4_CARDS[i]);
})();
