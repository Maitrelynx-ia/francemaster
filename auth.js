// France Masters - Système d'authentification
// Gestion des comptes utilisateurs

// État de l'authentification
const AuthState = {
    currentUser: null,
    users: [],
    packs: {
        count: 0,
        max: 10,
        lastOpenTime: 0,
        cooldown: 15 * 60 * 1000 // 15 minutes en millisecondes
    }
};

// Charger les utilisateurs depuis localStorage
function loadUsers() {
    const usersData = localStorage.getItem('franceMastersUsers');
    if (usersData) {
        try {
            AuthState.users = JSON.parse(usersData);
        } catch (e) {
            console.error('Erreur chargement utilisateurs:', e);
            AuthState.users = [];
        }
    }
    
    // Charger l'utilisateur actuel
    const currentUserData = localStorage.getItem('franceMastersCurrentUser');
    if (currentUserData) {
        try {
            AuthState.currentUser = JSON.parse(currentUserData);
            loadUserPacks();
        } catch (e) {
            console.error('Erreur chargement utilisateur actuel:', e);
        }
    }
}

// Sauvegarder les utilisateurs
function saveUsers() {
    localStorage.setItem('franceMastersUsers', JSON.stringify(AuthState.users));
}

// Sauvegarder l'utilisateur actuel
function saveCurrentUser() {
    if (AuthState.currentUser) {
        localStorage.setItem('franceMastersCurrentUser', JSON.stringify(AuthState.currentUser));
    } else {
        localStorage.removeItem('franceMastersCurrentUser');
    }
}

// Charger les packs de l'utilisateur
function loadUserPacks() {
    if (!AuthState.currentUser) return;
    
    const userPacksData = localStorage.getItem(`franceMastersPacks_${AuthState.currentUser.username}`);
    if (userPacksData) {
        try {
            AuthState.packs = JSON.parse(userPacksData);
        } catch (e) {
            console.error('Erreur chargement packs:', e);
            AuthState.packs = { count: 0, max: 10, lastOpenTime: 0, cooldown: 15 * 60 * 1000 };
        }
    }
}

// Sauvegarder les packs de l'utilisateur
function saveUserPacks() {
    if (!AuthState.currentUser) return;
    
    localStorage.setItem(`franceMastersPacks_${AuthState.currentUser.username}`, JSON.stringify(AuthState.packs));
}

// S'inscrire
function register(event) {
    event.preventDefault();
    
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    
    // Validation
    if (username.length < 3) {
        document.getElementById('register-error').textContent = 'Le pseudo doit contenir au moins 3 caractères';
        return;
    }
    
    if (password.length < 6) {
        document.getElementById('register-error').textContent = 'Le mot de passe doit contenir au moins 6 caractères';
        return;
    }
    
    if (password !== confirmPassword) {
        document.getElementById('register-error').textContent = 'Les mots de passe ne correspondent pas';
        return;
    }
    
    // Vérifier si l'utilisateur existe déjà
    if (AuthState.users.some(user => user.username === username)) {
        document.getElementById('register-error').textContent = 'Ce pseudo est déjà utilisé';
        return;
    }
    
    // Créer le nouvel utilisateur
    const newUser = {
        username: username,
        password: hashPassword(password),
        createdAt: Date.now()
    };
    
    AuthState.users.push(newUser);
    saveUsers();
    
    // Connecter automatiquement
    AuthState.currentUser = { username: username };
    saveCurrentUser();
    
    // Initialiser les packs
    AuthState.packs = { count: 0, max: 10, lastOpenTime: 0, cooldown: 15 * 60 * 1000 };
    saveUserPacks();
    
    // Fermer le modal
    closeAuthModal();
    
    // Mettre à jour l'interface
    updateAuthUI();
    
    showToast('Succès', 'Inscription réussie !', 'success');
}

// Se connecter
function login(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    
    // Trouver l'utilisateur
    const user = AuthState.users.find(user => user.username === username);
    
    if (!user) {
        document.getElementById('login-error').textContent = 'Pseudo ou mot de passe incorrect';
        return;
    }
    
    // Vérifier le mot de passe
    if (user.password !== hashPassword(password)) {
        document.getElementById('login-error').textContent = 'Pseudo ou mot de passe incorrect';
        return;
    }
    
    // Connecter l'utilisateur
    AuthState.currentUser = { username: username };
    saveCurrentUser();
    
    // Charger les packs
    loadUserPacks();
    
    // Fermer le modal
    closeAuthModal();
    
    // Mettre à jour l'interface
    updateAuthUI();
    
    showToast('Succès', 'Connexion réussie !', 'success');
}

// Se déconnecter
function logout() {
    AuthState.currentUser = null;
    AuthState.packs = { count: 0, max: 10, lastOpenTime: 0, cooldown: 15 * 60 * 1000 };
    saveCurrentUser();
    
    closeProfileModal();
    updateAuthUI();
    
    showToast('Info', 'Déconnexion réussie', 'info');
}

// Hacher le mot de passe (simple hash, pas sécurisé pour un vrai site mais suffisant pour un jeu local)
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString();
}

// Vérifier si l'utilisateur est connecté
function isLoggedIn() {
    return AuthState.currentUser !== null;
}

// Récolter un pack : l'ajoute à la réserve de packs non ouverts (max 10)
function claimPack() {
    if (!isLoggedIn()) {
        showAuthModal();
        return false;
    }
    
    // Vérifier si la réserve est pleine
    if (AuthState.packs.count >= AuthState.packs.max) {
        showToast('Info', "Réserve pleine (" + AuthState.packs.count + "/" + AuthState.packs.max + ") ! Ouvrez vos packs stockés avant d'en récolter d'autres.", 'info');
        return false;
    }
    
    // Vérifier le timer de récolte
    const now = Date.now();
    const timeSinceLastOpen = now - AuthState.packs.lastOpenTime;
    
    if (timeSinceLastOpen < AuthState.packs.cooldown) {
        const remainingTime = Math.ceil((AuthState.packs.cooldown - timeSinceLastOpen) / 1000 / 60);
        showToast('Info', "Prochain pack récoltable dans " + remainingTime + " minute(s) !", 'info');
        return false;
    }
    
    // Stocker le pack dans la réserve
    AuthState.packs.lastOpenTime = now;
    AuthState.packs.count++;
    saveUserPacks();
    updateAuthUI();
    
    showToast('Succès', "Pack récolté et stocké ! Réserve : " + AuthState.packs.count + "/" + AuthState.packs.max, 'success');
    return true;
}

// Ouvrir un pack stocké (aucun délai, dans la limite de la réserve)
function openStoredPack() {
    if (!isLoggedIn()) {
        showAuthModal();
        return false;
    }
    
    if (!AuthState.packs || AuthState.packs.count <= 0) {
        showToast('Info', "Aucun pack stocké ! Récoltez-en un avec le bouton 🎁.", 'info');
        return false;
    }
    
    AuthState.packs.count--;
    saveUserPacks();
    
    // Ouvrir le pack (fonction du jeu)
    openPack();
    
    updateAuthUI();
    return true;
}

// Mettre à jour l'interface d'authentification
function updateAuthUI() {
    const userInfoContainer = document.getElementById('user-info-container');
    
    if (isLoggedIn()) {
        // Utilisateur connecté
        userInfoContainer.style.display = 'flex';
        document.getElementById('user-name').textContent = AuthState.currentUser.username;
        const coinsEl = document.getElementById('user-coins');
        if (coinsEl && window.GameState) {
            coinsEl.textContent = GameState.coins;
        }
        
        // Mettre à jour le compteur et le timer de packs
        updatePackCounter();
        updatePackTimer();
    } else {
        // Utilisateur déconnecté
        userInfoContainer.style.display = 'none';
    }
    
    // Mettre à jour le header
    updateHeader();
}

// Mettre à jour le compteur de packs
function updatePackCounter() {
    // Compteur de packs stockés, affiché partout via la classe .stored-pack-count
    document.querySelectorAll('.stored-pack-count').forEach(el => {
        el.textContent = AuthState.packs.count;
    });
    
    const profilePacks = document.getElementById('profile-packs');
    if (profilePacks) {
        profilePacks.textContent = AuthState.packs.count + '/' + AuthState.packs.max;
    }
}

// Mettre à jour le timer
function updatePackTimer() {
    if (!isLoggedIn()) return;
    
    const now = Date.now();
    const timeSinceLastOpen = now - AuthState.packs.lastOpenTime;
    
    const profileTimer = document.getElementById('profile-timer');
    if (profileTimer) {
        if (timeSinceLastOpen >= AuthState.packs.cooldown) {
            profileTimer.innerHTML = 'Prêt';
        } else {
            const remainingTime = Math.ceil((AuthState.packs.cooldown - timeSinceLastOpen) / 1000 / 60);
            profileTimer.innerHTML = `${remainingTime} min`;
        }
    }
    
    // Mettre à jour le timer sur le bouton
    const packTimer = document.getElementById('pack-timer');
    if (packTimer) {
        if (timeSinceLastOpen >= AuthState.packs.cooldown) {
            packTimer.style.display = 'none';
        } else {
            const remainingTime = Math.ceil((AuthState.packs.cooldown - timeSinceLastOpen) / 1000 / 60);
            packTimer.innerHTML = `Prochain pack récoltable dans <span class="timer-value">${remainingTime} min</span>`;
            packTimer.style.display = 'block';
        }
    }
}

// Afficher le modal d'authentification
function showAuthModal() {
    document.getElementById('auth-modal').style.display = 'flex';
    document.getElementById('login-tab').classList.add('active');
    document.getElementById('register-tab').classList.remove('active');
    document.getElementById('login-error').textContent = '';
    document.getElementById('register-error').textContent = '';
}

// Fermer le modal d'authentification
function closeAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
}

// Afficher l'onglet de connexion
function showLoginTab() {
    document.getElementById('login-tab').classList.add('active');
    document.getElementById('register-tab').classList.remove('active');
    document.getElementById('login-tab').classList.add('active');
    document.getElementById('register-tab').classList.remove('active');
}

// Afficher l'onglet d'inscription
function showRegisterTab() {
    document.getElementById('login-tab').classList.remove('active');
    document.getElementById('register-tab').classList.add('active');
}

// Afficher le modal de profil
function showProfileModal() {
    if (!isLoggedIn()) {
        showAuthModal();
        return;
    }
    
    document.getElementById('profile-modal').style.display = 'flex';
    document.getElementById('profile-username').textContent = AuthState.currentUser.username;
    updatePackCounter();
    updatePackTimer();
}

// Fermer le modal de profil
function closeProfileModal() {
    document.getElementById('profile-modal').style.display = 'none';
}

// Mettre à jour le header avec les infos utilisateur
function updateHeader() {
    if (isLoggedIn()) {
        document.getElementById('user-name').textContent = AuthState.currentUser.username;
        const coinsEl = document.getElementById('user-coins');
        if (coinsEl && window.GameState) {
            coinsEl.textContent = GameState.coins;
        }
    }
}

// Démarrer le timer pour mettre à jour le compte à rebours
function startPackTimer() {
    setInterval(() => {
        if (isLoggedIn()) {
            updatePackTimer();
        }
    }, 1000);
}

// Initialiser l'authentification
function initAuth() {
    loadUsers();
    updateAuthUI();
    startPackTimer();
    
    // Brancher les boutons de récolte et d'ouverture de packs stockés
    document.querySelectorAll('.claim-pack-btn').forEach(button => {
        button.onclick = claimPack;
    });
    document.querySelectorAll('.open-stored-pack-btn').forEach(button => {
        button.onclick = openStoredPack;
    });
    
    // Ajouter le timer sous le bouton de récolte (onglet Packs)
    const packButton = document.getElementById('packs-claim-btn');
    if (packButton) {
        const timerDiv = document.createElement('div');
        timerDiv.id = 'pack-timer';
        timerDiv.className = 'pack-button-timer';
        timerDiv.style.display = 'none';
        packButton.parentNode.insertBefore(timerDiv, packButton.nextSibling);
    }
}

// Exposer les fonctions globalement
window.AuthState = AuthState;
window.isLoggedIn = isLoggedIn;
window.showAuthModal = showAuthModal;
window.closeAuthModal = closeAuthModal;
window.showLoginTab = showLoginTab;
window.showRegisterTab = showRegisterTab;
window.login = login;
window.register = register;
window.logout = logout;
window.showProfileModal = showProfileModal;
window.closeProfileModal = closeProfileModal;
window.updateAuthUI = updateAuthUI;
window.initAuth = initAuth;
window.claimPack = claimPack;
window.openStoredPack = openStoredPack;
window.openPackWithAuth = claimPack; // alias (ancien nom)

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', initAuth);
