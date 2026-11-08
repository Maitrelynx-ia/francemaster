// France Masters - Marché aux enchères
// Simulation locale : vendeurs et acheteurs IA

const MarketState = {
    offers: [],
    mySales: [],
    lastRefresh: 0
};

const MARKET_PRICES = { C: 30, R: 80, SR: 200, UR: 500, L: 1200 };

function basePrice(rarity) {
    return MARKET_PRICES[rarity] || 30;
}

function loadMarket() {
    const data = localStorage.getItem('franceMastersMarket');
    if (data) {
        try {
            const parsed = JSON.parse(data);
            MarketState.offers = parsed.offers || [];
            MarketState.mySales = parsed.mySales || [];
            MarketState.lastRefresh = parsed.lastRefresh || 0;
        } catch (e) {
            console.error('Erreur chargement marché:', e);
        }
    }
}

function saveMarket() {
    localStorage.setItem('franceMastersMarket', JSON.stringify(MarketState));
}

function generateOffer() {
    const cards = getAllCards();
    const card = cards[Math.floor(Math.random() * cards.length)];
    const base = basePrice(card.rarity);
    const id = Date.now() + Math.floor(Math.random() * 100000);
    if (Math.random() < 0.5) {
        return {
            id: id, cardId: card.id, type: 'auction',
            currentPrice: Math.max(10, Math.round(base * 0.5)),
            highestBidder: null, bidCount: 0,
            endsAt: Date.now() + (2 + Math.floor(Math.random() * 4)) * 60 * 1000,
            createdAt: Date.now()
        };
    }
    return {
        id: id, cardId: card.id, type: 'buy',
        price: Math.max(10, Math.round(base * (0.9 + Math.random() * 0.5))),
        createdAt: Date.now()
    };
}

function addMarketCardToCollection(card) {
    if (!GameState.collection[card.id]) {
        GameState.collection[card.id] = { count: 0, duplicates: 0 };
    }
    GameState.collection[card.id].count += 1;
    if (GameState.collection[card.id].count > 1) {
        GameState.collection[card.id].duplicates += 1;
    }
    GameState.recentCards.unshift(card);
    if (GameState.recentCards.length > 5) GameState.recentCards.pop();
}

function buyOffer(offerId) {
    const offer = MarketState.offers.find(o => o.id === offerId);
    if (!offer || offer.type !== 'buy') return;
    const card = getAllCards().find(c => c.id === offer.cardId);
    if (!card) return;
    if (GameState.coins < offer.price) {
        showToast('Erreur', "Pièces insuffisantes ! Il vous faut " + offer.price + " pièces.", 'error');
        return;
    }
    if (!confirm('Acheter ' + card.name + ' pour ' + offer.price + ' pièces ?')) return;
    GameState.coins -= offer.price;
    GameState.stats.coinsSpent += offer.price;
    addMarketCardToCollection(card);
    MarketState.offers = MarketState.offers.filter(o => o.id !== offerId);
    saveGame();
    saveMarket();
    updateUI();
    renderMarket();
    checkAchievements();
    showToast('Succès', card.name + ' achetée pour ' + offer.price + ' pièces !', 'success');
}

function bidOnOffer(offerId) {
    const offer = MarketState.offers.find(o => o.id === offerId);
    if (!offer || offer.type !== 'auction') return;
    if (offer.endsAt <= Date.now()) {
        showToast('Info', "Cette enchère est terminée !", 'info');
        renderMarket();
        return;
    }
    if (offer.highestBidder === 'player') {
        showToast('Info', "Vous avez déjà la meilleure enchère !", 'info');
        return;
    }
    const minBid = offer.currentPrice + Math.max(5, Math.round(offer.currentPrice * 0.1));
    if (GameState.coins < minBid) {
        showToast('Erreur', "Pièces insuffisantes pour enchérir (minimum " + minBid + " pièces) !", 'error');
        return;
    }
    offer.currentPrice = minBid;
    offer.highestBidder = 'player';
    offer.bidCount += 1;
    offer.endsAt = Math.max(offer.endsAt, Date.now() + 30000);
    saveMarket();
    renderMarket();
    showToast('Succès', "Enchère placée sur la carte ! (" + minBid + " pièces)", 'success');
}

function resolveAuctionWin(offer) {
    const card = getAllCards().find(c => c.id === offer.cardId);
    if (!card) return;
    if (GameState.coins < offer.currentPrice) {
        showToast('Erreur', "Pas assez de pièces pour payer l'enchère remportée... Elle est annulée !", 'error');
        return;
    }
    GameState.coins -= offer.currentPrice;
    GameState.stats.coinsSpent += offer.currentPrice;
    addMarketCardToCollection(card);
    checkAchievements();
    showToast('Succès', "🎉 Enchère remportée ! " + card.name + ' achetée pour ' + offer.currentPrice + ' pièces !', 'success');
}

function listCardForSale(cardId) {
    const numericId = parseInt(cardId, 10);
    const entry = GameState.collection[cardId] || GameState.collection[numericId];
    if (!entry || entry.count < 2) {
        showToast('Erreur', "Vous ne pouvez vendre que vos doublons (au moins 2 exemplaires) !", 'error');
        return;
    }
    if (MarketState.mySales.length >= 3) {
        showToast('Erreur', "Maximum 3 ventes simultanées !", 'error');
        return;
    }
    const card = getAllCards().find(c => c.id === numericId);
    if (!card) return;
    const startPrice = Math.max(10, Math.round(basePrice(card.rarity) * 0.5));
    MarketState.mySales.push({
        id: Date.now() + Math.floor(Math.random() * 100000),
        cardId: card.id,
        currentPrice: startPrice,
        bidCount: 0,
        endsAt: Date.now() + 3 * 60 * 1000
    });
    saveMarket();
    renderMarket();
    showToast('Succès', card.name + " mise en vente ! Enchère de 3 minutes (départ : " + startPrice + " pièces).", 'success');
}

function cancelSale(saleId) {
    MarketState.mySales = MarketState.mySales.filter(s => s.id !== saleId);
    saveMarket();
    renderMarket();
    showToast('Info', "Vente annulée. La carte reste dans votre collection.", 'info');
}

function refreshMarketOffers() {
    if (Date.now() - MarketState.lastRefresh < 2 * 60 * 1000) {
        showToast('Info', "Le marché se renouvelle toutes les 2 minutes maximum !", 'info');
        return;
    }
    MarketState.offers = [];
    for (let i = 0; i < 6; i++) MarketState.offers.push(generateOffer());
    MarketState.lastRefresh = Date.now();
    saveMarket();
    renderMarket();
    showToast('Succès', "Nouvelles cartes en vente !", 'success');
}

function marketTick() {
    const now = Date.now();
    let changed = false;
    
    while (MarketState.offers.length < 6) {
        MarketState.offers.push(generateOffer());
        changed = true;
    }
    
    const kept = [];
    MarketState.offers.forEach(offer => {
        if (offer.type === 'buy' && now - offer.createdAt > 15 * 60 * 1000) {
            changed = true;
            return;
        }
        if (offer.type === 'auction') {
            if (offer.endsAt <= now) {
                if (offer.highestBidder === 'player') resolveAuctionWin(offer);
                changed = true;
                return;
            }
            if (offer.highestBidder === 'player' && Math.random() < 0.35) {
                offer.currentPrice += Math.max(5, Math.round(offer.currentPrice * (0.08 + Math.random() * 0.07)));
                offer.highestBidder = 'ia';
                offer.bidCount += 1;
                changed = true;
                const card = getAllCards().find(c => c.id === offer.cardId);
                if (card) showToast('Info', "🤖 L'IA a surenchéri sur " + card.name + " !", 'info');
            }
        }
        kept.push(offer);
    });
    MarketState.offers = kept;
    
    const remainingSales = [];
    MarketState.mySales.forEach(sale => {
        const card = getAllCards().find(c => c.id === sale.cardId);
        if (sale.endsAt <= now) {
            if (sale.bidCount > 0 && card) {
                GameState.coins += sale.currentPrice;
                GameState.stats.coinsEarned += sale.currentPrice;
                const entry = GameState.collection[sale.cardId];
                if (entry) {
                    entry.count -= 1;
                    entry.duplicates = Math.max(0, entry.count - 1);
                }
                showToast('Succès', "💰 Vente conclue ! " + card.name + ' vendue pour ' + sale.currentPrice + ' pièces !', 'success');
                changed = true;
            } else {
                showToast('Info', "Aucun acheteur pour " + (card ? card.name : 'la carte') + ". Elle reste dans votre collection.", 'info');
            }
            return;
        }
        if (Math.random() < 0.55) {
            sale.currentPrice += Math.max(5, Math.round(sale.currentPrice * (0.08 + Math.random() * 0.05)));
            sale.bidCount += 1;
            changed = true;
        }
        remainingSales.push(sale);
    });
    MarketState.mySales = remainingSales;
    
    if (changed) {
        saveGame();
        saveMarket();
        updateUI();
    }
    const marketTab = document.getElementById('market');
    if (marketTab && marketTab.classList.contains('active')) renderMarket();
}

function formatMarketTime(ms) {
    const totalSec = Math.max(0, Math.floor(ms / 1000));
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return m + 'm ' + (s < 10 ? '0' + s : s) + 's';
}

function marketItemVisual(card) {
    const img = card.image ? '<img class="market-item-img" src="' + card.image + '" alt="' + card.name + '" onerror="this.remove()">' : '';
    return '<div class="market-item-visual"><span class="market-item-emoji">' + card.emoji + '</span>' + img + '</div>';
}

function renderMarket() {
    const coinsEl = document.getElementById('market-coins');
    if (coinsEl) coinsEl.textContent = GameState.coins;
    
    const salesCount = document.getElementById('market-sales-count');
    if (salesCount) salesCount.textContent = '(' + MarketState.mySales.length + '/3)';
    
    const grid = document.getElementById('market-offers-grid');
    if (grid) {
        grid.innerHTML = '';
        if (MarketState.offers.length === 0) {
            grid.innerHTML = '<p class="market-empty">Aucune offre pour le moment, revenez dans quelques minutes !</p>';
        }
        MarketState.offers.forEach(offer => {
            const card = getAllCards().find(c => c.id === offer.cardId);
            if (!card) return;
            const item = document.createElement('div');
            item.className = 'market-item r-' + card.rarity;
            let footer;
            if (offer.type === 'buy') {
                footer = '<div class="market-item-price">💰 ' + offer.price + ' pièces</div>' +
                    '<button class="btn btn-primary market-item-btn" onclick="buyOffer(' + offer.id + ')">Acheter</button>';
            } else {
                const minBid = offer.currentPrice + Math.max(5, Math.round(offer.currentPrice * 0.1));
                const bidder = offer.highestBidder === 'player' ? '🧑 Vous' : (offer.highestBidder === 'ia' ? '🤖 IA' : 'Personne');
                footer = '<div class="market-item-price">🔥 Enchère : ' + offer.currentPrice + ' pièces</div>' +
                    '<div class="market-item-sub">Meilleur enchérisseur : ' + bidder + ' (' + offer.bidCount + ')</div>' +
                    '<div class="market-item-timer" data-endsat="' + offer.endsAt + '">⏱️ ' + formatMarketTime(offer.endsAt - Date.now()) + '</div>' +
                    '<button class="btn btn-primary market-item-btn" onclick="bidOnOffer(' + offer.id + ')">Enchérir ' + minBid + ' 🪙</button>';
            }
            item.innerHTML = marketItemVisual(card) +
                '<div class="market-item-name">' + card.name + '</div>' +
                '<span class="card-rarity ' + card.rarity + '">' + card.rarity + '</span>' +
                footer;
            grid.appendChild(item);
        });
    }
    
    const salesGrid = document.getElementById('market-my-sales');
    if (salesGrid) {
        salesGrid.innerHTML = '';
        if (MarketState.mySales.length === 0) {
            salesGrid.innerHTML = '<p class="market-empty">Aucune vente en cours. Mettez vos doublons aux enchères ci-dessous !</p>';
        }
        MarketState.mySales.forEach(sale => {
            const card = getAllCards().find(c => c.id === sale.cardId);
            if (!card) return;
            const item = document.createElement('div');
            item.className = 'market-item r-' + card.rarity;
            item.innerHTML = marketItemVisual(card) +
                '<div class="market-item-name">' + card.name + '</div>' +
                '<span class="card-rarity ' + card.rarity + '">' + card.rarity + '</span>' +
                '<div class="market-item-price">🔥 ' + sale.currentPrice + ' pièces</div>' +
                '<div class="market-item-sub">' + sale.bidCount + ' enchère(s) IA</div>' +
                '<div class="market-item-timer" data-endsat="' + sale.endsAt + '">⏱️ ' + formatMarketTime(sale.endsAt - Date.now()) + '</div>' +
                '<button class="btn btn-danger market-item-btn" onclick="cancelSale(' + sale.id + ')">Annuler</button>';
            salesGrid.appendChild(item);
        });
    }
    
    const dupGrid = document.getElementById('market-duplicates-grid');
    if (dupGrid) {
        dupGrid.innerHTML = '';
        const dupes = Object.keys(GameState.collection).filter(id => GameState.collection[id].count > 1);
        if (dupes.length === 0) {
            dupGrid.innerHTML = '<p class="market-empty">Aucun doublon à vendre pour le moment. Ouvrez des packs pour en obtenir !</p>';
        }
        dupes.forEach(id => {
            const card = getAllCards().find(c => c.id === parseInt(id, 10));
            if (!card) return;
            const entry = GameState.collection[id];
            const startPrice = Math.max(10, Math.round(basePrice(card.rarity) * 0.5));
            const item = document.createElement('div');
            item.className = 'market-item r-' + card.rarity;
            item.innerHTML = marketItemVisual(card) +
                '<div class="market-item-name">' + card.name + '</div>' +
                '<span class="card-rarity ' + card.rarity + '">' + card.rarity + '</span>' +
                '<div class="market-item-sub">Doublons : x' + (entry.count - 1) + '</div>' +
                '<div class="market-item-price">Départ : ' + startPrice + ' pièces</div>' +
                '<button class="btn btn-primary market-item-btn" onclick="listCardForSale(' + id + ')">Mettre en vente</button>';
            dupGrid.appendChild(item);
        });
    }
}

function updateMarketTimers() {
    const marketTab = document.getElementById('market');
    if (!marketTab || !marketTab.classList.contains('active')) return;
    document.querySelectorAll('.market-item-timer[data-endsat]').forEach(el => {
        const remaining = parseInt(el.dataset.endsat, 10) - Date.now();
        el.textContent = remaining > 0 ? '⏱️ ' + formatMarketTime(remaining) : '⏱️ Terminé...';
    });
}

function initMarket() {
    loadMarket();
    if (MarketState.offers.length === 0) {
        for (let i = 0; i < 6; i++) MarketState.offers.push(generateOffer());
        saveMarket();
    }
    setInterval(marketTick, 5000);
    setInterval(updateMarketTimers, 1000);
}

document.addEventListener('DOMContentLoaded', initMarket);
