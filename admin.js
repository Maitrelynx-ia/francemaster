// France Masters - Rôle administrateur (réservé à maitre_lynx)
// Badge 👑 dans l'en-tête, onglet 🛠️ Admin dans la navigation :
// éditeur de cartes, gestion des comptes (suppression, remise à zéro)
// et statistiques du classement en ligne.

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
            ".admin-acc-reset { border: 1px solid rgba(240,180,60,0.6); background: transparent; color: inherit; border-radius: 8px; padding: 6px 10px; cursor: pointer; font: inherit; }",
            ".admin-acc-reset:hover { background: rgba(240,180,60,0.15); }",
            ".admin-acc-status { opacity: 0.7; font-size: 0.9rem; padding: 6px 0; }",
            ".admin-acc-note { opacity: 0.65; font-size: 0.82rem; margin-top: 8px; }",
            ".admin-stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }",
            ".admin-stat-card { background: var(--surface, rgba(128,128,128,0.08)); border-radius: 12px; padding: 12px 14px; }",
            ".admin-stat-value { font-size: 1.3rem; font-weight: 700; }",
            ".admin-stat-label { opacity: 0.7; font-size: 0.82rem; }",
            "#admin-nav-tab { position: relative; }"
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

    // ----- Outils d'administration -----

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

    // Supprime l'entrée du classement en ligne (règle DELETE requise dans Supabase)
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

    // Remet à zéro le score en ligne d'un joueur (mise à jour, autorisée par RLS)
    function resetPlayerScore(name) {
        var key = onlineKey(name);
        return fetch(SUPABASE_URL + "/rest/v1/players?key=eq." + encodeURIComponent(key), {
            method: "PATCH",
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": "Bearer " + SUPABASE_KEY,
                "Content-Type": "application/json",
                "Prefer": "return=minimal"
            },
            body: JSON.stringify({ cards: 0, distinct_cards: 0, value: 0 })
        }).then(function (r) { return r.ok; }).catch(function () { return false; });
    }

    function wireAdminButtons(zone) {
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
                    renderAdminStats();
                    toastAdmin(ok
                        ? "🗑️ \"" + n + "\" retiré du classement en ligne"
                        : "⚠️ Suppression refusée : ajoute la règle DELETE sur la table players dans Supabase");
                });
            });
        });
        zone.querySelectorAll("button[data-reset]").forEach(function (b) {
            b.addEventListener("click", function () {
                var n = b.getAttribute("data-reset");
                if (!confirm("Remettre le score de \"" + n + "\" à zéro dans le classement en ligne ?")) return;
                resetPlayerScore(n).then(function (ok) {
                    renderAccounts();
                    renderAdminStats();
                    toastAdmin(ok
                        ? "♻️ Score de \"" + n + "\" remis à zéro"
                        : "⚠️ Impossible de réinitialiser le score de \"" + n + "\"");
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
                    (isMe ? '' :
                        '<button type="button" class="admin-acc-reset" data-reset="' + escapeHtml(n) + '" title="Remettre son score en ligne à zéro">♻️</button>' +
                        '<button type="button" class="admin-acc-del" data-local="' + escapeHtml(n) + '" title="Supprimer ce compte">🗑️</button>') +
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
                        '<button type="button" class="admin-acc-reset" data-reset="' + escapeHtml(p.name) + '" title="Remettre son score à zéro">♻️</button>' +
                        '<button type="button" class="admin-acc-del" data-online="' + escapeHtml(p.name) + '" title="Retirer du classement">🗑️</button>' +
                        '</div>';
                }).join("");
            }
            html += '<div class="admin-acc-note">♻️ remet le score en ligne à zéro · 🗑️ supprime le compte et son entrée du classement. Le compte connecté ne peut pas être supprimé depuis lui-même.</div>';
            zone.innerHTML = html;
            wireAdminButtons(zone);
        });
    }

    function renderAdminStats() {
        var zone = document.getElementById("admin-stats");
        if (!zone) return;
        zone.innerHTML = '<div class="admin-acc-status">Chargement…</div>';
        fetch(SUPABASE_URL + "/rest/v1/players?select=name,cards,distinct_cards,value,updated&order=value.desc&limit=200", {
            headers: { "apikey": SUPABASE_KEY, "Authorization": "Bearer " + SUPABASE_KEY }
        }).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; }).then(function (players) {
            players = players || [];
            if (players.length === 0) {
                zone.innerHTML = '<div class="admin-acc-status">Aucun joueur en ligne pour le moment.</div>';
                return;
            }
            var totalCards = 0, totalValue = 0, lastSeen = 0, last = null;
            players.forEach(function (p) {
                totalCards += p.cards || 0;
                totalValue += p.value || 0;
                if ((p.updated || 0) > lastSeen) { lastSeen = p.updated || 0; last = p; }
            });
            var lastTxt = last ? new Date(lastSeen).toLocaleString("fr-FR") : "—";
            zone.innerHTML =
                '<div class="admin-stat-grid">' +
                '<div class="admin-stat-card"><div class="admin-stat-value">' + players.length + '</div><div class="admin-stat-label">Joueurs en ligne</div></div>' +
                '<div class="admin-stat-card"><div class="admin-stat-value">' + totalCards + '</div><div class="admin-stat-label">Cartes en circulation</div></div>' +
                '<div class="admin-stat-card"><div class="admin-stat-value">' + totalValue + '</div><div class="admin-stat-label">Valeur totale 💎</div></div>' +
                '<div class="admin-stat-card"><div class="admin-stat-value">🥇 ' + escapeHtml(players[0].name) + '</div><div class="admin-stat-label">Meilleur score</div></div>' +
                '<div class="admin-stat-card"><div class="admin-stat-value" style="font-size:0.95rem;">' + (last ? escapeHtml(last.name) : '—') + '</div><div class="admin-stat-label">Dernier actif · ' + lastTxt + '</div></div>' +
                '</div>' +
                '<button type="button" class="st-btn" id="admin-stats-refresh" style="margin-top:10px;">🔄 Actualiser les statistiques</button>';
            var rb = document.getElementById("admin-stats-refresh");
            if (rb) rb.addEventListener("click", renderAdminStats);
        });
    }

    // ----- Onglet Admin -----

    function ensureAdminTab() {
        var nav = document.querySelector('.nav-tabs');
        var main = document.querySelector('.main-content');
        if (!nav || !main) return;
        var btn = document.getElementById('admin-nav-tab');
        var sec = document.getElementById('admin');
        if (isAdmin()) {
            if (!btn) {
                btn = document.createElement('button');
                btn.className = 'nav-tab';
                btn.id = 'admin-nav-tab';
                btn.setAttribute('data-tab', 'admin');
                btn.textContent = '🛠️ Admin';
                btn.title = 'Outils d\'administration (maitre_lynx)';
                var ideas = nav.querySelector('a.nav-tab');
                if (ideas) nav.insertBefore(btn, ideas); else nav.appendChild(btn);
                btn.addEventListener('click', function () {
                    if (typeof switchTab === 'function') switchTab('admin');
                });
            }
            if (!sec) {
                sec = document.createElement('section');
                sec.id = 'admin';
                sec.className = 'tab-content';
                sec.innerHTML =
                    '<div class="settings-header"><h2>🛠️ Administration</h2><p>Outils réservés à l\'administrateur (maitre_lynx).</p></div>' +
                    '<div class="settings-section">' +
                    '<h3>📝 Éditeur de cartes</h3>' +
                    '<p>Ajoute, modifie ou supprime des cartes, puis publie-les sur GitHub.</p>' +
                    '<a class="btn btn-primary" href="editor.html" style="text-decoration:none;display:inline-block;padding:10px 18px;">📝 Ouvrir l\'éditeur de cartes</a>' +
                    '</div>' +
                    '<div class="settings-section">' +
                    '<h3>👥 Gestion des comptes</h3>' +
                    '<div id="admin-accounts-list"></div>' +
                    '<button type="button" class="st-btn" id="admin-acc-refresh" style="margin-top:6px;">🔄 Actualiser la liste</button>' +
                    '</div>' +
                    '<div class="settings-section">' +
                    '<h3>📊 Classement en ligne</h3>' +
                    '<div id="admin-stats"></div>' +
                    '</div>';
                main.appendChild(sec);
                document.getElementById('admin-acc-refresh').addEventListener('click', renderAccounts);
                renderAccounts();
                renderAdminStats();
            }
            btn.style.display = '';
        } else {
            if (btn) btn.remove();
            if (sec) {
                var wasActive = sec.classList.contains('active');
                sec.remove();
                if (wasActive && typeof switchTab === 'function') {
                    try { switchTab('home'); } catch (e) { /* ignore */ }
                }
            }
        }
    }

    function sync() {
        ensureBadge();
        ensureAdminTab();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', sync);
    } else {
        sync();
    }
    setInterval(sync, 1500);
})();
