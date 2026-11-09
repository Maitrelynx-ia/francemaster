// France Masters - Données des cartes
// Basées sur de vrais articles Wikipédia France

const CATEGORIES = {
    HISTOIRE: "Histoire & Personnages",
    MONUMENTS: "Monuments & Lieux",
    GASTRONOMIE: "Gastronomie",
    GEOGRAPHIE: "Géographie & Régions",
    SCIENCES: "Sciences & Arts",
    SPORT: "Sport & Culture"
};

const RARITIES = {
    COMMON: { code: "C", name: "Commune", weight: 45, color: "#808080", bgColor: "#f0f0f0" },
    RARE: { code: "R", name: "Rare", weight: 30, color: "#4169E1", bgColor: "#e6f0ff" },
    SUPER_RARE: { code: "SR", name: "Super Rare", weight: 15, color: "#8A2BE2", bgColor: "#f0e6ff" },
    ULTRA_RARE: { code: "UR", name: "Ultra Rare", weight: 7, color: "#FFD700", bgColor: "#fff8e6" },
    LEGENDARY: { code: "L", name: "Légendaire", weight: 3, color: "#FF69B4", bgColor: "linear-gradient(135deg, #ff69b4, #ffd700, #4169e1, #8a2be2, #00ff7f)" }
};

// Tableau de toutes les cartes
const CARDS = [

    // ========== HISTOIRE & PERSONNAGES ==========

    // Légendaires
    {
        id: 1,
        name: "Napoléon Bonaparte",
        description: "Empereur des Français, stratège militaire et réformateur",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.LEGENDARY.code,
        attack: 98,
        defense: 95,
        views: 12500000,
        emoji: "👑",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project_2.jpg/250px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project_2.jpg"
    },

    {
        id: 2,
        name: "Jeanne d'Arc",
        description: "Héroïne française, symbole de la résistance pendant la guerre de Cent Ans",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.LEGENDARY.code,
        attack: 92,
        defense: 88,
        views: 11200000,
        emoji: "⚔️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Contemporaine_afb_jeanne_d_arc.png/250px-Contemporaine_afb_jeanne_d_arc.png"
    },

    // Ultra Rares
    {
        id: 3,
        name: "Louis XIV",
        description: "Le Roi-Soleil, règne le plus long de l'histoire de France (72 ans)",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 95,
        defense: 90,
        views: 9800000,
        emoji: "👑",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Louis_XIV_of_France.jpg/250px-Louis_XIV_of_France.jpg"
    },

    {
        id: 4,
        name: "Charles de Gaulle",
        description: "Général et président, symbole de la Résistance pendant la Seconde Guerre mondiale",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 94,
        defense: 92,
        views: 8500000,
        emoji: "🎖️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/De_Gaulle-OWI_%283x4_cropped%29_%282%29.jpg/250px-De_Gaulle-OWI_%283x4_cropped%29_%282%29.jpg"
    },

    {
        id: 5,
        name: "Marie Curie",
        description: "Physicienne et chimiste, pionnière de la radioactivité, double lauréate du prix Nobel",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 90,
        defense: 85,
        views: 7200000,
        emoji: "🔬",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/250px-Marie_Curie_c1920.jpg"
    },

    {
        id: 6,
        name: "Vercingétorix",
        description: "Chef gaulois qui unifia les tribus contre Jules César à Alésia",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 88,
        defense: 82,
        views: 5800000,
        emoji: "🛡️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Vercing%C3%A9torix_stat%C3%A8re_Gallica_avers.jpg/250px-Vercing%C3%A9torix_stat%C3%A8re_Gallica_avers.jpg"
    },

    // Super Rares
    {
        id: 7,
        name: "Clovis",
        description: "Premier roi franc à unifier les tribus franques et se convertir au christianisme",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 85,
        defense: 80,
        views: 4500000,
        emoji: "👑",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Saint_Remy_baptise_Clovis_d%C3%A9tail.jpg/250px-Saint_Remy_baptise_Clovis_d%C3%A9tail.jpg"
    },

    {
        id: 8,
        name: "Henri IV",
        description: "Roi de France et de Navarre, auteur de l'édit de Nantes",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 82,
        defense: 78,
        views: 3800000,
        emoji: "👑",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/97/Henri_IV_portant_la_croix_du_Saint-Esprit_-_Frans_Pourbus_le_Jeune.jpg/250px-Henri_IV_portant_la_croix_du_Saint-Esprit_-_Frans_Pourbus_le_Jeune.jpg"
    },

    {
        id: 9,
        name: "Robespierre",
        description: "Avocat et homme politique, figure majeure de la Révolution française",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 80,
        defense: 75,
        views: 3500000,
        emoji: "⚖️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/Robespierre.jpg/250px-Robespierre.jpg"
    },

    {
        id: 10,
        name: "Voltaire",
        description: "Philosophe des Lumières, écrivain et défenseur de la liberté d'expression",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 78,
        defense: 85,
        views: 4200000,
        emoji: "📜",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Atelier_de_Nicolas_de_Largilli%C3%A8re%2C_portrait_de_Voltaire%2C_d%C3%A9tail_%28mus%C3%A9e_Carnavalet%29_-002.jpg/250px-Atelier_de_Nicolas_de_Largilli%C3%A8re%2C_portrait_de_Voltaire%2C_d%C3%A9tail_%28mus%C3%A9e_Carnavalet%29_-002.jpg"
    },

    // Rares
    {
        id: 11,
        name: "Charlemagne",
        description: "Empereur des Francs et des Romains, couronné en 800",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 85,
        defense: 78,
        views: 3200000,
        emoji: "👑",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/Charlemagne_denier_Mayence_812_814.jpg/250px-Charlemagne_denier_Mayence_812_814.jpg"
    },

    {
        id: 12,
        name: "Saint Louis (Louis IX)",
        description: "Roi de France canonisé, symbole de la justice royale",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 75,
        defense: 88,
        views: 2800000,
        emoji: "⛪",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Saintlouis_%28cropped%29.jpg/250px-Saintlouis_%28cropped%29.jpg"
    },

    {
        id: 13,
        name: "Richelieu",
        description: "Cardinal et ministre de Louis XIII, architecte de l'absolutisme",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 78,
        defense: 82,
        views: 2500000,
        emoji: "🎭",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Cardinal_de_Richelieu.jpg/250px-Cardinal_de_Richelieu.jpg"
    },

    {
        id: 14,
        name: "Mazarin",
        description: "Cardinal et ministre, successeur de Richelieu sous Louis XIV",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 72,
        defense: 80,
        views: 2200000,
        emoji: "🎭",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Cardinal_Mazarin_by_Pierre_Mignard_%28Mus%C3%A9e_Cond%C3%A9%29.jpg/250px-Cardinal_Mazarin_by_Pierre_Mignard_%28Mus%C3%A9e_Cond%C3%A9%29.jpg"
    },

    {
        id: 15,
        name: "La Fayette",
        description: "Héros de la guerre d'indépendance américaine et de la Révolution française",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 70,
        defense: 75,
        views: 2000000,
        emoji: "⚔️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Gilbert_du_Motier_Marquis_de_Lafayette.jpg/250px-Gilbert_du_Motier_Marquis_de_Lafayette.jpg"
    },

    {
        id: 16,
        name: "Danton",
        description: "Révolutionnaire français, fondateur du Club des Cordeliers",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 75,
        defense: 65,
        views: 1800000,
        emoji: "🗣️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Anonyme_-_Portrait_de_Georges_Danton_%281759-1794%29%2C_orateur_et_homme_politique_-_P712_-_mus%C3%A9e_Carnavalet_-_4.jpg/250px-Anonyme_-_Portrait_de_Georges_Danton_%281759-1794%29%2C_orateur_et_homme_politique_-_P712_-_mus%C3%A9e_Carnavalet_-_4.jpg"
    },

    {
        id: 17,
        name: "Clemenceau",
        description: "Homme d'État, Père la Victoire de la Première Guerre mondiale",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 72,
        defense: 78,
        views: 1600000,
        emoji: "🎖️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Georges_Clemenceau_par_Nadar.jpg/250px-Georges_Clemenceau_par_Nadar.jpg"
    },

    // Communes
    {
        id: 18,
        name: "François Ier",
        description: "Roi de la Renaissance française, mécène et constructeur de Chambord",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.COMMON.code,
        attack: 65,
        defense: 70,
        views: 1200000,
        emoji: "👑",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Fran%C3%A7ois_Ier_Louvre.jpg/250px-Fran%C3%A7ois_Ier_Louvre.jpg"
    },

    {
        id: 19,
        name: "Henri II",
        description: "Roi de France, époux de Catherine de Médicis",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.COMMON.code,
        attack: 60,
        defense: 65,
        views: 900000,
        emoji: "👑",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Portrait_of_King_Henry_II_of_France_%28by_Studio_of_Fran%C3%A7ois_Clouet%29_-_Royal_Collection.jpg/250px-Portrait_of_King_Henry_II_of_France_%28by_Studio_of_Fran%C3%A7ois_Clouet%29_-_Royal_Collection.jpg"
    },

    {
        id: 20,
        name: "Catherine de Médicis",
        description: "Reine de France, régente et mécène de la Renaissance",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.COMMON.code,
        attack: 68,
        defense: 72,
        views: 1100000,
        emoji: "👑",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Catherine_de_M%C3%A9dicis_-_atelier_de_Fran%C3%A7ois_Clouet.jpg/250px-Catherine_de_M%C3%A9dicis_-_atelier_de_Fran%C3%A7ois_Clouet.jpg"
    },

    {
        id: 21,
        name: "Marat",
        description: "Journaliste et révolutionnaire, fondateur du journal L'Ami du peuple",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.COMMON.code,
        attack: 55,
        defense: 60,
        views: 800000,
        emoji: "📰",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/80/Jean-Paul_Marat_portre.jpg/250px-Jean-Paul_Marat_portre.jpg"
    },

    // ========== MONUMENTS & LIEUX ==========

    // Légendaires
    {
        id: 22,
        name: "Tour Eiffel",
        description: "Symbole de Paris, construite par Gustave Eiffel pour l'Exposition universelle de 1889",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.LEGENDARY.code,
        attack: 100,
        defense: 98,
        views: 15000000,
        emoji: "🗼",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/250px-Tour_Eiffel_Wikimedia_Commons.jpg"
    },

    {
        id: 23,
        name: "Louvre",
        description: "Plus grand musée du monde, abritant la Joconde et la Vénus de Milo",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.LEGENDARY.code,
        attack: 98,
        defense: 95,
        views: 14500000,
        emoji: "🏛️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_Wikimedia_Commons.jpg/250px-Louvre_Museum_Wikimedia_Commons.jpg"
    },

    // Ultra Rares
    {
        id: 24,
        name: "Château de Versailles",
        description: "Ancienne résidence des rois de France, chef-d'œuvre de l'art classique",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 95,
        defense: 92,
        views: 12000000,
        emoji: "🏰",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Vue_a%C3%A9rienne_du_domaine_de_Versailles_par_ToucanWings_-_Creative_Commons_By_Sa_3.0_-_083.jpg/250px-Vue_a%C3%A9rienne_du_domaine_de_Versailles_par_ToucanWings_-_Creative_Commons_By_Sa_3.0_-_083.jpg"
    },

    {
        id: 25,
        name: "Mont-Saint-Michel",
        description: "Abbaye médiévale sur un îlot rocheux en Normandie, classée à l'UNESCO",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 90,
        defense: 88,
        views: 8500000,
        emoji: "🏰",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Mont_St_Michel_in_the_afternoon.jpg/250px-Mont_St_Michel_in_the_afternoon.jpg"
    },

    {
        id: 26,
        name: "Pont du Gard",
        description: "Aqueduc romain du Ier siècle, chef-d'œuvre de l'ingénierie antique",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 85,
        defense: 82,
        views: 6500000,
        emoji: "🌉",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Pont_du_Gard_%2830%29.jpg/250px-Pont_du_Gard_%2830%29.jpg"
    },

    // Super Rares
    {
        id: 27,
        name: "Arènes de Nîmes",
        description: "Amphithéâtre romain parmi les mieux conservés au monde",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 82,
        defense: 78,
        views: 4500000,
        emoji: "🏟️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Arenes_de_Nimes_panorama.jpg/250px-Arenes_de_Nimes_panorama.jpg"
    },

    {
        id: 28,
        name: "Cathédrale Notre-Dame de Paris",
        description: "Cathédrale gothique emblématique, chef-d'œuvre architectural",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 88,
        defense: 85,
        views: 5200000,
        emoji: "⛪",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Notre-Dame_de_Paris_2013-07-24.jpg/250px-Notre-Dame_de_Paris_2013-07-24.jpg"
    },

    {
        id: 29,
        name: "Château de Chambord",
        description: "Château de la Loire, chef-d'œuvre de la Renaissance française",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 85,
        defense: 80,
        views: 4000000,
        emoji: "🏰",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Chambord_Castle_Northwest_facade.jpg/250px-Chambord_Castle_Northwest_facade.jpg"
    },

    {
        id: 30,
        name: "Arc de Triomphe",
        description: "Monument parisien honorant les soldats de la Révolution et de l'Empire",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 80,
        defense: 75,
        views: 3800000,
        emoji: "🏆",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Arc_de_Triomphe_-_Ao%C3%BBt_2026.jpg/250px-Arc_de_Triomphe_-_Ao%C3%BBt_2026.jpg"
    },

    // Rares
    {
        id: 31,
        name: "Sacré-Cœur",
        description: "Basilique blanche dominant Paris depuis Montmartre",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.RARE.code,
        attack: 75,
        defense: 72,
        views: 3000000,
        emoji: "⛪",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Sacr%C3%A9_Coeur_Fa%C3%A7ade_1.jpg/250px-Sacr%C3%A9_Coeur_Fa%C3%A7ade_1.jpg"
    },

    {
        id: 32,
        name: "Opéra Garnier",
        description: "Opéra de Paris, chef-d'œuvre architectural du Second Empire",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.RARE.code,
        attack: 72,
        defense: 78,
        views: 2500000,
        emoji: "🎭",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Paris_Palais_Garnier_2010-04-06_16.55.07.jpg/250px-Paris_Palais_Garnier_2010-04-06_16.55.07.jpg"
    },

    {
        id: 33,
        name: "Les Invalides",
        description: "Complexe architectural abritant le tombeau de Napoléon Ier",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.RARE.code,
        attack: 78,
        defense: 75,
        views: 2200000,
        emoji: "🏛️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Invalides_aerial_view.jpg/250px-Invalides_aerial_view.jpg"
    },

    {
        id: 34,
        name: "Centre Pompidou",
        description: "Centre culturel moderne à Paris, dédié à l'art contemporain",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.RARE.code,
        attack: 70,
        defense: 75,
        views: 2000000,
        emoji: "🏢",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Le_logo_du_Centre_Pompidou_redessin%C3%A9_en_2019_%285_bandes%29_avec_son_typogramme.svg/250px-Le_logo_du_Centre_Pompidou_redessin%C3%A9_en_2019_%285_bandes%29_avec_son_typogramme.svg.png"
    },

    {
        id: 35,
        name: "Palais des Papes",
        description: "Palais gothique d'Avignon, résidence des papes au XIVème siècle",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.RARE.code,
        attack: 75,
        defense: 70,
        views: 1800000,
        emoji: "🏛️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/MK53831-32_Palais_des_Papes_d%27Avignon.jpg/250px-MK53831-32_Palais_des_Papes_d%27Avignon.jpg"
    },

    // Communes
    {
        id: 36,
        name: "Tour Montparnasse",
        description: "Gratte-ciel parisien offrant une vue panoramique sur la ville",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.COMMON.code,
        attack: 55,
        defense: 60,
        views: 1000000,
        emoji: "🏙️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Tour_Montparnasse_20250513.jpg/250px-Tour_Montparnasse_20250513.jpg"
    },

    {
        id: 37,
        name: "Basilique Notre-Dame de la Garde",
        description: "Symbole de Marseille, surnommée la Bonne Mère",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.COMMON.code,
        attack: 60,
        defense: 65,
        views: 1200000,
        emoji: "⛪",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Notre_Dame_de_la_Garde.jpg/250px-Notre_Dame_de_la_Garde.jpg"
    },

    // ========== GASTRONOMIE ==========

    // Ultra Rares
    {
        id: 38,
        name: "Baguette",
        description: "Symbole de la boulangerie française, inscrite au patrimoine de l'UNESCO",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 88,
        defense: 85,
        views: 7000000,
        emoji: "🥖",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Salon_Agriculture_2009-Boulanger3.jpg/250px-Salon_Agriculture_2009-Boulanger3.jpg"
    },

    {
        id: 39,
        name: "Croissant",
        description: "Viennoiserie emblématique française, à base de pâte feuilletée",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 85,
        defense: 80,
        views: 6000000,
        emoji: "🥐",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Croissant-newspaper-and-tea.jpg/250px-Croissant-newspaper-and-tea.jpg"
    },

    // Super Rares
    {
        id: 40,
        name: "Bœuf bourguignon",
        description: "Ragoût traditionnel bourguignon à base de bœuf mijoté dans du vin rouge",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 82,
        defense: 78,
        views: 3500000,
        emoji: "🍖",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Boeuf_Bourguignon_2022.jpg/250px-Boeuf_Bourguignon_2022.jpg"
    },

    {
        id: 41,
        name: "Ratatouille",
        description: "Plat traditionnel provençal à base de légumes mijotés",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 78,
        defense: 80,
        views: 3000000,
        emoji: "🥘",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Ratatouille_001.jpg/250px-Ratatouille_001.jpg"
    },

    {
        id: 42,
        name: "Bouillabaisse",
        description: "Soupe de poissons traditionnelle de Marseille",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 75,
        defense: 72,
        views: 2500000,
        emoji: "🍲",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Bouillabaisse_01.jpg/250px-Bouillabaisse_01.jpg"
    },

    {
        id: 43,
        name: "Cassoulet",
        description: "Ragoût traditionnel du Sud-Ouest à base de haricots blancs et de viande",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 80,
        defense: 75,
        views: 2800000,
        emoji: "🍲",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Cassoulet.cuit.jpg/250px-Cassoulet.cuit.jpg"
    },

    // Rares
    {
        id: 44,
        name: "Camembert",
        description: "Fromage normand à pâte molle et croûte fleurie",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.RARE.code,
        attack: 70,
        defense: 75,
        views: 2200000,
        emoji: "🧀",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Camembert.jpg/250px-Camembert.jpg"
    },

    {
        id: 45,
        name: "Roquefort",
        description: "Fromage bleu à pâte persillée, originaire de l'Aveyron",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.RARE.code,
        attack: 72,
        defense: 70,
        views: 1800000,
        emoji: "🧀",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Wikicheese_-_Roquefort_-_20150417_-_002.jpg/250px-Wikicheese_-_Roquefort_-_20150417_-_002.jpg"
    },

    {
        id: 46,
        name: "Macaron",
        description: "Biscuit rond à base d'amandes, popularisé par Ladurée",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.RARE.code,
        attack: 65,
        defense: 70,
        views: 2000000,
        emoji: "🍪",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Macarons%2C_French_made_mini_cakes.JPG/250px-Macarons%2C_French_made_mini_cakes.JPG"
    },

    {
        id: 47,
        name: "Foie gras",
        description: "Spécialité culinaire française à base de foie de canard ou d'oie",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.RARE.code,
        attack: 68,
        defense: 65,
        views: 1500000,
        emoji: "🍖",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Foie_gras_IMGP2349.jpg/250px-Foie_gras_IMGP2349.jpg"
    },

    {
        id: 48,
        name: "Coq au vin",
        description: "Plat traditionnel français de poulet mijoté dans du vin rouge",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.RARE.code,
        attack: 70,
        defense: 68,
        views: 1600000,
        emoji: "🍗",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Coq_au_vin_rouge.jpg/250px-Coq_au_vin_rouge.jpg"
    },

    // Communes
    {
        id: 49,
        name: "Tarte Tatin",
        description: "Tarte renversée aux pommes caramélisées, originaire de Lamotte-Beuvron",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.COMMON.code,
        attack: 55,
        defense: 60,
        views: 1000000,
        emoji: "🍰",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Tarte_Tatin_a_la_Michalak.jpg/250px-Tarte_Tatin_a_la_Michalak.jpg"
    },

    {
        id: 50,
        name: "Quiche Lorraine",
        description: "Tarte salée à base de pâte brisée, lardons et crème fraîche",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.COMMON.code,
        attack: 58,
        defense: 55,
        views: 900000,
        emoji: "🥧",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/54._Quiche_lorraine.jpg/250px-54._Quiche_lorraine.jpg"
    },

    {
        id: 51,
        name: "Soupe à l'oignon",
        description: "Soupe traditionnelle française à base d'oignons caramélisés et de fromage gratiné",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.COMMON.code,
        attack: 50,
        defense: 60,
        views: 800000,
        emoji: "🍲",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Soupe_%C3%A0_l%27oignon_01.JPG/250px-Soupe_%C3%A0_l%27oignon_01.JPG"
    },

    {
        id: 52,
        name: "Crêpe",
        description: "Spécialité bretonne, fine galette à base de farine de blé noir ou de froment",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.COMMON.code,
        attack: 60,
        defense: 55,
        views: 1100000,
        emoji: "🥞",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/Crepes_dsc07085.jpg/250px-Crepes_dsc07085.jpg"
    },

    // ========== GÉOGRAPHIE & RÉGIONS ==========

    // Ultra Rares
    {
        id: 53,
        name: "Mont Blanc",
        description: "Plus haut sommet des Alpes et de l'Europe occidentale (4 808 m)",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 90,
        defense: 85,
        views: 6500000,
        emoji: "⛰️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Mont_Blanc_depuis_Valmorel_2.jpg/250px-Mont_Blanc_depuis_Valmorel_2.jpg"
    },

    {
        id: 54,
        name: "La Seine",
        description: "Fleuve français traversant Paris, long de 776 km",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 85,
        defense: 80,
        views: 5500000,
        emoji: "🌊",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Pont_au_Change_and_Palais_de_justice%2C_Paris_20_April_2021_001.jpg/250px-Pont_au_Change_and_Palais_de_justice%2C_Paris_20_April_2021_001.jpg"
    },

    // Super Rares
    {
        id: 55,
        name: "La Loire",
        description: "Plus long fleuve de France (1 006 km), classé au patrimoine mondial de l'UNESCO",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 82,
        defense: 78,
        views: 3500000,
        emoji: "🌊",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9d/Loire_%C3%A0_Br%C3%A9h%C3%A9mont2.JPG/250px-Loire_%C3%A0_Br%C3%A9h%C3%A9mont2.JPG"
    },

    {
        id: 56,
        name: "La Bretagne",
        description: "Région du nord-ouest de la France, connue pour ses paysages côtiers et sa culture celtique",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 78,
        defense: 80,
        views: 4000000,
        emoji: "🏴",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Flag_of_Brittany.svg/250px-Flag_of_Brittany.svg.png"
    },

    {
        id: 57,
        name: "La Provence",
        description: "Région du sud-est de la France, célèbre pour ses champs de lavande et son climat méditerranéen",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 80,
        defense: 75,
        views: 3800000,
        emoji: "🌿",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_Provence.svg/250px-Flag_of_Provence.svg.png"
    },

    {
        id: 58,
        name: "Côte d'Azur",
        description: "Littoral méditerranéen français, célèbre pour ses stations balnéaires comme Nice et Cannes",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 75,
        defense: 82,
        views: 4500000,
        emoji: "🏖️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/C%C3%B4te_d%E2%80%99Azur_overview_map.png/250px-C%C3%B4te_d%E2%80%99Azur_overview_map.png"
    },

    // Rares
    {
        id: 59,
        name: "Les Pyrénées",
        description: "Chaîne de montagnes entre la France et l'Espagne, culminant à 3 404 m",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 72,
        defense: 70,
        views: 2000000,
        emoji: "⛰️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Pyrenees_topographic_map-fr.svg/250px-Pyrenees_topographic_map-fr.svg.png"
    },

    {
        id: 60,
        name: "Le Massif Central",
        description: "Région montagneuse du centre de la France, d'origine volcanique",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 68,
        defense: 72,
        views: 1500000,
        emoji: "⛰️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/France_Massif_central.jpg/250px-France_Massif_central.jpg"
    },

    {
        id: 61,
        name: "La Normandie",
        description: "Région du nord-ouest de la France, célèbre pour ses plages du Débarquement et ses pommiers",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 70,
        defense: 68,
        views: 2200000,
        emoji: "🌳",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Normandie.svg/250px-Flag_of_Normandie.svg.png"
    },

    {
        id: 62,
        name: "L'Alsace",
        description: "Région de l'est de la France, marquée par une forte influence germanique",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 65,
        defense: 75,
        views: 1800000,
        emoji: "🏡",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Carte_Alsace_2018.png/250px-Carte_Alsace_2018.png"
    },

    // Communes
    {
        id: 63,
        name: "Le Rhône",
        description: "Fleuve du sud-est de la France, long de 812 km",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.COMMON.code,
        attack: 55,
        defense: 60,
        views: 1000000,
        emoji: "🌊",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Saint-benezet_in_southeastern_France.jpg/250px-Saint-benezet_in_southeastern_France.jpg"
    },

    {
        id: 64,
        name: "La Garonne",
        description: "Fleuve du sud-ouest de la France, long de 647 km",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.COMMON.code,
        attack: 50,
        defense: 55,
        views: 800000,
        emoji: "🌊",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Pont-Neuf_de_Toulouse_3.jpg/250px-Pont-Neuf_de_Toulouse_3.jpg"
    },

    // ========== SCIENCES & ARTS ==========

    // Ultra Rares
    {
        id: 65,
        name: "Louis Pasteur",
        description: "Chimiste et biologiste, pionnier de la microbiologie et de la pasteurisation",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 92,
        defense: 88,
        views: 7500000,
        emoji: "🔬",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Louis_Pasteur_%281822_-_1895%29%2C_microbiologist_and_chemist_Wellcome_V0026980.jpg/250px-Louis_Pasteur_%281822_-_1895%29%2C_microbiologist_and_chemist_Wellcome_V0026980.jpg"
    },

    {
        id: 66,
        name: "Gustave Eiffel",
        description: "Ingénieur français, concepteur de la Tour Eiffel et du cadre de la Statue de la Liberté",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 88,
        defense: 85,
        views: 6000000,
        emoji: "🗼",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/Gustave_Eiffel_1888_Nadar2.jpg/250px-Gustave_Eiffel_1888_Nadar2.jpg"
    },

    // Super Rares
    {
        id: 67,
        name: "Victor Hugo",
        description: "Écrivain romantique, auteur des Misérables et de Notre-Dame de Paris",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 85,
        defense: 80,
        views: 5000000,
        emoji: "📖",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Victor_Hugo_001.jpg/250px-Victor_Hugo_001.jpg"
    },

    {
        id: 68,
        name: "Molière",
        description: "Dramaturge du XVIIème siècle, maître de la comédie française",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 80,
        defense: 85,
        views: 4500000,
        emoji: "🎭",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Moli%C3%A8re_-_Nicolas_Mignard_%281658%29.jpg/250px-Moli%C3%A8re_-_Nicolas_Mignard_%281658%29.jpg"
    },

    {
        id: 69,
        name: "Frères Lumière",
        description: "Inventeurs du cinématographe, pionniers du cinéma",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 78,
        defense: 75,
        views: 3800000,
        emoji: "🎬",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/93/Fratelli_Lumiere.jpg/250px-Fratelli_Lumiere.jpg"
    },

    {
        id: 70,
        name: "Paul Cézanne",
        description: "Peintre postimpressionniste, précurseur du cubisme",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 82,
        defense: 78,
        views: 3500000,
        emoji: "🎨",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a4/Paul_C%C3%A9zanne_O.I..jpg/250px-Paul_C%C3%A9zanne_O.I..jpg"
    },

    // Rares
    {
        id: 71,
        name: "Claude Debussy",
        description: "Compositeur impressionniste, auteur de Clair de Lune",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 75,
        defense: 80,
        views: 2500000,
        emoji: "🎹",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Claude_Debussy_by_Atelier_Nadar.jpg/250px-Claude_Debussy_by_Atelier_Nadar.jpg"
    },

    {
        id: 72,
        name: "Henri de Toulouse-Lautrec",
        description: "Peintre postimpressionniste, célèbre pour ses représentations de la vie nocturne parisienne",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 72,
        defense: 78,
        views: 2200000,
        emoji: "🎨",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Henri_de_Toulouse-Lautrec.png/250px-Henri_de_Toulouse-Lautrec.png"
    },

    {
        id: 73,
        name: "Auguste Rodin",
        description: "Sculpteur français, auteur du Penseur et du Baiser",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 78,
        defense: 75,
        views: 2000000,
        emoji: "🗿",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Auguste_Rodin_fotografato_da_Nadar_nel_1891.jpg/250px-Auguste_Rodin_fotografato_da_Nadar_nel_1891.jpg"
    },

    {
        id: 74,
        name: "Édith Piaf",
        description: "Chanteuse française, icône de la chanson française avec La Vie en rose",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 70,
        defense: 80,
        views: 3000000,
        emoji: "🎤",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/Piaf_Harcourt_1946_2.jpg/250px-Piaf_Harcourt_1946_2.jpg"
    },

    // Communes
    {
        id: 75,
        name: "Pierre et Marie Curie",
        description: "Couple de scientifiques, pionniers de la radioactivité",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.COMMON.code,
        attack: 65,
        defense: 70,
        views: 1500000,
        emoji: "🔬",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Pierre_Curie_by_Dujardin_c1906.jpg/250px-Pierre_Curie_by_Dujardin_c1906.jpg"
    },

    {
        id: 76,
        name: "Blaise Pascal",
        description: "Mathématicien, physicien et philosophe du XVIIème siècle",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.COMMON.code,
        attack: 60,
        defense: 65,
        views: 1200000,
        emoji: "📐",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/Blaise_Pascal_Versailles.JPG/250px-Blaise_Pascal_Versailles.JPG"
    },

    // ========== SPORT & CULTURE ==========

    // Ultra Rares
    {
        id: 77,
        name: "Tour de France",
        description: "Course cycliste la plus prestigieuse au monde, créée en 1903",
        category: CATEGORIES.SPORT,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 90,
        defense: 85,
        views: 8000000,
        emoji: "🚴",
        image: "https://thumb.wikimedia.org/wikipedia/fr/thumb/f/f2/Tour_de_France_logo_2019.svg/250px-Tour_de_France_logo_2019.svg.png"
    },

    {
        id: 78,
        name: "Roland-Garros",
        description: "Tournoi de tennis du Grand Chelem, créé en 1891",
        category: CATEGORIES.SPORT,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 85,
        defense: 80,
        views: 6500000,
        emoji: "🎾",
        image: "https://thumb.wikimedia.org/wikipedia/fr/thumb/1/1d/Logo_Roland-Garros.svg/250px-Logo_Roland-Garros.svg.png"
    },

    // Super Rares
    {
        id: 79,
        name: "Festival de Cannes",
        description: "Festival international du film, créé en 1946, palme d'or à la clé",
        category: CATEGORIES.SPORT,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 80,
        defense: 75,
        views: 5000000,
        emoji: "🎬",
        image: "https://thumb.wikimedia.org/wikipedia/fr/thumb/f/fd/Festival_de_Cannes_Logo.svg/250px-Festival_de_Cannes_Logo.svg.png"
    },

    {
        id: 80,
        name: "Équipe de France de football",
        description: "Équipe nationale française, championne du monde en 1998 et 2018",
        category: CATEGORIES.SPORT,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 88,
        defense: 82,
        views: 7000000,
        emoji: "⚽",
        image: "https://thumb.wikimedia.org/wikipedia/fr/thumb/a/aa/Logo_%C3%89quipe_France_Football_2026.svg/250px-Logo_%C3%89quipe_France_Football_2026.svg.png"
    },

    {
        id: 81,
        name: "24 Heures du Mans",
        description: "Course d'endurance automobile créée en 1923",
        category: CATEGORIES.SPORT,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 78,
        defense: 75,
        views: 3000000,
        emoji: "🏁",
        image: "https://thumb.wikimedia.org/wikipedia/fr/thumb/d/dc/24_heures_du_mans_2014_logo.png/250px-24_heures_du_mans_2014_logo.png"
    },

    // Rares
    {
        id: 82,
        name: "Jeux Olympiques de Paris 1900",
        description: "Deuxièmes Jeux Olympiques modernes, organisés à Paris",
        category: CATEGORIES.SPORT,
        rarity: RARITIES.RARE.code,
        attack: 70,
        defense: 75,
        views: 1500000,
        emoji: "🏅",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Paris_1900_olympic_poster.jpg/250px-Paris_1900_olympic_poster.jpg"
    },

    {
        id: 83,
        name: "Jeux Olympiques de Paris 1924",
        description: "Huitièmes Jeux Olympiques modernes, dernière édition organisée à Paris avant 2024",
        category: CATEGORIES.SPORT,
        rarity: RARITIES.RARE.code,
        attack: 72,
        defense: 70,
        views: 1200000,
        emoji: "🏅",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/1924_Summer_Olympics_logo.svg/250px-1924_Summer_Olympics_logo.svg.png"
    },

    {
        id: 84,
        name: "Zinédine Zidane",
        description: "Footballeur français, champion du monde en 1998, ballon d'or 1998",
        category: CATEGORIES.SPORT,
        rarity: RARITIES.RARE.code,
        attack: 85,
        defense: 80,
        views: 4000000,
        emoji: "⚽",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Zinedine_Zidane_by_Tasnim_03.jpg/250px-Zinedine_Zidane_by_Tasnim_03.jpg"
    },

    {
        id: 85,
        name: "Michel Platini",
        description: "Footballeur français, ballon d'or à trois reprises (1983, 1984, 1985)",
        category: CATEGORIES.SPORT,
        rarity: RARITIES.RARE.code,
        attack: 82,
        defense: 78,
        views: 2500000,
        emoji: "⚽",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Michel_Platini_2010.jpg/250px-Michel_Platini_2010.jpg"
    },

    // Communes
    {
        id: 86,
        name: "Open de France",
        description: "Tournoi de golf du circuit européen, créé en 1906",
        category: CATEGORIES.SPORT,
        rarity: RARITIES.COMMON.code,
        attack: 55,
        defense: 60,
        views: 800000,
        emoji: "⛳",
        image: "https://thumb.wikimedia.org/wikipedia/fr/thumb/1/17/Logo_Fedex_Open_de_France.jpg/250px-Logo_Fedex_Open_de_France.jpg"
    },

    {
        id: 87,
        name: "Paris-Roubaix",
        description: "Course cycliste surnommée l'Enfer du Nord, créée en 1896",
        category: CATEGORIES.SPORT,
        rarity: RARITIES.COMMON.code,
        attack: 60,
        defense: 55,
        views: 1000000,
        emoji: "🚴",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Roubaix%2C_V%C3%A9lodrome.jpg/250px-Roubaix%2C_V%C3%A9lodrome.jpg"
    },

    {
        id: 88,
        name: "Top 14",
        description: "Championnat de France de rugby à XV, l'un des meilleurs au monde",
        category: CATEGORIES.SPORT,
        rarity: RARITIES.COMMON.code,
        attack: 65,
        defense: 60,
        views: 1500000,
        emoji: "🏉",
        image: "https://thumb.wikimedia.org/wikipedia/fr/thumb/3/3a/Top_14.svg/250px-Top_14.svg.png"
    },

    // ========== NOUVELLES CARTES - PERSONNAGES HISTORIQUES ==========
    {
        id: 89,
        name: "Saint Louis",
        description: "Louis IX, roi de France canonisé, symbole de la justice royale",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 90,
        defense: 95,
        views: 5000000,
        emoji: "⛪",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Saintlouis_%28cropped%29.jpg/250px-Saintlouis_%28cropped%29.jpg"
    },

    {
        id: 90,
        name: "François Ier",
        description: "Roi de la Renaissance, mécène, constructeur de Chambord et Fontainebleau",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 85,
        defense: 80,
        views: 3000000,
        emoji: "👑",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Fran%C3%A7ois_Ier_Louvre.jpg/250px-Fran%C3%A7ois_Ier_Louvre.jpg"
    },

    {
        id: 91,
        name: "Henri IV",
        description: "Roi de France et de Navarre, auteur de l'édit de Nantes, 'la poule au pot'",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 82,
        defense: 88,
        views: 2500000,
        emoji: "👑",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/97/Henri_IV_portant_la_croix_du_Saint-Esprit_-_Frans_Pourbus_le_Jeune.jpg/250px-Henri_IV_portant_la_croix_du_Saint-Esprit_-_Frans_Pourbus_le_Jeune.jpg"
    },

    {
        id: 92,
        name: "Richelieu",
        description: "Cardinal et ministre de Louis XIII, architecte de l'absolutisme royal",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 80,
        defense: 90,
        views: 2200000,
        emoji: "🎭",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Cardinal_de_Richelieu.jpg/250px-Cardinal_de_Richelieu.jpg"
    },

    {
        id: 93,
        name: "Mazarin",
        description: "Cardinal italien, ministre de Louis XIV, successeur de Richelieu",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 78,
        defense: 85,
        views: 2000000,
        emoji: "🎭",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Cardinal_Mazarin_by_Pierre_Mignard_%28Mus%C3%A9e_Cond%C3%A9%29.jpg/250px-Cardinal_Mazarin_by_Pierre_Mignard_%28Mus%C3%A9e_Cond%C3%A9%29.jpg"
    },

    {
        id: 94,
        name: "Colbert",
        description: "Ministre de Louis XIV, créateur du mercantilisme et de la manufacture des Gobelins",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 75,
        defense: 82,
        views: 1800000,
        emoji: "💼",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Colbert1666.jpg/250px-Colbert1666.jpg"
    },

    {
        id: 95,
        name: "Danton",
        description: "Révolutionnaire français, fondateur du Club des Cordeliers, figure de la Révolution",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 85,
        defense: 70,
        views: 2000000,
        emoji: "🗣️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Anonyme_-_Portrait_de_Georges_Danton_%281759-1794%29%2C_orateur_et_homme_politique_-_P712_-_mus%C3%A9e_Carnavalet_-_4.jpg/250px-Anonyme_-_Portrait_de_Georges_Danton_%281759-1794%29%2C_orateur_et_homme_politique_-_P712_-_mus%C3%A9e_Carnavalet_-_4.jpg"
    },

    {
        id: 96,
        name: "Marat",
        description: "Journaliste révolutionnaire, fondateur du journal L'Ami du peuple",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 75,
        defense: 65,
        views: 1500000,
        emoji: "📰",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/80/Jean-Paul_Marat_portre.jpg/250px-Jean-Paul_Marat_portre.jpg"
    },

    {
        id: 97,
        name: "Robespierre",
        description: "Avocat et homme politique, figure de la Terreur pendant la Révolution française",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 80,
        defense: 75,
        views: 2500000,
        emoji: "⚖️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/Robespierre.jpg/250px-Robespierre.jpg"
    },

    {
        id: 98,
        name: "Talleyrand",
        description: "Diplomate français, ministre des Affaires étrangères sous plusieurs régimes",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 85,
        defense: 90,
        views: 2000000,
        emoji: "🕊️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Talleyrand_01.jpg/250px-Talleyrand_01.jpg"
    },

    {
        id: 99,
        name: "Foch",
        description: "Maréchal de France, généralissime des forces alliées pendant la Première Guerre mondiale",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 88,
        defense: 85,
        views: 1500000,
        emoji: "🎖️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Ferdinand_Foch_by_Melcy%2C_1921.png/250px-Ferdinand_Foch_by_Melcy%2C_1921.png"
    },

    {
        id: 100,
        name: "Joffre",
        description: "Maréchal de France, commandant en chef pendant la Première Guerre mondiale",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 85,
        defense: 80,
        views: 1200000,
        emoji: "🎖️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/Henri_Jacquier_-_Portrait_of_Gen_Joffre.jpg/250px-Henri_Jacquier_-_Portrait_of_Gen_Joffre.jpg"
    },

    // Plus de personnages historiques
    {
        id: 101,
        name: "Vercingétorix",
        description: "Chef gaulois, unificateur des tribus contre Jules César à Alésia",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 90,
        defense: 85,
        views: 4000000,
        emoji: "🛡️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Vercing%C3%A9torix_stat%C3%A8re_Gallica_avers.jpg/250px-Vercing%C3%A9torix_stat%C3%A8re_Gallica_avers.jpg"
    },

    {
        id: 102,
        name: "Clovis",
        description: "Premier roi franc à unifier les tribus franques et se convertir au christianisme",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 88,
        defense: 82,
        views: 3500000,
        emoji: "👑",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Saint_Remy_baptise_Clovis_d%C3%A9tail.jpg/250px-Saint_Remy_baptise_Clovis_d%C3%A9tail.jpg"
    },

    {
        id: 103,
        name: "Charlemagne",
        description: "Empereur des Francs et des Romains, couronné en 800, père de l'Europe",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.LEGENDARY.code,
        attack: 95,
        defense: 90,
        views: 6000000,
        emoji: "👑",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/Charlemagne_denier_Mayence_812_814.jpg/250px-Charlemagne_denier_Mayence_812_814.jpg"
    },

    {
        id: 104,
        name: "Saint Martin",
        description: "Évêque de Tours, célèbre pour avoir partagé son manteau avec un pauvre",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 70,
        defense: 85,
        views: 2000000,
        emoji: "⛪",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Riding_Saint_Martin_sharing_his_Cloak_with_a_Beggar.jpg/250px-Riding_Saint_Martin_sharing_his_Cloak_with_a_Beggar.jpg"
    },

    {
        id: 105,
        name: "Jeanne d'Arc",
        description: "Héroïne française, symbole de la résistance pendant la guerre de Cent Ans",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.LEGENDARY.code,
        attack: 92,
        defense: 88,
        views: 12000000,
        emoji: "⚔️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Contemporaine_afb_jeanne_d_arc.png/250px-Contemporaine_afb_jeanne_d_arc.png"
    },

    {
        id: 106,
        name: "Bayard",
        description: "Chevalier français, symbole de la chevalerie et de la loyauté",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 85,
        defense: 80,
        views: 1500000,
        emoji: "⚔️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Pierre_Terrail_de_Bayard.jpg/250px-Pierre_Terrail_de_Bayard.jpg"
    },

    {
        id: 107,
        name: "Du Guesclin",
        description: "Connétable de France, héros de la guerre de Cent Ans",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 88,
        defense: 85,
        views: 1200000,
        emoji: "⚔️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Bertrand_du_Guesclin_P1210353.jpg/250px-Bertrand_du_Guesclin_P1210353.jpg"
    },

    {
        id: 108,
        name: "La Fayette",
        description: "Héros de la guerre d'indépendance américaine et de la Révolution française",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 80,
        defense: 75,
        views: 2000000,
        emoji: "⚔️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Gilbert_du_Motier_Marquis_de_Lafayette.jpg/250px-Gilbert_du_Motier_Marquis_de_Lafayette.jpg"
    },

    {
        id: 109,
        name: "Dumouriez",
        description: "Général de la Révolution française, vainqueur à Valmy",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.COMMON.code,
        attack: 75,
        defense: 70,
        views: 800000,
        emoji: "🎖️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Charles-Fran%C3%A7ois_Dumouriez%2C_g%C3%A9n%C3%A9ral_en_chef_de_l%27Arm%C3%A9e_du_Nord%2C_par_Jean-S%C3%A9bastien_Rouillard_%28Ch%C3%A2teau_de_Versailles%29.jpg/250px-Charles-Fran%C3%A7ois_Dumouriez%2C_g%C3%A9n%C3%A9ral_en_chef_de_l%27Arm%C3%A9e_du_Nord%2C_par_Jean-S%C3%A9bastien_Rouillard_%28Ch%C3%A2teau_de_Versailles%29.jpg"
    },

    {
        id: 110,
        name: "Kléber",
        description: "Général de la Révolution française, vainqueur en Égypte",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 82,
        defense: 78,
        views: 1000000,
        emoji: "🎖️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/General_Jean_Baptiste_Kleber_%28Jean_Gu%C3%A9rin%29_-_Nationalmuseum_-_24145.tif/lossy-page1-250px-General_Jean_Baptiste_Kleber_%28Jean_Gu%C3%A9rin%29_-_Nationalmuseum_-_24145.tif.jpg"
    },

    // ========== SCIENTIFIQUES & INVENTEURS ==========
    {
        id: 111,
        name: "Louis Pasteur",
        description: "Chimiste et biologiste, pionnier de la microbiologie et de la pasteurisation",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 95,
        defense: 90,
        views: 8000000,
        emoji: "🔬",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Louis_Pasteur_%281822_-_1895%29%2C_microbiologist_and_chemist_Wellcome_V0026980.jpg/250px-Louis_Pasteur_%281822_-_1895%29%2C_microbiologist_and_chemist_Wellcome_V0026980.jpg"
    },

    {
        id: 112,
        name: "Pierre et Marie Curie",
        description: "Couple de scientifiques, pionniers de la radioactivité, double lauréat Nobel",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 92,
        defense: 88,
        views: 7000000,
        emoji: "☢️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Pierre_Curie_by_Dujardin_c1906.jpg/250px-Pierre_Curie_by_Dujardin_c1906.jpg"
    },

    {
        id: 113,
        name: "Blaise Pascal",
        description: "Mathématicien, physicien et philosophe, inventeur de la machine à calculer",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 85,
        defense: 80,
        views: 2500000,
        emoji: "📐",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/Blaise_Pascal_Versailles.JPG/250px-Blaise_Pascal_Versailles.JPG"
    },

    {
        id: 114,
        name: "René Descartes",
        description: "Philosophe et mathématicien, père de la géométrie analytique",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 80,
        defense: 90,
        views: 3000000,
        emoji: "📚",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/250px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg"
    },

    {
        id: 115,
        name: "Antoine Lavoisier",
        description: "Chimiste, père de la chimie moderne, découvreur de la conservation de la masse",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 88,
        defense: 85,
        views: 2000000,
        emoji: "🔬",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/David_-_Portrait_of_Monsieur_Lavoisier_%28cropped%29.jpg/250px-David_-_Portrait_of_Monsieur_Lavoisier_%28cropped%29.jpg"
    },

    {
        id: 116,
        name: "Georges Cuvier",
        description: "Naturaliste, père de la paléontologie et de l'anatomie comparée",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 82,
        defense: 78,
        views: 1500000,
        emoji: "🦴",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Georges_Cuvier_3.jpg/250px-Georges_Cuvier_3.jpg"
    },

    {
        id: 117,
        name: "Joseph Louis Lagrange",
        description: "Mathématicien et astronome, contributions majeures à la mécanique céleste",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 85,
        defense: 80,
        views: 1200000,
        emoji: "🌌",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/%D0%9B%D0%B0%D0%B3%D1%80%D0%B0%D0%BD%D0%B6.jpg/250px-%D0%9B%D0%B0%D0%B3%D1%80%D0%B0%D0%BD%D0%B6.jpg"
    },

    {
        id: 118,
        name: "André-Marie Ampère",
        description: "Physicien et mathématicien, pionnier de l'électrodynamique",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 80,
        defense: 85,
        views: 1500000,
        emoji: "⚡",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Ampere_portrait_at_the_Musee_Poleymieux.jpg/250px-Ampere_portrait_at_the_Musee_Poleymieux.jpg"
    },

    {
        id: 119,
        name: "Augustin Fresnel",
        description: "Physicien, inventeur des lentilles à échelons pour les phares",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.COMMON.code,
        attack: 75,
        defense: 70,
        views: 800000,
        emoji: "💡",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Fresnel_-_%C5%92uvres_compl%C3%A8tes_d%27Augustin_Fresnel_tome_1_%28page_6_crop%29.jpg/250px-Fresnel_-_%C5%92uvres_compl%C3%A8tes_d%27Augustin_Fresnel_tome_1_%28page_6_crop%29.jpg"
    },

    {
        id: 120,
        name: "Nicolas Appert",
        description: "Inventeur de la conserve alimentaire, révolutionnant la conservation des aliments",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.COMMON.code,
        attack: 70,
        defense: 75,
        views: 900000,
        emoji: "🥫",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/Nicolas_Appert_inventeur.png/250px-Nicolas_Appert_inventeur.png"
    },

    // Plus de scientifiques
    {
        id: 121,
        name: "Évariste Galois",
        description: "Mathématicien, créateur de la théorie des groupes, mort en duel à 20 ans",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 75,
        defense: 90,
        views: 1500000,
        emoji: "📐",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Evariste_galois.jpg/250px-Evariste_galois.jpg"
    },

    {
        id: 122,
        name: "Joseph Fourier",
        description: "Mathématicien et physicien, découvreur de la décomposition en séries de Fourier",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 80,
        defense: 85,
        views: 1800000,
        emoji: "📈",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Fourier2.jpg/250px-Fourier2.jpg"
    },

    {
        id: 123,
        name: "Siméon Denis Poisson",
        description: "Mathématicien et physicien, contributions à la théorie des probabilités",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.COMMON.code,
        attack: 72,
        defense: 78,
        views: 1000000,
        emoji: "🎲",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Simeon_Poisson_%28cropped%29.jpg/250px-Simeon_Poisson_%28cropped%29.jpg"
    },

    {
        id: 124,
        name: "Gaspard Monge",
        description: "Mathématicien, inventeur de la géométrie descriptive",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.COMMON.code,
        attack: 70,
        defense: 80,
        views: 800000,
        emoji: "📏",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Jean-Baptiste_Mauzaisse_%E2%80%93_Gaspard_Monge%2C_Comte_de_Peluse_%281746-1818%29_Ch%C3%A2teau_de_Versailles.png/250px-Jean-Baptiste_Mauzaisse_%E2%80%93_Gaspard_Monge%2C_Comte_de_Peluse_%281746-1818%29_Ch%C3%A2teau_de_Versailles.png"
    },

    {
        id: 125,
        name: "Lazare Carnot",
        description: "Mathématicien et homme politique, 'l'Organisateur de la Victoire' pendant la Révolution",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 78,
        defense: 82,
        views: 1200000,
        emoji: "⚙️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a4/Lazare-Carnot-par-Boilly.jpg/250px-Lazare-Carnot-par-Boilly.jpg"
    },

    // ========== ARTISTES & ÉCRIVAINS ==========
    {
        id: 126,
        name: "Molière",
        description: "Dramaturge du XVIIème siècle, maître de la comédie française",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 85,
        defense: 90,
        views: 5000000,
        emoji: "🎭",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Moli%C3%A8re_-_Nicolas_Mignard_%281658%29.jpg/250px-Moli%C3%A8re_-_Nicolas_Mignard_%281658%29.jpg"
    },

    {
        id: 127,
        name: "Victor Hugo",
        description: "Écrivain romantique, auteur des Misérables et de Notre-Dame de Paris",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 90,
        defense: 85,
        views: 6000000,
        emoji: "📖",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Victor_Hugo_001.jpg/250px-Victor_Hugo_001.jpg"
    },

    {
        id: 128,
        name: "Honoré de Balzac",
        description: "Écrivain, auteur de La Comédie Humaine, 90 romans et nouvelles",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 85,
        defense: 80,
        views: 3000000,
        emoji: "📚",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e8/%E5%A5%A5%C2%B7%E5%B7%B4%E5%B0%94%E6%89%8E%E5%85%8B.png/250px-%E5%A5%A5%C2%B7%E5%B7%B4%E5%B0%94%E6%89%8E%E5%85%8B.png"
    },

    {
        id: 129,
        name: "Gustave Flaubert",
        description: "Écrivain réaliste, auteur de Madame Bovary",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 80,
        defense: 85,
        views: 2500000,
        emoji: "📝",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Gustave_Flaubert.jpg/250px-Gustave_Flaubert.jpg"
    },

    {
        id: 130,
        name: "Émile Zola",
        description: "Écrivain naturaliste, auteur des Rougon-Macquart, défenseur de Dreyfus",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 82,
        defense: 78,
        views: 2800000,
        emoji: "✍️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Emile_Zola_1902.jpg/250px-Emile_Zola_1902.jpg"
    },

    // Plus d'écrivains
    {
        id: 131,
        name: "Marcel Proust",
        description: "Écrivain, auteur de À la recherche du temps perdu",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 85,
        defense: 80,
        views: 3500000,
        emoji: "🕰️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Otto_Wegener_Proust_vers_1895_bis.jpg/250px-Otto_Wegener_Proust_vers_1895_bis.jpg"
    },

    {
        id: 132,
        name: "Albert Camus",
        description: "Écrivain et philosophe, auteur de L'Étranger, prix Nobel de littérature",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 88,
        defense: 82,
        views: 4000000,
        emoji: "📖",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Albert_Camus%2C_gagnant_de_prix_Nobel%2C_portrait_en_buste%2C_pos%C3%A9_au_bureau%2C_faisant_face_%C3%A0_gauche%2C_cigarette_de_tabagisme.jpg/250px-Albert_Camus%2C_gagnant_de_prix_Nobel%2C_portrait_en_buste%2C_pos%C3%A9_au_bureau%2C_faisant_face_%C3%A0_gauche%2C_cigarette_de_tabagisme.jpg"
    },

    {
        id: 133,
        name: "Jean-Paul Sartre",
        description: "Philosophe existentialiste, auteur de L'Être et le Néant",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 85,
        defense: 80,
        views: 3000000,
        emoji: "🤔",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Flickr_-_Government_Press_Office_%28GPO%29_-_Jean_Paul_Sartre_and_Simone_De_Beauvoir_welcomed_by_Avraham_Shlonsky_and_Leah_Goldberg_%28cropped%29.jpg/250px-Flickr_-_Government_Press_Office_%28GPO%29_-_Jean_Paul_Sartre_and_Simone_De_Beauvoir_welcomed_by_Avraham_Shlonsky_and_Leah_Goldberg_%28cropped%29.jpg"
    },

    {
        id: 134,
        name: "Simone de Beauvoir",
        description: "Philosophe et féministe, auteure du Deuxième Sexe",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 80,
        defense: 88,
        views: 3500000,
        emoji: "👩",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Simone_de_Beauvoir2.png/250px-Simone_de_Beauvoir2.png"
    },

    {
        id: 135,
        name: "Antoine de Saint-Exupéry",
        description: "Aviateur et écrivain, auteur du Petit Prince",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 85,
        defense: 75,
        views: 5000000,
        emoji: "✈️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Antoine_de_Saint-Euxpery_%281920%29.jpg/250px-Antoine_de_Saint-Euxpery_%281920%29.jpg"
    },

    // ========== VILLES FRANÇAISES ==========
    {
        id: 136,
        name: "Paris",
        description: "Capitale de la France, ville lumière, centre culturel et historique",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.LEGENDARY.code,
        attack: 100,
        defense: 100,
        views: 20000000,
        emoji: "🗼",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/250px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg"
    },

    {
        id: 137,
        name: "Marseille",
        description: "Deuxième ville de France, port méditerranéen, fondée par les Grecs",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 90,
        defense: 85,
        views: 8000000,
        emoji: "🌊",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Notre_Dame_de_la_Garde.jpg/250px-Notre_Dame_de_la_Garde.jpg"
    },

    {
        id: 138,
        name: "Lyon",
        description: "Capitale des Gaules, ville gastronomique, classée à l'UNESCO",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 88,
        defense: 82,
        views: 7000000,
        emoji: "🏛️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Montage-Lyon-2023.jpg/250px-Montage-Lyon-2023.jpg"
    },

    {
        id: 139,
        name: "Toulouse",
        description: "Ville rose, capitale de l'aéronautique et de l'espace en Europe",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 85,
        defense: 80,
        views: 4000000,
        emoji: "🚀",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d0/Montage_Toulouse_3.jpg/250px-Montage_Toulouse_3.jpg"
    },

    {
        id: 140,
        name: "Nice",
        description: "Ville de la Côte d'Azur, célèbre pour sa Promenade des Anglais",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 80,
        defense: 85,
        views: 5000000,
        emoji: "🏖️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/Promenade_des_Anglais_%2822261311858%29.jpg/250px-Promenade_des_Anglais_%2822261311858%29.jpg"
    },

    // Plus de villes
    {
        id: 141,
        name: "Bordeaux",
        description: "Ville viticole, capitale mondiale du vin, classée à l'UNESCO",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 82,
        defense: 78,
        views: 4500000,
        emoji: "🍷",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Bordeaux_Place_de_la_Bourse_de_nuit.jpg/250px-Bordeaux_Place_de_la_Bourse_de_nuit.jpg"
    },

    {
        id: 142,
        name: "Nantes",
        description: "Ville portuaire, ancienne capitale de la Bretagne, berceau de Jules Verne",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 80,
        defense: 80,
        views: 3500000,
        emoji: "⚓",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/Ch%C3%A2teau_des_Ducs_de_Bretagne_%C3%A0_Nantes_-_Anne.jpg/250px-Ch%C3%A2teau_des_Ducs_de_Bretagne_%C3%A0_Nantes_-_Anne.jpg"
    },

    {
        id: 143,
        name: "Strasbourg",
        description: "Capitale de l'Europe, siège du Parlement européen, ville alsacienne",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 85,
        defense: 85,
        views: 4000000,
        emoji: "🏛️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Strasbourg_vue_a%C3%A9rienne_vers_la_cath%C3%A9drale_septembre_2015.jpg/250px-Strasbourg_vue_a%C3%A9rienne_vers_la_cath%C3%A9drale_septembre_2015.jpg"
    },

    {
        id: 144,
        name: "Lille",
        description: "Ville du Nord, capitale des Flandres, connue pour son architecture flamande",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.COMMON.code,
        attack: 75,
        defense: 75,
        views: 2500000,
        emoji: "🏡",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3b/Lille_Collage.jpg/250px-Lille_Collage.jpg"
    },

    {
        id: 145,
        name: "Rennes",
        description: "Capitale de la Bretagne, ville étudiante, patrimoine médiéval",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.COMMON.code,
        attack: 70,
        defense: 75,
        views: 2000000,
        emoji: "🏰",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/Rennes-Place-du-Champ-Jacquet-Statue-Leperdit-Mars-2020.jpg/250px-Rennes-Place-du-Champ-Jacquet-Statue-Leperdit-Mars-2020.jpg"
    },

    // ========== SPÉCIALITÉS RÉGIONALES ==========
    {
        id: 146,
        name: "Camembert",
        description: "Fromage normand à pâte molle et croûte fleurie, AOP",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.RARE.code,
        attack: 75,
        defense: 80,
        views: 3000000,
        emoji: "🧀",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Camembert.jpg/250px-Camembert.jpg"
    },

    {
        id: 147,
        name: "Roquefort",
        description: "Fromage bleu à pâte persillée, AOP, originaire de l'Aveyron",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.RARE.code,
        attack: 78,
        defense: 75,
        views: 2500000,
        emoji: "🧀",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Wikicheese_-_Roquefort_-_20150417_-_002.jpg/250px-Wikicheese_-_Roquefort_-_20150417_-_002.jpg"
    },

    {
        id: 148,
        name: "Comté",
        description: "Fromage à pâte pressée cuite, AOP, originaire du Jura",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.COMMON.code,
        attack: 70,
        defense: 70,
        views: 2000000,
        emoji: "🧀",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Comte_AOP.jpg/250px-Comte_AOP.jpg"
    },

    {
        id: 149,
        name: "Reblochon",
        description: "Fromage savoyard à pâte molle, utilisé dans la tartiflette",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.COMMON.code,
        attack: 65,
        defense: 70,
        views: 1500000,
        emoji: "🧀",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Reblochon_11.jpg/250px-Reblochon_11.jpg"
    },

    {
        id: 150,
        name: "Brie de Meaux",
        description: "Fromage à pâte molle et croûte fleurie, AOP, originaire d'Île-de-France",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.RARE.code,
        attack: 72,
        defense: 78,
        views: 2200000,
        emoji: "🧀",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/Brie_01.jpg/250px-Brie_01.jpg"
    },

    // Plus de fromages
    {
        id: 151,
        name: "Bleu d'Auvergne",
        description: "Fromage bleu à pâte persillée, AOP, originaire d'Auvergne",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.COMMON.code,
        attack: 68,
        defense: 65,
        views: 1200000,
        emoji: "🧀",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Wikicheese_Clermont-Ferrand_-_Bleu_d%27Auvergne_20220825-02.jpg/250px-Wikicheese_Clermont-Ferrand_-_Bleu_d%27Auvergne_20220825-02.jpg"
    },

    {
        id: 152,
        name: "Chèvre",
        description: "Fromage de chèvre, nombreuses variantes régionales en France",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.COMMON.code,
        attack: 60,
        defense: 70,
        views: 1500000,
        emoji: "🐐",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Crottin_02.jpg/250px-Crottin_02.jpg"
    },

    {
        id: 153,
        name: "Munster",
        description: "Fromage alsacien à pâte molle et croûte lavée, AOP",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.COMMON.code,
        attack: 65,
        defense: 70,
        views: 1000000,
        emoji: "🧀",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Munster_01.jpg/250px-Munster_01.jpg"
    },

    {
        id: 154,
        name: "Cantal",
        description: "Fromage auvergnat à pâte pressée non cuite, AOP",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.COMMON.code,
        attack: 68,
        defense: 65,
        views: 900000,
        emoji: "🧀",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Wikicheese-XX_-_Cantal_entre-deux_-_20180601_-_002.jpg/250px-Wikicheese-XX_-_Cantal_entre-deux_-_20180601_-_002.jpg"
    },

    {
        id: 155,
        name: "Pont-l'Évêque",
        description: "Fromage normand à pâte molle et croûte lavée, AOP",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.COMMON.code,
        attack: 65,
        defense: 68,
        views: 800000,
        emoji: "🧀",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Pont-l%27%C3%89v%C3%AAque_03.jpg/250px-Pont-l%27%C3%89v%C3%AAque_03.jpg"
    },

    // ========== PLATS RÉGIONAUX ==========
    {
        id: 156,
        name: "Ratatouille",
        description: "Plat traditionnel provençal à base de légumes mijotés",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 80,
        defense: 75,
        views: 4000000,
        emoji: "🥘",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Ratatouille_001.jpg/250px-Ratatouille_001.jpg"
    },

    {
        id: 157,
        name: "Bouillabaisse",
        description: "Soupe de poissons traditionnelle de Marseille",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 78,
        defense: 72,
        views: 3000000,
        emoji: "🍲",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/65/Bouillabaisse_01.jpg/250px-Bouillabaisse_01.jpg"
    },

    {
        id: 158,
        name: "Cassoulet",
        description: "Ragoût traditionnel du Sud-Ouest à base de haricots blancs et de viande",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 82,
        defense: 78,
        views: 3500000,
        emoji: "🍲",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Cassoulet.cuit.jpg/250px-Cassoulet.cuit.jpg"
    },

    {
        id: 159,
        name: "Choucroute garnie",
        description: "Plat alsacien à base de choucroute et de viandes",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.RARE.code,
        attack: 75,
        defense: 70,
        views: 2000000,
        emoji: "🥔",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Choucroute_d%27Alsace_004.jpg/250px-Choucroute_d%27Alsace_004.jpg"
    },

    {
        id: 160,
        name: "Tarte flambée",
        description: "Spécialité alsacienne, fine pâte à pain garnie de crème, oignons et lardons",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.COMMON.code,
        attack: 60,
        defense: 65,
        views: 1500000,
        emoji: "🍕",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/Tarte_flamb%C3%A9e_alsacienne_514471722.jpg/250px-Tarte_flamb%C3%A9e_alsacienne_514471722.jpg"
    },

    // ========== INVENTIONS FRANÇAISES ==========
    {
        id: 161,
        name: "Photographie",
        description: "Invention de Nicéphore Niépce et Louis Daguerre en 1826",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 90,
        defense: 85,
        views: 8000000,
        emoji: "📷",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a7/Posthumous_portrait_of_Nic%C3%A9phore_Ni%C3%A9pce.png/250px-Posthumous_portrait_of_Nic%C3%A9phore_Ni%C3%A9pce.png"
    },

    {
        id: 162,
        name: "Cinématographe",
        description: "Invention des frères Lumière en 1895, naissance du cinéma",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 88,
        defense: 80,
        views: 7000000,
        emoji: "🎬",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/Institut_Lumi%C3%A8re_-_CINEMATOGRAPHE_Camera.jpg/250px-Institut_Lumi%C3%A8re_-_CINEMATOGRAPHE_Camera.jpg"
    },

    {
        id: 163,
        name: "Montgolfière",
        description: "Invention des frères Montgolfier en 1783, premier vol habité",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 80,
        defense: 75,
        views: 4000000,
        emoji: "🎈",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Yaabq_85b_%2810625020624%29.jpg/250px-Yaabq_85b_%2810625020624%29.jpg"
    },

    {
        id: 164,
        name: "Stéthoscope",
        description: "Invention de René Laënnec en 1816, révolution médicale",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 75,
        defense: 85,
        views: 3000000,
        emoji: "🩺",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/2023_Stetoskop.jpg/250px-2023_Stetoskop.jpg"
    },

    {
        id: 165,
        name: "Pasteurisation",
        description: "Invention de Louis Pasteur en 1864, conservation des aliments",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 85,
        defense: 80,
        views: 5000000,
        emoji: "🧪",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/60s_Pama_pasteurizer.jpg/250px-60s_Pama_pasteurizer.jpg"
    },

    {
        id: 166,
        name: "Aqueduc de Nîmes",
        description: "Pont du Gard, chef-d'œuvre d'ingénierie romaine en France",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 85,
        defense: 88,
        views: 6000000,
        emoji: "🌉",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Pont_du_Gard_%2830%29.jpg/250px-Pont_du_Gard_%2830%29.jpg"
    },

    {
        id: 167,
        name: "Cathédrale Notre-Dame",
        description: "Cathédrale gothique de Paris, chef-d'œuvre architectural",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 90,
        defense: 85,
        views: 10000000,
        emoji: "⛪",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Notre-Dame_de_Paris_2013-07-24.jpg/250px-Notre-Dame_de_Paris_2013-07-24.jpg"
    },

    {
        id: 168,
        name: "Arc de Triomphe",
        description: "Monument parisien honorant les soldats de la Révolution et de l'Empire",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.RARE.code,
        attack: 80,
        defense: 75,
        views: 6000000,
        emoji: "🏆",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Arc_de_Triomphe_-_Ao%C3%BBt_2026.jpg/250px-Arc_de_Triomphe_-_Ao%C3%BBt_2026.jpg"
    },

    {
        id: 169,
        name: "Sacré-Cœur",
        description: "Basilique blanche dominant Paris depuis Montmartre",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.RARE.code,
        attack: 75,
        defense: 80,
        views: 5000000,
        emoji: "⛪",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Sacr%C3%A9_Coeur_Fa%C3%A7ade_1.jpg/250px-Sacr%C3%A9_Coeur_Fa%C3%A7ade_1.jpg"
    },

    {
        id: 170,
        name: "Opéra Garnier",
        description: "Opéra de Paris, chef-d'œuvre architectural du Second Empire",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.RARE.code,
        attack: 78,
        defense: 82,
        views: 4000000,
        emoji: "🎭",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Paris_Palais_Garnier_2010-04-06_16.55.07.jpg/250px-Paris_Palais_Garnier_2010-04-06_16.55.07.jpg"
    },

    // ========== FLEUVES & MONTAGNES ==========
    {
        id: 171,
        name: "La Loire",
        description: "Plus long fleuve de France (1006 km), classé à l'UNESCO",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 85,
        defense: 80,
        views: 5000000,
        emoji: "🌊",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9d/Loire_%C3%A0_Br%C3%A9h%C3%A9mont2.JPG/250px-Loire_%C3%A0_Br%C3%A9h%C3%A9mont2.JPG"
    },

    {
        id: 172,
        name: "La Garonne",
        description: "Fleuve du sud-ouest de la France, long de 647 km",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 75,
        defense: 70,
        views: 3000000,
        emoji: "🌊",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Pont-Neuf_de_Toulouse_3.jpg/250px-Pont-Neuf_de_Toulouse_3.jpg"
    },

    {
        id: 173,
        name: "Le Rhône",
        description: "Fleuve du sud-est de la France, long de 812 km",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 78,
        defense: 75,
        views: 3500000,
        emoji: "🌊",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Saint-benezet_in_southeastern_France.jpg/250px-Saint-benezet_in_southeastern_France.jpg"
    },

    {
        id: 174,
        name: "La Meuse",
        description: "Fleuve du nord-est de la France, long de 950 km",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.COMMON.code,
        attack: 65,
        defense: 60,
        views: 1000000,
        emoji: "🌊",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/Meuse_Montherme.jpg/250px-Meuse_Montherme.jpg"
    },

    {
        id: 175,
        name: "Les Alpes",
        description: "Chaîne de montagnes entre la France et l'Italie, culminant au Mont Blanc (4808 m)",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 90,
        defense: 85,
        views: 7000000,
        emoji: "⛰️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Alps_2007-03-13_10.10UTC_1px-250m.jpg/250px-Alps_2007-03-13_10.10UTC_1px-250m.jpg"
    },

    {
        id: 176,
        name: "Les Pyrénées",
        description: "Chaîne de montagnes entre la France et l'Espagne, culminant à 3404 m",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 80,
        defense: 75,
        views: 4000000,
        emoji: "⛰️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Pyrenees_topographic_map-fr.svg/250px-Pyrenees_topographic_map-fr.svg.png"
    },

    {
        id: 177,
        name: "Le Massif Central",
        description: "Région montagneuse du centre de la France, d'origine volcanique",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 75,
        defense: 80,
        views: 3000000,
        emoji: "⛰️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/France_Massif_central.jpg/250px-France_Massif_central.jpg"
    },

    {
        id: 178,
        name: "Le Jura",
        description: "Chaîne de montagnes du centre-est de la France, connue pour ses fromages",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.COMMON.code,
        attack: 65,
        defense: 70,
        views: 1500000,
        emoji: "⛰️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Juragebirge.JPG/250px-Juragebirge.JPG"
    },

    {
        id: 179,
        name: "Les Vosges",
        description: "Chaîne de montagnes du nord-est de la France, culminant au Ballon d'Alsace",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.COMMON.code,
        attack: 60,
        defense: 65,
        views: 1000000,
        emoji: "⛰️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Carte_topographique_des_Vosges.svg/250px-Carte_topographique_des_Vosges.svg.png"
    },

    {
        id: 180,
        name: "La Corse",
        description: "Île méditerranéenne française, montagneuse et préservée",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 75,
        defense: 80,
        views: 3500000,
        emoji: "🏝️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/Flag_of_Corsica.svg/250px-Flag_of_Corsica.svg.png"
    },

    // ========== RÉGIONS FRANÇAISES ==========
    {
        id: 181,
        name: "Île-de-France",
        description: "Région capitale, cœur économique et politique de la France",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 90,
        defense: 85,
        views: 10000000,
        emoji: "🏙️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/%C3%8Ele-de-France_region_locator_map2.svg/250px-%C3%8Ele-de-France_region_locator_map2.svg.png"
    },

    {
        id: 182,
        name: "Provence-Alpes-Côte d'Azur",
        description: "Région du sud-est, célèbre pour son climat méditerranéen et ses paysages",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 88,
        defense: 82,
        views: 8000000,
        emoji: "🌿",
        image: "https://thumb.wikimedia.org/wikipedia/fr/thumb/3/34/Logo_marque_R%C3%A9gion_Sud.svg/250px-Logo_marque_R%C3%A9gion_Sud.svg.png"
    },

    {
        id: 183,
        name: "Auvergne-Rhône-Alpes",
        description: "Région montagneuse avec les Alpes et les volcans d'Auvergne",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 85,
        defense: 80,
        views: 5000000,
        emoji: "⛰️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Flag_of_the_region_Auvergne-Rh%C3%B4ne-Alpes.svg/250px-Flag_of_the_region_Auvergne-Rh%C3%B4ne-Alpes.svg.png"
    },

    {
        id: 184,
        name: "Nouvelle-Aquitaine",
        description: "Plus grande région de France, bordée par l'océan Atlantique",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 82,
        defense: 78,
        views: 4000000,
        emoji: "🌊",
        image: "https://thumb.wikimedia.org/wikipedia/fr/thumb/1/1a/Logo_R%C3%A9gion_Nouvelle_Aquitaine_2026.jpg/250px-Logo_R%C3%A9gion_Nouvelle_Aquitaine_2026.jpg"
    },

    {
        id: 185,
        name: "Occitanie",
        description: "Région du sud, riche en histoire et en culture méditerranéenne",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 80,
        defense: 85,
        views: 4500000,
        emoji: "🏰",
        image: "https://thumb.wikimedia.org/wikipedia/fr/thumb/8/89/Logo_Occitanie_2017.svg/250px-Logo_Occitanie_2017.svg.png"
    },

    {
        id: 186,
        name: "Hauts-de-France",
        description: "Région du nord, riche en histoire et en patrimoine industriel",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.COMMON.code,
        attack: 70,
        defense: 75,
        views: 2000000,
        emoji: "🏭",
        image: "https://thumb.wikimedia.org/wikipedia/fr/thumb/2/2e/R%C3%A9gion_Hauts-de-France_logo_2016.svg/250px-R%C3%A9gion_Hauts-de-France_logo_2016.svg.png"
    },

    {
        id: 187,
        name: "Grand Est",
        description: "Région de l'est, frontalière avec plusieurs pays européens",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 75,
        defense: 80,
        views: 3000000,
        emoji: "🌍",
        image: "https://thumb.wikimedia.org/wikipedia/fr/thumb/c/cc/Logo_R%C3%A9gion_Grand_Est_-_2022.svg/250px-Logo_R%C3%A9gion_Grand_Est_-_2022.svg.png"
    },

    {
        id: 188,
        name: "Pays de la Loire",
        description: "Région de l'ouest, connue pour ses châteaux et son vignoble",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 78,
        defense: 75,
        views: 2500000,
        emoji: "🏰",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/LOGO_R0V15B160.svg/250px-LOGO_R0V15B160.svg.png"
    },

    {
        id: 189,
        name: "Bretagne",
        description: "Région du nord-ouest, célèbre pour sa culture celtique et ses paysages côtiers",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 85,
        defense: 80,
        views: 6000000,
        emoji: "🏴",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Flag_of_Brittany.svg/250px-Flag_of_Brittany.svg.png"
    },

    {
        id: 190,
        name: "Normandie",
        description: "Région du nord-ouest, célèbre pour ses plages du Débarquement et ses pommiers",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 80,
        defense: 75,
        views: 4000000,
        emoji: "🌳",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Normandie.svg/250px-Flag_of_Normandie.svg.png"
    },

    // ========== DERNIÈRES CARTES - COMPLÉMENT ==========
    {
        id: 191,
        name: "Bourgogne",
        description: "Région du centre-est, célèbre pour ses vins et son patrimoine historique",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 82,
        defense: 78,
        views: 3500000,
        emoji: "🍷",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Bourgogne-Franche-Comt%C3%A9_2016.svg/250px-Bourgogne-Franche-Comt%C3%A9_2016.svg.png"
    },

    {
        id: 192,
        name: "Centre-Val de Loire",
        description: "Région du centre, célèbre pour ses châteaux de la Loire",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 85,
        defense: 80,
        views: 4000000,
        emoji: "🏰",
        image: "https://thumb.wikimedia.org/wikipedia/fr/thumb/2/25/Logo_region_centre-val_de_loire.svg/250px-Logo_region_centre-val_de_loire.svg.png"
    },

    {
        id: 193,
        name: "Alsace",
        description: "Région de l'est, marquée par une forte influence germanique",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 75,
        defense: 80,
        views: 3000000,
        emoji: "🏡",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/Carte_Alsace_2018.png/250px-Carte_Alsace_2018.png"
    },

    {
        id: 194,
        name: "Champagne-Ardenne",
        description: "Région du nord-est, célèbre pour son champagne",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.COMMON.code,
        attack: 70,
        defense: 75,
        views: 2000000,
        emoji: "🥂",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/D%C3%A9partements_et_r%C3%A9gions_de_France_Champagne_Ardenne.png/250px-D%C3%A9partements_et_r%C3%A9gions_de_France_Champagne_Ardenne.png"
    },

    {
        id: 195,
        name: "Picardie",
        description: "Région du nord, riche en histoire médiévale",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.COMMON.code,
        attack: 65,
        defense: 70,
        views: 1500000,
        emoji: "🏰",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Drapeau_Picardie2024.png/250px-Drapeau_Picardie2024.png"
    },

    {
        id: 196,
        name: "Poitou-Charentes",
        description: "Région de l'ouest, connue pour ses paysages variés",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.COMMON.code,
        attack: 60,
        defense: 65,
        views: 1000000,
        emoji: "🌾",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Poitou-Charentes_region_locator_map.svg/250px-Poitou-Charentes_region_locator_map.svg.png"
    },

    {
        id: 197,
        name: "Limousin",
        description: "Région du centre-ouest, connue pour son élevage de bovins",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.COMMON.code,
        attack: 65,
        defense: 60,
        views: 800000,
        emoji: "🐄",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Vache-de-race-limousine-en-correze-2.jpg/250px-Vache-de-race-limousine-en-correze-2.jpg"
    },

    {
        id: 198,
        name: "Franche-Comté",
        description: "Région de l'est, connue pour ses montagnes et ses fromages",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.COMMON.code,
        attack: 70,
        defense: 75,
        views: 1200000,
        emoji: "⛰️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Flag_of_Franche-Comt%C3%A9.svg/250px-Flag_of_Franche-Comt%C3%A9.svg.png"
    },

    {
        id: 199,
        name: "Languedoc-Roussillon",
        description: "Région du sud, connue pour ses vignobles et son climat méditerranéen",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 80,
        defense: 75,
        views: 3000000,
        emoji: "🍷",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Languedoc-Roussillon_region_locator_map.svg/250px-Languedoc-Roussillon_region_locator_map.svg.png"
    },

    {
        id: 200,
        name: "Midi-Pyrénées",
        description: "Ancienne région du sud-ouest, connue pour ses paysages variés et son aéronautique",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 78,
        defense: 80,
        views: 2500000,
        emoji: "⛰️",
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Midi-Pyr%C3%A9n%C3%A9es_region_locator_map.svg/250px-Midi-Pyr%C3%A9n%C3%A9es_region_locator_map.svg.png"
    },

    // ========== EXTENSION : 20 NOUVELLES CARTES ==========
    {
        id: 201,
        name: "Claude Monet",
        description: "Peintre impressionniste, maître des nymphéas de Giverny",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.LEGENDARY.code,
        attack: 90,
        defense: 88,
        views: 5200000,
        emoji: "🎨",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_1899_Nadar_crop.jpg/250px-Claude_Monet_1899_Nadar_crop.jpg"
    },

    {
        id: 202,
        name: "Coupe du monde de football 1998",
        description: "Premier sacre des Bleus, victoire 3-0 contre le Brésil au Stade de France",
        category: CATEGORIES.SPORT,
        rarity: RARITIES.LEGENDARY.code,
        attack: 95,
        defense: 90,
        views: 9500000,
        emoji: "🏆",
        image: "https://upload.wikimedia.org/wikipedia/fr/thumb/a/a7/1998_FIFA_World_Cup_logo.svg/250px-1998_FIFA_World_Cup_logo.svg.png"
    },

    {
        id: 203,
        name: "Simone Veil",
        description: "Rescapée de la Shoah, ministre de la Santé, première présidente du Parlement européen",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 88,
        defense: 92,
        views: 4500000,
        emoji: "⚖️",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Official_portrait_of_Simone_Veil_(cropped).jpg/250px-Official_portrait_of_Simone_Veil_(cropped).jpg"
    },

    {
        id: 204,
        name: "Teddy Riner",
        description: "Judoka français, multiple champion olympique et mondial en toutes catégories",
        category: CATEGORIES.SPORT,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 93,
        defense: 85,
        views: 3800000,
        emoji: "🥋",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Teddy_Riner_Cannes_2016.jpg/250px-Teddy_Riner_Cannes_2016.jpg"
    },

    {
        id: 205,
        name: "Champagne",
        description: "Vin effervescent de fête, symbole du savoir-faire français",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.ULTRA_RARE.code,
        attack: 86,
        defense: 82,
        views: 6500000,
        emoji: "🍾",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cocktail_by_candle_light_1.jpg/250px-Cocktail_by_candle_light_1.jpg"
    },

    {
        id: 206,
        name: "Jean Moulin",
        description: "Préfet et résistant, unificateur de la Résistance française",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 82,
        defense: 80,
        views: 2600000,
        emoji: "🎗️",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Moulin_Harcourt_1937.jpg/250px-Moulin_Harcourt_1937.jpg"
    },

    {
        id: 207,
        name: "Jules Verne",
        description: "Écrivain visionnaire, auteur des Voyages extraordinaires",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 80,
        defense: 84,
        views: 4300000,
        emoji: "🐙",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Jules_Verne_2.jpg/250px-Jules_Verne_2.jpg"
    },

    {
        id: 208,
        name: "Grotte de Lascaux",
        description: "Grotte ornée du Périgord, la chapelle Sixtine de l'art préhistorique",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 78,
        defense: 85,
        views: 2900000,
        emoji: "🌄",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lascaux_painting.jpg/250px-Lascaux_painting.jpg"
    },

    {
        id: 209,
        name: "Château de Chenonceau",
        description: "Château des Dames enjambant le Cher, joyau de la Renaissance",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 80,
        defense: 88,
        views: 3100000,
        emoji: "🏰",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chenonceau-20050320.jpg/250px-Chenonceau-20050320.jpg"
    },

    {
        id: 210,
        name: "Jacques-Yves Cousteau",
        description: "Officier et océanographe, inventeur du scaphandre autonome avec Émile Gagnan",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.SUPER_RARE.code,
        attack: 84,
        defense: 78,
        views: 3600000,
        emoji: "🤿",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Cousteau1972_(cropped).jpg/250px-Cousteau1972_(cropped).jpg"
    },

    {
        id: 211,
        name: "Charles Martel",
        description: "Maire du palais, vainqueur de la bataille de Poitiers en 732",
        category: CATEGORIES.HISTOIRE,
        rarity: RARITIES.RARE.code,
        attack: 80,
        defense: 74,
        views: 2100000,
        emoji: "⚔️",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Charles-Martel.jpg/250px-Charles-Martel.jpg"
    },

    {
        id: 212,
        name: "Place Stanislas",
        description: "Place royale de Nancy, joyau du XVIIIe siècle classé à l'UNESCO",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.RARE.code,
        attack: 72,
        defense: 80,
        views: 1600000,
        emoji: "✨",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Nancy_Place_Stanislas_BW_2015-07-18_14-00-16.jpg/250px-Nancy_Place_Stanislas_BW_2015-07-18_14-00-16.jpg"
    },

    {
        id: 213,
        name: "Musée d'Orsay",
        description: "Ancienne gare transformée en musée des impressionnistes",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.RARE.code,
        attack: 75,
        defense: 78,
        views: 3300000,
        emoji: "🖼️",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/MuseeOrsay_20070324.jpg/250px-MuseeOrsay_20070324.jpg"
    },

    {
        id: 214,
        name: "Panthéon de Paris",
        description: "Nécropole des grands hommes, au cœur du Quartier latin",
        category: CATEGORIES.MONUMENTS,
        rarity: RARITIES.RARE.code,
        attack: 74,
        defense: 82,
        views: 2700000,
        emoji: "🏛️",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Pantheon_of_Paris_007.JPG/250px-Pantheon_of_Paris_007.JPG"
    },

    {
        id: 215,
        name: "Escargots de Bourgogne",
        description: "Plat bourguignon par excellence, escargots au beurre persillé",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.RARE.code,
        attack: 70,
        defense: 72,
        views: 1900000,
        emoji: "🐌",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/NIEdot365.jpg/250px-NIEdot365.jpg"
    },

    {
        id: 216,
        name: "Gorges du Verdon",
        description: "Le plus grand canyon d'Europe, entre Provence et haut Var",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.RARE.code,
        attack: 76,
        defense: 70,
        views: 2300000,
        emoji: "🏞️",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Verdon_Gorge_1.jpg/250px-Verdon_Gorge_1.jpg"
    },

    {
        id: 217,
        name: "Louis Braille",
        description: "Inventeur du système d'écriture tactile en points pour les aveugles",
        category: CATEGORIES.SCIENCES,
        rarity: RARITIES.RARE.code,
        attack: 68,
        defense: 76,
        views: 2000000,
        emoji: "👐",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/LouisBraille.png/250px-LouisBraille.png"
    },

    {
        id: 218,
        name: "Blanquette de veau",
        description: "Ragoût mijoté à la crème, grand classique du terroir français",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.COMMON.code,
        attack: 58,
        defense: 64,
        views: 1300000,
        emoji: "🍲",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Blanquette_de_veau_%C3%A0_l'ancienne_04.jpg/250px-Blanquette_de_veau_%C3%A0_l'ancienne_04.jpg"
    },

    {
        id: 219,
        name: "Kouign-amann",
        description: "Pâtisserie bretonne caramélisée au beurre et au sucre",
        category: CATEGORIES.GASTRONOMIE,
        rarity: RARITIES.COMMON.code,
        attack: 62,
        defense: 58,
        views: 950000,
        emoji: "🧈",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Kouignamann.JPG/250px-Kouignamann.JPG"
    },

    {
        id: 220,
        name: "Camargue",
        description: "Marais, chevaux blancs et flamants roses entre Rhône et Méditerranée",
        category: CATEGORIES.GEOGRAPHIE,
        rarity: RARITIES.COMMON.code,
        attack: 55,
        defense: 62,
        views: 1600000,
        emoji: "🦩",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Portrait_de_flamant_rose_dans_la_r%C3%A9serve_nationale_de_Camargue.jpg/250px-Portrait_de_flamant_rose_dans_la_r%C3%A9serve_nationale_de_Camargue.jpg"
    },
];

// Achievements
const ACHIEVEMENTS = {
    FIRST_PACK: { id: "first_pack", name: "Premier Pack", description: "Ouvrir votre premier pack de cartes", completed: false },
    FIRST_LEGENDARY: { id: "first_legendary", name: "Première Légendaire", description: "Obtenir votre première carte Légendaire", completed: false },
    FIRST_DUEL: { id: "first_duel", name: "Premier Duel", description: "Jouer votre premier duel", completed: false },
    FIRST_DUEL_WIN: { id: "first_duel_win", name: "Première Victoire", description: "Gagner votre premier duel", completed: false },
    COMPLETE_CATEGORY: { id: "complete_category", name: "Catégorie Complète", description: "Compléter toutes les cartes d'une catégorie", completed: false },
    TEN_DUELS_WON: { id: "ten_duels_won", name: "10 Victoires", description: "Gagner 10 duels", completed: false },
    FIFTY_CARDS: { id: "fifty_cards", name: "50 Cartes", description: "Posséder 50 cartes uniques différentes", completed: false },
    FULL_COLLECTION: { id: "full_collection", name: "Collection Complète", description: "Posséder toutes les cartes du jeu", completed: false }
};

// Export pour game.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CARDS, CATEGORIES, RARITIES, ACHIEVEMENTS };
}
