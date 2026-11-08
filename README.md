# 🇫🇷 France Masters

**France Masters** est un jeu web de collection de cartes à collectionner (TCG) inspiré de WikiMasters, basé sur les articles Wikipédia sur la France. Chaque carte représente un sujet français réel (personnage historique, monument, spécialité culinaire, région, scientifique, artiste, événement sportif, etc.).

## 🎮 Comment jouer

### Démarrage rapide

1. **Ouvrir le jeu** :
   - Ouvrez simplement le fichier `index.html` dans votre navigateur web
   - Ou utilisez un serveur local :
     ```bash
     python3 -m http.server 8000
     # Puis ouvrez http://localhost:8000
     ```

2. **Premiers pas** :
   - Vous commencez avec **300 pièces**
   - Ouvrez des **packs** (100 pièces chacun) pour obtenir des cartes
   - Chaque pack contient **5 cartes** avec au moins 1 carte Rare ou mieux
   - Collectionnez les 200 cartes disponibles

3. **Mécaniques de jeu** :
   - **Ouverture de packs** : Animation de retournement carte par carte
   - **Collection** : Grille de toutes les cartes avec filtres et tri
   - **Duel Quiz** : Affrontez l'IA avec 3 cartes, répondez à des questions QCM
   - **Économie** : Gagnez des pièces en gagnant des duels
   - **Succès** : 8 succès à débloquer

## 📁 Structure du projet

```
francemaster/
├── index.html          # Page principale du jeu
├── style.css           # Styles CSS du jeu
├── game.js             # Logique principale du jeu
├── data.js             # Données des 200 cartes
├── github-sync.js       # Système d'upload GitHub (cartes + images)
├── images/              # Images de cartes uploadées via l'éditeur
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

| Rareté | Code | Pourcentage | Couleur |
|--------|------|-------------|---------|
| Légendaire | L | 3% | Arc-en-ciel animé |
| Ultra Rare | UR | 7% | Or |
| Super Rare | SR | 15% | Violet |
| Rare | R | 30% | Bleu |
| Commune | C | 45% | Gris |

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


## 📊 Statistiques du Jeu

- **Total cartes** : 200
- **Catégories** : 6
- **Raretés** : 5
- **Pièces de départ** : 300
- **Coût d'un pack** : 100 pièces
- **Cartes par pack** : 5
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

## 💾 Sauvegarde

La progression est automatiquement sauvegardée dans le **localStorage** du navigateur :
- Collection de cartes
- Nombre de pièces
- Statistiques de duel
- Succès débloqués
- Dernières cartes obtenues

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
