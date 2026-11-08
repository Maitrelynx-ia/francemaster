// France Masters - Espace administrateur
// Gestion des rôles et des comptes locaux

const ROLE_LABELS = { joueur: '🎮 Joueur', moderateur: '⭐ Modérateur', admin: '🛡️ Administrateur' };
const ROLE_ORDER = { admin: 0, moderateur: 1, joueur: 2 };
const ROLES = ['joueur', 'moderateur', 'admin'];

function getCurrentUser() {
    if (!AuthState.currentUser) return null;
    return AuthState.users.find(u => u.username === AuthState.currentUser.username) || null;
}

function isAdmin() {
    const user = getCurrentUser();
    return !!user && user.role === 'admin';
}

function ensureRoles() {
    let changed = false;
    AuthState.users.forEach(u => {
        if (!u.role) {
            u.role = 'joueur';
            changed = true;
        }
    });
    if (AuthState.users.length > 0 && !AuthState.users.some(u => u.role === 'admin')) {
        AuthState.users[0].role = 'admin';
        changed = true;
    }
    if (changed) saveUsers();
}

function showAdminPanel() {
    if (!isAdmin()) {
        showToast('Erreur', "Accès réservé aux administrateurs !", 'error');
        return;
    }
    const modal = document.getElementById('admin-modal');
    if (modal) modal.style.display = 'flex';
    renderAdminUsers();
}

function closeAdminPanel() {
    const modal = document.getElementById('admin-modal');
    if (modal) modal.style.display = 'none';
}

function renderAdminUsers() {
    const list = document.getElementById('admin-users-list');
    if (!list) return;
    list.innerHTML = '';
    if (AuthState.users.length === 0) {
        list.innerHTML = '<p class="admin-empty">Aucun compte enregistré.</p>';
        return;
    }
    const sorted = AuthState.users.slice().sort((a, b) => {
        const ra = ROLE_ORDER[a.role || 'joueur'];
        const rb = ROLE_ORDER[b.role || 'joueur'];
        if (ra !== rb) return ra - rb;
        return a.username.localeCompare(b.username);
    });
    sorted.forEach(user => {
        const role = user.role || 'joueur';
        const isSelf = AuthState.currentUser && AuthState.currentUser.username === user.username;
        const row = document.createElement('div');
        row.className = 'admin-user-row' + (isSelf ? ' self' : '');
        const name = document.createElement('span');
        name.className = 'admin-user-name';
        name.textContent = user.username + (isSelf ? ' (vous)' : '');
        const badge = document.createElement('span');
        badge.className = 'role-badge role-' + role;
        badge.textContent = ROLE_LABELS[role];
        const select = document.createElement('select');
        select.className = 'admin-role-select';
        ROLES.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r;
            opt.textContent = ROLE_LABELS[r];
            if (r === role) opt.selected = true;
            select.appendChild(opt);
        });
        if (isSelf) {
            select.disabled = true;
            select.title = "Vous ne pouvez pas changer votre propre rôle";
        } else {
            select.addEventListener('change', () => changeUserRole(user.username, select.value));
        }
        const delBtn = document.createElement('button');
        delBtn.className = 'btn btn-danger admin-user-btn';
        delBtn.textContent = '🗑️';
        delBtn.title = "Supprimer le compte";
        if (isSelf) {
            delBtn.disabled = true;
            delBtn.title = "Impossible de supprimer votre propre compte";
        } else {
            delBtn.addEventListener('click', () => deleteUser(user.username));
        }
        row.appendChild(name);
        row.appendChild(badge);
        row.appendChild(select);
        row.appendChild(delBtn);
        list.appendChild(row);
    });
}

function changeUserRole(username, role) {
    if (!isAdmin()) {
        showToast('Erreur', "Accès réservé aux administrateurs !", 'error');
        return;
    }
    if (AuthState.currentUser && AuthState.currentUser.username === username) {
        showToast('Erreur', "Impossible de modifier votre propre rôle !", 'error');
        renderAdminUsers();
        return;
    }
    const user = AuthState.users.find(u => u.username === username);
    if (!user || !ROLES.includes(role)) return;
    user.role = role;
    saveUsers();
    renderAdminUsers();
    showToast('Succès', user.username + " a maintenant le rôle : " + ROLE_LABELS[role], 'success');
}

function deleteUser(username) {
    if (!isAdmin()) {
        showToast('Erreur', "Accès réservé aux administrateurs !", 'error');
        return;
    }
    if (AuthState.currentUser && AuthState.currentUser.username === username) {
        showToast('Erreur', "Impossible de supprimer votre propre compte !", 'error');
        return;
    }
    const user = AuthState.users.find(u => u.username === username);
    if (!user) return;
    if (!confirm('Supprimer définitivement le compte de ' + username + ' ?')) return;
    AuthState.users = AuthState.users.filter(u => u.username !== username);
    saveUsers();
    localStorage.removeItem('franceMastersPacks_' + username);
    renderAdminUsers();
    showToast('Succès', 'Compte ' + username + ' supprimé.', 'success');
}

function adminGiveCoins(amount) {
    if (!isAdmin()) {
        showToast('Erreur', "Accès réservé aux administrateurs !", 'error');
        return;
    }
    GameState.coins += amount;
    saveGame();
    updateUI();
    updateAuthUI();
    showToast('Succès', '+' + amount + ' pièces ajoutées !', 'success');
}

function adminAddPacks(n) {
    if (!isAdmin()) {
        showToast('Erreur', "Accès réservé aux administrateurs !", 'error');
        return;
    }
    AuthState.packs.count = Math.min(AuthState.packs.max, AuthState.packs.count + n);
    saveUserPacks();
    updateAuthUI();
    showToast('Succès', '+' + n + ' pack ajouté à la réserve (' + AuthState.packs.count + '/' + AuthState.packs.max + ').', 'success');
}

function adminResetCooldown() {
    if (!isAdmin()) {
        showToast('Erreur', "Accès réservé aux administrateurs !", 'error');
        return;
    }
    AuthState.packs.lastOpenTime = 0;
    saveUserPacks();
    updateAuthUI();
    showToast('Succès', 'Cooldown de récolte réinitialisé !', 'success');
}

document.addEventListener('DOMContentLoaded', function () {
    ensureRoles();
});

window.isAdmin = isAdmin;
window.showAdminPanel = showAdminPanel;
window.closeAdminPanel = closeAdminPanel;
window.changeUserRole = changeUserRole;
window.deleteUser = deleteUser;
window.adminGiveCoins = adminGiveCoins;
window.adminAddPacks = adminAddPacks;
window.adminResetCooldown = adminResetCooldown;
