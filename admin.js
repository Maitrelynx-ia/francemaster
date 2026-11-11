// France Masters - Rôle administrateur
// Le rôle d'administrateur est réservé au joueur maitre_lynx.
// Il affiche un badge 👑 dans l'en-tête et une section Administration
// dans les Paramètres (accès à l'éditeur de cartes).

const ADMIN_USERS = ['maitre_lynx'];

function isAdminName(name) {
    return !!name && ADMIN_USERS.some(function (a) {
        return a.toLowerCase() === String(name).toLowerCase();
    });
}

function isAdmin() {
    try {
        if (window.AuthState && window.AuthState.currentUser) {
            return isAdminName(window.AuthState.currentUser.username);
        }
    } catch (e) { /* ignore */ }
    return false;
}
window.isAdmin = isAdmin;
window.ADMIN_USERS = ADMIN_USERS;

(function () {
    function ensureBadge() {
        const nameEl = document.getElementById('user-name');
        if (!nameEl) return;
        const existing = document.getElementById('admin-badge');
        if (isAdmin()) {
            if (!existing) {
                const b = document.createElement('span');
                b.id = 'admin-badge';
                b.textContent = '👑';
                b.title = 'Administrateur';
                b.style.cssText = 'margin-left:6px;font-size:0.9em;filter:drop-shadow(0 0 6px rgba(255,215,0,0.8));';
                nameEl.appendChild(b);
            }
        } else if (existing) {
            existing.remove();
        }
    }

    function ensureAdminSection() {
        const section = document.getElementById('settings');
        if (!section) return;
        let s = document.getElementById('admin-section');
        if (isAdmin()) {
            if (!s) {
                s = document.createElement('div');
                s.className = 'settings-section';
                s.id = 'admin-section';
                s.innerHTML =
                    '<h3>🛠️ Administration</h3>' +
                    '<p>Ouvre l’éditeur pour ajouter, modifier ou supprimer des cartes, et les publier sur GitHub.</p>' +
                    '<a class="btn btn-primary" href="editor.html" style="text-decoration:none;display:inline-block;padding:10px 18px;">📝 Ouvrir l’éditeur de cartes</a>';
                const first = section.querySelector('.settings-section');
                if (first) section.insertBefore(s, first); else section.appendChild(s);
            }
            s.style.display = '';
        } else if (s) {
            s.remove();
        }
    }

    function sync() {
        ensureBadge();
        ensureAdminSection();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', sync);
    } else {
        sync();
    }
    setInterval(sync, 1500);
})();
