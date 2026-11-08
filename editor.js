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
            // Ajouter image: null si manquant pour les cartes personnalisées
            const normalizedCards = parsedCards.map(card => ({
                ...card,
                image: card.image !== undefined ? card.image : null
            }));
            // Ajouter les cartes personnalisées aux cartes par défaut
            EditorState.cards = [...CARDS, ...normalizedCards];
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
        
        const hasImage = card.image && card.image !== null && card.image !== '';
        const imageHtml = hasImage ? `<div class="editor-card-image"><img src="${card.image}" alt="${card.name}" onerror="this.style.display='none'"></div>` : '';
        
        cardElement.innerHTML = `
            ${imageHtml}
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
    const image = document.getElementById('new-image').value;
    
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
        emoji: emoji,
        image: image || null,
        isCustom: true
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
    
    // Load image preview
    loadImagePreview(card.image, 'edit-image-preview', 'edit-image');
    
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
    const image = document.getElementById('edit-image').value;
    
    // Mettre à jour la carte
    const originalCard = EditorState.cards[index];
    EditorState.cards[index] = {
        id: id,
        name: name,
        description: description,
        category: category,
        rarity: rarity,
        attack: attack,
        defense: defense,
        views: views,
        emoji: emoji,
        image: image || null,
        isCustom: originalCard.isCustom || false
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
    } else if (EditorState.pendingAction === 'publish') {
        doPublishToGithub();
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
    // Séparer les cartes personnalisées des cartes par défaut
    const customCards = EditorState.cards.filter(card => card.isCustom);
    
    // Sauvegarder uniquement les cartes personnalisées dans localStorage
    localStorage.setItem('franceMastersCustomCards', JSON.stringify(customCards));
    
    // Mettre à jour le fichier data.js (uniquement les cartes personnalisées)
    updateDataJs();
    
    showEditorToast('Succès', 'Cartes personnalisées sauvegardées !', 'success');
}

// Mettre à jour le fichier data.js
// Mettre à jour le fichier data.js : génère la version complète (toutes les cartes)
// et la télécharge. Utilisé aussi par la publication GitHub.
function updateDataJs() {
    const dataJsContent = generateDataJsContent(EditorState.cards);
    const blob = new Blob([dataJsContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.js';
    a.click();
    URL.revokeObjectURL(url);
}

// Générer le contenu complet de data.js à partir d'une liste de cartes
function generateDataJsContent(cards) {
    const catKeys = {};
    Object.keys(CATEGORIES).forEach(function (key) {
        catKeys[CATEGORIES[key]] = 'CATEGORIES.' + key;
    });
    const lines = [];
    lines.push('// France Masters - Données des cartes');
    lines.push('// Basées sur de vrais articles Wikipédia France');
    lines.push('// Généré automatiquement par l\'éditeur de cartes');
    lines.push('');
    lines.push('const CATEGORIES = {');
    Object.keys(CATEGORIES).forEach(function (key, i, arr) {
        lines.push('    ' + key + ': ' + JSON.stringify(CATEGORIES[key]) + (i < arr.length - 1 ? ',' : ''));
    });
    lines.push('});');
    lines.push('');
    lines.push('const RARITIES = {');
    Object.keys(RARITIES).forEach(function (key, i, arr) {
        const r = RARITIES[key];
        lines.push('    ' + key + ': { code: ' + JSON.stringify(r.code) + ', name: ' + JSON.stringify(r.name) + ', weight: ' + r.weight + ', color: ' + JSON.stringify(r.color) + ', bgColor: ' + JSON.stringify(r.bgColor) + ' }' + (i < arr.length - 1 ? ',' : ''));
    });
    lines.push('});');
    lines.push('');
    lines.push('// Tableau de toutes les cartes');
    lines.push('const CARDS = [');
    cards.forEach(function (card, idx) {
        lines.push('    {');
        lines.push('        id: ' + card.id + ',');
        lines.push('        name: ' + JSON.stringify(card.name) + ',');
        lines.push('        description: ' + JSON.stringify(card.description) + ',');
        lines.push('        category: ' + (catKeys[card.category] || JSON.stringify(card.category)) + ',');
        lines.push('        rarity: ' + JSON.stringify(card.rarity) + ',');
        lines.push('        attack: ' + card.attack + ',');
        lines.push('        defense: ' + card.defense + ',');
        lines.push('        views: ' + card.views + ',');
        lines.push('        emoji: ' + JSON.stringify(card.emoji) + ',');
        if (card.isCustom) lines.push('        isCustom: true,');
        lines.push('        image: ' + (card.image ? JSON.stringify(card.image) : 'null'));
        lines.push('    }' + (idx < cards.length - 1 ? ',' : ''));
    });
    lines.push('];');
    lines.push('');
    lines.push('// Achievements');
    lines.push('const ACHIEVEMENTS = {');
    Object.keys(ACHIEVEMENTS).forEach(function (key, i, arr) {
        const a = ACHIEVEMENTS[key];
        lines.push('    ' + key + ': { id: ' + JSON.stringify(a.id) + ', name: ' + JSON.stringify(a.name) + ', description: ' + JSON.stringify(a.description) + ', completed: false }' + (i < arr.length - 1 ? ',' : ''));
    });
    lines.push('});');
    lines.push('');
    lines.push('// Export pour game.js');
    lines.push("if (typeof module !== 'undefined' && module.exports) {");
    lines.push('    module.exports = { CARDS, CATEGORIES, RARITIES, ACHIEVEMENTS };');
    lines.push('});');
    return lines.join('\n') + '\n';
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

// ========== IMAGE UPLOAD FUNCTIONS ==========

// Preview image when file is selected
function previewImage(event, previewId) {
    const file = event.target.files[0];
    const preview = document.getElementById(previewId);
    const hiddenInputId = previewId.replace('-preview', '');
    const hiddenInput = document.getElementById(hiddenInputId);
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Store as data URL in hidden input
            hiddenInput.value = e.target.result;
            
            // Update preview
            preview.innerHTML = `<img src="${e.target.result}" alt="Aperçu">`;
        };
        reader.readAsDataURL(file);
    } else {
        // Clear preview and hidden input
        hiddenInput.value = '';
        preview.innerHTML = '<span>📷 Aucune image</span>';
    }
}

// Load image preview when editing a card
function loadImagePreview(imageUrl, previewId, hiddenInputId) {
    const preview = document.getElementById(previewId);
    const hiddenInput = document.getElementById(hiddenInputId);
    
    if (imageUrl && imageUrl !== '' && imageUrl !== null) {
        hiddenInput.value = imageUrl;
        // Check if it's a data URL or external URL
        if (imageUrl.startsWith('data:')) {
            preview.innerHTML = `<img src="${imageUrl}" alt="Aperçu">`;
        } else {
            // For external URLs, show the image
            preview.innerHTML = `<img src="${imageUrl}" alt="Aperçu" onerror="this.parentElement.innerHTML='<span>📷 Image non disponible</span>'">`;
        }
    } else {
        hiddenInput.value = '';
        preview.innerHTML = '<span>📷 Aucune image</span>';
    }
}

// ========== SYSTÈME D'UPLOAD GITHUB ==========

// Ouvrir le modal de configuration GitHub
function openGithubModal() {
    const input = document.getElementById('github-token-input');
    input.value = GitHubSync.getToken();
    updateGithubTokenStatus('');
    document.getElementById('github-modal').style.display = 'flex';
}

function closeGithubModal() {
    document.getElementById('github-modal').style.display = 'none';
}

function saveGithubToken() {
    const token = document.getElementById('github-token-input').value.trim();
    if (!token) {
        GitHubSync.clearToken();
        updateGithubTokenStatus('Token supprimé du navigateur.');
        return;
    }
    GitHubSync.setToken(token);
    updateGithubTokenStatus('Token enregistré dans le navigateur. Cliquez sur « Tester » pour vérifier la connexion.');
}

async function testGithubConnection() {
    updateGithubTokenStatus('Test de connexion en cours...');
    const token = document.getElementById('github-token-input').value.trim();
    if (token) GitHubSync.setToken(token);
    try {
        const info = await GitHubSync.testConnection();
        updateGithubTokenStatus('✅ Connecté en tant que ' + info.login + ' — dépôt ' + info.repo + ' accessible.', 'ok');
    } catch (e) {
        updateGithubTokenStatus('❌ ' + e.message, 'error');
    }
}

function updateGithubTokenStatus(msg, type) {
    const el = document.getElementById('github-status');
    el.textContent = msg || ' ';
    el.className = type || '';
}

// Confirmer la publication sur GitHub
function confirmPublishToGithub() {
    if (!GitHubSync.hasToken()) {
        openGithubModal();
        showEditorToast('Info', 'Configurez votre token GitHub (bouton 🔑 Token) pour publier.', 'info');
        return;
    }
    const pendingImages = EditorState.cards.filter(function (c) { return c.image && c.image.indexOf('data:') === 0; }).length;
    document.getElementById('confirm-title').textContent = 'Publier sur GitHub';
    document.getElementById('confirm-message').textContent = EditorState.cards.length + ' cartes seront publiées dans data.js' + (pendingImages > 0 ? ', dont ' + pendingImages + ' image(s) à uploader dans images/' : '') + '. Continuer ?';
    EditorState.pendingAction = 'publish';
    document.getElementById('confirm-modal').style.display = 'flex';
}

// Publication effective sur GitHub
async function doPublishToGithub() {
    showEditorToast('Info', 'Publication en cours sur GitHub...', 'info');
    try {
        let uploaded = 0;
        for (const card of EditorState.cards) {
            if (card.image && card.image.indexOf('data:') === 0) {
                card.image = await GitHubSync.uploadImage(card.id, card.image);
                uploaded++;
            }
        }
        const content = generateDataJsContent(EditorState.cards);
        await GitHubSync.putFile(GitHubSync.config.dataPath, content, 'Mise à jour des cartes depuis l\'éditeur (' + EditorState.cards.length + ' cartes)');
        localStorage.setItem('franceMastersCustomCards', JSON.stringify(EditorState.cards.filter(function (c) { return c.isCustom; })));
        showEditorToast('Succès', 'Publication réussie !' + (uploaded > 0 ? ' ' + uploaded + ' image(s) uploadée(s) dans images/.' : ''), 'success');
        renderEditorCards();
    } catch (e) {
        showEditorToast('Erreur', 'Publication impossible : ' + e.message, 'error');
    }
}

// Recharger data.js depuis GitHub
async function loadFromGithub() {
    if (!GitHubSync.hasToken()) {
        openGithubModal();
        showEditorToast('Info', 'Configurez votre token GitHub (bouton 🔑 Token) pour recharger.', 'info');
        return;
    }
    showEditorToast('Info', 'Chargement de data.js depuis GitHub...', 'info');
    try {
        const file = await GitHubSync.getFile(GitHubSync.config.dataPath);
        const loadedCards = GitHubSync.parseCards(file.content);
        if (!Array.isArray(loadedCards) || loadedCards.length === 0) throw new Error('Aucune carte trouvée dans data.js');
        EditorState.cards = loadedCards;
        EditorState.filteredCards = [...loadedCards];
        renderEditorCards();
        renderCategoriesStats();
        renderRaritiesStats();
        renderOverviewStats();
        renderCharts();
        showEditorToast('Succès', loadedCards.length + ' cartes chargées depuis GitHub.', 'success');
    } catch (e) {
        showEditorToast('Erreur', 'Chargement impossible : ' + e.message, 'error');
    }
}

// Exposer les nouvelles fonctions
window.confirmPublishToGithub = confirmPublishToGithub;
window.openGithubModal = openGithubModal;
window.closeGithubModal = closeGithubModal;
window.saveGithubToken = saveGithubToken;
window.testGithubConnection = testGithubConnection;
window.loadFromGithub = loadFromGithub;
