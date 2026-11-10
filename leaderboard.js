// France Masters - Classement des joueurs (nombre de cartes et valeur de collection)
// Valeur par rarete : C=10, R=25, SR=60, UR=150, L=400.
// Mode en ligne : Firebase Realtime Database (REST). Sans URL configuree,
// le classement fonctionne en mode local (snapshots par compte de ce navigateur).

(function () {
    "use strict";

    var BUILTIN_URL = ""; // URL Firebase a coller ici (ex. https://mon-projet.firebaseio.com)
    var VALUES = { C: 10, R: 25, SR: 60, UR: 150, L: 400 };
    var LS_LOCAL = "franceMastersLocalLeaderboard";
    var LS_URL = "franceMastersLeaderboardUrl";
    var sortBy = "value";

    function injectLeaderboardStyles() {
        if (document.getElementById("lb-styles")) return;
        var st = document.createElement("style");
        st.id = "lb-styles";
        st.textContent = [
            "#leaderboard { max-width: 900px; margin: 0 auto; }",
            "#leaderboard h2 { text-align: center; margin-bottom: 6px; }",
            ".lb-sub { text-align: center; opacity: 0.75; margin-bottom: 18px; font-size: 0.95rem; }",
            ".lb-controls { display: flex; gap: 10px; justify-content: center; margin-bottom: 18px; flex-wrap: wrap; }",
            ".lb-btn { padding: 8px 16px; border-radius: 999px; border: 1px solid rgba(128, 128, 128, 0.4); background: transparent; color: inherit; font: inherit; cursor: pointer; }",
            ".lb-btn.active { background: var(--primary, #4169e1); color: #fff; border-color: transparent; }",
            ".lb-podium { display: flex; gap: 12px; justify-content: center; align-items: flex-end; margin-bottom: 20px; flex-wrap: wrap; }",
            ".lb-podium-card { background: var(--surface, rgba(128,128,128,0.1)); border-radius: 14px; padding: 14px 18px; text-align: center; min-width: 150px; box-shadow: 0 4px 14px rgba(0,0,0,0.15); }",
            ".lb-podium-card.first { transform: scale(1.08); border: 2px solid #ffd700; }",
            ".lb-podium-card.second { border: 2px solid #c0c0c0; }",
            ".lb-podium-card.third { border: 2px solid #cd7f32; }",
            ".lb-podium-medal { font-size: 1.8rem; }",
            ".lb-podium-name { font-weight: bold; margin: 4px 0; }",
            ".lb-podium-value { font-size: 1.1rem; }",
            ".lb-podium-cards { opacity: 0.75; font-size: 0.85rem; }",
            ".lb-list { display: flex; flex-direction: column; gap: 8px; }",
            ".lb-row { display: flex; align-items: center; gap: 12px; background: var(--surface, rgba(128,128,128,0.08)); border-radius: 10px; padding: 10px 16px; }",
            ".lb-row.me { outline: 2px solid var(--primary, #4169e1); }",
            ".lb-rank { width: 34px; font-weight: bold; opacity: 0.8; }",
            ".lb-name { flex: 1; font-weight: 600; }",
            ".lb-cards, .lb-val { white-space: nowrap; }",
            ".lb-val { font-weight: bold; color: var(--primary, #4169e1); }",
            ".lb-status { text-align: center; opacity: 0.7; margin-top: 14px; font-size: 0.9rem; }",
            ".lb-admin { margin-top: 26px; font-size: 0.9rem; }",
            ".lb-admin summary { cursor: pointer; opacity: 0.7; }",
            ".lb-admin-box { margin-top: 10px; display: flex; flex-direction: column; gap: 8px; }",
            ".lb-admin-box input { padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(128,128,128,0.4); background: transparent; color: inherit; font: inherit; }",
            ".lb-empty { text-align: center; opacity: 0.6; padding: 20px; }"
        ].join("\n");
        document.head.appendChild(st);
    }

    function getFirebaseUrl() {
        return BUILTIN_URL || localStorage.getItem(LS_URL) || "";
    }

    function currentUsername() {
        try {
            if (window.isLoggedIn && window.isLoggedIn() && window.AuthState && window.AuthState.currentUser) {
                return window.AuthState.currentUser.username;
            }
        } catch (e) { /* ignore */ }
        return null;
    }

    function computeMyStats() {
        var cards = 0, distinct = 0, value = 0;
        var all = {};
        if (typeof getAllCards === "function") {
            getAllCards().forEach(function (c) { all[c.id] = c; });
        }
        var col = (typeof GameState !== "undefined") ? GameState.collection : {};
        Object.keys(col).forEach(function (id) {
            var entry = col[id];
            var n = (entry && entry.count) || 0;
            if (n <= 0) return;
            cards += n;
            distinct += 1;
            var card = all[id];
            var r = card ? card.rarity : "C";
            value += (VALUES[r] || 10) * n;
        });
        return { cards: cards, distinct: distinct, value: value };
    }

    function readLocalSnapshots() {
        try { return JSON.parse(localStorage.getItem(LS_LOCAL) || "{}"); } catch (e) { return {}; }
    }

    function saveMySnapshot() {
        var name = currentUsername();
        if (!name) return null;
        var stats = computeMyStats();
        var snaps = readLocalSnapshots();
        snaps[name] = { cards: stats.cards, distinct: stats.distinct, value: stats.value, updated: Date.now() };
        localStorage.setItem(LS_LOCAL, JSON.stringify(snaps));
        return stats;
    }

    function publishOnline(stats) {
        var url = getFirebaseUrl();
        var name = currentUsername();
        if (!url || !name || !stats) return Promise.resolve(false);
        var key = encodeURIComponent(name).replace(/[.#$\[\]\/]/g, "_");
        return fetch(url.replace(/\/+$/, "") + "/players/" + key + ".json", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, cards: stats.cards, distinct: stats.distinct, value: stats.value, updated: Date.now() })
        }).then(function (r) { return r.ok; }).catch(function () { return false; });
    }

    function fetchOnline() {
        var url = getFirebaseUrl();
        if (!url) return Promise.resolve(null);
        return fetch(url.replace(/\/+$/, "") + "/players.json").then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
    }

    function mergedPlayers(online) {
        var players = {};
        var local = readLocalSnapshots();
        Object.keys(local).forEach(function (k) {
            players[k] = { name: k, cards: local[k].cards, distinct: local[k].distinct, value: local[k].value, updated: local[k].updated };
        });
        if (online) {
            Object.keys(online).forEach(function (k) {
                var p = online[k];
                if (p && p.name) players[p.name] = p;
            });
        }
        return Object.keys(players).map(function (k) { return players[k]; });
    }

    function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }

    function escapeHtml(s) {
        var map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
        return String(s).replace(/[&<>"']/g, function (c) { return map[c]; });
    }

    function render() {
        var list = document.getElementById("lb-list");
        var podium = document.getElementById("lb-podium");
        if (!list || !podium) return;
        var me = currentUsername();

        var status = document.getElementById("lb-status");
        if (status) status.textContent = "Chargement du classement...";

        fetchOnline().then(function (online) {
            var players = mergedPlayers(online);
            players.sort(function (a, b) {
                if (sortBy === "cards") return (b.cards - a.cards) || (b.value - a.value);
                return (b.value - a.value) || (b.cards - a.cards);
            });

            var medals = ["\uD83E\uDD47", "\uD83E\uDD48", "\uD83E\uDD49"];
            var cls = ["first", "second", "third"];
            var top = players.slice(0, 3);
            if (top.length === 0) {
                podium.innerHTML = '<div class="lb-empty">Aucun joueur classé pour le moment. Connecte-toi et ouvre des packs !</div>';
            } else {
                podium.innerHTML = top.map(function (p, i) {
                    return '<div class="lb-podium-card ' + cls[i] + '">' +
                        '<div class="lb-podium-medal">' + medals[i] + "</div>" +
                        '<div class="lb-podium-name">' + escapeHtml(p.name) + "</div>" +
                        '<div class="lb-podium-value">\uD83D\uDC8E ' + fmt(p.value) + " pts</div>" +
                        '<div class="lb-podium-cards">\uD83C\uDCCF ' + fmt(p.cards) + " cartes</div>" +
                        "</div>";
                }).join("");
            }

            list.innerHTML = players.map(function (p, i) {
                return '<div class="lb-row' + (me && p.name === me ? " me" : "") + '">' +
                    '<span class="lb-rank">' + (i + 1) + "</span>" +
                    '<span class="lb-name">' + escapeHtml(p.name) + "</span>" +
                    '<span class="lb-cards">\uD83C\uDCCF ' + fmt(p.cards) + " cartes</span>" +
                    '<span class="lb-val">\uD83D\uDC8E ' + fmt(p.value) + " pts</span>" +
                    "</div>";
            }).join("");

            if (status) {
                status.textContent = online
                    ? "Classement en ligne synchronisé 🌍 (" + players.length + " joueur" + (players.length > 1 ? "s" : "") + ")"
                    : "Mode local : seuls les comptes de ce navigateur apparaissent. Connecte un serveur en ligne pour un classement mondial (voir en bas de page).";
            }
        });
    }

    function buildUI() {
        if (document.getElementById("leaderboard")) return;

        var nav = document.querySelector(".nav-tabs");
        if (nav && !nav.querySelector('[data-tab="leaderboard"]')) {
            var btn = document.createElement("button");
            btn.className = "nav-tab";
            btn.setAttribute("data-tab", "leaderboard");
            btn.textContent = "🏆 Classement";
            btn.addEventListener("click", function () { setTimeout(render, 30); });
            var ideas = nav.querySelector("a.nav-tab");
            if (ideas) nav.insertBefore(btn, ideas); else nav.appendChild(btn);
        }

        var main = document.querySelector(".main-content");
        if (!main) return;
        var section = document.createElement("section");
        section.id = "leaderboard";
        section.className = "tab-content";
        section.innerHTML =
            "<h2>🏆 Classement des joueurs</h2>" +
            '<p class="lb-sub">Valeur d’une carte : Commune 10 pts · Rare 25 pts · Super Rare 60 pts · Ultra Rare 150 pts · Légendaire 400 pts</p>' +
            '<div class="lb-controls">' +
            '<button class="lb-btn" id="lb-sort-value">💎 Par valeur</button>' +
            '<button class="lb-btn" id="lb-sort-cards">🃏 Par cartes</button>' +
            '<button class="lb-btn" id="lb-refresh">🔄 Actualiser</button>' +
            "</div>" +
            '<div class="lb-podium" id="lb-podium"></div>' +
            '<div class="lb-list" id="lb-list"></div>' +
            '<div class="lb-status" id="lb-status"></div>' +
            '<details class="lb-admin"><summary>⚙️ Connecter le classement en ligne (avancé)</summary>' +
            '<div class="lb-admin-box">' +
            '<input type="url" id="lb-url-input" placeholder="https://ton-projet.firebaseio.com" />' +
            '<button class="lb-btn" id="lb-url-save">Enregistrer l’URL du serveur</button>' +
            '<span>Crée une base gratuite sur console.firebase.google.com (Realtime Database, mode test), puis colle son URL ici. Tous les joueurs du site partageront alors le même classement.</span>' +
            "</div></details>";
        main.appendChild(section);

        var bVal = document.getElementById("lb-sort-value");
        var bCards = document.getElementById("lb-sort-cards");
        function refreshSortBtns() {
            bVal.classList.toggle("active", sortBy === "value");
            bCards.classList.toggle("active", sortBy === "cards");
        }
        bVal.addEventListener("click", function () { sortBy = "value"; refreshSortBtns(); render(); });
        bCards.addEventListener("click", function () { sortBy = "cards"; refreshSortBtns(); render(); });
        document.getElementById("lb-refresh").addEventListener("click", render);
        document.getElementById("lb-url-save").addEventListener("click", function () {
            var input = document.getElementById("lb-url-input");
            var v = (input.value || "").trim();
            if (v) { localStorage.setItem(LS_URL, v); render(); }
        });
        var savedUrl = localStorage.getItem(LS_URL);
        if (savedUrl) document.getElementById("lb-url-input").value = savedUrl;
        refreshSortBtns();
    }

    function syncAndRender() {
        saveMySnapshot();
        var stats = computeMyStats();
        publishOnline(stats).then(function () {
            var sec = document.getElementById("leaderboard");
            if (sec && sec.classList.contains("active")) render();
        });
    }

    function init() {
        injectLeaderboardStyles();
        buildUI();
        syncAndRender();
        setInterval(syncAndRender, 60000);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () { setTimeout(init, 400); });
    } else {
        setTimeout(init, 400);
    }

    window.renderLeaderboard = render;
})();
