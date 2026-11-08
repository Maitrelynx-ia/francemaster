// France Masters - Éditeur de Cartes
// Outil pour ajouter, modifier, supprimer des cartes

// État de l'éditeur
const EditorState = {
    cards: [],
    filteredCards: [],
    currentEditIndex: null,
    pendingAction: null
};

// Initialisation
function initEditor() {
    // Charger les cartes
    EditorState.cards = [...CARDS];
    EditorState.filteredCards = [...EditorState.cards];
    
    // Configurer les écouteurs
    setupEditorListeners();
    
    // Rendre l'interface
    renderEditorCards();
    renderCategoriesStats();
    renderRaritiesStats();
    renderOverviewStats();
    renderCharts();
    
    // Charger les cartes personnalisées si elles existent
    loadCustomCards();
}

// Configurer les écouteurs
function setupEditorListeners() {
    // Navigation entre onglets
    document.querySelectorAll('.editor-nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            switchEditorTab(tabId);
        });
    });
    
    // Génération automatique de l'ID
    document.getElementById('new-id').addEventListener('focus', () => {
        generateId();
    });
}

// Charger les cartes personnalisées depuis localStorage
function loadCustomCards() {
    const customCards = localStorage.getItem('franceMastersCustomCards');
    if (customCards) {
        try {
            const parsedCards = JSON.parse(customCards);
            // Remplacer les cartes par défaut par les cartes personnalisées
            EditorState.cards = parsedCards;
            EditorState.filteredCards = [...EditorState.cards];
            renderEditorCards();
            showEditorToast('Succès', 'Cartes personnalisées chargées', 'success');
        } catch (e) {
            console.error('Erreur lors du chargement des cartes personnalisées:', e);
        }
    }
}

// Changer d'onglet dans l'éditeur
function switchEditorTab(tabId) {
    document.querySelectorAll('.editor-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.editor-nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    
    // Mettre à jour le contenu si nécessaire
    if (tabId === 'list') {
        renderEditorCards();
    } else if (tabId === 'categories') {
        renderCategoriesStats();
        renderRaritiesStats();
    } else if (tabId === 'stats') {
        renderOverviewStats();
        renderCharts();
    }
}

// Rendre la liste des cartes
function renderEditorCards() {
    const grid = document.getElementById('editor-cards-grid');
    grid.innerHTML = '';
    
    // Filtrer les cartes
    filterCards();
    
    // Afficher les cartes
    EditorState.filteredCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'editor-card';
        cardElement.dataset.index = index;
        
        cardElement.innerHTML = `
            <div class="editor-card-header" data-category="${card.category}">
                <span class="editor-card-emoji">${card.emoji}</span>
                <span class="editor-card-rarity ${card.rarity}">${card.rarity}</span>
            </div>
            <div class="editor-card-body">
                <div class="editor-card-name">${card.name}</div>
                <div class="editor-card-id">
                    <span>#${card.id}</span>
                    <span>${card.category}</span>
                </div>
            </div>
            <div class="editor-card-actions">
                <button class="edit-btn" onclick="openEditModal(${index})">Modifier</button>
                <button class="delete-btn" onclick="confirmDeleteCard(${index})">Suppr.</button>
            </div>
        `;
        
        grid.appendChild(cardElement);
    });
    
    // Mettre à jour les compteurs
    document.getElementById('total-cards-count').textContent = `${EditorState.cards.length} cartes`;
    document.getElementById('filter-result-count').textContent = `${EditorState.filteredCards.length} résultats`;
}

// Filtrer les cartes
function filterCards() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const categoryFilter = document.getElementById('filter-category').value;
    const rarityFilter = document.getElementById('filter-rarity').value;
    
    EditorState.filteredCards = EditorState.cards.filter(card => {
        const matchesSearch = card.name.toLowerCase().includes(searchTerm) ||
                             card.description.toLowerCase().includes(searchTerm) ||
                             card.id.toString().includes(searchTerm);
        const matchesCategory = categoryFilter === 'all' || card.category === categoryFilter;
        const matchesRarity = rarityFilter === 'all' || card.rarity === rarityFilter;
        
        return matchesSearch && matchesCategory && matchesRarity;
    });
    
    renderEditorCards();
}

// Générer un ID automatique
function generateId() {
    const usedIds = EditorState.cards.map(card => card.id);
    let newId = 1;
    while (usedIds.includes(newId)) {
        newId++;
    }
    document.getElementById('new-id').value = newId;
}

// Ajouter une nouvelle carte
function addNewCard(event) {
    event.preventDefault();
    
    const id = parseInt(document.getElementById('new-id').value);
    const name = document.getElementById('new-name').value;
    const description = document.getElementById('new-description').value;
    const category = document.getElementById('new-category').value;
    const rarity = document.getElementById('new-rarity').value;
    const attack = parseInt(document.getElementById('new-attack').value);
    const defense = parseInt(document.getElementById('new-defense').value);
    const views = parseInt(document.getElementById('new-views').value);
    const emoji = document.getElementById('new-emoji').value;
    
    // Vérifier si l'ID existe déjà
    if (EditorState.cards.some(card => card.id === id)) {
        showEditorToast('Erreur', 'Un carte avec cet ID existe déjà !', 'error');
        return;
    }
    
    // Créer la nouvelle carte
    const newCard = {
        id: id,
        name: name,
        description: description,
        category: category,
        rarity: rarity,
        attack: attack,
        defense: defense,
        views: views,
        emoji: emoji
    };
    
    // Ajouter la carte
    EditorState.cards.push(newCard);
    EditorState.filteredCards = [...EditorState.cards];
    
    // Réinitialiser le formulaire
    event.target.reset();
    generateId();
    
    // Rendre à nouveau la liste
    renderEditorCards();
    renderCategoriesStats();
    renderRaritiesStats();
    renderOverviewStats();
    renderCharts();
    
    showEditorToast('Succès', `Carte "${name}" ajoutée !`, 'success');
}

// Ouvrir le modal d'édition
function openEditModal(index) {
    const card = EditorState.filteredCards[index];
    const actualIndex = EditorState.cards.findIndex(c => c.id === card.id);
    
    EditorState.currentEditIndex = actualIndex;
    
    document.getElementById('edit-id').value = card.id;
    document.getElementById('edit-index').value = actualIndex;
    document.getElementById('edit-name').value = card.name;
    document.getElementById('edit-description').value = card.description;
    document.getElementById('edit-category').value = card.category;
    document.getElementById('edit-rarity').value = card.rarity;
    document.getElementById('edit-attack').value = card.attack;
    document.getElementById('edit-defense').value = card.defense;
    document.getElementById('edit-views').value = card.views;
    document.getElementById('edit-emoji').value = card.emoji;
    
    document.getElementById('edit-modal').style.display = 'flex';
}

// Fermer le modal d'édition
function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
    EditorState.currentEditIndex = null;
}

// Sauvegarder les modifications de la carte
function saveEditCard(event) {
    event.preventDefault();
    
    const index = EditorState.currentEditIndex;
    if (index === null) return;
    
    const id = parseInt(document.getElementById('edit-id').value);
    const name = document.getElementById('edit-name').value;
    const description = document.getElementById('edit-description').value;
    const category = document.getElementById('edit-category').value;
    const rarity = document.getElementById('edit-rarity').value;
    const attack = parseInt(document.getElementById('edit-attack').value);
    const defense = parseInt(document.getElementById('edit-defense').value);
    const views = parseInt(document.getElementById('edit-views').value);
    const emoji = document.getElementById('edit-emoji').value;
    
    // Mettre à jour la carte
    EditorState.cards[index] = {
        id: id,
        name: name,
        description: description,
        category: category,
        rarity: rarity,
        attack: attack,
        defense: defense,
        views: views,
        emoji: emoji
    };
    
    // Mettre à jour la liste filtrée
    EditorState.filteredCards = EditorState.cards.filter(c => 
        EditorState.filteredCards.some(fc => fc.id === c.id)
    );
    
    // Fermer le modal
    closeEditModal();
    
    // Rendre à nouveau
    renderEditorCards();
    renderCategoriesStats();
    renderRaritiesStats();
    renderOverviewStats();
    renderCharts();
    
    showEditorToast('Succès', `Carte "${name}" modifiée !`, 'success');
}

// Confirmer la suppression d'une carte
function confirmDeleteCard(index) {
    const card = EditorState.filteredCards[index];
    const actualIndex = EditorState.cards.findIndex(c => c.id === card.id);
    
    EditorState.currentEditIndex = actualIndex;
    
    document.getElementById('confirm-title').textContent = 'Supprimer la carte';
    document.getElementById('confirm-message').textContent = `Êtes-vous sûr de vouloir supprimer la carte "${card.name}" ?`;
    EditorState.pendingAction = 'delete';
    
    document.getElementById('confirm-modal').style.display = 'flex';
}

// Supprimer une carte
function deleteCard() {
    const index = EditorState.currentEditIndex;
    if (index === null) return;
    
    const cardName = EditorState.cards[index].name;
    EditorState.cards.splice(index, 1);
    
    // Mettre à jour la liste filtrée
    EditorState.filteredCards = EditorState.filteredCards.filter(c => 
        EditorState.cards.some(cc => cc.id === c.id)
    );
    
    // Fermer les modals
    closeEditModal();
    closeConfirmModal();
    
    // Rendre à nouveau
    renderEditorCards();
    renderCategoriesStats();
    renderRaritiesStats();
    renderOverviewStats();
    renderCharts();
    
    showEditorToast('Succès', `Carte "${cardName}" supprimée !`, 'success');
}

// Fermer le modal de confirmation
function closeConfirmModal() {
    document.getElementById('confirm-modal').style.display = 'none';
    EditorState.pendingAction = null;
}

// Confirmer l'action
function confirmAction() {
    if (EditorState.pendingAction === 'delete') {
        deleteCard();
    } else if (EditorState.pendingAction === 'reset') {
        resetCards();
    }
    closeConfirmModal();
}

// Confirmer la réinitialisation des cartes
function confirmResetCards() {
    document.getElementById('confirm-title').textContent = 'Réinitialiser les cartes';
    document.getElementById('confirm-message').textContent = 'Êtes-vous sûr de vouloir réinitialiser toutes les cartes à leurs valeurs par défaut ? Cette action est irréversible.';
    EditorState.pendingAction = 'reset';
    document.getElementById('confirm-modal').style.display = 'flex';
}

// Réinitialiser les cartes
function resetCards() {
    EditorState.cards = [...CARDS];
    EditorState.filteredCards = [...EditorState.cards];
    
    // Réinitialiser le formulaire
    document.getElementById('add-card-form').reset();
    
    // Rendre à nouveau
    renderEditorCards();
    renderCategoriesStats();
    renderRaritiesStats();
    renderOverviewStats();
    renderCharts();
    
    // Supprimer les cartes personnalisées du localStorage
    localStorage.removeItem('franceMastersCustomCards');
    
    showEditorToast('Succès', 'Cartes réinitialisées aux valeurs par défaut', 'success');
}

// Sauvegarder les cartes
function saveCards() {
    // Sauvegarder dans localStorage
    localStorage.setItem('franceMastersCustomCards', JSON.stringify(EditorState.cards));
    
    // Mettre à jour le fichier data.js
    updateDataJs();
    
    showEditorToast('Succès', 'Cartes sauvegardées !', 'success');
}

// Mettre à jour le fichier data.js
function updateDataJs() {
    // Créer le contenu du fichier data.js
    const dataJsContent = `// France Masters - Données des cartes
// Basées sur de vrais articles Wikipédia France
// Généré automatiquement par l'éditeur

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
${EditorState.cards.map(card => `
    {
        id: ${card.id},
        name: "${card.name.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}",
        description: "${card.description.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}",
        category: CATEGORIES.${getCategoryKey(card.category)},
        rarity: RARITIES.${getRarityKey(card.rarity)}.code,
        attack: ${card.attack},
        defense: ${card.defense},
        views: ${card.views},
        emoji: "${card.emoji}"
    }`).join(',
')}
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
`;
    
    // Écrire le fichier
    const blob = new Blob([dataJsContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    
    // Télécharger le fichier
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.js';
    a.click();
    URL.revokeObjectURL(url);
}

// Obtenir la clé de catégorie
function getCategoryKey(category) {
    const keys = {
        'Histoire & Personnages': 'HISTOIRE',
        'Monuments & Lieux': 'MONUMENTS',
        'Gastronomie': 'GASTRONOMIE',
        'Géographie & Régions': 'GEOGRAPHIE',
        'Sciences & Arts': 'SCIENCES',
        'Sport & Culture': 'SPORT'
    };
    return keys[category] || 'HISTOIRE';
}

// Obtenir la clé de rareté
function getRarityKey(rarity) {
    const keys = {
        'C': 'COMMON',
        'R': 'RARE',
        'SR': 'SUPER_RARE',
        'UR': 'ULTRA_RARE',
        'L': 'LEGENDARY'
    };
    return keys[rarity] || 'COMMON';
}

// Exporter les cartes en JSON
function exportCards() {
    const data = JSON.stringify(EditorState.cards, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'francemaster_cards.json';
    a.click();
    URL.revokeObjectURL(url);
    showEditorToast('Succès', 'Cartes exportées en JSON', 'success');
}

// Ouvrir le modal d'import
function importCards() {
    document.getElementById('import-json').value = '';
    document.getElementById('import-modal').style.display = 'flex';
}

// Fermer le modal d'import
function closeImportModal() {
    document.getElementById('import-modal').style.display = 'none';
}

// Traiter l'import
function processImport() {
    const json = document.getElementById('import-json').value;
    
    try {
        const importedCards = JSON.parse(json);
        
        // Vérifier que c'est un tableau
        if (!Array.isArray(importedCards)) {
            showEditorToast('Erreur', 'Le JSON doit être un tableau de cartes', 'error');
            return;
        }
        
        // Ajouter les cartes importées
        importedCards.forEach(card => {
            // Vérifier si l'ID existe déjà
            if (!EditorState.cards.some(c => c.id === card.id)) {
                EditorState.cards.push(card);
            }
        });
        
        // Mettre à jour la liste filtrée
        EditorState.filteredCards = [...EditorState.cards];
        
        // Fermer le modal
        closeImportModal();
        
        // Rendre à nouveau
        renderEditorCards();
        renderCategoriesStats();
        renderRaritiesStats();
        renderOverviewStats();
        renderCharts();
        
        showEditorToast('Succès', `${importedCards.length} cartes importées !`, 'success');
    } catch (e) {
        showEditorToast('Erreur', 'JSON invalide: ' + e.message, 'error');
    }
}

// Rendre les statistiques par catégorie
function renderCategoriesStats() {
    const grid = document.getElementById('editor-categories-grid');
    grid.innerHTML = '';
    
    const categories = [...new Set(EditorState.cards.map(card => card.category))];
    const totalCards = EditorState.cards.length;
    
    categories.forEach(category => {
        const count = EditorState.cards.filter(card => card.category === category).length;
        const percentage = ((count / totalCards) * 100).toFixed(1);
        
        const card = document.createElement('div');
        card.className = 'editor-category-card';
        card.innerHTML = `
            <h3>${category}</h3>
            <div class="count">${count}</div>
            <div class="percentage">${percentage}%</div>
        `;
        
        grid.appendChild(card);
    });
}

// Rendre les statistiques par rareté
function renderRaritiesStats() {
    const grid = document.getElementById('editor-rarities-grid');
    grid.innerHTML = '';
    
    const rarities = ['L', 'UR', 'SR', 'R', 'C'];
    const totalCards = EditorState.cards.length;
    
    rarities.forEach(rarity => {
        const count = EditorState.cards.filter(card => card.rarity === rarity).length;
        const percentage = ((count / totalCards) * 100).toFixed(1);
        
        const card = document.createElement('div');
        card.className = 'editor-rarity-card';
        card.innerHTML = `
            <h3>${getRarityName(rarity)} (${rarity})</h3>
            <div class="count">${count}</div>
            <div class="percentage">${percentage}%</div>
        `;
        
        grid.appendChild(card);
    });
}

// Obtenir le nom de la rareté
function getRarityName(rarity) {
    const names = {
        'C': 'Commune',
        'R': 'Rare',
        'SR': 'Super Rare',
        'UR': 'Ultra Rare',
        'L': 'Légendaire'
    };
    return names[rarity] || rarity;
}

// Rendre les statistiques globales
function renderOverviewStats() {
    const grid = document.getElementById('editor-overview-grid');
    grid.innerHTML = '';
    
    const totalCards = EditorState.cards.length;
    const avgAttack = (EditorState.cards.reduce((sum, card) => sum + card.attack, 0) / totalCards).toFixed(1);
    const avgDefense = (EditorState.cards.reduce((sum, card) => sum + card.defense, 0) / totalCards).toFixed(1);
    const avgViews = (EditorState.cards.reduce((sum, card) => sum + card.views, 0) / totalCards).toFixed(0);
    const maxAttack = Math.max(...EditorState.cards.map(card => card.attack));
    const maxDefense = Math.max(...EditorState.cards.map(card => card.defense));
    
    const stats = [
        { label: 'Total Cartes', value: totalCards },
        { label: 'Attaque Moyenne', value: avgAttack },
        { label: 'Défense Moyenne', value: avgDefense },
        { label: 'Vues Moyennes', value: formatNumber(parseInt(avgViews)) },
        { label: 'Attaque Max', value: maxAttack },
        { label: 'Défense Max', value: maxDefense }
    ];
    
    stats.forEach(stat => {
        const card = document.createElement('div');
        card.className = 'editor-overview-card';
        card.innerHTML = `
            <div class="label">${stat.label}</div>
            <div class="value">${stat.value}</div>
        `;
        
        grid.appendChild(card);
    });
}

// Formater un nombre avec des espaces
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Rendre les graphiques
function renderCharts() {
    renderAttackChart();
    renderDefenseChart();
}

// Rendre le graphique d'attaque
function renderAttackChart() {
    const container = document.getElementById('attack-chart');
    container.innerHTML = `
        <h3>Répartition des Attaques</h3>
        <div class="editor-chart-bars" id="attack-bars"></div>
    `;
    
    const barsContainer = document.getElementById('attack-bars');
    barsContainer.innerHTML = '';
    
    // Créer des intervalles d'attaque
    const ranges = [
        { min: 0, max: 20, label: '0-20' },
        { min: 20, max: 40, label: '20-40' },
        { min: 40, max: 60, label: '40-60' },
        { min: 60, max: 80, label: '60-80' },
        { min: 80, max: 100, label: '80-100' },
        { min: 100, max: 200, label: '100+' }
    ];
    
    const maxCount = Math.max(...ranges.map(range => 
        EditorState.cards.filter(card => card.attack >= range.min && card.attack < range.max).length
    ));
    
    ranges.forEach(range => {
        const count = EditorState.cards.filter(card => card.attack >= range.min && card.attack < range.max).length;
        const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
        
        const bar = document.createElement('div');
        bar.className = 'editor-chart-bar';
        bar.innerHTML = `
            <span class="label">${range.label}</span>
            <div class="bar-container">
                <div class="bar" style="width: ${percentage}%; background: var(--primary);"></div>
            </div>
            <span class="value">${count}</span>
        `;
        
        barsContainer.appendChild(bar);
    });
}

// Rendre le graphique de défense
function renderDefenseChart() {
    const container = document.getElementById('defense-chart');
    container.innerHTML = `
        <h3>Répartition des Défenses</h3>
        <div class="editor-chart-bars" id="defense-bars"></div>
    `;
    
    const barsContainer = document.getElementById('defense-bars');
    barsContainer.innerHTML = '';
    
    // Créer des intervalles de défense
    const ranges = [
        { min: 0, max: 20, label: '0-20' },
        { min: 20, max: 40, label: '20-40' },
        { min: 40, max: 60, label: '40-60' },
        { min: 60, max: 80, label: '60-80' },
        { min: 80, max: 100, label: '80-100' },
        { min: 100, max: 200, label: '100+' }
    ];
    
    const maxCount = Math.max(...ranges.map(range => 
        EditorState.cards.filter(card => card.defense >= range.min && card.defense < range.max).length
    ));
    
    ranges.forEach(range => {
        const count = EditorState.cards.filter(card => card.defense >= range.min && card.defense < range.max).length;
        const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
        
        const bar = document.createElement('div');
        bar.className = 'editor-chart-bar';
        bar.innerHTML = `
            <span class="label">${range.label}</span>
            <div class="bar-container">
                <div class="bar" style="width: ${percentage}%; background: var(--secondary);"></div>
            </div>
            <span class="value">${count}</span>
        `;
        
        barsContainer.appendChild(bar);
    });
}

// Afficher un toast dans l'éditeur
function showEditorToast(title, message, type = 'info') {
    const container = document.getElementById('editor-toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</div>
        <div class="toast-message">
            <div class="toast-title">${title}</div>
            <div class="toast-description">${message}</div>
        </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Démarrer l'éditeur quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initEditor);
