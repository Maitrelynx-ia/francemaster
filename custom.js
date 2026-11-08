// France Masters - Gestion des Cartes Personnalisées
// Permet aux utilisateurs de créer leurs propres cartes

// Catégorie pour les cartes personnalisées
const CUSTOM_CATEGORY = "Personnalisée";

// Fonctions pour gérer les cartes personnalisées
function getCustomCards() {
    const customCardsData = localStorage.getItem('franceMastersCustomCards');
    if (customCardsData) {
        try {
            return JSON.parse(customCardsData);
        } catch (e) {
            console.error('Erreur chargement cartes personnalisées:', e);
            return [];
        }
    }
    return [];
}

function saveCustomCards(customCards) {
    localStorage.setItem('franceMastersCustomCards', JSON.stringify(customCards));
}

function addCustomCard(card) {
    const customCards = getCustomCards();
    // Vérifier si l'ID existe déjà
    if (customCards.some(c => c.id === card.id)) {
        showToast('Erreur', 'Une carte avec cet ID existe déjà !', 'error');
        return false;
    }
    customCards.push(card);
    saveCustomCards(customCards);
    showToast('Succès', `Carte "${card.name}" ajoutée !`, 'success');
    return true;
}

function removeCustomCard(cardId) {
    let customCards = getCustomCards();
    customCards = customCards.filter(card => card.id !== cardId);
    saveCustomCards(customCards);
    showToast('Succès', 'Carte supprimée', 'success');
    return true;
}

function getAllCards() {
    return [...CARDS, ...getCustomCards()];
}

// Générer un ID unique pour une carte personnalisée
function generateCustomId() {
    const customCards = getCustomCards();
    const usedIds = [...CARDS.map(c => c.id), ...customCards.map(c => c.id)];
    let newId = 10000; // Commencer à 10000 pour éviter les conflits
    while (usedIds.includes(newId)) {
        newId++;
    }
    return newId;
}

// Créer une carte personnalisée depuis l'éditeur
function createCustomCardFromEditor(data) {
    const card = {
        id: data.id || generateCustomId(),
        name: data.name,
        description: data.description,
        category: data.category === CUSTOM_CATEGORY ? data.category : CATEGORIES.HISTOIRE,
        rarity: data.rarity,
        attack: parseInt(data.attack) || 50,
        defense: parseInt(data.defense) || 50,
        views: parseInt(data.views) || 1000000,
        emoji: data.emoji || "❓",
        isCustom: true
    };
    return addCustomCard(card);
}

// Exposer les fonctions globalement
window.getCustomCards = getCustomCards;
window.saveCustomCards = saveCustomCards;
window.addCustomCard = addCustomCard;
window.removeCustomCard = removeCustomCard;
window.getAllCards = getAllCards;
window.generateCustomId = generateCustomId;
window.createCustomCardFromEditor = createCustomCardFromEditor;
window.CUSTOM_CATEGORY = CUSTOM_CATEGORY;
