// France Masters - Système d'amis
// Liste d'amis par compte et duels amicaux (même appareil)

const FRIEND_AVATARS = ['🦊', '🐺', '🦉', '🐯', '🐼', '🦁', '🐸', '🦄', '🐨', '🐙', '🦖', '🦜', '🐝', '🐬', '🦔', '🐲'];

const FriendState = {
    friends: [],
    duel: null
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

function renderFriends() {
    const grid = document.getElementById('friends-grid');
    if (!grid) return;
    const addBlock = document.getElementById('friends-add');
    if (!isLoggedIn()) {
        if (addBlock) addBlock.style.display = 'none';
        grid.innerHTML = '';
        const p = document.createElement('p');
        p.className = 'friends-empty';
        p.textContent = '🔒 Connectez-vous pour gérer vos amis !';
        grid.appendChild(p);
        return;
    }
    loadFriends();
    if (addBlock) addBlock.style.display = 'flex';
    grid.innerHTML = '';
    if (FriendState.friends.length === 0) {
        const p = document.createElement('p');
        p.className = 'friends-empty';
        p.textContent = "Aucun ami pour le moment. Ajoutez le pseudo d'un joueur inscrit ci-dessus !";
        grid.appendChild(p);
        return;
    }
    FriendState.friends.forEach(friend => {
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
        const record = document.createElement('div');
        record.className = 'friend-record';
        record.textContent = '⚔️ ' + friend.wins + 'V - ' + friend.losses + 'D';
        info.appendChild(name);
        info.appendChild(record);
        const actions = document.createElement('div');
        actions.className = 'friend-actions';
        const duelBtn = document.createElement('button');
        duelBtn.className = 'btn btn-primary';
        duelBtn.textContent = '⚔️ Défier';
        duelBtn.addEventListener('click', () => friendDuel(friend.username));
        const delBtn = document.createElement('button');
        delBtn.className = 'btn btn-danger';
        delBtn.textContent = '🗑️';
        delBtn.title = 'Retirer de mes amis';
        delBtn.addEventListener('click', () => removeFriend(friend.username));
        actions.appendChild(duelBtn);
        actions.appendChild(delBtn);
        card.appendChild(avatar);
        card.appendChild(info);
        card.appendChild(actions);
        grid.appendChild(card);
    });
}

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
    if (!AuthState.users.some(u => u.username === name)) {
        showToast('Erreur', "Aucun compte avec ce pseudo. L'ami doit s'être inscrit sur ce navigateur.", 'error');
        return;
    }
    if (FriendState.friends.some(f => f.username === name)) {
        showToast('Erreur', name + " est déjà dans vos amis.", 'error');
        return;
    }
    FriendState.friends.push({ username: name, wins: 0, losses: 0, addedAt: Date.now() });
    saveFriends();
    input.value = '';
    renderFriends();
    showToast('Succès', name + " a été ajouté à vos amis ! 🤝", 'success');
}

function removeFriend(username) {
    if (!confirm('Retirer ' + username + ' de vos amis ?')) return;
    FriendState.friends = FriendState.friends.filter(f => f.username !== username);
    saveFriends();
    renderFriends();
    showToast('Succès', username + ' a été retiré de vos amis.', 'success');
}

// ===== DUEL AMICAL (même appareil) =====

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
        questions: generateFriendQuestions(5),
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
    if (d.meScore > d.friendScore) friend.wins += 1;
    else if (d.friendScore > d.meScore) friend.losses += 1;
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
        const rules = document.createElement('p');
        rules.className = 'fd-rules';
        rules.textContent = '5 questions chacun, les mêmes pour les deux joueurs. Le meilleur score remporte le duel !';
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
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary fd-btn';
        btn.textContent = 'Fermer';
        btn.addEventListener('click', closeFriendDuel);
        box.appendChild(btn);
    }
}

window.renderFriends = renderFriends;
window.addFriend = addFriend;
window.removeFriend = removeFriend;
window.friendDuel = friendDuel;
window.closeFriendDuel = closeFriendDuel;
