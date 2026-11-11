// France Masters - Extension 5 : Les grandes communes de France (ids 2269+)
// Les communes les plus peuplées de France absentes du jeu (INSEE, top 100).
// Ce fichier est chargé après data-ext4.js et complète la collection.

(function () {
  if (typeof CARDS === 'undefined') return;
  var EXT5_CARDS = [

  { id: 2269, name: "Boulogne-Billancourt", description: "La première commune de la banlieue parisienne, aux portes du bois et des studios.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.RARE.code, attack: 62, defense: 66, views: 890000, emoji: "🏙️" },
  { id: 2270, name: "Villeurbanne", description: "La grande voisine de Lyon, célèbre pour ses gratte-ciel des années 1930.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.RARE.code, attack: 60, defense: 64, views: 620000, emoji: "🏙️" },
  { id: 2271, name: "Saint-Denis (Seine-Saint-Denis)", description: "La ville de la basilique où reposent les rois de France, et du Stade de France.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.RARE.code, attack: 64, defense: 62, views: 950000, emoji: "⛪" },
  { id: 2272, name: "Montreuil", description: "La ville aux murs à pêches, longtemps terre d'accueil et d'artisanat.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 52, defense: 55, views: 470000, emoji: "🍑" },
  { id: 2273, name: "Argenteuil", description: "La ville des impressionnistes, où Monet peignait les bords de Seine.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.RARE.code, attack: 58, defense: 54, views: 540000, emoji: "🖼️" },
  { id: 2274, name: "Tourcoing", description: "La ville textile du Nord, sœur de Roubaix et de Lille.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 50, defense: 52, views: 360000, emoji: "🧵" },
  { id: 2275, name: "Roubaix", description: "L'ancienne capitale mondiale du textile, ville d'arrivée de Paris-Roubaix.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 54, defense: 50, views: 580000, emoji: "🚴" },
  { id: 2276, name: "Nanterre", description: "La préfecture des Hauts-de-Seine, aux portes de La Défense.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.RARE.code, attack: 58, defense: 60, views: 510000, emoji: "🏢" },
  { id: 2277, name: "Vitry-sur-Seine", description: "La ville du Val-de-Marne devenue musée à ciel ouvert de l'art urbain.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 48, defense: 52, views: 380000, emoji: "🎨" },
  { id: 2278, name: "Asnières-sur-Seine", description: "La commune cossue des bords de Seine, voisine de Clichy et de Neuilly.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 50, defense: 56, views: 340000, emoji: "🏙️" },
  { id: 2279, name: "Créteil", description: "La préfecture du Val-de-Marne, son lac et sa cathédrale de béton et de lumière.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.RARE.code, attack: 56, defense: 60, views: 450000, emoji: "🏛️" },
  { id: 2280, name: "Colombes", description: "La ville du stade olympique des Jeux de Paris en 1924.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 50, defense: 50, views: 330000, emoji: "🏟️" },
  { id: 2281, name: "Aubervilliers", description: "La commune multiculturelle du nord-est parisien, terre d'industries et de création.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 48, defense: 54, views: 400000, emoji: "🏭" },
  { id: 2282, name: "Aulnay-sous-Bois", description: "La commune de la Seine-Saint-Denis, entre forêt de Bondy et cités.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 48, defense: 52, views: 360000, emoji: "🏙️" },
  { id: 2283, name: "Courbevoie", description: "Une des deux communes de La Défense, le plus grand quartier d'affaires d'Europe.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.RARE.code, attack: 58, defense: 58, views: 420000, emoji: "🏢" },
  { id: 2284, name: "Rueil-Malmaison", description: "La ville du château de l'impératrice Joséphine, au bord de la Seine.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.RARE.code, attack: 56, defense: 62, views: 480000, emoji: "🏰" },
  { id: 2285, name: "Le Tampon", description: "La commune des Hautes Plaines de La Réunion, au pied du volcan.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 46, defense: 58, views: 310000, emoji: "🌋" },
  { id: 2286, name: "Mérignac", description: "La commune de l'aéroport de Bordeaux et des grandes industries aéronautiques.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 50, defense: 54, views: 320000, emoji: "✈️" },
  { id: 2287, name: "Champigny-sur-Marne", description: "La ville des bords de Marne, ses guinguettes et ses maisons de plaisance.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 48, defense: 54, views: 300000, emoji: "🌅" },
  { id: 2288, name: "Saint-Maur-des-Fossés", description: "La boucle de la Marne et ses résidences parmi les plus recherchées du Val-de-Marne.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 50, defense: 58, views: 340000, emoji: "🏙️" },
  { id: 2289, name: "Noisy-le-Grand", description: "La ville de Marne-la-Vallée, ses architectures audacieuses et ses espaces verts.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 48, defense: 52, views: 310000, emoji: "🏙️" },
  { id: 2290, name: "Drancy", description: "La ville de la Cité de la Muette, lieu de mémoire de la Shoah en France.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.RARE.code, attack: 52, defense: 58, views: 430000, emoji: "🕊️" },
  { id: 2291, name: "Cergy", description: "Le cœur de la ville nouvelle du Val-d'Oise, sa porte et son axe majeur.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 48, defense: 54, views: 330000, emoji: "🏙️" },
  { id: 2292, name: "Levallois-Perret", description: "La commune dense des Hauts-de-Seine, qui hébergea les ateliers de Gustave Eiffel.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 50, defense: 56, views: 350000, emoji: "🏙️" },
  { id: 2293, name: "Issy-les-Moulineaux", description: "La commune pionnière du numérique, au sud-ouest de Paris.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 50, defense: 54, views: 340000, emoji: "💻" },
  { id: 2294, name: "Pessac", description: "La ville de Le Corbusier et des grands crus de Pessac-Léognan.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 50, defense: 54, views: 360000, emoji: "🍷" },
  { id: 2295, name: "Évry-Courcouronnes", description: "La ville nouvelle de l'Essonne, sa cathédrale d'acier et de brique.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 48, defense: 54, views: 300000, emoji: "⛪" },
  { id: 2296, name: "Vénissieux", description: "La commune ouvrière de la métropole de Lyon, entre industrie et mémoires.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 48, defense: 52, views: 290000, emoji: "🏭" },
  { id: 2297, name: "Ivry-sur-Seine", description: "La commune des usines reconverties en ateliers, aux portes de Paris.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 48, defense: 52, views: 320000, emoji: "🏭" },
  { id: 2298, name: "Clichy", description: "La commune des Hauts-de-Seine qui hébergea les usines de la Seine et de grands groupes.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 48, defense: 52, views: 330000, emoji: "🏙️" },
  { id: 2299, name: "Antony", description: "La commune des Hauts-de-Seine, porte du parc de Sceaux.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 48, defense: 54, views: 310000, emoji: "🌳" },
  { id: 2300, name: "La Seyne-sur-Mer", description: "L'ancienne cité des chantiers navals, face à Toulon.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 48, defense: 52, views: 300000, emoji: "⚓" },
  { id: 2301, name: "Villeneuve-d'Ascq", description: "La ville nouvelle lilloise, son lac, son forum des sciences et son stade Pierre-Mauroy.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.RARE.code, attack: 54, defense: 56, views: 380000, emoji: "🏟️" },
  { id: 2302, name: "Le Blanc-Mesnil", description: "La commune de la Seine-Saint-Denis, voisine de l'aéroport du Bourget.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 46, defense: 50, views: 270000, emoji: "✈️" },
  { id: 2303, name: "Pantin", description: "La commune des Grands Moulins, devenue terre d'artistes et de création.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 48, defense: 52, views: 340000, emoji: "🌾" },
  { id: 2304, name: "Villejuif", description: "La commune du Val-de-Marne, siège du premier centre européen de lutte contre le cancer.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 48, defense: 56, views: 320000, emoji: "🏥" },
  { id: 2305, name: "Neuilly-sur-Seine", description: "La commune la plus aisée de France, entre Paris et le bois de Boulogne.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.RARE.code, attack: 56, defense: 60, views: 460000, emoji: "💰" },
  { id: 2306, name: "Sarcelles", description: "La commune du Val-d'Oise, symbole des grands ensembles et de la diversité.", category: CATEGORIES.GEOGRAPHIE, rarity: RARITIES.COMMON.code, attack: 46, defense: 52, views: 280000, emoji: "🏙️" },
  ];
  for (var i = 0; i < EXT5_CARDS.length; i++) CARDS.push(EXT5_CARDS[i]);
})();
