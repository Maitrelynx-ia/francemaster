// France Masters - Systeme d'amis (version enrichie)
// Liste d'amis par compte, duels amicaux (meme appareil), recherche, tri,
// favoris, podium, statistiques detaillees et duels configurables.
// + Amis du monde : recherche dans le classement en ligne (Supabase).

const FRIEND_AVATARS = ['🦊', '🐺', '🦉', '🐯', '🐼', '🦁', '🐸', '🦄', '🐨', '🐙', '🦖', '🦜', '🐝', '🐬', '🦔', '🐲'];

const FriendState = {
    friends: [],
    duel: null,
    search: '',
    sort: 'name',
    worldQuery: '',
    worldResults: null,
    worldLoading: false
};

function friendKey() {
    return 'franceMastersFriends_' + AuthState.currentUser.username;
}

function loadFriends() {
    FriendState.friends = [];
    if (!AuthState.currentUser) return;
    const data = localStorage.getItem(friendKey());
    if (data) {
        try {
            FriendState.friends = JSON.parse(data) || [];
        } catch (e) {
            FriendState.friends = [];
        }
    }
}

function saveFriends() {
    if (!AuthState.currentUser) return;
    localStorage.setItem(friendKey(), JSON.stringify(FriendState.friends));
}

function getFriendAvatar(username) {
    let sum = 0;
    for (let i = 0; i < username.length; i++) sum += username.charCodeAt(i);
    return FRIEND_AVATARS[sum % FRIEND_AVATARS.length];
}

function friendWinRate(f) {
    const total = (f.wins || 0) + (f.losses || 0);
    if (total === 0) return null;
    return Math.round(100 * (f.wins || 0) / total);
}

function friendStreakText(f) {
    const s = f.streak || 0;
    if (s > 1) return '🔥 Série de ' + s + ' victoires';
    if (s === 1) return '🔥 1 victoire';
    if (s < -1) return '❄️ ' + (-s) + ' défaites de suite';
    if (s === -1) return '❄️ 1 défaite';
    return '';
}

// ===== AMIS DU MONDE (classement en ligne Supabase) =====

const WORLD_URL = 'https://wossxalinroykryemifh.supabase.co';
const WORLD_KEY = 'sb_publishable_pVjrrIXKNjftbm1wrXlkBw_pSZEYYWo';

function worldHeaders() {
    return {
        'apikey': WORLD_KEY,
        'Authorization': 'Bearer ' + WORLD_KEY,
        'Content-Type': 'application/json'
    };
}

function fetchWorldPlayers(query, limit) {
    let url = WORLD_URL + '/rest/v1/players?select=key,name,cards,distinct_cards,value,updated&order=value.desc&limit=' + (limit || 12);
    if (query) url += '&name=ilike.*' + encodeURIComponent(query) + '*';
    return fetch(url, { headers: worldHeaders() })
        .then(r => r.ok ? r.json() : null)
        .catch(() => null);
}

function fmtWorld(n) {
    return String(n || 0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function worldSeenText(ts) {
    if (!ts) return '';
    const m = Math.floor((Date.now() - ts) / 60000);
    if (m < 1) return "vu à l'instant";
    if (m < 60) return 'vu il y a ' + m + ' min';
    const h = Math.floor(m / 60);
    if (h < 24) return 'vu il y a ' + h + ' h';
    const d = Math.floor(h / 24);
    if (d < 30) return 'vu il y a ' + d + ' j';
    return 'vu il y a longtemps';
}

function isWorldFriend(name) {
    return FriendState.friends.some(f => f.username === name);
}

function addWorldFriend(p) {
    if (!isLoggedIn()) {
        showAuthModal();
        return;
    }
    if (p.name === AuthState.currentUser.username) {
        showToast('Erreur', "Vous ne pouvez pas vous ajouter vous-même !", 'error');
        return;
    }
    if (isWorldFriend(p.name)) {
        showToast('Erreur', p.name + " est déjà dans vos amis.", 'error');
        return;
    }
    FriendState.friends.push({
        username: p.name, wins: 0, losses: 0, addedAt: Date.now(),
        world: true, value: p.value, cards: p.cards, lastSeen: p.updated
    });
    saveFriends();
    renderFriendCards();
    renderWorldResults();
    showToast('Succès', p.name + ' a été ajouté à vos amis ! 🤝', 'success');
}

function updateWorldSnapshots(players) {
    let changed = false;
    (players || []).forEach(p => {
        FriendState.friends.forEach(f => {
            if (f.world && f.username === p.name) {
                f.value = p.value;
                f.cards = p.cards;
                f.lastSeen = p.updated;
                changed = true;
            }
        });
    });
    if (changed) saveFriends();
}

function refreshWorldFriendsStats() {
    return fetchWorldPlayers('', 200).then(players => {
        if (players) updateWorldSnapshots(players);
        return players;
    });
}

function runWorldSearch() {
    const input = document.getElementById('fw-search');
    const q = input ? input.value.trim() : '';
    FriendState.worldQuery = q;
    FriendState.worldLoading = true;
    renderWorldResults();
    fetchWorldPlayers(q, 12).then(players => {
        FriendState.worldLoading = false;
        FriendState.worldResults = players;
        if (players) updateWorldSnapshots(players);
        renderWorldResults();
        renderFriendCards();
    });
}

function escapeWorldHtml(s) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(s).replace(/[&<>"']/g, c => map[c]);
}

function renderWorldResults() {
    const box = document.getElementById('fw-results');
    if (!box) return;
    box.innerHTML = '';
    if (FriendState.worldLoading) {
        box.innerHTML = '<p class="fw-status">Recherche dans le monde...</p>';
        return;
    }
    const players = FriendState.worldResults;
    if (players === null) {
        box.innerHTML = '<p class="fw-status">Classement en ligne momentanément indisponible. Réessayez plus tard.</p>';
        return;
    }
    if (!players.length) {
        box.innerHTML = '<p class="fw-status">Aucun joueur trouvé' + (FriendState.worldQuery ? ' pour « ' + escapeWorldHtml(FriendState.worldQuery) + ' »' : '') + '.</p>';
        return;
    }
    const me = isLoggedIn() ? AuthState.currentUser.username : null;
    players.forEach(p => {
        const isMe = me && p.name === me;
        const isFriend = isWorldFriend(p.name);
        const card = document.createElement('div');
        card.className = 'fw-card' + (isFriend ? ' fw-friend' : '');
        const av = document.createElement('div');
        av.className = 'friend-avatar';
        av.textContent = getFriendAvatar(p.name);
        const info = document.createElement('div');
        info.className = 'friend-info';
        const nm = document.createElement('div');
        nm.className = 'friend-name';
        nm.textContent = p.name;
        const st = document.createElement('div');
        st.className = 'friend-stats';
        st.textContent = '💎 ' + fmtWorld(p.value) + ' pts · 🃏 ' + fmtWorld(p.cards) + ' cartes · ' + worldSeenText(p.updated);
        info.appendChild(nm);
        info.appendChild(st);
        const actions = document.createElement('div');
        actions.className = 'friend-actions';
        const addBtn = document.createElement('button');
        addBtn.className = 'btn ' + (isFriend || isMe ? 'btn-secondary' : 'btn-primary');
        if (isMe) {
            addBtn.textContent = '🙂 Vous';
            addBtn.disabled = true;
        } else if (isFriend) {
            addBtn.textContent = '✅ Ami';
            addBtn.disabled = true;
        } else {
            addBtn.textContent = '➕ Ajouter';
            addBtn.addEventListener('click', () => addWorldFriend(p));
        }
        actions.appendChild(addBtn);
        card.appendChild(av);
        card.appendChild(info);
        card.appendChild(actions);
        box.appendChild(card);
    });
}

function buildWorldBlock(grid) {
    const old = document.getElementById('friends-world');
    if (old) old.remove();
    const block = document.createElement('div');
    block.className = 'friends-world';
    block.id = 'friends-world';

    const head = document.createElement('div');
    head.className = 'fw-head';
    const title = document.createElement('h3');
    title.textContent = '🌍 Amis du monde';
    const refresh = document.createElement('button');
    refresh.className = 'btn btn-secondary fw-refresh';
    refresh.textContent = '🔄';
    refresh.title = 'Actualiser les infos des joueurs du monde (et de vos amis en ligne)';
    refresh.addEventListener('click', () => {
        refresh.textContent = '⏳';
        refreshWorldFriendsStats().then(() => {
            refresh.textContent = '🔄';
            renderFriendCards();
            renderWorldResults();
        });
    });
    head.appendChild(title);
    head.appendChild(refresh);
    block.appendChild(head);

    const row = document.createElement('div');
    row.className = 'fw-search-row';
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'fw-search';
    input.placeholder = '🌍 Rechercher un joueur dans le monde...';
    input.addEventListener('keydown', e => { if (e.key === 'Enter') runWorldSearch(); });
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = '🔍 Rechercher';
    btn.addEventListener('click', runWorldSearch);
    row.appendChild(input);
    row.appendChild(btn);
    block.appendChild(row);

    const res = document.createElement('div');
    res.className = 'fw-results';
    res.id = 'fw-results';
    block.appendChild(res);

    grid.parentNode.insertBefore(block, grid);
    if (FriendState.worldResults === null) runWorldSearch();
    else renderWorldResults();
}

// ===== Styles injectes (compatibles theme clair et sombre via variables CSS) =====

function injectFriendStyles() {
    if (document.getElementById('friends-styles')) return;
    const lines = [
        '.friends-toolbar { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin-bottom: 16px; }',
        '.friends-toolbar input, .friends-toolbar select { padding: 10px 14px; border-radius: 12px; border: 1px solid rgba(128,128,160,0.35); background: var(--surface); color: var(--text-primary); font-size: 14px; }',
        '.friends-toolbar input { flex: 1; min-width: 150px; }',
        '.friends-count { color: var(--text-secondary); font-size: 13px; margin-left: auto; white-space: nowrap; }',
        '.friends-podium { display: flex; gap: 10px; justify-content: center; margin-bottom: 16px; flex-wrap: wrap; }',
        '.podium-card { background: var(--surface); border: 1px solid rgba(255,215,0,0.4); border-radius: 16px; padding: 12px 18px; text-align: center; min-width: 110px; box-shadow: var(--shadow-md); }',
        '.podium-card .podium-medal { font-size: 24px; }',
        '.podium-card .podium-name { font-weight: 700; color: var(--text-primary); margin: 4px 0 2px; }',
        '.podium-card .podium-score { color: var(--text-secondary); font-size: 13px; }',
        '.friend-card { position: relative; }',
        '.friend-stats { color: var(--text-secondary); font-size: 12px; margin-top: 2px; }',
        '.friend-tag { display: inline-block; font-size: 11px; padding: 1px 8px; border-radius: 10px; background: var(--rare-common-bg); color: var(--text-secondary); margin-left: 6px; vertical-align: middle; }',
        '.fav-btn.active { border-color: var(--secondary); box-shadow: 0 0 10px rgba(255,179,0,0.35); }',
        '.fd-counts { display: flex; gap: 10px; justify-content: center; margin: 12px 0 16px; }',
        '.fd-count { min-width: 52px; font-weight: 700; }',
        '.friend-confirm .modal-content { max-width: 400px; width: 90%; text-align: center; }',
        '.friend-confirm .fc-actions { display: flex; gap: 10px; justify-content: center; margin-top: 18px; }',
        '.friends-world { background: var(--surface); border: 1px solid rgba(128,128,160,0.25); border-radius: 16px; padding: 14px 16px; margin-bottom: 16px; box-shadow: var(--shadow-md); }',
        '.fw-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px; }',
        '.fw-head h3 { margin: 0; }',
        '.fw-search-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }',
        '.fw-search-row input { flex: 1; min-width: 160px; padding: 9px 12px; border-radius: 10px; border: 1px solid rgba(128,128,160,0.35); background: var(--bg, transparent); color: var(--text-primary); font-size: 14px; }',
        '.fw-results { display: flex; flex-direction: column; gap: 8px; }',
        '.fw-card { display: flex; align-items: center; gap: 12px; background: var(--bg, rgba(128,128,128,0.08)); border-radius: 12px; padding: 8px 12px; }',
        '.fw-card.fw-friend { outline: 1px solid var(--secondary); }',
        '.fw-status { opacity: 0.7; font-size: 13px; text-align: center; padding: 8px; margin: 0; }'
    ];
    const style = document.createElement('style');
    style.id = 'friends-styles';
    style.textContent = lines.join('\n');
    document.head.appendChild(style);
}

// ===== Rendu de la liste =====

function sortFriends(list) {
    const arr = list.slice();
    const s = FriendState.sort;
    arr.sort((a, b) => {
        const fav = (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0);
        if (fav !== 0) return fav;
        if (s === 'wins') return (b.wins || 0) - (a.wins || 0);
        if (s === 'winrate') return (friendWinRate(b) || 0) - (friendWinRate(a) || 0);
        if (s === 'recent') return (b.addedAt || 0) - (a.addedAt || 0);
        return a.username.localeCompare(b.username, 'fr');
    });
    return arr;
}

function renderPodium() {
    const old = document.getElementById('friends-podium');
    if (old) old.remove();
    if (FriendState.friends.length < 2) return;
    const top = FriendState.friends.filter(f => (f.wins || 0) > 0)
        .sort((a, b) => (b.wins || 0) - (a.wins || 0) || (friendWinRate(b) || 0) - (friendWinRate(a) || 0))
        .slice(0, 3);
    if (top.length < 2) return;
    const medals = ['🥇', '🥈', '🥉'];
    const podium = document.createElement('div');
    podium.className = 'friends-podium';
    podium.id = 'friends-podium';
    top.forEach((f, i) => {
        const card = document.createElement('div');
        card.className = 'podium-card';
        const medal = document.createElement('div');
        medal.className = 'podium-medal';
        medal.textContent = medals[i];
        const name = document.createElement('div');
        name.className = 'podium-name';
        name.textContent = getFriendAvatar(f.username) + ' ' + f.username;
        const score = document.createElement('div');
        score.className = 'podium-score';
        score.textContent = (f.wins || 0) + ' victoire' + ((f.wins || 0) > 1 ? 's' : '');
        card.appendChild(medal);
        card.appendChild(name);
        card.appendChild(score);
        podium.appendChild(card);
    });
    return podium;
}

function renderFriendCards() {
    const grid = document.getElementById('friends-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const podium = renderPodium();
    if (podium) grid.parentNode.insertBefore(podium, grid);

    let list = FriendState.friends;
    const q = FriendState.search.trim().toLowerCase();
    if (q) list = list.filter(f => f.username.toLowerCase().includes(q));
    list = sortFriends(list);

    const count = document.getElementById('friends-count');
    if (count) count.textContent = FriendState.friends.length + ' ami' + (FriendState.friends.length > 1 ? 's' : '');

    if (list.length === 0) {
        const p = document.createElement('p');
        p.className = 'friends-empty';
        p.textContent = q ? 'Aucun ami ne correspond à votre recherche.' : "Aucun ami pour le moment. Ajoutez le pseudo d'un joueur ci-dessus, ou cherchez-en un dans le monde !";
        grid.appendChild(p);
        return;
    }

    list.forEach(friend => {
        const card = document.createElement('div');
        card.className = 'friend-card';

        const avatar = document.createElement('div');
        avatar.className = 'friend-avatar';
        avatar.textContent = getFriendAvatar(friend.username);

        const info = document.createElement('div');
        info.className = 'friend-info';
        const name = document.createElement('div');
        name.className = 'friend-name';
        name.textContent = friend.username;
        if (friend.offline) {
            const tag = document.createElement('span');
            tag.className = 'friend-tag';
            tag.textContent = 'hors ligne';
            tag.title = "Ce pseudo n'est pas inscrit sur cet appareil : duels possibles uniquement sur ce même appareil.";
            name.appendChild(tag);
        }
        if (friend.world) {
            const tag = document.createElement('span');
            tag.className = 'friend-tag';
            tag.textContent = '🌍 monde';
            tag.title = 'Ce joueur vient du classement en ligne : ses stats sont mises à jour automatiquement.';
            name.appendChild(tag);
        }
        const record = document.createElement('div');
        record.className = 'friend-record';
        const total = (friend.wins || 0) + (friend.losses || 0);
        const rate = friendWinRate(friend);
        record.textContent = '⚔️ ' + (friend.wins || 0) + 'V - ' + (friend.losses || 0) + 'D' + (rate !== null ? ' (' + rate + '%)' : '') + (total > 0 ? ' · ' + total + ' duel' + (total > 1 ? 's' : '') : '');
        const stats = document.createElement('div');
        stats.className = 'friend-stats';
        let st = friendStreakText(friend);
        if (friend.world) {
            const w = '💎 ' + fmtWorld(friend.value) + ' pts · 🃏 ' + fmtWorld(friend.cards) + ' cartes' + (friend.lastSeen ? ' · ' + worldSeenText(friend.lastSeen) : '');
            st = st ? st + ' · ' + w : w;
        }
        if (st) stats.textContent = st;
        info.appendChild(name);
        info.appendChild(record);
        if (st) info.appendChild(stats);

        const actions = document.createElement('div');
        actions.className = 'friend-actions';

        const duelBtn = document.createElement('button');
        duelBtn.className = 'btn btn-primary';
        duelBtn.textContent = '⚔️ Défier';
        duelBtn.addEventListener('click', () => friendDuel(friend.username));

        const favBtn = document.createElement('button');
        favBtn.className = 'btn btn-secondary fav-btn' + (friend.favorite ? ' active' : '');
        favBtn.textContent = friend.favorite ? '⭐' : '☆';
        favBtn.title = friend.favorite ? 'Retirer des favoris' : 'Épingler en favori';
        favBtn.addEventListener('click', () => {
            friend.favorite = !friend.favorite;
            saveFriends();
            renderFriendCards();
        });

        const delBtn = document.createElement('button');
        delBtn.className = 'btn btn-danger';
        delBtn.textContent = '🗑️';
        delBtn.title = 'Retirer de mes amis';
        delBtn.addEventListener('click', () => removeFriend(friend.username));

        actions.appendChild(duelBtn);
        actions.appendChild(favBtn);
        actions.appendChild(delBtn);

        card.appendChild(avatar);
        card.appendChild(info);
        card.appendChild(actions);
        grid.appendChild(card);
    });
}

function renderFriends() {
    injectFriendStyles();
    const grid = document.getElementById('friends-grid');
    if (!grid) return;
    const addBlock = document.getElementById('friends-add');
    let toolbar = document.getElementById('friends-toolbar');

    if (!isLoggedIn()) {
        if (addBlock) addBlock.style.display = 'none';
        if (toolbar) toolbar.style.display = 'none';
        const world = document.getElementById('friends-world');
        if (world) world.style.display = 'none';
        grid.innerHTML = '';
        const p = document.createElement('p');
        p.className = 'friends-empty';
        p.textContent = '🔒 Connectez-vous pour gérer vos amis !';
        grid.appendChild(p);
        return;
    }

    loadFriends();
    if (addBlock) addBlock.style.display = 'flex';

    if (!toolbar) {
        toolbar = document.createElement('div');
        toolbar.className = 'friends-toolbar';
        toolbar.id = 'friends-toolbar';

        const search = document.createElement('input');
        search.type = 'text';
        search.id = 'friends-search';
        search.placeholder = '🔍 Rechercher un ami...';
        search.addEventListener('input', () => {
            FriendState.search = search.value;
            renderFriendCards();
        });

        const sort = document.createElement('select');
        sort.id = 'friends-sort';
        const options = [
            ['name', 'Trier : nom (A-Z)'],
            ['wins', 'Trier : victoires'],
            ['winrate', 'Trier : taux de victoire'],
            ['recent', 'Trier : ajouts récents']
        ];
        options.forEach(o => {
            const opt = document.createElement('option');
            opt.value = o[0];
            opt.textContent = o[1];
            sort.appendChild(opt);
        });
        sort.addEventListener('change', () => {
            FriendState.sort = sort.value;
            renderFriendCards();
        });

        const count = document.createElement('span');
        count.className = 'friends-count';
        count.id = 'friends-count';

        toolbar.appendChild(search);
        toolbar.appendChild(sort);
        toolbar.appendChild(count);
        grid.parentNode.insertBefore(toolbar, grid);
    }
    toolbar.style.display = 'flex';

    buildWorldBlock(grid);
    renderFriendCards();
}

// ===== Ajout / retrait =====

function addFriend() {
    if (!isLoggedIn()) {
        showAuthModal();
        return;
    }
    const input = document.getElementById('friend-input');
    const name = input.value.trim();
    if (name.length < 3) {
        showToast('Erreur', "Le pseudo doit contenir au moins 3 caractères.", 'error');
        return;
    }
    if (name === AuthState.currentUser.username) {
        showToast('Erreur', "Vous ne pouvez pas vous ajouter vous-même !", 'error');
        return;
    }
    if (FriendState.friends.some(f => f.username === name)) {
        showToast('Erreur', name + " est déjà dans vos amis.", 'error');
        return;
    }
    const inscrit = AuthState.users.some(u => u.username === name);
    if (inscrit) {
        FriendState.friends.push({ username: name, wins: 0, losses: 0, addedAt: Date.now() });
        saveFriends();
        input.value = '';
        renderFriends();
        showToast('Succès', name + " a été ajouté à vos amis ! 🤝", 'success');
    } else {
        // Recherche dans le classement en ligne avant de proposer le mode hors ligne
        fetch(WORLD_URL + '/rest/v1/players?select=name,value,cards,updated&name=eq.' + encodeURIComponent(name), { headers: worldHeaders() })
            .then(r => r.ok ? r.json() : null)
            .then(list => {
                if (list && list.length) {
                    const p = list[0];
                    FriendState.friends.push({
                        username: p.name, wins: 0, losses: 0, addedAt: Date.now(),
                        world: true, value: p.value, cards: p.cards, lastSeen: p.updated
                    });
                    saveFriends();
                    input.value = '';
                    renderFriends();
                    showToast('Succès', p.name + ' (joueur du monde) a été ajouté à vos amis ! 🤝', 'success');
                } else {
                    friendConfirm(
                        'Ajouter un ami hors ligne ?',
                        name + " n'est ni inscrit sur cet appareil, ni présent dans le classement en ligne. Vous pouvez quand même l'ajouter pour jouer des duels sur ce même appareil (frère, sœur, ami de passage...).",
                        () => {
                            FriendState.friends.push({ username: name, wins: 0, losses: 0, addedAt: Date.now(), offline: true });
                            saveFriends();
                            input.value = '';
                            renderFriends();
                            showToast('Succès', name + " a été ajouté à vos amis ! 🤝", 'success');
                        }
                    );
                }
            });
    }
}

function friendConfirm(title, message, onOk) {
    const old = document.getElementById('friend-confirm-modal');
    if (old) old.remove();
    const modal = document.createElement('div');
    modal.className = 'modal friend-confirm';
    modal.id = 'friend-confirm-modal';
    modal.style.display = 'flex';
    const content = document.createElement('div');
    content.className = 'modal-content';
    const h3 = document.createElement('h3');
    h3.textContent = title;
    const p = document.createElement('p');
    p.textContent = message;
    const row = document.createElement('div');
    row.className = 'fc-actions';
    const ok = document.createElement('button');
    ok.className = 'btn btn-primary';
    ok.textContent = 'Confirmer';
    ok.addEventListener('click', () => { modal.remove(); onOk(); });
    const cancel = document.createElement('button');
    cancel.className = 'btn btn-secondary';
    cancel.textContent = 'Annuler';
    cancel.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    row.appendChild(ok);
    row.appendChild(cancel);
    content.appendChild(h3);
    content.appendChild(p);
    content.appendChild(row);
    modal.appendChild(content);
    document.body.appendChild(modal);
}

function removeFriend(username) {
    friendConfirm(
        'Retirer un ami ?',
        'Retirer ' + username + ' de vos amis ? Son palmarès (' + ((FriendState.friends.find(f => f.username === username) || {}).wins || 0) + ' victoires) sera perdu.',
        () => {
            FriendState.friends = FriendState.friends.filter(f => f.username !== username);
            saveFriends();
            renderFriends();
            showToast('Succès', username + ' a été retiré de vos amis.', 'success');
        }
    );
}

// ===== DUEL AMICAL (meme appareil) =====

function fdShuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a;
}

function generateFriendQuestions(count) {
    const cards = window.getAllCards ? window.getAllCards() : [];
    const categories = [...new Set(cards.map(c => c.category))];
    const rarityNames = { C: 'Commune', R: 'Rare', SR: 'Super Rare', UR: 'Ultra Rare', L: 'Légendaire' };
    const questions = [];
    const types = ['card_name', 'category', 'rarity', 'emoji', 'blurb'];
    for (let i = 0; i < count; i++) {
        const type = types[i % types.length];
        const card = cards[Math.floor(Math.random() * cards.length)];
        if (type === 'card_name') {
            const wrong = fdShuffle(cards.filter(c => c.name !== card.name)).slice(0, 3).map(c => c.name);
            const answers = fdShuffle([card.name].concat(wrong));
            questions.push({ text: 'Quel est le nom de la carte ' + card.emoji + ' ?', hint: card.description, answers: answers, correctIndex: answers.indexOf(card.name) });
        } else if (type === 'category') {
            const wrong = fdShuffle(categories.filter(c => c !== card.category)).slice(0, 3);
            const answers = fdShuffle([card.category].concat(wrong));
            questions.push({ text: 'À quelle catégorie appartient ' + card.emoji + ' ?', hint: card.name, answers: answers, correctIndex: answers.indexOf(card.category) });
        } else if (type === 'rarity') {
            const correct = rarityNames[card.rarity] || card.rarity;
            const wrong = fdShuffle(Object.keys(rarityNames).filter(r => r !== card.rarity)).slice(0, 3).map(r => rarityNames[r]);
            const answers = fdShuffle([correct].concat(wrong));
            questions.push({ text: 'Quelle est la rareté de ' + card.name + ' ?', hint: card.description, answers: answers, correctIndex: answers.indexOf(correct) });
        } else if (type === 'emoji') {
            const wrong = fdShuffle(cards.filter(c => c.emoji !== card.emoji)).slice(0, 3).map(c => c.emoji);
            const answers = fdShuffle([card.emoji].concat(wrong));
            questions.push({ text: 'Quel emoji représente ' + card.name + ' ?', hint: card.description, answers: answers, correctIndex: answers.indexOf(card.emoji) });
        } else {
            const wrong = fdShuffle(cards.filter(c => c.name !== card.name)).slice(0, 3).map(c => c.name);
            const answers = fdShuffle([card.name].concat(wrong));
            questions.push({ text: 'Quelle carte correspond à cette description : « ' + card.description + ' » ?', hint: '', answers: answers, correctIndex: answers.indexOf(card.name) });
        }
    }
    return questions;
}

function friendDuel(username) {
    if (!isLoggedIn()) {
        showAuthModal();
        return;
    }
    const friend = FriendState.friends.find(f => f.username === username);
    if (!friend) return;
    FriendState.duel = {
        friend: username,
        qCount: 5,
        questions: null,
        phase: 'intro',
        turn: 'me',
        meScore: 0,
        friendScore: 0,
        qIndex: 0,
        locked: false,
        recorded: false
    };
    document.getElementById('friend-duel-modal').style.display = 'flex';
    renderFriendDuel();
}

function closeFriendDuel() {
    const modal = document.getElementById('friend-duel-modal');
    if (modal) modal.style.display = 'none';
    FriendState.duel = null;
    if (isLoggedIn()) renderFriends();
}

function fdStart() {
    const d = FriendState.duel;
    if (!d) return;
    if (!d.questions) d.questions = generateFriendQuestions(d.qCount || 5);
    d.phase = 'pass';
    d.turn = 'me';
    renderFriendDuel();
}

function fdBeginTurn() {
    const d = FriendState.duel;
    if (!d) return;
    d.phase = 'question';
    d.qIndex = 0;
    d.locked = false;
    renderFriendDuel();
}

function fdAnswer(i) {
    const d = FriendState.duel;
    if (!d || d.phase !== 'question' || d.locked) return;
    d.locked = true;
    const q = d.questions[d.qIndex];
    const box = document.getElementById('friend-duel-content');
    box.querySelectorAll('.fd-answer').forEach((el, idx) => {
        el.classList.add('disabled');
        if (idx === q.correctIndex) el.classList.add('correct');
        else if (idx === i) el.classList.add('wrong');
    });
    if (i === q.correctIndex) {
        if (d.turn === 'me') d.meScore += 1;
        else d.friendScore += 1;
    }
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary fd-btn';
    btn.textContent = d.qIndex < d.questions.length - 1 ? 'Question suivante ➡️' : 'Terminer mon tour ✅';
    btn.addEventListener('click', fdNext);
    box.appendChild(btn);
}

function fdNext() {
    const d = FriendState.duel;
    if (!d) return;
    if (d.qIndex < d.questions.length - 1) {
        d.qIndex += 1;
        d.locked = false;
        renderFriendDuel();
    } else if (d.turn === 'me') {
        d.turn = 'friend';
        d.phase = 'pass';
        renderFriendDuel();
    } else {
        d.phase = 'result';
        fdRecordResult();
        renderFriendDuel();
    }
}

function fdRecordResult() {
    const d = FriendState.duel;
    if (!d || d.recorded) return;
    d.recorded = true;
    const friend = FriendState.friends.find(f => f.username === d.friend);
    if (!friend) return;
    if (d.meScore > d.friendScore) {
        friend.wins = (friend.wins || 0) + 1;
        friend.streak = (friend.streak || 0) > 0 ? friend.streak + 1 : 1;
    } else if (d.friendScore > d.meScore) {
        friend.losses = (friend.losses || 0) + 1;
        friend.streak = (friend.streak || 0) < 0 ? friend.streak - 1 : -1;
    }
    saveFriends();
}

function renderFriendDuel() {
    const d = FriendState.duel;
    const box = document.getElementById('friend-duel-content');
    if (!d || !box) return;
    box.innerHTML = '';

    if (d.phase === 'intro') {
        const title = document.createElement('h2');
        title.textContent = '⚔️ Duel amical';
        box.appendChild(title);
        const vs = document.createElement('p');
        vs.className = 'fd-vs';
        vs.textContent = AuthState.currentUser.username + ' 🆚 ' + d.friend;
        box.appendChild(vs);
        const label = document.createElement('p');
        label.className = 'fd-rules';
        label.textContent = 'Combien de questions par joueur ?';
        box.appendChild(label);
        const row = document.createElement('div');
        row.className = 'fd-counts';
        [3, 5, 10].forEach(n => {
            const b = document.createElement('button');
            b.className = 'btn mode-btn fd-count' + (d.qCount === n ? ' active' : '');
            b.textContent = String(n);
            b.addEventListener('click', () => { d.qCount = n; renderFriendDuel(); });
            row.appendChild(b);
        });
        box.appendChild(row);
        const rules = document.createElement('p');
        rules.className = 'fd-rules';
        rules.textContent = 'Les mêmes questions pour les deux joueurs. Le meilleur score remporte le duel !';
        box.appendChild(rules);
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary fd-btn';
        btn.textContent = 'Commencer le duel';
        btn.addEventListener('click', fdStart);
        box.appendChild(btn);

    } else if (d.phase === 'pass') {
        const icon = document.createElement('div');
        icon.className = 'fd-pass-icon';
        icon.textContent = '📱';
        box.appendChild(icon);
        const t = document.createElement('h3');
        const turnName = d.turn === 'me' ? AuthState.currentUser.username : d.friend;
        t.textContent = "Passez l'appareil à " + turnName;
        box.appendChild(t);
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary fd-btn';
        btn.textContent = "C'est parti !";
        btn.addEventListener('click', fdBeginTurn);
        box.appendChild(btn);

    } else if (d.phase === 'question') {
        const head = document.createElement('div');
        head.className = 'fd-head';
        const who = document.createElement('span');
        who.className = 'fd-who';
        who.textContent = (d.turn === 'me' ? AuthState.currentUser.username : d.friend) + ' - Question ' + (d.qIndex + 1) + '/' + d.questions.length;
        const score = document.createElement('span');
        score.className = 'fd-score';
        score.textContent = '⭐ ' + (d.turn === 'me' ? d.meScore : d.friendScore) + ' pts';
        head.appendChild(who);
        head.appendChild(score);
        box.appendChild(head);
        const q = d.questions[d.qIndex];
        const qt = document.createElement('h3');
        qt.className = 'fd-question';
        qt.textContent = q.text;
        box.appendChild(qt);
        if (q.hint) {
            const hint = document.createElement('p');
            hint.className = 'fd-hint';
            hint.textContent = q.hint;
            box.appendChild(hint);
        }
        const ac = document.createElement('div');
        ac.className = 'fd-answers';
        q.answers.forEach((answer, i) => {
            const el = document.createElement('div');
            el.className = 'fd-answer';
            el.textContent = answer;
            el.addEventListener('click', () => fdAnswer(i));
            ac.appendChild(el);
        });
        box.appendChild(ac);

    } else if (d.phase === 'result') {
        const me = AuthState.currentUser.username;
        let winnerText;
        if (d.meScore > d.friendScore) winnerText = '🏆 ' + me + ' remporte le duel !';
        else if (d.friendScore > d.meScore) winnerText = '🏆 ' + d.friend + ' remporte le duel !';
        else winnerText = '🤝 Égalité parfaite !';
        const title = document.createElement('h2');
        title.textContent = 'Résultat du duel';
        box.appendChild(title);
        const win = document.createElement('p');
        win.className = 'fd-winner';
        win.textContent = winnerText;
        box.appendChild(win);
        const scores = document.createElement('div');
        scores.className = 'fd-scores';
        const s1 = document.createElement('div');
        s1.textContent = me + ' : ' + d.meScore + '/' + d.questions.length;
        const s2 = document.createElement('div');
        s2.textContent = d.friend + ' : ' + d.friendScore + '/' + d.questions.length;
        scores.appendChild(s1);
        scores.appendChild(s2);
        box.appendChild(scores);

        const friend = FriendState.friends.find(f => f.username === d.friend);
        if (friend && (friend.streak || 0) > 1 && d.meScore > d.friendScore) {
            const streak = document.createElement('p');
            streak.className = 'fd-rules';
            streak.textContent = '🔥 Vous enchaînez : série de ' + friend.streak + ' victoires contre ' + d.friend + ' !';
            box.appendChild(streak);
        }

        const row = document.createElement('div');
        row.className = 'fc-actions';
        const again = document.createElement('button');
        again.className = 'btn btn-secondary fd-btn';
        again.textContent = '⚔️ Revanche';
        again.addEventListener('click', () => friendDuel(d.friend));
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary fd-btn';
        btn.textContent = 'Fermer';
        btn.addEventListener('click', closeFriendDuel);
        row.appendChild(again);
        row.appendChild(btn);
        box.appendChild(row);
    }
}

window.renderFriends = renderFriends;
window.addFriend = addFriend;
window.removeFriend = removeFriend;
window.friendDuel = friendDuel;
window.closeFriendDuel = closeFriendDuel;
window.runWorldSearch = runWorldSearch;
