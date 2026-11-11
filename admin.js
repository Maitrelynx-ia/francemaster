// France Masters - Rôle administrateur (réservé à maitre_lynx)
// Badge 👑 dans l'en-tête, section Administration dans les Paramètres :
// accès à l'éditeur de cartes et gestion des comptes (suppression).

const ADMIN_USERS = ['maitre_lynx'];

var SUPABASE_URL = "https://wossxalinroykryemifh.supabase.co";
var SUPABASE_KEY = "sb_publishable_pVjrrIXKNjftbm1wrXlkBw_pSZEYYWo";

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
    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
        });
    }

    function toastAdmin(msg) {
        var t = document.createElement("div");
        t.style.cssText = "position:fixed;bottom:22px;left:50%;transform:translateX(-50%);background:rgba(20,20,30,0.92);color:#fff;padding:12px 22px;border-radius:999px;box-shadow:0 6px 20px rgba(0,0,0,0.35);z-index:9999;font-size:0.95rem;max-width:90vw;text-align:center;";
        t.textContent = msg;
        document.body.appendChild(t);
        setTimeout(function () { t.remove(); }, 3200);
    }

    function injectAdminStyles() {
        if (document.getElementById("admin-styles")) return;
        var st = document.createElement("style");
        st.id = "admin-styles";
        st.textContent = [
            ".admin-acc-title { font-weight: 600; margin: 14px 0 8px; }",
            ".admin-acc-row { display: flex; align-items: center; gap: 10px; background: var(--surface, rgba(128,128,128,0.08)); border-radius: 10px; padding: 8px 12px; margin-bottom: 6px; flex-wrap: wrap; }",
            ".admin-acc-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--primary, #4169e1); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 0.95rem; }",
            ".admin-acc-name { flex: 1; font-weight: 600; min-width: 120px; }",
            ".admin-acc-you { opacity: 0.7; font-weight: 400; font-size: 0.85rem; }",
            ".admin-acc-stats { opacity: 0.7; font-size: 0.85rem; white-space: nowrap; }",
            ".admin-acc-del { border: 1px solid rgba(220,80,80,0.5); background: transparent; color: inherit; border-radius: 8px; padding: 6px 10px; cursor: pointer; font: inherit; }",
            ".admin-acc-del:hover { background: rgba(220,80,80,0.15); }",
            ".admin-acc-status { opacity: 0.7; font-size: 0.9rem; padding: 6px 0; }",
            ".admin-acc-note { opacity: 0.65; font-size: 0.82rem; margin-top: 8px; }"
        ].join("\n");
        document.head.appendChild(st);
    }

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

    // ----- Gestion des comptes -----

    function onlineKey(name) {
        return encodeURIComponent(name).replace(/[^\w\-]/g, "_");
    }

    function currentName() {
        try {
            return (window.AuthState && window.AuthState.currentUser) ? window.AuthState.currentUser.username : null;
        } catch (e) { return null; }
    }

    function getLocalUsers() {
        try {
            var u = JSON.parse(localStorage.getItem("franceMastersUsers") || "[]");
            return Array.isArray(u) ? u : [];
        } catch (e) { return []; }
    }

    function saveLocalUsers(users) {
        localStorage.setItem("franceMastersUsers", JSON.stringify(users));
        try { if (window.AuthState) window.AuthState.users = users; } catch (e) { /* ignore */ }
    }

    // Supprime un compte local : entrée users + données personnelles de l'appareil
    function deleteLocalAccount(name) {
        var users = getLocalUsers();
        var idx = -1;
        for (var i = 0; i < users.length; i++) {
            if (String(users[i].username || "").toLowerCase() === name.toLowerCase()) { idx = i; break; }
        }
        if (idx !== -1) {
            users.splice(idx, 1);
            saveLocalUsers(users);
        }
        localStorage.removeItem("franceMastersPacks_" + name);
        localStorage.removeItem("franceMastersFriends_" + name);
        try {
            var snaps = JSON.parse(localStorage.getItem("franceMastersLocalLeaderboard") || "{}");
            if (snaps[name]) {
                delete snaps[name];
                localStorage.setItem("franceMastersLocalLeaderboard", JSON.stringify(snaps));
            }
        } catch (e) { /* ignore */ }
    }

    // Supprime l'entrée du classement en ligne (nécessite la règle DELETE dans Supabase)
    function deleteOnlineEntry(name) {
        var key = onlineKey(name);
        return fetch(SUPABASE_URL + "/rest/v1/players?key=eq." + encodeURIComponent(key), {
            method: "DELETE",
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": "Bearer " + SUPABASE_KEY,
                "Prefer": "return=minimal"
            }
        }).then(function (r) { return r.ok; }).catch(function () { return false; });
    }

    function wireDeleteButtons(zone) {
        zone.querySelectorAll("button[data-local]").forEach(function (b) {
            b.addEventListener("click", function () {
                var n = b.getAttribute("data-local");
                if (!confirm("Supprimer le compte \"" + n + "\" ?\nSes packs, ses amis et son score sur cet appareil seront définitivement effacés.")) return;
                deleteLocalAccount(n);
                deleteOnlineEntry(n).then(function (ok) {
                    renderAccounts();
                    try { if (typeof updateAuthUI === "function") updateAuthUI(); } catch (e) { /* ignore */ }
                    toastAdmin(ok
                        ? "🗑️ Compte \"" + n + "\" supprimé (appareil + classement en ligne)"
                        : "🗑️ Compte \"" + n + "\" supprimé sur cet appareil (entrée en ligne conservée)");
                });
            });
        });
        zone.querySelectorAll("button[data-online]").forEach(function (b) {
            b.addEventListener("click", function () {
                var n = b.getAttribute("data-online");
                if (!confirm("Supprimer \"" + n + "\" du classement en ligne ?")) return;
                deleteOnlineEntry(n).then(function (ok) {
                    renderAccounts();
                    toastAdmin(ok
                        ? "🗑️ \"" + n + "\" retiré du classement en ligne"
                        : "⚠️ Suppression refusée : ajoute la règle DELETE sur la table players dans Supabase");
                });
            });
        });
    }

    function renderAccounts() {
        var zone = document.getElementById("admin-accounts-list");
        if (!zone) return;
        zone.innerHTML = '<div class="admin-acc-status">Chargement…</div>';
        var me = currentName();
        var users = getLocalUsers();
        var html = "";

        html += '<div class="admin-acc-title">💾 Comptes sur cet appareil</div>';
        if (users.length === 0) {
            html += '<div class="admin-acc-status">Aucun compte enregistré sur cet appareil.</div>';
        } else {
            html += users.map(function (u) {
                var n = String(u.username || "?");
                var isMe = me && n.toLowerCase() === String(me).toLowerCase();
                return '<div class="admin-acc-row">' +
                    '<span class="admin-acc-avatar">' + escapeHtml(n.charAt(0).toUpperCase()) + '</span>' +
                    '<span class="admin-acc-name">' + escapeHtml(n) + (isMe ? ' <span class="admin-acc-you">(connecté)</span>' : '') + '</span>' +
                    (isMe ? '' : '<button type="button" class="admin-acc-del" data-local="' + escapeHtml(n) + '" title="Supprimer ce compte">🗑️</button>') +
                    '</div>';
            }).join("");
        }

        fetch(SUPABASE_URL + "/rest/v1/players?select=key,name,cards,value&order=value.desc&limit=200", {
            headers: { "apikey": SUPABASE_KEY, "Authorization": "Bearer " + SUPABASE_KEY }
        }).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; }).then(function (players) {
            var locals = {};
            getLocalUsers().forEach(function (u) { locals[String(u.username || "").toLowerCase()] = true; });
            var onlineOnly = (players || []).filter(function (p) {
                return p && p.name && !locals[String(p.name).toLowerCase()];
            });
            if (onlineOnly.length) {
                html += '<div class="admin-acc-title">🌍 Joueurs du classement en ligne</div>';
                html += onlineOnly.map(function (p) {
                    return '<div class="admin-acc-row">' +
                        '<span class="admin-acc-avatar">🌍</span>' +
                        '<span class="admin-acc-name">' + escapeHtml(p.name) + '</span>' +
                        '<span class="admin-acc-stats">💎 ' + (p.value || 0) + ' pts · 🃏 ' + (p.cards || 0) + ' cartes</span>' +
                        '<button type="button" class="admin-acc-del" data-online="' + escapeHtml(p.name) + '" title="Retirer du classement">🗑️</button>' +
                        '</div>';
                }).join("");
            }
            html += '<div class="admin-acc-note">La suppression d\'un compte efface aussi son entrée du classement en ligne. Le compte connecté ne peut pas être supprimé depuis lui-même.</div>';
            zone.innerHTML = html;
            wireDeleteButtons(zone);
        });
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
                    '<a class="btn btn-primary" href="editor.html" style="text-decoration:none;display:inline-block;padding:10px 18px;">📝 Ouvrir l’éditeur de cartes</a>' +
                    '<div style="margin-top:16px;">' +
                    '<h4 style="margin:0 0 4px;">👥 Gestion des comptes</h4>' +
                    '<div id="admin-accounts-list"></div>' +
                    '<button type="button" class="st-btn" id="admin-acc-refresh" style="margin-top:6px;">🔄 Actualiser la liste</button>' +
                    '</div>';
                const first = section.querySelector('.settings-section');
                if (first) section.insertBefore(s, first); else section.appendChild(s);
                document.getElementById('admin-acc-refresh').addEventListener('click', renderAccounts);
                renderAccounts();
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
