# 🇫🇷 France Masters

**France Masters** est un jeu web de collection de cartes à collectionner (TCG) inspiré de WikiMasters, basé sur les articles Wikipédia sur la France. Chaque carte représente un sujet français réel (personnage historique, monument, spécialité culinaire, région, scientifique, artiste, événement sportif, etc.).

## 🎮 Comment jouer

### Démarrage rapide

1. **Ouvrir le jeu** :
   - Ouvrez simplement le fichier `index.html` dans votre navigateur web
   - Ou jouez en ligne sur GitHub Pages, ou utilisez un serveur local :
     ```bash
     python3 -m http.server 8000
     # Puis ouvrez http://localhost:8000
     ```

2. **Premiers pas** :
   - Créez un **compte** (pseudo + mot de passe) pour ouvrir des packs, avoir des amis et figurer au classement
   - Récoltez un **pack gratuit toutes les 15 minutes** (jusqu'à **10 packs non ouverts** stockés) et ouvrez-les quand vous voulez
   - Chaque pack contient **5 cartes** avec au moins 1 carte Rare ou mieux

3. **Mécaniques de jeu** :
   - **Ouverture de packs** : révélation plein écran, carte par carte, avec bouton « ⚡ Tout révéler »
   - **Réserve de packs** : stockez jusqu'à 10 packs non ouverts, à ouvrir quand vous voulez
   - **Collection** : grille de toutes les cartes avec filtres et tri
   - **Liste de souhait** : épinglez les cartes rêvées, elles sortent automatiquement de la liste quand vous les obtenez
   - **Duel Quiz** : affrontez l'IA avec 3 cartes, répondez à des questions QCM
   - **Duels amicaux** : défiez vos amis (3, 5 ou 10 questions, revanche instantanée)
   - **Économie** : gagnez des pièces en gagnant des duels
   - **Succès** : 8 succès à débloquer

## 👤 Comptes utilisateurs

- Inscription et connexion avec **pseudo + mot de passe** (tout reste dans le navigateur)
- Chaque compte a **ses propres packs et sa liste d'amis**
- **Changement de mot de passe** depuis les Paramètres
- **Changement de pseudo** depuis les Paramètres → Compte : le pseudo change partout (compte, packs, amis) et **l'entrée du classement en ligne est renommée** (pas dupliquée)

## 🤝 Amis et duels amicaux

Onglet **Amis** :

- Ajoutez un pseudo inscrit sur l'appareil, un joueur du **classement en ligne**, ou un pseudo non inscrit (mode hors ligne, pour jouer à deux sur le même appareil)
- **🌍 Amis du monde** : recherchez les joueurs du classement mondial et ajoutez-les en un clic ; leurs stats (valeur, cartes, dernière activité) sont mises à jour automatiquement
- Recherche, tri (nom, victoires, taux de victoire, ajouts récents) et **favoris épinglés**
- **Podium** 🥇🥈🥉 des meilleurs amis et statistiques détaillées (V/D, taux de victoire, séries 🔥)
- **Duels amicaux** au tour par tour sur le même appareil : mêmes questions pour les deux joueurs, meilleur score gagne

## 🏆 Classement

- **Classement local** : meilleurs scores enregistrés sur l'appareil
- **Classement mondial** : synchronisé avec une base **Supabase** (table `players` : pseudo, cartes, cartes distinctes, valeur, dernière activité)
  - Publication automatique de votre score, synchronisation toutes les 60 secondes
  - Valeur d'une collection = somme des points de rareté (C 10 · R 25 · SR 60 · UR 150 · L 400)
  - Podium 🥇🥈🥉 + liste, tri par valeur ou par nombre de cartes

## ⚙️ Paramètres

- **Thème** clair ☀️ / sombre 🌙
- **Sons** on/off
- **Animations réduites** pour plus de confort visuel
- **Export / import de sauvegarde** en JSON (transfert de progression entre appareils)
- Gestion des données (vider la liste de souhait, réinitialiser le score local)
- **FAQ** intégrée

## 🎨 Habillage graphique

Le fichier `style-plus.css` (chargé en dernier) ajoute une couche premium qui habille les deux thèmes :

- Fond vivant avec halos flottants et dégradés profonds
- Onglets pilules collants en haut de page, boutons avec reflet balayé
- Relief 3D sur les cartes, **effet holographique animé** sur les Légendaires
- Packs flottants, arène de duel habillée, réponses correctes/fausses animées
- Touche de pureté : ombres diffusées, bordures affinées, typographie limpide, étincelle sur le logo
- Respect de l'option « animations réduites » et de `prefers-reduced-motion`

## 📁 Structure du projet

```
francemaster/
├── index.html          # Page principale du jeu
├── style.css           # Styles de base (thème clair)
├── style-dark.css      # Thème sombre doré
├── style-plus.css      # Couche graphique premium (fond vivant, hologramme, pureté)
├── game.js             # Logique principale du jeu
├── data.js             # Données des cartes
├── auth.js             # Comptes utilisateurs (inscription, connexion, sessions)
├── boot.js             # Amorçage : lance le jeu et charge les modules
├── pack-fx.js          # Ouverture de packs plein écran (révélation, auras, rayons)
├── leaderboard.js      # Classement local + classement mondial (Supabase)
├── friends.js          # Amis, duels amicaux et amis du monde
├── wishlist.js         # Liste de souhait
├── settings.js         # Paramètres (thème, sons, sauvegarde, compte, FAQ)
├── github-sync.js      # Système d'upload GitHub (cartes + images)
├── images/             # Images de cartes uploadées via l'éditeur
├── editor.html         # Interface d'édition des cartes
├── editor.js           # Logique de l'éditeur
├── admin.css           # Styles CSS de l'éditeur
└── README.md           # Documentation
```

## 👑 Catégories de cartes

Le jeu comprend **200 cartes** réparties en 6 catégories :

1. **Histoire & Personnages** (43 cartes)
   - Napoléon Bonaparte, Jeanne d'Arc, Louis XIV, Charles de Gaulle, Marie Curie, etc.

2. **Monuments & Lieux** (21 cartes)
   - Tour Eiffel, Louvre, Château de Versailles, Mont-Saint-Michel, etc.

3. **Gastronomie** (30 cartes)
   - Baguette, Croissant, Bœuf bourguignon, Camembert, Bouillabaisse, etc.

4. **Géographie & Régions** (52 cartes)
   - Mont Blanc, La Seine, La Loire, Bretagne, Provence, Côte d'Azur, etc.

5. **Sciences & Arts** (42 cartes)
   - Louis Pasteur, Gustave Eiffel, Victor Hugo, Molière, Cézanne, Debussy, etc.

6. **Sport & Culture** (12 cartes)
   - Tour de France, Roland-Garros, Festival de Cannes, Équipe de France, etc.

## 🎨 Raretés

| Rareté | Code | Pourcentage | Valeur | Couleur |
|--------|------|-------------|--------|---------|
| Légendaire | L | 3% | 400 pts | Arc-en-ciel animé |
| Ultra Rare | UR | 7% | 150 pts | Or |
| Super Rare | SR | 15% | 60 pts | Violet |
| Rare | R | 30% | 25 pts | Bleu |
| Commune | C | 45% | 10 pts | Gris |

## 🛠️ Éditeur de Cartes (pour les administrateurs)

L'éditeur permet aux administrateurs de :
- **Ajouter** de nouvelles cartes
- **Modifier** les cartes existantes
- **Supprimer** des cartes
- **Exporter/Importer** des cartes en JSON
- **Réinitialiser** aux valeurs par défaut
- **Visualiser** les statistiques

### Accès à l'éditeur

Ouvrez simplement le fichier `editor.html` dans votre navigateur.

### Fonctionnalités de l'éditeur

#### 1. Liste des Cartes
- Recherche par nom, description ou ID
- Filtre par catégorie et rareté
- Aperçu visuel de chaque carte
- Boutons Modifier et Supprimer

#### 2. Ajouter une Carte
- Formulaire complet avec tous les champs
- Génération automatique de l'ID
- Validation des données

#### 3. Modifier une Carte
- Modal d'édition avec pré-remplissage
- Possibilité de supprimer depuis le modal

#### 4. Statistiques
- Répartition par catégorie
- Répartition par rareté
- Statistiques globales (moyennes, maximums)
- Graphiques de répartition des stats

#### 5. Exporter/Importer

- **Exporter** : Télécharge les cartes au format JSON
- **Importer** : Charge des cartes depuis un fichier JSON
- **Sauvegarder** : Met à jour le fichier `data.js` (téléchargement automatique)

### Sauvegarde des modifications

Les modifications sont sauvegardées dans :
1. **localStorage** du navigateur (pour l'éditeur)
2. **Fichier data.js** (téléchargement manuel via "Sauvegarder")

Pour appliquer les modifications au jeu :
1. Modifiez les cartes dans l'éditeur
2. Cliquez sur "Sauvegarder" pour télécharger le nouveau `data.js`
3. Remplacez l'ancien fichier `data.js` par le nouveau
4. Rafraîchissez la page du jeu

## ☁️ Système d'Upload GitHub

L'éditeur peut publier directement les cartes et les images sur le dépôt GitHub (pas besoin de git en ligne de commande) :

### Configuration (une seule fois)

1. Créez un **Personal Access Token** sur GitHub : *Settings → Developer settings → Fine-grained personal access tokens → Generate new token*
2. Limitez le token au dépôt **francemaster** et donnez uniquement la permission **Contents : Read and Write**
3. Ouvrez `editor.html`, cliquez sur **🔑 Token** et collez le token (stocké uniquement dans le localStorage de votre navigateur, envoyé uniquement à api.github.com)

### Publication des cartes

1. Modifiez ou ajoutez des cartes dans l'éditeur
2. Cliquez sur **☁️ Publier sur GitHub** : `data.js` est mis à jour sur la branche `main` en un seul commit
3. Les images ajoutées via le bouton d'upload sont poussées dans le dossier `images/` et la carte reçoit automatiquement l'URL relative `images/card-<id>.<ext>`
4. **🔄 Recharger** récupère la dernière version de `data.js` depuis GitHub

### Images

Les 200 cartes existantes utilisent les miniatures **Wikimedia Commons** (taille standard 250px). Pour une nouvelle carte, vous pouvez :

- coller l'URL d'une image (ex. une miniature Wikimedia Commons, en utilisant une taille standard : 250px, 330px, 500px...),
- ou uploader un fichier local : il sera poussé dans `images/` lors de la publication.

### ⚠️ Sécurité

- Le token reste dans votre navigateur : ne le partagez jamais
- Utilisez un token *fine-grained* limité au seul dépôt `francemaster`
- Révoquez le token quand vous ne l'utilisez plus

## 💾 Sauvegarde

La progression est automatiquement sauvegardée dans le **localStorage** du navigateur :
- Collection de cartes, pièces, statistiques de duel, succès débloqués
- Packs en réserve et liste de souhait (par compte)
- Comptes utilisateurs et amis (par compte)
- Classement local, thème, sons et animations

Un bouton **Exporter / Importer** dans les Paramètres permet de transférer toute la progression entre appareils.

## 📊 Statistiques du Jeu

- **Total cartes** : 200
- **Catégories** : 6
- **Raretés** : 5
- **Pièces de départ** : 300
- **Coût d'un pack** : 100 pièces
- **Cartes par pack** : 5
- **Réserve** : 1 pack gratuit toutes les 15 min (10 max)
- **Succès** : 8

## 🎯 Succès

1. **Premier Pack** : Ouvrir votre premier pack
2. **Première Légendaire** : Obtenir une carte Légendaire
3. **Premier Duel** : Jouer votre premier duel
4. **Première Victoire** : Gagner votre premier duel
5. **Catégorie Complète** : Compléter toutes les cartes d'une catégorie
6. **10 Victoires** : Gagner 10 duels
7. **50 Cartes** : Posséder 50 cartes uniques
8. **Collection Complète** : Posséder toutes les cartes

## 🔧 Personnalisation

### Ajouter de nouvelles cartes

1. Ouvrez `editor.html`
2. Allez dans l'onglet "Ajouter Carte"
3. Remplissez le formulaire
4. Cliquez sur "Ajouter la carte"
5. Sauvegardez avec "Sauvegarder"
6. Téléchargez le nouveau `data.js`
7. Remplacez l'ancien fichier

### Modifier les probabilités

Les probabilités de rareté sont définies dans `data.js` :
```javascript
const rarityWeights = [
    { rarity: 'C', weight: 45 },
    { rarity: 'R', weight: 30 },
    { rarity: 'SR', weight: 15 },
    { rarity: 'UR', weight: 7 },
    { rarity: 'L', weight: 3 }
];
```

### Modifier les stats des cartes

Utilisez l'éditeur ou modifiez directement `data.js` :
```javascript
{
    id: 1,
    name: "Tour Eiffel",
    description: "Monument emblématique de Paris",
    category: CATEGORIES.MONUMENTS,
    rarity: RARITIES.LEGENDARY.code,
    attack: 100,
    defense: 98,
    views: 15000000,
    emoji: "🗼"
}
```

### Classement mondial (Supabase)

Le classement en ligne utilise une table `players` (clé = pseudo encodé) sur Supabase, avec des règles RLS publiques en lecture/écriture. L'URL et la clé publique sont définies dans `leaderboard.js` (et réutilisées dans `friends.js` et `settings.js`). Pour brancher votre propre base : créez un projet Supabase, exécutez le SQL de création de table, puis remplacez `SUPABASE_URL` et la clé dans ces fichiers.

## 🌐 Déploiement

Pour déployer le jeu sur un serveur web :

1. **Serveur statique** :
   - Copiez tous les fichiers sur votre serveur
   - Assurez-vous que le serveur sert les fichiers avec le bon type MIME

2. **GitHub Pages** :
   - Poussez le code sur GitHub
   - Activez GitHub Pages dans les paramètres du dépôt
   - Le jeu sera accessible à `https://votre-utilisateur.github.io/francemaster/`

3. **Netlify/Vercel** :
   - Importez le dépôt
   - Déployez automatiquement

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le dépôt
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalité`)
3. Commitez vos modifications (`git commit -m 'Ajout de ma fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/ma-fonctionnalité`)
5. Ouvrez une Pull Request

## 📜 Licence

Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser, le modifier et le distribuer.

## 🙏 Remerciements

- Inspiré par **WikiMasters** et **Wikipédia France**
- Créé avec ❤️ en HTML/CSS/JS vanilla
- Sans dépendance externe

---

**Amusez-vous bien avec France Masters !** 🎉
