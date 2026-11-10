// France Masters - Liste de souhait
// GameState.wishlist existait deja dans la sauvegarde mais sans interface.
// Ce module ajoute : ajout/retrait de cartes souhaitées, grille des cartes
// desirees avec aperçu, recherche intégrée, et retrait automatique conservé
// quand une carte est obtenue dans un pack.

(function () {
    "use strict";

    function injectWishlistStyles() {
        if (document.getElementById("wl-styles")) return;
        var st = document.createElement("style");
        st.id = "wl-styles";
        st.textContent = [
            ".wishlist-section { margin-top: 26px; }",
            ".wl-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; flex-wrap: wrap; }",
            ".wl-header h3 { margin: 0; }",
            ".wl-count { background: var(--primary, #4169e1); color: #fff; border-radius: 999px; padding: 2px 10px; font-size: 0.85rem; }",
            ".wl-add-row { display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; }",
            ".wl-add-row select { flex: 1; min-width: 220px; padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(128,128,128,0.4); background: var(--surface, transparent); color: inherit; font: inherit; }",
            ".wl-add-row button { padding: 8px 16px; border-radius: 8px; border: none; background: var(--primary, #4169e1); color: #fff; font: inherit; cursor: pointer; }",
            ".wl-add-row button:hover { filter: brightness(1.1); }",
            ".wl-search { width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(128,128,128,0.4); background: transparent; color: inherit; font: inherit; margin-bottom: 12px; }",
            ".wl-grid { display: flex; flex-wrap: wrap; gap: 14px; }",
            ".wl-item { position: relative; width: 150px; }",
            ".wl-item .wl-remove { position: absolute; top: 6px; right: 6px; z-index: 3; width: 26px; height: 26px; border-radius: 50%; border: none; background: rgba(0,0,0,0.55); color: #fff; cursor: pointer; font-size: 0.85rem; line-height: 1; }",
            ".wl-item .wl-remove:hover { background: #e0245e; }",
            ".wl-item .wl-scale { transform: scale(0.62); transform-origin: top left; width: 161%; }",
            ".wl-item .wl-spacer { height: 140px; }",
            ".wl-owned-badge { position: absolute; top: 6px; left: 6px; z-index: 3; background: #00b894; color: #fff; border-radius: 999px; padding: 2px 8px; font-size: 0.72rem; }",
            ".wl-empty { opacity: 0.65; padding: 14px; text-align: center; border: 1px dashed rgba(128,128,128,0.4); border-radius: 10px; }",
            ".wl-hint { font-size: 0.85rem; opacity: 0.7; margin-top: 8px; }"
        ].join("\n");
        document.head.appendChild(st);
    }

    function allCardsSafe() {
        try { return (typeof getAllCards === "function") ? getAllCards() : []; }
        catch (e) { return []; }
    }

    function isWished(id) {
        return !!(GameState.wishlist && GameState.wishlist[id]);
    }

    function toggleWishlist(cardId) {
        if (!GameState.wishlist) GameState.wishlist = {};
        cardId = parseInt(cardId, 10);
        if (isWished(cardId)) {
            delete GameState.wishlist[cardId];
            showToast("Liste de souhait", "Carte retirée de la liste de souhait.", "info");
        } else {
            GameState.wishlist[cardId] = true;
            showToast("Liste de souhait", "Carte ajoutée à la liste de souhait ❤️", "success");
        }
        if (typeof saveGame === "function") saveGame();
        renderWishlist();
    }

    function ownedCount(cardId) {
        var entry = GameState.collection[cardId];
        return entry ? (entry.count || 0) : 0;
    }

    function renderWishlist() {
        var section = document.getElementById("wishlist-section");
        if (!section) return;

        var ids = Object.keys(GameState.wishlist || {})
            .map(function (k) { return parseInt(k, 10); })
            .filter(function (id) { return isWished(id); });

        var byName = {};
        allCardsSafe().forEach(function (c) { byName[c.id] = c; });

        var cards = ids.map(function (id) { return byName[id]; }).filter(Boolean);
        cards.sort(function (a, b) { return a.name.localeCompare(b.name, "fr"); });

        var search = (document.getElementById("wl-search") || {}).value || "";
        var term = search.trim().toLowerCase();
        var shown = term
            ? cards.filter(function (c) { return c.name.toLowerCase().indexOf(term) !== -1; })
            : cards;

        var html = "";
        html += '<div class="wl-header"><h3>❤️ Ma liste de souhait</h3><span class="wl-count">' + cards.length + "</span></div>";

        // Ajout : menu des cartes pas encore souhaitees
        var available = allCardsSafe()
            .filter(function (c) { return !isWished(c.id); })
            .sort(function (a, b) { return a.name.localeCompare(b.name, "fr"); });
        html += '<div class="wl-add-row"><select id="wl-select">';
        available.forEach(function (c) {
            var owned = ownedCount(c.id);
            html += '<option value="' + c.id + '">' + escapeHtml(c.name) + (owned > 0 ? " (déjà obtenue)" : "") + "</option>";
        });
        html += '</select><button type="button" id="wl-add-btn">+ Ajouter</button></div>';
        html += '<input type="text" id="wl-search" class="wl-search" placeholder="🔍 Rechercher dans ma liste de souhait..." value="' + escapeHtml(search) + '" />';
        html += '<div class="wl-grid">';
        if (shown.length === 0) {
            html += '<div class="wl-empty">' + (cards.length === 0
                ? "Ta liste de souhait est vide. Ajoute les cartes que tu rêves d’obtenir !"
                : "Aucune carte ne correspond à ta recherche.") + "</div>";
        } else {
            shown.forEach(function (c) {
                html += '<div class="wl-item">';
                if (ownedCount(c.id) > 0) html += '<span class="wl-owned-badge">✓ obtenue</span>';
                html += '<button type="button" class="wl-remove" data-wl-id="' + c.id + '" title="Retirer de la liste">✕</button>';
                html += '<div class="wl-scale">' + createCardHTML(c, true) + "</div>";
                html += '<div class="wl-spacer"></div>';
                html += "</div>";
            });
        }
        html += "</div>";
        html += '<p class="wl-hint">💡 Les cartes obtenues dans un pack sortent automatiquement de la liste.</p>';

        section.innerHTML = html;

        document.getElementById("wl-add-btn").addEventListener("click", function () {
            var sel = document.getElementById("wl-select");
            if (sel && sel.value) toggleWishlist(sel.value);
        });
        var searchInput = document.getElementById("wl-search");
        searchInput.addEventListener("input", function () {
            renderWishlist();
            var s2 = document.getElementById("wl-search");
            s2.focus();
            s2.setSelectionRange(s2.value.length, s2.value.length);
        });
        section.querySelectorAll(".wl-remove").forEach(function (b) {
            b.addEventListener("click", function () { toggleWishlist(b.getAttribute("data-wl-id")); });
        });
    }

    function escapeHtml(s) {
        var map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
        return String(s).replace(/[&<>"']/g, function (c) { return map[c]; });
    }

    // Re-rendre la liste quand la collection est affichee / mise a jour
    function watchCollection() {
        var grid = document.getElementById("collection-grid");
        if (!grid || grid.__wlObserved) return;
        grid.__wlObserved = true;
        var obs = new MutationObserver(function () {
            var sec = document.getElementById("collection");
            if (sec && sec.classList.contains("active")) renderWishlist();
        });
        obs.observe(grid, { childList: true });
    }

    function init() {
        injectWishlistStyles();
        watchCollection();
        var sec = document.getElementById("collection");
        if (sec && sec.classList.contains("active")) renderWishlist();
        window.renderWishlist = renderWishlist;
        window.toggleWishlist = toggleWishlist;
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () { setTimeout(init, 500); });
    } else {
        setTimeout(init, 500);
    }
})();
