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
        emoji: "👑"
        image: null
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
        emoji: "⚔️"
        image: null
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
        emoji: "👑"
        image: null
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
        emoji: "🎖️"
        image: null
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
        emoji: "🔬"
        image: null
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
        emoji: "🛡️"
        image: null
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
        emoji: "👑"
        image: null
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
        emoji: "👑"
        image: null
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
        emoji: "⚖️"
        image: null
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
        emoji: "📜"
        image: null
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
        emoji: "👑"
        image: null
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
        emoji: "⛪"
        image: null
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
        emoji: "🎭"
        image: null
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
        emoji: "🎭"
        image: null
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
        emoji: "⚔️"
        image: null
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
        emoji: "🗣️"
        image: null
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
        emoji: "🎖️"
        image: null
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
        emoji: "👑"
        image: null
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
        emoji: "👑"
        image: null
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
        emoji: "👑"
        image: null
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
        emoji: "📰"
        image: null
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
        emoji: "🗼"
        image: null
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
        emoji: "🏛️"
        image: null
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
        emoji: "🏰"
        image: null
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
        emoji: "🏰"
        image: null
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
        emoji: "🌉"
        image: null
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
        emoji: "🏟️"
        image: null
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
        emoji: "⛪"
        image: null
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
        emoji: "🏰"
        image: null
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
        emoji: "🏆"
        image: null
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
        emoji: "⛪"
        image: null
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
        emoji: "🎭"
        image: null
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
        emoji: "🏛️"
        image: null
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
        emoji: "🏢"
        image: null
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
        emoji: "🏛️"
        image: null
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
        emoji: "🏙️"
        image: null
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
        emoji: "⛪"
        image: null
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
        emoji: "🥖"
        image: null
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
        emoji: "🥐"
        image: null
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
        emoji: "🍖"
        image: null
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
        emoji: "🥘"
        image: null
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
        emoji: "🍲"
        image: null
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
        emoji: "🍲"
        image: null
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
        emoji: "🧀"
        image: null
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
        emoji: "🧀"
        image: null
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
        emoji: "🍪"
        image: null
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
        emoji: "🍖"
        image: null
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
        emoji: "🍗"
        image: null
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
        emoji: "🍰"
        image: null
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
        emoji: "🥧"
        image: null
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
        emoji: "🍲"
        image: null
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
        emoji: "🥞"
        image: null
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
        emoji: "⛰️"
        image: null
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
        emoji: "🌊"
        image: null
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
        emoji: "🌊"
        image: null
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
        emoji: "🏴"
        image: null
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
        emoji: "🌿"
        image: null
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
        emoji: "🏖️"
        image: null
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
        emoji: "⛰️"
        image: null
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
        emoji: "⛰️"
        image: null
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
        emoji: "🌳"
        image: null
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
        emoji: "🏡"
        image: null
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
        emoji: "🌊"
        image: null
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
        emoji: "🌊"
        image: null
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
        emoji: "🔬"
        image: null
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
        emoji: "🗼"
        image: null
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
        emoji: "📖"
        image: null
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
        emoji: "🎭"
        image: null
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
        emoji: "🎬"
        image: null
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
        emoji: "🎨"
        image: null
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
        emoji: "🎹"
        image: null
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
        emoji: "🎨"
        image: null
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
        emoji: "🗿"
        image: null
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
        emoji: "🎤"
        image: null
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
        emoji: "🔬"
        image: null
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
        emoji: "📐"
        image: null
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
        emoji: "🚴"
        image: null
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
        emoji: "🎾"
        image: null
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
        emoji: "🎬"
        image: null
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
        emoji: "⚽"
        image: null
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
        emoji: "🏁"
        image: null
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
        emoji: "🏅"
        image: null
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
        emoji: "🏅"
        image: null
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
        emoji: "⚽"
        image: null
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
        emoji: "⚽"
        image: null
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
        emoji: "⛳"
        image: null
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
        emoji: "🚴"
        image: null
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
        emoji: "🏉"
        image: null
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
        emoji: "⛪"
        image: null
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
        emoji: "👑"
        image: null
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
        emoji: "👑"
        image: null
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
        emoji: "🎭"
        image: null
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
        emoji: "🎭"
        image: null
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
        emoji: "💼"
        image: null
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
        emoji: "🗣️"
        image: null
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
        emoji: "📰"
        image: null
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
        emoji: "⚖️"
        image: null
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
        emoji: "🕊️"
        image: null
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
        emoji: "🎖️"
        image: null
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
        emoji: "🎖️"
        image: null
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
        emoji: "🛡️"
        image: null
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
        emoji: "👑"
        image: null
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
        emoji: "👑"
        image: null
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
        emoji: "⛪"
        image: null
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
        emoji: "⚔️"
        image: null
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
        emoji: "⚔️"
        image: null
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
        emoji: "⚔️"
        image: null
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
        emoji: "⚔️"
        image: null
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
        emoji: "🎖️"
        image: null
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
        emoji: "🎖️"
        image: null
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
        emoji: "🔬"
        image: null
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
        emoji: "☢️"
        image: null
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
        emoji: "📐"
        image: null
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
        emoji: "📚"
        image: null
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
        emoji: "🔬"
        image: null
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
        emoji: "🦴"
        image: null
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
        emoji: "🌌"
        image: null
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
        emoji: "⚡"
        image: null
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
        emoji: "💡"
        image: null
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
        emoji: "🥫"
        image: null
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
        emoji: "📐"
        image: null
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
        emoji: "📈"
        image: null
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
        emoji: "🎲"
        image: null
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
        emoji: "📏"
        image: null
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
        emoji: "⚙️"
        image: null
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
        emoji: "🎭"
        image: null
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
        emoji: "📖"
        image: null
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
        emoji: "📚"
        image: null
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
        emoji: "📝"
        image: null
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
        emoji: "✍️"
        image: null
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
        emoji: "🕰️"
        image: null
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
        emoji: "📖"
        image: null
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
        emoji: "🤔"
        image: null
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
        emoji: "👩"
        image: null
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
        emoji: "✈️"
        image: null
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
        emoji: "🗼"
        image: null
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
        emoji: "🌊"
        image: null
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
        emoji: "🏛️"
        image: null
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
        emoji: "🚀"
        image: null
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
        emoji: "🏖️"
        image: null
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
        emoji: "🍷"
        image: null
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
        emoji: "⚓"
        image: null
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
        emoji: "🏛️"
        image: null
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
        emoji: "🏡"
        image: null
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
        emoji: "🏰"
        image: null
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
        emoji: "🧀"
        image: null
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
        emoji: "🧀"
        image: null
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
        emoji: "🧀"
        image: null
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
        emoji: "🧀"
        image: null
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
        emoji: "🧀"
        image: null
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
        emoji: "🧀"
        image: null
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
        emoji: "🐐"
        image: null
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
        emoji: "🧀"
        image: null
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
        emoji: "🧀"
        image: null
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
        emoji: "🧀"
        image: null
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
        emoji: "🥘"
        image: null
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
        emoji: "🍲"
        image: null
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
        emoji: "🍲"
        image: null
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
        emoji: "🥔"
        image: null
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
        emoji: "🍕"
        image: null
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
        emoji: "📷"
        image: null
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
        emoji: "🎬"
        image: null
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
        emoji: "🎈"
        image: null
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
        emoji: "🩺"
        image: null
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
        emoji: "🧪"
        image: null
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
        emoji: "🌉"
        image: null
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
        emoji: "⛪"
        image: null
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
        emoji: "🏆"
        image: null
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
        emoji: "⛪"
        image: null
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
        emoji: "🎭"
        image: null
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
        emoji: "🌊"
        image: null
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
        emoji: "🌊"
        image: null
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
        emoji: "🌊"
        image: null
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
        emoji: "🌊"
        image: null
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
        emoji: "⛰️"
        image: null
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
        emoji: "⛰️"
        image: null
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
        emoji: "⛰️"
        image: null
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
        emoji: "⛰️"
        image: null
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
        emoji: "⛰️"
        image: null
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
        emoji: "🏝️"
        image: null
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
        emoji: "🏙️"
        image: null
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
        emoji: "🌿"
        image: null
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
        emoji: "⛰️"
        image: null
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
        emoji: "🌊"
        image: null
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
        emoji: "🏰"
        image: null
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
        emoji: "🏭"
        image: null
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
        emoji: "🌍"
        image: null
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
        emoji: "🏰"
        image: null
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
        emoji: "🏴"
        image: null
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
        emoji: "🌳"
        image: null
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
        emoji: "🍷"
        image: null
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
        emoji: "🏰"
        image: null
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
        emoji: "🏡"
        image: null
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
        emoji: "🥂"
        image: null
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
        emoji: "🏰"
        image: null
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
        emoji: "🌾"
        image: null
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
        emoji: "🐄"
        image: null
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
        emoji: "⛰️"
        image: null
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
        emoji: "🍷"
        image: null
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
        emoji: "⛰️"
    }
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
