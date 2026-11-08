// France Masters - Logique du jeu
// Jeu de cartes à collectionner inspiré de WikiMasters

// ========== ÉTAT DU JEU ==========
const GameState = {
    collection: {},
    customCards: [],
    coins: 300,
    stats: {
        packsOpened: 0,
        duelsPlayed: 0,
        duelsWon: 0,
        coinsSpent: 0,
        coinsEarned: 0
    },
    achievements: {},
    recentCards: [],
    duel: {
        isOngoing: false,
        playerCards: [],
        opponentCards: [],
        playerActiveIndex: 0,
        opponentActiveIndex: 0,
        playerHP: [],
        opponentHP: [],
        turn: 1,
        currentQuestion: null,
        currentAnswers: [],
        correctAnswerIndex: null,
        selectedAnswerIndex: null,
        log: []
    }
};

// ========== INITIALISATION ==========
function initGame() {
    loadGame();
    initEventListeners();
    updateUI();
    initAchievements();
    checkAchievements();
}

function initEventListeners() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
    document.getElementById('category-filter').addEventListener('change', filterCollection);
    document.getElementById('rarity-filter').addEventListener('change', filterCollection);
    document.getElementById('sort-filter').addEventListener('change', filterCollection);
}

function loadGame() {
    const savedState = localStorage.getItem('franceMastersSave');
    if (savedState) {
        try {
            const parsedState = JSON.parse(savedState);
            GameState.collection = parsedState.collection || {};
            GameState.customCards = parsedState.customCards || [];
            GameState.coins = parsedState.coins !== undefined ? parsedState.coins : 300;
            GameState.stats = parsedState.stats || GameState.stats;
            GameState.achievements = parsedState.achievements || {};
            GameState.recentCards = parsedState.recentCards || [];
        } catch (e) {
            console.error('Erreur chargement sauvegarde:', e);
        }
    }
    loadCustomCards();
}

function loadCustomCards() {
    const customCardsData = localStorage.getItem('franceMastersCustomCards');
    if (customCardsData) {
        try {
            GameState.customCards = JSON.parse(customCardsData);
        } catch (e) {
            console.error('Erreur chargement cartes personnalisées:', e);
        }
    }
}

function saveGame() {
    const saveData = {
        collection: GameState.collection,
        customCards: GameState.customCards,
        coins: GameState.coins,
        stats: GameState.stats,
        achievements: GameState.achievements,
        recentCards: GameState.recentCards
    };
    localStorage.setItem('franceMastersSave', JSON.stringify(saveData));
}

function saveCustomCards() {
    localStorage.setItem('franceMastersCustomCards', JSON.stringify(GameState.customCards));
}

function getAllCards() {
    return [...CARDS, ...GameState.customCards];
}

function addCustomCard(card) {
    GameState.customCards.push(card);
    saveCustomCards();
    showToast('Succès', `Carte personnalisée "${card.name}" ajoutée !`, 'success');
}

function removeCustomCard(cardId) {
    GameState.customCards = GameState.customCards.filter(card => card.id !== cardId);
    saveCustomCards();
    showToast('Succès', 'Carte personnalisée supprimée', 'success');
}

function resetGame() {
    GameState.collection = {};
    GameState.coins = 300;
    GameState.stats = { packsOpened: 0, duelsPlayed: 0, duelsWon: 0, coinsSpent: 0, coinsEarned: 0 };
    GameState.achievements = {};
    GameState.recentCards = [];
    GameState.duel = {
        isOngoing: false, playerCards: [], opponentCards: [],
        playerActiveIndex: 0, opponentActiveIndex: 0, playerHP: [], opponentHP: [],
        turn: 1, currentQuestion: null, currentAnswers: [], correctAnswerIndex: null,
        selectedAnswerIndex: null, log: []
    };
    saveGame();
    closeResetModal();
    updateUI();
    showToast('Succès', 'Jeu réinitialisé', 'info');
}

// ========== NAVIGATION ==========
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    
    if (tabId === 'collection') renderCollection();
    else if (tabId === 'duel') renderDuelSetup();
    else if (tabId === 'packs') renderPacksTab();
}

// ========== PACKS ==========
function openPack() {
    // Packs are now free with auth system
    // Check if user is logged in and has packs available
    if (!window.isLoggedIn || !window.isLoggedIn()) {
        if (window.showAuthModal) window.showAuthModal();
        return;
    }
    
    // Le décompte de la réserve de packs est géré par openStoredPack() (auth.js)
    
        GameState.stats.packsOpened += 1;
    const packCards = generatePack();
    addCardsToCollection(packCards);
    showPackOpeningAnimation(packCards);
    saveGame();
    updateUI();
    checkAchievements();
    
    // Update auth UI
    if (window.updateAuthUI) window.updateAuthUI();
}

function generatePack() {
    const pack = [];
    const rarityWeights = [
        { rarity: 'C', weight: 45 },
        { rarity: 'R', weight: 30 },
        { rarity: 'SR', weight: 15 },
        { rarity: 'UR', weight: 7 },
        { rarity: 'L', weight: 3 }
    ];
    let hasRareOrBetter = false;
    
    for (let i = 0; i < 5; i++) {
        if (!hasRareOrBetter && i === 4) {
            const rareRarities = ['R', 'SR', 'UR', 'L'];
            const randomRarity = rareRarities[Math.floor(Math.random() * rareRarities.length)];
            pack.push(getRandomCardByRarity(randomRarity));
            hasRareOrBetter = true;
        } else {
            const random = Math.random() * 100;
            let cumulativeWeight = 0, selectedRarity = 'C';
            for (const rw of rarityWeights) {
                cumulativeWeight += rw.weight;
                if (random < cumulativeWeight) {
                    selectedRarity = rw.rarity; break;
                }
            }
            const card = getRandomCardByRarity(selectedRarity);
            pack.push(card);
            if (['R', 'SR', 'UR', 'L'].includes(selectedRarity)) hasRareOrBetter = true;
        }
    }
    return pack;
}

function getRandomCardByRarity(rarity) {
    const cardsByRarity = getAllCards().filter(card => card.rarity === rarity);
    return cardsByRarity[Math.floor(Math.random() * cardsByRarity.length)];
}

function addCardsToCollection(cards) {
    cards.forEach(card => {
        if (!GameState.collection[card.id]) {
            GameState.collection[card.id] = { count: 0, duplicates: 0 };
        }
        GameState.collection[card.id].count += 1;
        if (GameState.collection[card.id].count > 1) {
            GameState.collection[card.id].duplicates += 1;
        }
        GameState.recentCards.unshift(card);
        if (GameState.recentCards.length > 5) GameState.recentCards.pop();
    });
}

function showPackOpeningAnimation(cards) {
    const modal = document.getElementById('pack-modal');
    const container = document.getElementById('modal-pack-container');
    const continueBtn = document.getElementById('modal-continue-btn');
    const announce = document.getElementById('pack-announcement');
    const title = modal.querySelector('h2');
    modal.style.display = 'flex';
    container.innerHTML = '';
    continueBtn.style.display = 'none';
    continueBtn.classList.remove('pack-fade-up');
    modal.querySelectorAll('.pack-confetti, .pack-flash').forEach(el => el.remove());
    if (announce) announce.innerHTML = '<span>🎁 Ouverture du pack...</span>';
    if (title) title.textContent = 'Ouverture de Pack';

    const cardBacks = [];
    const slots = [];
    for (let i = 0; i < 5; i++) {
        const slot = document.createElement('div');
        slot.className = 'pack-card-slot';
        const cardBack = document.createElement('div');
        cardBack.className = 'card back';
        cardBack.innerHTML = '📦';
        const d = i * 0.12;
        cardBack.style.animationDelay = d + 's, ' + (d + 0.55) + 's';
        slot.appendChild(cardBack);
        container.appendChild(slot);
        cardBacks.push(cardBack);
        slots.push(slot);
    }

    const announceText = { C: 'Carte Commune', R: '💙 Carte Rare', SR: '✨ Super Rare !', UR: '🌟 ULTRA RARE !', L: '🌈 LÉGENDAIRE !!' };
    const particleColors = { SR: '#b57bff', UR: '#ffd700', L: '#ff69b4' };

    function spawnParticles(slot, color) {
        for (let j = 0; j < 14; j++) {
            const p = document.createElement('span');
            p.className = 'pack-particle';
            const angle = Math.random() * Math.PI * 2;
            const dist = 40 + Math.random() * 55;
            p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
            p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
            p.style.setProperty('--pc', color);
            slot.appendChild(p);
        }
    }

    function spawnFlash() {
        const content = modal.querySelector('.pack-modal-content');
        if (!content) return;
        const f = document.createElement('div');
        f.className = 'pack-flash';
        content.appendChild(f);
    }

    function spawnConfetti() {
        const colors = ['#ff69b4', '#ffd700', '#4169e1', '#8a2be2', '#00e676', '#ff6f00'];
        const content = modal.querySelector('.pack-modal-content');
        if (!content) return;
        for (let j = 0; j < 36; j++) {
            const c = document.createElement('div');
            c.className = 'pack-confetti';
            c.style.left = (Math.random() * 100) + '%';
            c.style.width = (5 + Math.random() * 6) + 'px';
            c.style.height = (8 + Math.random() * 8) + 'px';
            c.style.animationDuration = (2.2 + Math.random() * 2.2) + 's';
            c.style.animationDelay = (Math.random() * 0.6) + 's';
            c.style.setProperty('--c', colors[j % colors.length]);
            content.appendChild(c);
        }
    }

    setTimeout(() => {
        if (announce) announce.innerHTML = '';
        cards.forEach((card, index) => {
            setTimeout(() => {
                cardBacks[index].classList.add('reveal-lift');
                setTimeout(() => {
                    cardBacks[index].className = 'card front reveal-pop ' + card.rarity;
                    cardBacks[index].innerHTML = createCardHTML(card, true);
                    if (['SR', 'UR', 'L'].includes(card.rarity)) {
                        cardBacks[index].classList.add('glow');
                        spawnParticles(slots[index], particleColors[card.rarity] || '#ffd700');
                    }
                    if (card.rarity === 'UR' || card.rarity === 'L') spawnFlash();
                    if (card.rarity === 'L') spawnConfetti();
                    if (announce) announce.innerHTML = '<span class="announce-' + card.rarity + '">' + announceText[card.rarity] + '</span>';
                    if (index === cards.length - 1) {
                        setTimeout(() => {
                            if (title) title.textContent = '🎉 Pack Ouvert !';
                            continueBtn.style.display = 'block';
                            continueBtn.classList.add('pack-fade-up');
                        }, 650);
                    }
                }, 350);
            }, index * 750);
        });
    }, 900);
}

function closePackModal() {
    document.getElementById('pack-modal').style.display = 'none';
}

function finishPackOpening() {
    closePackModal();
}

function renderPacksTab() {
    const rarityCounts = { C: 0, R: 0, SR: 0, UR: 0, L: 0 };
    Object.keys(GameState.collection).forEach(cardId => {
        const card = getAllCards().find(c => c.id === parseInt(cardId));
        if (card) {
            const cardData = GameState.collection[cardId];
            rarityCounts[card.rarity] += cardData.count;
        }
    });
    document.getElementById('common-count').textContent = rarityCounts.C;
    document.getElementById('rare-count').textContent = rarityCounts.R;
    document.getElementById('sr-count').textContent = rarityCounts.SR;
    document.getElementById('ur-count').textContent = rarityCounts.UR;
    document.getElementById('legendary-pack-count').textContent = rarityCounts.L;
}

// ========== COLLECTION ==========
function renderCollection() {
    const grid = document.getElementById('collection-grid');
    grid.innerHTML = '';
    
    const categoryFilter = document.getElementById('category-filter').value;
    const rarityFilter = document.getElementById('rarity-filter').value;
    const sortFilter = document.getElementById('sort-filter').value;
    
    let filteredCards = getAllCards().filter(card => {
        if (categoryFilter !== 'all' && card.category !== categoryFilter) return false;
        if (rarityFilter !== 'all' && card.rarity !== rarityFilter) return false;
        return true;
    });
    
    filteredCards.sort((a, b) => {
        switch (sortFilter) {
            case 'id': return a.id - b.id;
            case 'name': return a.name.localeCompare(b.name);
            case 'rarity': return getRarityOrder(a.rarity) - getRarityOrder(b.rarity);
            case 'attack': return b.attack - a.attack;
            case 'defense': return b.defense - a.defense;
            default: return a.id - b.id;
        }
    });
    
    filteredCards.forEach(card => {
        const hasCard = GameState.collection[card.id] && GameState.collection[card.id].count > 0;
        const duplicates = hasCard ? GameState.collection[card.id].duplicates : 0;
        const cardElement = document.createElement('div');
        cardElement.className = `card ${card.rarity} ${hasCard ? 'owned' : 'locked'}`;
        cardElement.dataset.cardId = card.id;
        cardElement.innerHTML = createCardHTML(card, hasCard, duplicates);
        if (hasCard) {
            cardElement.addEventListener('click', () => showCardDetails(card, duplicates));
        }
        grid.appendChild(cardElement);
    });
    
    updateCollectionProgress();
    renderDuplicates();
}

function getRarityOrder(rarity) {
    const order = { C: 1, R: 2, SR: 3, UR: 4, L: 5 };
    return order[rarity] || 0;
}

function filterCollection() {
    renderCollection();
}

function createCardHTML(card, owned = true, duplicates = 0) {
    const hasImage = card.image && card.image !== null && card.image !== '';
    const cardImageClass = hasImage ? 'has-image' : '';
    const imageHtml = hasImage ? `<div class="card-image-container"><img class="card-image" src="${card.image}" alt="${card.name}" onerror="this.style.display='none'"></div>` : '';
    
    if (!owned) {
        return `
            <div class="card-header" data-category="${card.category}">
                <div class="card-emoji">❓</div>
                <div class="card-rarity ${card.rarity}">${card.rarity}</div>
            </div>
            <div class="card-body">
                <div class="card-name">???</div>
                <div class="card-description"></div>
            </div>
            <div class="card-footer">
                <span class="card-id">#${card.id}</span>
            </div>
        `;
    }
    
    return `
        ${imageHtml}
        <div class="card-header" data-category="${card.category}">
            <div class="card-emoji">${card.emoji}</div>
            <div class="card-rarity ${card.rarity}">${card.rarity}</div>
        </div>
        <div class="card-body">
            <div class="card-name">${card.name}</div>
            <div class="card-description">${card.description}</div>
            <div class="card-stats">
                <div class="card-stat">
                    <span class="card-stat-label">ATQ</span>
                    <span class="card-stat-value">${card.attack}</span>
                </div>
                <div class="card-stat">
                    <span class="card-stat-label">DEF</span>
                    <span class="card-stat-value">${card.defense}</span>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <span class="card-views">👁️ ${formatNumber(card.views)}</span>
            <span class="card-id">#${card.id}</span>
        </div>
        ${duplicates > 0 ? `<div class="duplicate-counter">${duplicates}</div>` : ''}
    `;
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function updateCollectionProgress() {
    const totalCards = CARDS.length;
    const ownedCards = Object.keys(GameState.collection).filter(id => GameState.collection[id].count > 0).length;
    const progress = (ownedCards / totalCards) * 100;
    document.getElementById('collection-progress-bar').style.width = `${progress}%`;
    document.getElementById('collection-progress-text').textContent = `${ownedCards}/${totalCards} cartes (${Math.round(progress)}%)`;
    document.getElementById('total-cards').textContent = `${ownedCards}/${totalCards}`;
    document.getElementById('collection-percent').textContent = `${Math.round(progress)}%`;
}

function renderDuplicates() {
    const grid = document.getElementById('duplicates-grid');
    grid.innerHTML = '';
    const duplicates = [];
    Object.keys(GameState.collection).forEach(cardId => {
        const cardData = GameState.collection[cardId];
        if (cardData.duplicates > 0) {
            const card = getAllCards().find(c => c.id === parseInt(cardId));
            if (card) duplicates.push({ card, count: cardData.duplicates });
        }
    });
    if (duplicates.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">Aucun doublon</p>';
        return;
    }
    duplicates.forEach(dup => {
        const el = document.createElement('div');
        el.className = 'duplicate-item';
        el.innerHTML = `
            <div class="duplicate-card-preview">${dup.card.emoji}</div>
            <div class="duplicate-info">
                <div class="duplicate-name">${dup.card.name}</div>
                <div class="duplicate-count">x${dup.count}</div>
            </div>
        `;
        grid.appendChild(el);
    });
    const totalDuplicates = duplicates.reduce((sum, dup) => sum + dup.count, 0);
    document.getElementById('total-duplicates').textContent = totalDuplicates;
}

function showCardDetails(card, duplicates) {
    const modal = document.createElement('div');
    modal.className = 'card-detail-modal';
    modal.innerHTML = `
        <div class="card-detail-content">
            <div class="card-detail-close" onclick="this.parentElement.parentElement.remove()">&times;</div>
            <div class="card-detail-card">
                <div class="card ${card.rarity}">${createCardHTML(card, true, duplicates)}</div>
            </div>
            <div style="margin-top: var(--spacing-lg); text-align: center;">
                <h3 style="color: var(--primary-dark); margin-bottom: var(--spacing-sm);">${card.name}</h3>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">${card.description}</p>
                <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: var(--spacing-sm);">
                    Catégorie: ${card.category} | Rareté: ${getRarityName(card.rarity)} | Vues: ${formatNumber(card.views)}
                </p>
                ${duplicates > 0 ? `<p style="color: var(--secondary); font-size: 0.85rem;">Doublons: ${duplicates}</p>` : ''}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function getRarityName(rarity) {
    const names = { C: 'Commune', R: 'Rare', SR: 'Super Rare', UR: 'Ultra Rare', L: 'Légendaire' };
    return names[rarity] || rarity;
}

// ========== DUELS ==========
function renderDuelSetup() {
    const grid = document.getElementById('duel-selection-grid');
    const selectedContainer = document.getElementById('duel-selected-cards');
    const startBtn = document.getElementById('start-duel-btn');
    grid.innerHTML = '';
    selectedContainer.innerHTML = '';
    // NB : ne pas réinitialiser GameState.duel.playerCards ici, la sélection doit persister entre les rendus
    
    const playerCards = getAllCards().filter(card => GameState.collection[card.id] && GameState.collection[card.id].count > 0);
    if (playerCards.length < 3) {
        grid.innerHTML = '<p style="color: var(--text-secondary); text-align: center; grid-column: 1 / -1;">Vous possédez ' + playerCards.length + ' carte(s) sur les 3 nécessaires. Ouvrez des packs pour collectionner au moins 3 cartes !</p>';
        startBtn.disabled = true;
        return;
    }
    
    playerCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card ' + card.rarity;
        cardElement.dataset.cardId = card.id;
        cardElement.innerHTML = createCardHTML(card, true);
        const isSelected = GameState.duel.playerCards.some(c => c.id === card.id);
        if (isSelected) cardElement.classList.add('selected');
        cardElement.addEventListener('click', () => selectCardForDuel(card));
        grid.appendChild(cardElement);
    });
    renderSelectedSlots();
    startBtn.disabled = GameState.duel.playerCards.length < 3;
    const currentDifficulty = GameState.duel.difficulty || 'normal';
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.difficulty === currentDifficulty);
    });
}

function selectCardForDuel(card) {
    const cardIndex = GameState.duel.playerCards.findIndex(c => c.id === card.id);
    if (cardIndex === -1) {
        if (GameState.duel.playerCards.length < 3) {
            GameState.duel.playerCards.push(card);
            showToast('Succès', card.name + ' sélectionnée !', 'success');
        } else {
            showToast('Erreur', 'Max 3 cartes !', 'error');
            return;
        }
    } else {
        GameState.duel.playerCards.splice(cardIndex, 1);
        showToast('Info', card.name + ' retirée', 'info');
    }
    renderDuelSetup();
}

function renderSelectedSlots() {
    const container = document.getElementById('duel-selected-cards');
    container.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const slot = document.createElement('div');
        slot.className = 'selected-slot';
        if (GameState.duel.playerCards[i]) {
            const card = GameState.duel.playerCards[i];
            slot.innerHTML = card.emoji;
            slot.title = card.name;
        } else {
            slot.innerHTML = '?';
        }
        container.appendChild(slot);
    }
}

function setDuelDifficulty(difficulty) {
    GameState.duel.difficulty = difficulty;
    const descs = {
        easy: 'Adversaire plus faible, 20s par question, récompenses x1',
        normal: 'Adversaire équilibré, 15s par question, récompenses x1.5',
        hard: 'Adversaire redoutable, 10s par question, IA +25% de dégâts, récompenses x2.5'
    };
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.difficulty === difficulty);
    });
    const desc = document.getElementById('duel-difficulty-desc');
    if (desc) desc.textContent = descs[difficulty] || descs.normal;
}

function getDuelConfig() {
    const configs = {
        easy: { label: 'Facile', power: 0.75, oppoMult: 0.8, timer: 20, rewardMult: 1, penalty: 15, rewardText: '≈ 60-110 pièces' },
        normal: { label: 'Normal', power: 1, oppoMult: 1, timer: 15, rewardMult: 1.5, penalty: 25, rewardText: '≈ 90-170 pièces' },
        hard: { label: 'Difficile', power: 1.3, oppoMult: 1.25, timer: 10, rewardMult: 2.5, penalty: 40, rewardText: '≈ 150-280 pièces' }
    };
    return configs[GameState.duel.difficulty] || configs.normal;
}

function startDuel() {
    if (GameState.duel.playerCards.length < 3) {
        showToast('Erreur', 'Sélectionnez 3 cartes !', 'error');
        return;
    }
    const config = getDuelConfig();
    GameState.duel.opponentCards = generateOpponentCards();
    GameState.duel.playerHP = GameState.duel.playerCards.map(card => card.defense * 10);
    GameState.duel.opponentHP = GameState.duel.opponentCards.map(card => card.defense * 10);
    GameState.duel.playerActiveIndex = 0;
    GameState.duel.opponentActiveIndex = 0;
    GameState.duel.turn = 1;
    GameState.duel.log = [];
    GameState.duel.streak = 0;
    GameState.duel.maxStreak = 0;
    GameState.duel.correctCount = 0;
    GameState.duel.answerCount = 0;
    GameState.duel.isOngoing = true;
    const rewardEl = document.getElementById('duel-reward');
    if (rewardEl) rewardEl.textContent = config.rewardText;
    document.getElementById('duel-setup').style.display = 'none';
    document.getElementById('duel-ongoing').style.display = 'block';
    renderDuelOngoing();
    generateDuelQuestion();
    checkAchievements();
}

function generateOpponentCards() {
    const config = getDuelConfig();
    const playerPower = GameState.duel.playerCards.reduce((sum, card) => sum + card.attack + card.defense, 0) / GameState.duel.playerCards.length;
    const targetPower = playerPower * config.power;
    const availableCards = [...CARDS];
    availableCards.sort((a, b) => {
        const aDiff = Math.abs((a.attack + a.defense) - targetPower);
        const bDiff = Math.abs((b.attack + b.defense) - targetPower);
        return aDiff - bDiff;
    });
    const picks = [];
    for (let i = 0; i < 3; i++) {
        const windowSize = Math.min(10, availableCards.length);
        picks.push(availableCards.splice(Math.floor(Math.random() * windowSize), 1)[0]);
    }
    return picks;
}

function renderDuelSide(containerId, cards, hps, activeIndex, owned) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = owned ? ('card ' + card.rarity) : 'card locked';
        cardElement.innerHTML = createCardHTML(card, owned);
        const maxHp = card.defense * 10;
        const hp = Math.max(0, hps[index]);
        const track = document.createElement('div');
        track.className = 'duel-hp-track';
        const fill = document.createElement('div');
        fill.className = 'duel-hp-fill';
        const ratio = hp / maxHp;
        if (ratio > 0.5) fill.classList.add('high');
        else if (ratio > 0.25) fill.classList.add('mid');
        else fill.classList.add('low');
        fill.style.width = Math.max(0, ratio * 100) + '%';
        track.appendChild(fill);
        cardElement.appendChild(track);
        const hpText = document.createElement('div');
        hpText.className = 'duel-hp-text';
        hpText.textContent = Math.round(hp) + '/' + maxHp;
        cardElement.appendChild(hpText);
        if (index === activeIndex) cardElement.classList.add('active');
        container.appendChild(cardElement);
    });
}

function renderDuelOngoing() {
    renderDuelSide('duel-player-cards', GameState.duel.playerCards, GameState.duel.playerHP, GameState.duel.playerActiveIndex, true);
    renderDuelSide('duel-opponent-cards', GameState.duel.opponentCards, GameState.duel.opponentHP, GameState.duel.opponentActiveIndex, false);
    
    const opponentActive = GameState.duel.opponentCards[GameState.duel.opponentActiveIndex];
    document.getElementById('duel-opponent-active').innerHTML = '<div class="card" style="width: 100px; height: 140px;"><div class="card-header" data-category="' + opponentActive.category + '"><div class="card-emoji">' + opponentActive.emoji + '</div></div><div class="card-body"><div class="card-name">???</div></div></div>';
    
    const playerActive = GameState.duel.playerCards[GameState.duel.playerActiveIndex];
    document.getElementById('duel-player-active').innerHTML = '<div class="card ' + playerActive.rarity + '" style="width: 100px; height: 140px;">' + createCardHTML(playerActive, true) + '</div>';
    
    renderDuelLog();
    document.getElementById('duel-turn').textContent = GameState.duel.turn;
}

function generateDuelQuestion() {
    const questionTypes = ['category', 'description', 'highest_attack', 'highest_defense', 'card_name'];
    const randomType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    switch (randomType) {
        case 'category': generateCategoryQuestion(); break;
        case 'description': generateDescriptionQuestion(); break;
        case 'highest_attack': generateHighestAttackQuestion(); break;
        case 'highest_defense': generateHighestDefenseQuestion(); break;
        case 'card_name': generateCardNameQuestion(); break;
    }
}

function generateCategoryQuestion() {
    const allCards = [...GameState.duel.playerCards, ...GameState.duel.opponentCards];
    const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
    GameState.duel.currentQuestion = `À quelle catégorie appartient ${randomCard.emoji} ?`;
    const categories = [...new Set(getAllCards().map(card => card.category))];
    const correctAnswer = randomCard.category;
    const shuffledCategories = shuffleArray([...categories]);
    let correctIndex = shuffledCategories.findIndex(cat => cat === correctAnswer);
    if (correctIndex >= 4 || correctIndex === -1) {
        shuffledCategories[0] = correctAnswer; GameState.duel.correctAnswerIndex = 0;
    } else { GameState.duel.correctAnswerIndex = correctIndex; }
    GameState.duel.currentAnswers = shuffledCategories.slice(0, 4);
    renderDuelQuestion();
}

function generateDescriptionQuestion() {
    const randomCard = GameState.duel.playerCards[Math.floor(Math.random() * GameState.duel.playerCards.length)];
    GameState.duel.currentQuestion = `Description de ${randomCard.name} ?`;
    const allDescriptions = getAllCards().map(card => card.description);
    const correctAnswer = randomCard.description;
    const shuffled = shuffleArray([...allDescriptions]);
    let correctIndex = shuffled.findIndex(d => d === correctAnswer);
    if (correctIndex >= 4 || correctIndex === -1) {
        shuffled[0] = correctAnswer; GameState.duel.correctAnswerIndex = 0;
    } else { GameState.duel.correctAnswerIndex = correctIndex; }
    GameState.duel.currentAnswers = shuffled.slice(0, 4);
    renderDuelQuestion();
}

function generateHighestAttackQuestion() {
    const allCards = [...GameState.duel.playerCards, ...GameState.duel.opponentCards];
    const highest = allCards.reduce((max, card) => card.attack > max.attack ? card : max, allCards[0]);
    GameState.duel.currentQuestion = 'Quelle carte a la plus haute attaque ?';
    const names = allCards.map(card => card.name);
    const correctAnswer = highest.name;
    const shuffled = shuffleArray([...names]);
    let correctIndex = shuffled.findIndex(n => n === correctAnswer);
    if (correctIndex >= 4 || correctIndex === -1) {
        shuffled[0] = correctAnswer; GameState.duel.correctAnswerIndex = 0;
    } else { GameState.duel.correctAnswerIndex = correctIndex; }
    GameState.duel.currentAnswers = shuffled.slice(0, 4);
    renderDuelQuestion();
}

function generateHighestDefenseQuestion() {
    const allCards = [...GameState.duel.playerCards, ...GameState.duel.opponentCards];
    const highest = allCards.reduce((max, card) => card.defense > max.defense ? card : max, allCards[0]);
    GameState.duel.currentQuestion = 'Quelle carte a la plus haute défense ?';
    const names = allCards.map(card => card.name);
    const correctAnswer = highest.name;
    const shuffled = shuffleArray([...names]);
    let correctIndex = shuffled.findIndex(n => n === correctAnswer);
    if (correctIndex >= 4 || correctIndex === -1) {
        shuffled[0] = correctAnswer; GameState.duel.correctAnswerIndex = 0;
    } else { GameState.duel.correctAnswerIndex = correctIndex; }
    GameState.duel.currentAnswers = shuffled.slice(0, 4);
    renderDuelQuestion();
}

function generateCardNameQuestion() {
    const allCards = [...GameState.duel.playerCards, ...GameState.duel.opponentCards];
    const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
    GameState.duel.currentQuestion = `Nom de la carte ${randomCard.emoji} ?`;
    const names = getAllCards().map(card => card.name);
    const correctAnswer = randomCard.name;
    const shuffled = shuffleArray([...names]);
    let correctIndex = shuffled.findIndex(n => n === correctAnswer);
    if (correctIndex >= 4 || correctIndex === -1) {
        shuffled[0] = correctAnswer; GameState.duel.correctAnswerIndex = 0;
    } else { GameState.duel.correctAnswerIndex = correctIndex; }
    GameState.duel.currentAnswers = shuffled.slice(0, 4);
    renderDuelQuestion();
}

function renderDuelQuestion() {
    const qc = document.getElementById('duel-question');
    const ac = document.getElementById('duel-answers');
    let html = '<h3>' + GameState.duel.currentQuestion + '</h3>';
    if (GameState.duel.streak >= 2) {
        html += '<div class="duel-combo">🔥 Série de ' + GameState.duel.streak + ' bonnes réponses !</div>';
    }
    qc.innerHTML = html;
    ac.innerHTML = '';
    GameState.duel.currentAnswers.forEach((answer, index) => {
        const el = document.createElement('div');
        el.className = 'duel-answer';
        el.textContent = answer;
        el.dataset.index = index;
        el.addEventListener('click', () => selectDuelAnswer(index));
        ac.appendChild(el);
    });
    startQuestionTimer();
}

function startQuestionTimer() {
    stopQuestionTimer();
    const config = getDuelConfig();
    let remaining = config.timer;
    GameState.duel.remainingTime = remaining;
    updateDuelTimerDisplay(remaining, config.timer);
    GameState.duel.questionTimerId = setInterval(() => {
        remaining -= 1;
        GameState.duel.remainingTime = remaining;
        updateDuelTimerDisplay(remaining, config.timer);
        if (remaining <= 0) {
            stopQuestionTimer();
            handleDuelTimeout();
        }
    }, 1000);
}

function stopQuestionTimer() {
    if (GameState.duel.questionTimerId) {
        clearInterval(GameState.duel.questionTimerId);
        GameState.duel.questionTimerId = null;
    }
}

function updateDuelTimerDisplay(remaining, total) {
    const display = document.getElementById('duel-timer-display');
    if (display) {
        display.textContent = '⏱️ ' + Math.max(0, remaining) + 's';
        display.classList.toggle('urgent', remaining <= 5);
    }
    const bar = document.getElementById('duel-timer-bar');
    if (bar) bar.style.width = Math.max(0, (remaining / total) * 100) + '%';
}

function handleDuelTimeout() {
    if (!GameState.duel.isOngoing || GameState.duel.selectedAnswerIndex !== null) return;
    GameState.duel.selectedAnswerIndex = -1;
    GameState.duel.answerCount += 1;
    GameState.duel.streak = 0;
    GameState.duel.log.push('Tour ' + GameState.duel.turn + ': ⏰ Temps écoulé ! L\'IA contre-attaque');
    renderDuelLog();
    opponentAttacks();
}

function selectDuelAnswer(index) {
    if (GameState.duel.selectedAnswerIndex !== null) return;
    stopQuestionTimer();
    GameState.duel.selectedAnswerIndex = index;
    GameState.duel.answerCount += 1;
    const answers = document.querySelectorAll('.duel-answer');
    answers.forEach((el, i) => { if (i === index) el.classList.add('selected'); });
    
    setTimeout(() => {
        const isCorrect = index === GameState.duel.correctAnswerIndex;
        if (isCorrect) {
            GameState.duel.correctCount += 1;
            GameState.duel.streak += 1;
            GameState.duel.maxStreak = Math.max(GameState.duel.maxStreak || 0, GameState.duel.streak);
            answers.forEach((el, i) => {
                if (i === index) { el.classList.remove('selected'); el.classList.add('correct'); }
            });
            attackOpponent();
        } else {
            GameState.duel.streak = 0;
            answers.forEach((el, i) => {
                if (i === index) { el.classList.remove('selected'); el.classList.add('wrong'); }
                if (i === GameState.duel.correctAnswerIndex) el.classList.add('correct');
            });
            opponentAttacks();
        }
    }, 600);
}

function showDuelDamage(containerId, index, amount, isCrit) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const target = container.children[index];
    if (!target) return;
    target.classList.add('shake', 'damage');
    const float = document.createElement('span');
    float.className = 'duel-float-dmg' + (isCrit ? ' crit' : '');
    float.textContent = (isCrit ? '💥 -' : '-') + amount;
    target.appendChild(float);
    setTimeout(() => float.remove(), 1100);
}

function attackOpponent() {
    const pa = GameState.duel.playerCards[GameState.duel.playerActiveIndex];
    const oai = GameState.duel.opponentActiveIndex;
    let damage = Math.round(pa.attack * (0.85 + Math.random() * 0.3));
    const isCrit = Math.random() < 0.15;
    if (isCrit) damage *= 2;
    if (GameState.duel.streak >= 5) damage = Math.round(damage * 2);
    else if (GameState.duel.streak >= 3) damage = Math.round(damage * 1.5);
    GameState.duel.opponentHP[oai] -= damage;
    const comboText = GameState.duel.streak >= 5 ? ' (combo x2)' : (GameState.duel.streak >= 3 ? ' (combo x1.5)' : '');
    GameState.duel.log.push('Tour ' + GameState.duel.turn + ': ✅ ' + (isCrit ? '💥 CRITIQUE ! ' : '') + pa.name + ' inflige ' + damage + ' dégâts' + comboText);
    if (GameState.duel.opponentHP[oai] <= 0) {
        GameState.duel.opponentHP[oai] = 0;
        GameState.duel.log.push('💥 Carte adverse vaincue !');
        let next = (oai + 1) % GameState.duel.opponentCards.length;
        while (next !== oai && GameState.duel.opponentHP[next] <= 0) {
            next = (next + 1) % GameState.duel.opponentCards.length;
        }
        GameState.duel.opponentActiveIndex = next;
    }
    GameState.duel.turn += 1;
    GameState.duel.selectedAnswerIndex = null;
    renderDuelOngoing();
    showDuelDamage('duel-opponent-cards', oai, damage, isCrit);
    setTimeout(() => {
        if (!GameState.duel.isOngoing) return;
        if (!checkDuelEnd()) generateDuelQuestion();
    }, 1300);
}

function opponentAttacks() {
    const config = getDuelConfig();
    const oa = GameState.duel.opponentCards[GameState.duel.opponentActiveIndex];
    const pai = GameState.duel.playerActiveIndex;
    const pa = GameState.duel.playerCards[pai];
    let damage = Math.round(oa.attack * (0.85 + Math.random() * 0.3) * config.oppoMult);
    const isCrit = GameState.duel.difficulty === 'hard' && Math.random() < 0.1;
    if (isCrit) damage *= 2;
    GameState.duel.playerHP[pai] -= damage;
    GameState.duel.log.push('Tour ' + GameState.duel.turn + ': ❌ ' + (isCrit ? '💥 CRITIQUE ! ' : '') + 'L\'IA inflige ' + damage + ' dégâts à ' + pa.name);
    if (GameState.duel.playerHP[pai] <= 0) {
        GameState.duel.playerHP[pai] = 0;
        GameState.duel.log.push('💥 ' + pa.name + ' vaincue !');
        let next = (pai + 1) % GameState.duel.playerCards.length;
        while (next !== pai && GameState.duel.playerHP[next] <= 0) {
            next = (next + 1) % GameState.duel.playerCards.length;
        }
        GameState.duel.playerActiveIndex = next;
    }
    GameState.duel.turn += 1;
    GameState.duel.selectedAnswerIndex = null;
    renderDuelOngoing();
    showDuelDamage('duel-player-cards', pai, damage, isCrit);
    setTimeout(() => {
        if (!GameState.duel.isOngoing) return;
        if (!checkDuelEnd()) generateDuelQuestion();
    }, 1300);
}

function checkDuelEnd() {
    const allPlayerDefeated = GameState.duel.playerHP.every(hp => hp <= 0);
    const allOpponentDefeated = GameState.duel.opponentHP.every(hp => hp <= 0);
    if (!allPlayerDefeated && !allOpponentDefeated) return false;
    stopQuestionTimer();
    GameState.duel.isOngoing = false;
    document.getElementById('duel-ongoing').style.display = 'none';
    document.getElementById('duel-result').style.display = 'block';
    GameState.stats.duelsPlayed += 1;
    const config = getDuelConfig();
    const rc = document.getElementById('duel-result-content');
    const accuracy = GameState.duel.answerCount > 0 ? Math.round((GameState.duel.correctCount / GameState.duel.answerCount) * 100) : 0;
    const statsHtml = '<div class="duel-result-stats"><div><span>Précision</span><strong>' + accuracy + '%</strong></div><div><span>Meilleure série</span><strong>' + (GameState.duel.maxStreak || 0) + ' 🔥</strong></div><div><span>Difficulté</span><strong>' + config.label + '</strong></div><div><span>Tours</span><strong>' + GameState.duel.turn + '</strong></div></div>';
    if (allOpponentDefeated) {
        GameState.stats.duelsWon += 1;
        let reward = 50 + (GameState.duel.maxStreak || 0) * 10 + GameState.duel.correctCount * 5;
        reward = Math.round(reward * config.rewardMult);
        GameState.coins += reward;
        GameState.stats.coinsEarned += reward;
        rc.className = 'duel-result-content win';
        rc.innerHTML = '<h2>🎉 VICTOIRE !</h2><p>Vous avez vaincu l\'IA !</p>' + statsHtml + '<p class="reward">+' + reward + ' pièces</p>';
        checkAchievements();
    } else {
        const penalty = Math.min(config.penalty + Math.floor(Math.random() * 11), GameState.coins);
        GameState.coins -= penalty;
        rc.className = 'duel-result-content lose';
        rc.innerHTML = '<h2>😢 DÉFAITE</h2><p>L\'IA vous a vaincu !</p>' + statsHtml + '<p class="reward">-' + penalty + ' pièces</p>';
    }
    saveGame();
    updateUI();
    return true;
}

function renderDuelLog() {
    const lc = document.getElementById('duel-log');
    lc.innerHTML = '';
    GameState.duel.log.slice().reverse().forEach(entry => {
        const el = document.createElement('div');
        el.className = 'duel-log-entry';
        el.textContent = entry;
        lc.appendChild(el);
    });
    lc.scrollTop = lc.scrollHeight;
}

function returnToDuelSetup() {
    stopQuestionTimer();
    const keptDifficulty = GameState.duel.difficulty || 'normal';
    GameState.duel = {
        isOngoing: false, playerCards: [], opponentCards: [],
        playerActiveIndex: 0, opponentActiveIndex: 0, playerHP: [], opponentHP: [],
        turn: 1, currentQuestion: null, currentAnswers: [], correctAnswerIndex: null,
        selectedAnswerIndex: null, log: [], difficulty: keptDifficulty,
        streak: 0, maxStreak: 0, correctCount: 0, answerCount: 0,
        questionTimerId: null, remainingTime: 0
    };
    document.getElementById('duel-result').style.display = 'none';
    document.getElementById('duel-setup').style.display = 'block';
    renderDuelSetup();
}

// ========== ACHIEVEMENTS ==========
function initAchievements() {
    Object.keys(ACHIEVEMENTS).forEach(key => {
        if (!GameState.achievements[key]) GameState.achievements[key] = false;
    });
}

function checkAchievements() {
    let changed = false;
    if (GameState.stats.packsOpened >= 1 && !GameState.achievements.first_pack) {
        GameState.achievements.first_pack = true; changed = true;
        showToast('Succès !', 'Premier Pack', 'success');
    }
    if (!GameState.achievements.first_legendary) {
        const hasLegendary = Object.keys(GameState.collection).some(cardId => {
            const card = CARDS.find(c => c.id === parseInt(cardId));
            return card && card.rarity === 'L' && GameState.collection[cardId].count > 0;
        });
        if (hasLegendary) {
            GameState.achievements.first_legendary = true; changed = true;
            showToast('Succès !', 'Première Légendaire', 'success');
        }
    }
    if (GameState.stats.duelsPlayed >= 1 && !GameState.achievements.first_duel) {
        GameState.achievements.first_duel = true; changed = true;
        showToast('Succès !', 'Premier Duel', 'success');
    }
    if (GameState.stats.duelsWon >= 1 && !GameState.achievements.first_duel_win) {
        GameState.achievements.first_duel_win = true; changed = true;
        showToast('Succès !', 'Première Victoire', 'success');
    }
    if (GameState.stats.duelsWon >= 10 && !GameState.achievements.ten_duels_won) {
        GameState.achievements.ten_duels_won = true; changed = true;
        showToast('Succès !', '10 Victoires', 'success');
    }
    const uniqueCards = Object.keys(GameState.collection).filter(id => GameState.collection[id].count > 0).length;
    if (uniqueCards >= 50 && !GameState.achievements.fifty_cards) {
        GameState.achievements.fifty_cards = true; changed = true;
        showToast('Succès !', '50 Cartes', 'success');
    }
    if (!GameState.achievements.complete_category) {
        const categories = [...new Set(getAllCards().map(card => card.category))];
        for (const category of categories) {
            const catCards = getAllCards().filter(card => card.category === category);
            const owned = catCards.filter(card => GameState.collection[card.id] && GameState.collection[card.id].count > 0).length;
            if (owned === catCards.length) {
                GameState.achievements.complete_category = true; changed = true;
                showToast('Succès !', 'Catégorie Complète: ' + category, 'success'); break;
            }
        }
    }
    if (uniqueCards === getAllCards().length && !GameState.achievements.full_collection) {
        GameState.achievements.full_collection = true; changed = true;
        showToast('Succès !', 'Collection Complète !', 'success');
    }
    if (changed) saveGame();
    renderAchievements();
}

function renderAchievements() {
    const container = document.getElementById('achievements');
    container.innerHTML = '';
    Object.keys(ACHIEVEMENTS).forEach(key => {
        const a = ACHIEVEMENTS[key];
        const completed = GameState.achievements[key];
        const el = document.createElement('div');
        el.className = `achievement-card ${completed ? 'completed' : ''}`;
        el.innerHTML = `<h4>${a.name}</h4><p>${a.description}</p>`;
        container.appendChild(el);
    });
}

// ========== UTILITIES ==========
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function showToast(title, message, type = 'info') {
    const container = document.getElementById('toast-container');
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
    setTimeout(() => toast.remove(), 3000);
}

function updateUI() {
    document.getElementById('coins').textContent = GameState.coins;
    document.getElementById('duels-won').textContent = GameState.stats.duelsWon;
    document.getElementById('packs-opened').textContent = GameState.stats.packsOpened;
    const winRate = GameState.stats.duelsPlayed > 0 ? Math.round((GameState.stats.duelsWon / GameState.stats.duelsPlayed) * 100) : 0;
    document.getElementById('win-rate').textContent = `${winRate}%`;
    const legendaryCount = Object.keys(GameState.collection).filter(cardId => {
        const card = getAllCards().find(c => c.id === parseInt(cardId));
        return card && card.rarity === 'L' && GameState.collection[cardId].count > 0;
    }).length;
    document.getElementById('legendary-count').textContent = legendaryCount;
    document.getElementById('coins-spent').textContent = GameState.stats.coinsSpent;
    document.getElementById('coins-earned').textContent = GameState.stats.coinsEarned;
    document.getElementById('duels-played').textContent = GameState.stats.duelsPlayed;
    document.getElementById('duels-won-stat').textContent = GameState.stats.duelsWon;
    document.getElementById('duels-lost').textContent = GameState.stats.duelsPlayed - GameState.stats.duelsWon;
    const uniqueCards = Object.keys(GameState.collection).filter(id => GameState.collection[id].count > 0).length;
    document.getElementById('unique-cards').textContent = uniqueCards;
    const totalDuplicates = Object.keys(GameState.collection).reduce((sum, id) => sum + GameState.collection[id].duplicates, 0);
    document.getElementById('total-duplicates').textContent = totalDuplicates;
    renderRecentCards();
}

function renderRecentCards() {
    const container = document.getElementById('recent-cards');
    container.innerHTML = '';
    if (GameState.recentCards.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">Aucune carte récente</p>';
        return;
    }
    GameState.recentCards.slice(0, 5).forEach(card => {
        const el = document.createElement('div');
        el.className = 'card ' + card.rarity;
        el.style.width = 'var(--card-width-xs)';
        el.style.height = 'var(--card-height-xs)';
        el.innerHTML = createCardHTML(card, true);
        container.appendChild(el);
    });
}

function confirmReset() {
    document.getElementById('reset-modal').style.display = 'flex';
}

function closeResetModal() {
    document.getElementById('reset-modal').style.display = 'none';
}

// ========== START GAME ==========
document.addEventListener('DOMContentLoaded', initGame);

