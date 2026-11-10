// France Masters - Descriptions enrichies des cartes
// Charge apres data.js et data-ext3.js : complete la description de chaque carte.

(function () {
  if (typeof CARDS === 'undefined') return;

  var RICHES = {
  "1": "Général victorieux couronné empereur des Français en 1804, il bouleversa l'Europe d'Austerlitz à Waterloo avant de finir à Sainte-Hélène. Le Code civil, les lycées et la Légion d'honneur portent encore sa marque.",
  "2": "Bergère de Domrémy guidée par ses voix, elle délivre Orléans en 1429 et conduit Charles VII au sacre de Reims. Capturée puis brûlée vive à Rouen à 19 ans, elle fut canonisée en 1920 et reste la sainte patronne de la France.",
  "3": "Le Roi-Soleil régna 72 ans, de 1643 à 1715, un record dans l'histoire de France. Absolutisme à Versailles et arts au sommet du Grand Siècle : son règne fixa le modèle de la monarchie française.",
  "4": "Chef de la France libre depuis Londres en 1940, il fonda la Ve République en 1958 et en fut le premier président. Figure de la Résistance et de la grandeur nationale, il est le général le plus célèbre de l'histoire française moderne.",
  "5": "Physicienne et chimiste, elle découvrit le polonium et le radium et reçut deux prix Nobel, en physique puis en chimie. Première femme professeure à la Sorbonne, elle repose au Panthéon depuis 1995.",
  "6": "Roi arverne, il unifia les tribus gauloises et battit César à Gergovie en 52 avant J.-C. avant de se rendre à Alésia pour épargner son peuple. Premier héros national de la mémoire française.",
  "22": "Dame de fer de plus de 300 mètres dressée en deux ans pour l'Exposition universelle de 1889, elle fut le plus haut monument du monde pendant quarante ans. Symbole de Paris, elle accueille des millions de visiteurs chaque année.",
  "23": "Palais des rois devenu le plus grand musée du monde, il conserve la Joconde, la Vénus de Milo et des dizaines de milliers d'œuvres. Sa pyramide de verre, signée Ieoh Ming Pei, fut inaugurée en 1989.",
  "24": "Résidence du pouvoir de Louis XIV à Louis XVI, son château, sa Galerie des Glaces et ses jardins dessinés par Le Nôtre fixent l'étalon de l'art classique. Capitale politique de la France pendant plus d'un siècle.",
  "25": "Abbaye médiévale dressée sur un îlot granitique au cœur d'une baie aux marées exceptionnelles. Lieu de pèlerinage millénaire, le Mont-Saint-Michel est classé au patrimoine mondial de l'UNESCO depuis 1979.",
  "26": "Aqueduc romain du Ier siècle, trois niveaux d'arches et 49 mètres de haut, il acheminait l'eau du Gardon vers Nîmes sur une pente savamment calculée. Le chef-d'œuvre d'ingénierie antique le mieux conservé au monde.",
  "38": "Croustillante dehors, alvéolée dedans : la baguette de tradition est un art de la boulangerie française, inscrit au patrimoine culturel immatériel de l'UNESCO en 2022. Les Français en dévorent des milliards chaque année.",
  "39": "Viennoiserie en pâte feuilletée née de la tradition viennoise adoptée par les boulangers parisiens du XIXe siècle. Sa forme en croissant rappelle, selon la légende, l'emblème ottoman du siège de Vienne.",
  "53": "Toit des Alpes et de l'Europe occidentale avec près de 4 800 mètres, il domine la vallée de Chamonix depuis la Suisse jusqu'à l'Italie. Sa première ascension en 1786 marque la naissance de l'alpinisme.",
  "54": "776 km de la Bourgogne à la Manche, elle traverse Paris et ses trente-sept ponts avant de s'élargir en estuaire. Les peintres impressionnistes en ont fait le fleuve le plus peint du monde.",
  "65": "Biologiste génial, il prouva que la vie naît de la vie, inventa la pasteurisation et les vaccins contre le charbon et la rage. L'Institut qui porte son nom, fondé en 1888, poursuit encore son œuvre.",
  "66": "Ingénieur des grandes structures métalliques : viaduc de Garabit, ossature de la statue de la Liberté, et la tour de 300 mètres qui porte son nom. Il consacra sa fin de vie à l'aérodynamique.",
  "77": "Créée en 1903 par le journal L'Auto, la Grande Boucle enchaîne chaque été une vingtaine d'étapes à travers la France. La course cycliste la plus prestigieuse du monde arbore le maillot jaune depuis 1919.",
  "78": "Le tournoi international de France se joue depuis 1891 sur la terre battue de la porte d'Auteuil. Seul tournoi du Grand Chelem disputé sur cette surface, il porte le nom d'un pionnier de l'aviation.",
  "89": "Louis IX régna de 1226 à 1270 : roi justicier rendant la justice sous son chêne de Vincennes, il partit deux fois en croisade et mourut devant Tunis. Canonisé en 1297, seul roi de France devenu saint.",
  "103": "Roi des Francs couronné empereur à Rome en l'an 800, il unifia l'Occident chrétien et fit renaître les lettres. Son empire, partagé à Verdun en 843, préfigure la France et l'Allemagne.",
  "105": "L'héroïne de la guerre de Cent Ans libéra Orléans et fit sacrer le dauphin à Reims, avant d'être livrée aux Anglais et jugée à Rouen. Sa réhabilitation en 1456 ouvrit la voie à sa légende nationale.",
  "111": "De Dole à Paris, le savant révolutionna la médecine en fondant la microbiologie et en créant les premiers vaccins atténués. Le hasard ne favorise que les esprits préparés : sa maxime est restée célèbre.",
  "112": "Le couple découvrit le polonium et le radium dans un hangar de l'École de physique de Paris et obtint le prix Nobel de physique en 1903 avec Becquerel. Marie le décrocha une seconde fois, en chimie, en 1911.",
  "136": "De Lutèce à la ville lumière, deux mille ans d'histoire s'étalent du Louvre à Notre-Dame et des quais aux grands boulevards d'Haussmann. Capitale la plus visitée du monde, elle a accueilli les Jeux olympiques en 1924 puis en 2024.",
  "137": "Fondée vers 600 avant J.-C. par les Grecs de Phocée sous le nom de Massalia, c'est la plus ancienne ville de France. Son Vieux-Port, sa Notre-Dame de la Garde et ses calanques en font la porte de la Méditerranée.",
  "138": "Capitale des Gaules romaine, ville des soieries et des canuts, elle est la capitale française de la gastronomie avec ses bouchons et ses chefs étoilés. Son Vieux-Lyon Renaissance est classé au patrimoine mondial.",
  "161": "Nicéphore Niépce fixe la première image connue vers 1826 et Daguerre révèle le daguerréotype en 1839 : la France est le berceau de la photographie.",
  "162": "Les frères Lumière organisent à Paris, en décembre 1895, la première projection payante de films de l'histoire. La France est ainsi la patrie du septième art.",
  "166": "Un réseau de 50 kilomètres amenait les eaux du Gardon jusqu'au castellum de Nîmes avec une pente de quelques centimètres par kilomètre. Le Pont du Gard en est le monument le plus spectaculaire.",
  "175": "Le plus grand massif d'Europe culmine au mont Blanc et borde la France sur des centaines de kilomètres. Ski d'hiver, alpinisme et lacs d'altitude en font la première destination de montagne d'Europe.",
  "181": "Région capitale de plus de douze millions d'habitants, elle concentre le pouvoir, La Défense et les châteaux de Versailles, de Vincennes et de Fontainebleau. Son nom rappelle les terres franques qui l'entouraient.",
  "182": "De Marseille à Nice, la région conjugue calanques, lavande de Valensole, gorges du Verdon et corniche de l'Estérel. Le grand Sud de la carte postale française.",
  "201": "Chef de file des impressionnistes, il peignit les cathédrales de Rouen, les gares Saint-Lazare et les nymphéas de Giverny offerts à l'État. Son Impression, soleil levant, exposée en 1874, a donné son nom au mouvement.",
  "202": "Le 12 juillet 1998, la France de Zidane bat le Brésil 3-0 au Stade de France et remporte sa première Coupe du monde. Un million de personnes ont fêté les Bleus sur les Champs-Élysées.",
  "203": "Rescapée de la Shoah et magistrate, elle fit voter en 1975 la loi dépénalisant l'interruption volontaire de grossesse et présida le premier Parlement européen élu au suffrage universel. Entrée au Panthéon en 2018.",
  "204": "Colosse du judo, il a cumulé les titres olympiques et mondiaux en toutes catégories depuis 2007. Le judoka français le plus titré de l'histoire, respecté sur tous les tatamis du monde.",
  "205": "Vin effervescent des maisons de Reims et d'Épernay, il naît d'un assemblage de cépages et d'une seconde fermentation en bouteille. Protégé par une appellation, son nom est réservé à son terroir d'origine.",
  "912": "Jardinier du Roi-Soleil, il dessina Vaux-le-Vicomte, les Tuileries et les jardins de Versailles. Ses perspectives infinies et ses broderies de buis ont défini l'art du jardin à la française.",
  "913": "En 1822, il déchiffre les hiéroglyphes grâce à la pierre de Rosette et fonde l'égyptologie moderne. Il cria sa découverte à son frère : je tiens l'affaire.",
  "922": "Philosophe de langue française, auteur du Contrat social et de l'Émile, il inspira les idées de 1789 et la Déclaration des droits. Ses Confessions inventent l'autobiographie moderne.",
  "924": "Le romancier des Trois Mousquetaires et du Comte de Monte-Cristo publia plus d'une centaine de volumes avec l'aide de ses collaborateurs. Entré au Panthéon en 2002.",
  "932": "Poète des Fleurs du mal, il fit scandale en 1857 et révolutionna la poésie en inventant le poème en prose. Critique d'art et traducteur de Poe, il incarne le poète moderne.",
  "933": "Le poète de Charleville écrivit toute son œuvre entre quinze et vingt ans, du Bateau ivre aux Illuminations. Verlaine fit de lui le poète aux semelles de vent.",
  "1093": "Le 14 juillet 1789, le peuple de Paris s'empare de la forteresse royale, symbole de l'arbitraire. L'événement ouvre la Révolution et devient la fête nationale.",
  "1095": "Proclamée le 26 août 1789, elle affirme que les hommes naissent et demeurent libres et égaux en droits. Préambule de nos constitutions, elle a inspiré la Déclaration universelle de 1948.",
  "1098": "Le 2 décembre 1805, Napoléon écrase les armées austro-russe lors de la bataille des Trois Empereurs. Son chef-d'œuvre tactique reste le Soleil d'Austerlitz.",
  "1107": "De février à décembre 1916, l'offensive allemande se brise sur le front français : près de 700 000 victimes des deux camps. Ils ne passeront pas est devenu le cri de la résistance nationale.",
  "1110": "Depuis Londres sur les ondes de la BBC, le général de Gaulle appelle les Français à refuser la défaite. Texte fondateur de la Résistance, que bien peu entendirent ce soir-là.",
  "1112": "Le 6 juin 1944, 156 000 soldats alliés débarquent sur les plages de Normandie d'Utah à Sword. La plus grande opération amphibie de l'histoire ouvre la libération de l'Europe occidentale.",
  "1130": "L'oiseau blanc franco-britannique franchissait l'Atlantique à deux fois la vitesse du son. Premier vol en 1969, service commercial de 1976 à 2003 : il a marqué l'ère du supersonique.",
  "1132": "Le train à grande vitesse relia Paris à Lyon en 1981 à 260 km/h, record de l'époque. Il détient depuis 2007 le record du monde sur rail avec 574,8 km/h.",
  "1162": "Cent ans après 1924, Paris a accueilli les Jeux avec une cérémonie d'ouverture sur la Seine et des épreuves au pied des monuments. Une édition vouée à la parité entre les athlètes.",
  "1171": "Quadruple champion du monde de Formule 1 en 1985, 1986, 1989 et 1993, le Professeur reste le pilote français le plus titré. Ses duels avec Senna ont marqué l'histoire de la discipline.",
  "1217": "Inauguré en 2004 au-dessus du Tarn, le viaduc conçu par Michel Virlogeux et Norman Foster est le plus haut du monde : ses piles culminent à 245 mètres et son mât franchit 340 mètres au-dessus de la vallée.",
  "1250": "Delacroix peint en 1830 une Marianne au bonnet phrygien franchissant les barricades des Trois Glorieuses. Conservé au Louvre, le tableau est l'image la plus célèbre de la Révolution.",
  "1252": "Portrait de Lisa Gherardini peint par Léonard de Vinci au début du XVIe siècle et exposé au Louvre. Son sourire énigmatique en fait le tableau le plus célèbre du monde.",
  "1257": "Recueil publié en 1857 et partiellement censuré pour outrage à la morale publique, il réinventa la langue poétique. Baudelaire y crée la poésie moderne, du spleen à l'idéal.",
  "1258": "Conte poétique publié en 1943 et traduit dans des centaines de langues : c'est l'œuvre de littérature française la plus traduite au monde. On ne voit bien qu'avec le cœur, rappelle le petit homme à l'écharpe.",
  "1259": "Fresque publiée en 1862 qui suit Jean Valjean du bagne de Toulon aux barricades parisiennes, croisant Javert, Cosette et Gavroche. Monument de la littérature française, adapté à l'infini.",
  "1270": "Chant de guerre composé à Strasbourg en 1792 par Rouget de Lisle et popularisé par les fédérés marseillais. Hymne national de la République, son refrain est connu sur les cinq continents.",
  "1323": "En juin 1942, la brigade française libre du général Koenig résiste seize jours à l'Afrikakorps dans le désert, couvrant la retraite britannique. Le premier fait d'armes qui annonça le retour de la France.",
  "1336": "Le XVIIe siècle de Louis XIV, de Molière, de Racine et de Versailles : l'apogée de la monarchie absolue et des arts français. Un modèle qui rayonna sur toute l'Europe.",
  "1337": "De Montesquieu à Diderot, l'Encyclopédie publiée de 1751 à 1772 diffusait la raison critique et la liberté de penser. La fermentation intellectuelle qui prépara 1789.",
  "1374": "Publié en 1830, le roman suit l'ascension du jeune Julien Sorel du séminaire aux salons de la Restauration. La chronique ambiguë d'une ambition, chef-d'œuvre de Stendhal.",
  "1379": "En 1831, Hugo fait de la cathédrale le personnage central de son roman avec Quasimodo, Esmeralda et Frollo. Le succès du livre lança la grande restauration par Viollet-le-Duc.",
  "1389": "Comédie héroïque créée en 1897 par Rostand : le cadet de Gascogne au grand nez prête sa verve et ses lettres à Christian pour conquérir Roxane. Le panache est entré dans la langue française.",
  "1394": "Publiée de 1913 à 1927, l'œuvre de Proust explore la mémoire, le temps et l'amour en sept volumes, de Swann au Temps retrouvé. Reconnue comme un sommet de la littérature du XXe siècle.",
  "1412": "Publié en 1949, l'essai de Simone de Beauvoir analyse la construction sociale de la condition féminine. On ne naît pas femme, on le devient : la phrase fondatrice du féminisme moderne.",
  "1445": "Forgée à Paris par Bartholdi sur une structure de Gustave Eiffel, elle fut offerte par la France et inaugurée en 1886 à l'entrée du port de New York. Sa torche veille depuis sur le Nouveau Monde.",
  "1478": "Révélée à Paris en 1925 par la Revue nègre, artiste mondiale, résistante et mère adoptive de douze enfants de toutes origines. Première artiste noire entrée au Panthéon, en 2021.",
  "1486": "Consortium européen fondé en 1970, il assemble ses avions à Toulouse, des A320 à l'A380, le plus gros avion de ligne jamais construit. Le rival de Boeing qui a propulsé l'Europe aéronautique.",
  "1497": "Malleur parisien depuis 1854, il inventa la malle plate empilable et le monogramme célèbre. La maison est devenue l'étendard mondial du voyage et du luxe.",
  "1498": "Coco Chanel libéra la silhouette du corset, imposa le jersey et le petit tailleur, et lança le N°5 en 1921. La rue Cambon reste le temple de l'élégance française.",
  "1515": "Né en 1987 de la fusion de Louis Vuitton et de Moët Hennessy, le groupe fédère soixante-quinze maisons, de Dior à Givenchy. Le premier empire mondial du luxe.",
  "1554": "Sorti en 1995, le film de Kassovitz suit vingt-quatre heures dans la vie de trois amis de banlieue, Vinz, Saïd et Hubert. Prix de la mise en scène à Cannes et César du meilleur film.",
  "1568": "Louis Malle revisite l'hiver 1944 : un collège jésuite cache des enfants juifs, et l'amitié de Julien et Joseph se brise sur une dénonciation. César du meilleur film en 1988.",
  "1574": "Écrite par Piaf en 1945, la chanson est devenue l'hymne universel de l'amour simple, repris dans le monde entier. La signature absolue de la Môme.",
  "1577": "La vague chantée de Charles Trenet, créée en 1946 et reprise dans des dizaines de langues. L'un des standards français les plus enregistrés de l'histoire.",
  "1605": "La complainte d'Aznavour, sortie en 1965, peint les artistes fauchés du Montmartre d'après-guerre. Un standard mondial repris par les plus grandes voix.",
  "1772": "Langue officielle de la République et de dizaines de pays, parlée par plus de 300 millions de locuteurs sur les cinq continents. De l'Académie à la francophonie, une langue de diplomatie et de culture vivante.",
  "1786": "Entre 1764 et 1767, une créature inconnue fit des dizaines de victimes en Gévaudan, défiant chasses royales et fusils. L'énigme de la Bête, loup monstrueux ou légende noire, n'a jamais été élucidée.",
  "1793": "L'assemblée des chevaliers d'Arthur, ronde pour qu'aucun siège ne domine : l'invention courtoise de l'égalité. La matrice des romans de Chrétien de Troyes et de la Quête du Graal.",
  "1794": "Prophète et enchanteur de la légende arthurienne, il conçoit la Table ronde et guide le jeune Arthur. La fée Viviane l'aurait enfermé pour l'éternité dans la fontaine de Brocéliande.",
  "1797": "Élevé par la Dame du Lac, il est le meilleur chevalier du monde, mais son amour pour la reine Guenièvre brise la Table ronde. Le cœur brisé de la chevalerie.",
  "1798": "La coupe sacrée de la Cène, gardée par le roi Pêcheur et cherchée par les chevaliers : Perceval l'entrevoit, Galaad l'accomplit. Le trésor mystique de la légende arthurienne.",
  "1810": "La cité bretonne engloutie sous la baie de Douarnenez pour les fautes de la princesse Dahut. Les jours de tempête, on dit que ses cloches sonnent encore sous la mer.",
  "1816": "Prisonnier d'État masqué de velours noir, transféré de Pignerol à la Bastille, il mourut en 1703 sans jamais révéler son visage. Voltaire puis Dumas ont nourri la légende d'un frère jumeau du Roi-Soleil.",
  "1818": "En 843, les petits-fils de Charlemagne partagent l'empire à Verdun : à Charles le Chauve la Francie occidentale, première matrice du royaume de France.",
  "1819": "En 842, les petits-fils de Charlemagne jurent assistance mutuelle dans deux langues dont une romance : le Serment de Strasbourg est considéré comme le premier texte connu en français.",
  "1822": "En 1598, Henri IV accorde aux protestants la liberté de culte et met fin aux guerres de Religion. Révoqué en 1685, l'édit entraîna l'exil de dizaines de milliers de huguenots.",
  "1824": "Proclamée en août 1789, elle affirme que les hommes naissent libres et égaux en droits et fonde la souveraineté de la nation. Toujours en tête de la Constitution, matrice des droits universels.",
  "1825": "Le 20 juin 1789, les députés du tiers état réunis dans la salle du Jeu de paume jurent de ne pas se séparer avant d'avoir donné une constitution à la France.",
  "1828": "Promulgué le 21 mars 1804, le Code civil unifie le droit privé français, de la propriété au mariage, et efface les derniers vestiges féodaux. Il inspire encore des dizaines de codes étrangers.",
  "1830": "Le 27 avril 1848, le décret de la Seconde République, porté par Victor Schœlcher, abolit l'esclavage dans les colonies françaises. La date est commémorée chaque année outre-mer.",
  "1832": "La loi du 9 décembre 1905 sépare les Églises et l'État : la République ne reconnaît, ne salarie ni ne subventionne aucun culte. Le socle de la laïcité française.",
  "1833": "Signé le 25 mars 1957 par la France et cinq partenaires, il crée la Communauté économique européenne. La matrice de l'Union européenne actuelle.",
  "1835": "L'ordonnance du 21 avril 1944 accorde aux Françaises le droit de vote et d'éligibilité : elles votent pour la première fois en 1945. Une conquête majeure de l'égalité civique, portée par la Résistance.",
  "1853": "Prix Goncourt 1933 : Malraux filme l'échec de l'insurrection de Shanghai et la dignité de ses révolutionnaires, Kyo et Katov. Le grand roman de la fraternité et du sacrifice.",
  "1857": "Fresque de Roger Martin du Gard publiée de 1922 à 1940 : les frères Thibault traversent la guerre et les certitudes brisées. Prix Nobel de littérature en 1937.",
  "1861": "Prix Goncourt 1984 : la jeune fille blanche du Mékong et l'homme chinois de Cholon, autobiographie voilée de Marguerite Duras. L'un des plus grands succès du roman français.",
  "1885": "En 1855, Courbet peint sa vie entouré de ses modèles : allégorie réelle de sept années d'existence, exposée dans son pavillon du réalisme. Le manifeste d'un peintre indépendant.",
  "1902": "Poussin, vers 1637 : des bergers découvrent un tombeau gravé Et in Arcadia ego, la mort parle même au paradis. L'une des toiles les plus mystérieuses du Louvre.",
  "1904": "Le romantique foudroyé de la Symphonie fantastique, des Troyens et du Requiem. Ses partitions monumentales ont élargi l'orchestre et l'imaginaire de la musique française.",
  "1905": "L'artisan le plus parfait de la musique française : le Boléro, le Concerto pour la main gauche, Daphnis et Chloé. Un horloger du son, note par note.",
  "1914": "Maître du baroque français, compositeur des Indes galantes et d'Hippolyte et Aricie, il codifia l'harmonie dans son célèbre Traité. Le digne successiveur de Lully auprès du Roi.",
  "1918": "Un thème obstiné, un unique crescendo, un quart d'heure de montée en puissance : créé à l'Opéra en 1928, le Boléro est l'œuvre la plus jouée de Ravel.",
  "1922": "Créé en 1894 et librement inspiré du poème de Mallarmé, il baigne l'après-midi d'un faune dans des couleurs inouïes. L'œuvre qui a ouvert la modernité harmonique.",
  "1934": "Comédien et directeur de la Comédie des Champs-Élysées, il créa Knock et forma des générations d'acteurs. Sa diction et ses silences sont légendaires.",
  "1937": "Le prince solaire du cinéma français, de Fanfan la Tulipe au Diable au corps, fondateur du théâtre d'Avignon avec Jean Vilar. Mort à 36 ans en 1959, il reste une fierté nationale.",
  "1971": "Palme d'or 2023 pour Anatomie d'une chute, également récompensée par l'Oscar du meilleur scénario original. Le triomphe d'un cinéma français d'exactitude.",
  "1972": "Dès 1896, elle tourne La Fée aux choux, première fiction d'une femme réalisatrice, puis des centaines de films en France et en Amérique. La pionnière oubliée que l'histoire du cinéma réhabilite.",
  "1973": "Décerné depuis 1903 au restaurant Drouant par l'académie Goncourt, il consacre chaque automne le meilleur roman français. Le prix qui fait et défait les renommées littéraires.",
  "1983": "Créée par Napoléon en 1802, la plus haute décoration française récompense les mérites civils et militaires. Du chevalier au grand-croix, elle est remise au nom du président de la République.",
  "1986": "Le trophée suprême du Festival de Cannes, attribué chaque mois de mai depuis 1955 sur la Croisette. Le sommet du cinéma mondial, couronnant les plus grands films français.",
  "2012": "Fondée en 1635 par Richelieu, l'assemblée des Quarante veille sur le dictionnaire et le bon usage de la langue. Les immortels siègent sous la coupole de l'Institut de France.",
  "2022": "Bibliothèque nationale de France : du site Richelieu à la tour François-Mitterrand, elle conserve par dépôt légal tout ce qui paraît dans le pays. Des millions de livres et des trésors du Moyen Âge.",
  "2028": "La deudeuche, dessinée pour transporter des œufs dans un champ sans en casser un : l'auto populaire de 1948 au toit de toile. Un mythe d'ingéniosité produit à plus de cinq millions d'exemplaires.",
  "2029": "La déesse du salon de 1955 : suspension hydropneumatique et aérodynamisme en avance sur son temps. Le général de Gaulle en fit sa voiture présidentielle.",
  "2040": "L'auto de course la plus titrée de l'histoire : la Bugatti 35 a remporté plus de deux mille victoires dans les années 1920. Sa carrosserie bleu de France est une légende de Molsheim.",
  "2041": "La Veyron de Molsheim : 1 001 chevaux et plus de 400 km/h, elle a reconquis la couronne de vitesse de l'automobile mondiale. Une voiture française d'exception.",
  "2045": "Depuis 1981, il a rétréci la France : Paris-Lyon en deux heures, puis un réseau de Lille à Marseille. Record du monde ferroviaire avec 574,8 km/h en 2007.",
  "2046": "L'oiseau blanc, premier avion supersonique de ligne : premier vol en 1969, service commercial de 1976 à 2003, Atlantique traversé à Mach 2. Le rêve le plus prestigieux de la coopération franco-britannique.",
  "2047": "Ouvert pour l'Exposition universelle de 1900, il compte 16 lignes et plus de 300 stations, des entrées Guimard aux stations rénovées. L'un des réseaux les plus denses du monde.",
  "2049": "Le 25 juillet 1909, Louis Blériot traverse la Manche de Calais à Douvres en 37 minutes sur son monoplan XI. La une de tous les journaux du monde pour la première traversée aérienne.",
  "2051": "240 kilomètres de Toulouse à la Méditerranée et 350 ouvrages d'art : le chef-d'œuvre fluvial creusé par Pierre-Paul Riquet au XVIIe siècle. Classé au patrimoine mondial de l'UNESCO.",
  "2056": "Depuis Kourou, en Guyane, la fusée européenne place satellites et sondes sur orbite depuis 1979. L'accès autonome de l'Europe à l'espace.",
  "2063": "Le train de légende lancé en 1883 de Paris vers Constantinople, couchettes lambrissées et argenterie. Celui d'Agatha Christie, du crime parfait et de l'Orient éternel.",
  "2072": "Entre 100 et 110 mètres de hauteur, la plus haute dune d'Europe avance chaque année sur la forêt des Landes. Du sommet, le bassin d'Arcachon se découvre d'un seul coup d'œil.",
  "2077": "Le delta sauvage du Rhône : chevaux blancs, taureaux noirs et flamants roses entre étangs, sel et rizières. Un parc naturel unique entre terre et Méditerranée.",
  "2078": "Le grand canyon français : 700 mètres de calcaire entre les Alpes de Haute-Provence et le Var, un torrent vert émeraude au fond. Le paradis des randonneurs et des grimpeurs.",
  "2127": "Tuber melanosporum, le diamant noir de la gastronomie : on la traque à l'aube avec un chien truffeur sous les chênes du Périgord. Son parfum embaume les fêtes de fin d'année.",
  "2167": "Fête nationale depuis 1880 : défilé sur les Champs-Élysées, feux d'artifice et bals des pompiers célèbrent la prise de la Bastille. La plus grande fête civile de France."
};

  var PHRASES_RARETE = {
    C: ["Une Commune, la base discrète de tout album.", "Une carte Commune toujours utile pour la collection.", "Une Commune modeste mais fidèle au quotidien."],
    R: ["Une Rare qui a du caractère.", "Une carte Rare déjà convoitée par les collectionneurs.", "Une Rare qui sort du lot dans un pack."],
    SR: ["Une Super Rare, la belle pièce d'un album.", "Une Super Rare qui fait briller une collection.", "Une Super Rare entre prestige et passion."],
    UR: ["Une Ultra Rare très convoitée par les collectionneurs.", "Une Ultra Rare : la carte qui fait rêver.", "Une Ultra Rare, sommet de bien des albums."],
    L: ["Une Légendaire, perle ultime de France Masters.", "Une Légendaire : le graal des collectionneurs.", "Une Légendaire, pièce maîtresse de toute collection."]
  };

  function enrichirTexte(card) {
    var base = (card.description || '').replace(/s+/g, ' ').trim();
    if (base && !/[.!?…]$/.test(base)) base += '.';
    var r = PHRASES_RARETE[card.rarity] || PHRASES_RARETE.C;
    var p1 = r[card.id % 3];
    var diff = card.attack - card.defense;
    var profil;
    if (diff >= 15) profil = "En duel, elle mise surtout sur l'attaque (" + card.attack + ") plutôt que sur la défense (" + card.defense + ").";
    else if (diff <= -15) profil = "En duel, sa défense (" + card.defense + ") prime sur son attaque (" + card.attack + ").";
    else profil = "Ses statistiques équilibrées (" + card.attack + " d'attaque, " + card.defense + " de défense) la rendent polyvalente.";
    var vues;
    if (card.views >= 1000000) {
      var m = Math.floor(card.views / 100000) / 10;
      vues = "Son article Wikipédia a été consulté plus de " + String(m).replace('.', ',') + " millions de fois.";
    } else if (card.views > 0) {
      vues = "Son article Wikipédia a été consulté " + card.views.toLocaleString('fr-FR') + " fois.";
    } else {
      vues = "Son article Wikipédia alimente la curiosité des internautes.";
    }
    var parts = [];
    if (base) parts.push(base);
    parts.push(p1);
    parts.push(profil);
    parts.push(vues);
    return parts.join(' ');
  }

  for (var i = 0; i < CARDS.length; i++) {
    var card = CARDS[i];
    if (RICHES[card.id]) {
      card.description = RICHES[card.id];
    } else {
      card.description = enrichirTexte(card);
    }
  }
})();
