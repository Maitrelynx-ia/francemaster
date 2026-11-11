// France Masters - Parametres additionnels
// Theme clair/sombre, sons, animations reduites, export/import de sauvegarde,
// gestion du compte (deconnexion, changement de mot de passe ET de pseudo),
// informations sur les donnees et aide integree.

(function () {
    "use strict";

    var LS_THEME = "franceMastersTheme";
    var LS_SOUND = "franceMastersSound";
    var LS_ANIM = "franceMastersAnim";

    function getPref(key, def) { return localStorage.getItem(key) || def; }
    function setPref(key, val) { localStorage.setItem(key, val); }

    function injectSettingsStyles() {
        if (document.getElementById("st-styles")) return;
        var st = document.createElement("style");
        st.id = "st-styles";
        st.textContent = [
            ".st-grid { display: flex; flex-direction: column; gap: 14px; }",
            ".st-row { display: flex; align-items: center; justify-content: space-between; gap: 14px; background: var(--surface, rgba(128,128,128,0.08)); border-radius: 10px; padding: 12px 16px; flex-wrap: wrap; }",
            ".st-label { font-weight: 600; }",
            ".st-desc { display: block; font-weight: 400; font-size: 0.85rem; opacity: 0.7; margin-top: 2px; }",
            ".st-toggle { position: relative; width: 52px; height: 28px; border-radius: 999px; border: none; cursor: pointer; background: rgba(128,128,128,0.4); transition: background 0.2s; flex-shrink: 0; }",
            ".st-toggle::after { content: \"\"; position: absolute; top: 3px; left: 3px; width: 22px; height: 22px; border-radius: 50%; background: #fff; transition: left 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.3); }",
            ".st-toggle.on { background: var(--primary, #4169e1); }",
            ".st-toggle.on::after { left: 27px; }",
            ".st-theme-btns { display: flex; gap: 8px; }",
            ".st-theme-btn { padding: 7px 14px; border-radius: 999px; border: 1px solid rgba(128,128,128,0.4); background: transparent; color: inherit; font: inherit; cursor: pointer; }",
            ".st-theme-btn.active { background: var(--primary, #4169e1); color: #fff; border-color: transparent; }",
            ".st-io-btns { display: flex; gap: 10px; flex-wrap: wrap; }",
            ".st-io-btns button, .st-btn { padding: 9px 16px; border-radius: 8px; border: 1px solid rgba(128,128,128,0.4); background: transparent; color: inherit; font: inherit; cursor: pointer; }",
            ".st-io-btns button:hover, .st-btn:hover { background: rgba(128,128,128,0.15); }",
            ".st-account { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }",
            ".st-avatar { width: 44px; height: 44px; border-radius: 50%; background: var(--primary, #4169e1); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: bold; flex-shrink: 0; }",
            ".st-pw-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; }",
            ".st-pw-row input { padding: 9px 12px; border-radius: 8px; border: 1px solid rgba(128,128,128,0.4); background: transparent; color: inherit; font: inherit; flex: 1; min-width: 160px; }",
            ".st-pw-msg { font-size: 0.85rem; margin-top: 6px; min-height: 1.2em; }",
            ".st-faq details { background: var(--surface, rgba(128,128,128,0.08)); border-radius: 10px; padding: 10px 16px; margin-bottom: 8px; }",
            ".st-faq summary { cursor: pointer; font-weight: 600; }",
            ".st-faq p { opacity: 0.85; font-size: 0.92rem; }",
            ".st-toast { position: fixed; bottom: 22px; left: 50%; transform: translateX(-50%); background: var(--surface, #222); color: inherit; padding: 12px 22px; border-radius: 999px; box-shadow: 0 6px 20px rgba(0,0,0,0.3); z-index: 9999; font-size: 0.95rem; animation: st-toast-in 0.3s ease both; }",
            "@keyframes st-toast-in { from { opacity: 0; transform: translate(-50%, 12px); } to { opacity: 1; transform: translate(-50%, 0); } }"
        ].join("\n");
        document.head.appendChild(st);
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
        });
    }

    function toast(msg) {
        var t = document.createElement("div");
        t.className = "st-toast";
        t.textContent = msg;
        document.body.appendChild(t);
        setTimeout(function () { t.remove(); }, 2600);
    }

    function applyTheme() {
        var theme = getPref(LS_THEME, "dark");
        var darkLink = document.querySelector('link[href="style-dark.css"]');
        if (darkLink) darkLink.disabled = (theme === "light");
        var b1 = document.getElementById("st-theme-dark");
        var b2 = document.getElementById("st-theme-light");
        if (b1) b1.classList.toggle("active", theme === "dark");
        if (b2) b2.classList.toggle("active", theme === "light");
    }

    function soundOn() { return getPref(LS_SOUND, "on") === "on"; }

    function mutePackSfx() {
        try {
            if (typeof PackSfx === "undefined" || PackSfx.__stWrapped) return;
            Object.keys(PackSfx).forEach(function (k) {
                if (typeof PackSfx[k] === "function") {
                    var orig = PackSfx[k];
                    PackSfx[k] = function () {
                        if (!soundOn()) return;
                        return orig.apply(PackSfx, arguments);
                    };
                }
            });
            PackSfx.__stWrapped = true;
        } catch (e) { /* ignore */ }
    }

    function applyAnim() {
        document.body.classList.toggle("st-no-anim", getPref(LS_ANIM, "on") === "reduced");
    }

    var SAVE_KEYS = ["franceMastersSave", "franceMastersCustomCards", "franceMastersLocalLeaderboard", "franceMastersUsers", "franceMastersCurrentUser"];

    function exportSave() {
        var data = { app: "France Masters", version: 1, exported: new Date().toISOString(), data: {} };
        SAVE_KEYS.forEach(function (k) {
            var v = localStorage.getItem(k);
            if (v) data.data[k] = v;
        });
        var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "france-masters-sauvegarde.json";
        a.click();
        URL.revokeObjectURL(a.href);
        toast("\uD83D\uDCBE Sauvegarde export\u00e9e !");
    }

    function importSave(file) {
        var reader = new FileReader();
        reader.onload = function () {
            try {
                var parsed = JSON.parse(String(reader.result));
                if (!parsed || parsed.app !== "France Masters" || !parsed.data) throw new Error("format");
                Object.keys(parsed.data).forEach(function (k) {
                    if (SAVE_KEYS.indexOf(k) !== -1) localStorage.setItem(k, parsed.data[k]);
                });
                toast("\u2705 Sauvegarde import\u00e9e, rechargement...");
                setTimeout(function () { location.reload(); }, 900);
            } catch (e) {
                toast("\u274C Fichier de sauvegarde invalide");
            }
        };
        reader.readAsText(file);
    }

    // ----- Compte -----
    function currentUser() {
        try {
            if (window.AuthState && window.AuthState.currentUser) return window.AuthState.currentUser.username;
        } catch (e) { /* ignore */ }
        return null;
    }

    function changePassword() {
        var msg = document.getElementById("st-pw-msg");
        var p1 = document.getElementById("st-pw1").value;
        var p2 = document.getElementById("st-pw2").value;
        var name = currentUser();
        if (p1.length < 3) { msg.textContent = "\u26A0\uFE0F Mot de passe trop court (3 caract\u00e8res minimum)."; return; }
        if (p1 !== p2) { msg.textContent = "\u26A0\uFE0F Les deux mots de passe ne correspondent pas."; return; }
        try {
            var users = window.AuthState.users || [];
            var user = users.find(function (u) { return u.username === name; });
            if (!user) { msg.textContent = "\u26A0\uFE0F Compte introuvable."; return; }
            user.password = hashPassword(p1);
            localStorage.setItem("franceMastersUsers", JSON.stringify(users));
            msg.textContent = "\u2705 Mot de passe modifi\u00e9 !";
            document.getElementById("st-pw1").value = "";
            document.getElementById("st-pw2").value = "";
        } catch (e) {
            msg.textContent = "\u26A0\uFE0F Erreur lors du changement.";
        }
    }

    // ----- Changement de pseudo -----

    // Cle de classement en ligne : meme encodage que leaderboard.js
    function onlineKey(name) {
        return encodeURIComponent(name).replace(/[^\w\-]/g, "_");
    }

    var SUPABASE_URL = "https://wossxalinroykryemifh.supabase.co";
    var SUPABASE_KEY = "sb_publishable_pVjrrIXKNjftbm1wrXlkBw_pSZEYYWo";

    // Renomme l'entree du classement en ligne (au lieu de la dupliquer),
    // puis republie le score sous le nouveau pseudo.
    function renameOnlineEntry(oldName, newName) {
        try {
            var oldKey = onlineKey(oldName);
            var newKey = onlineKey(newName);
            if (oldKey === newKey) {
                if (typeof computeMyStats === "function" && typeof publishOnline === "function") {
                    publishOnline(computeMyStats());
                }
                return;
            }
            fetch(SUPABASE_URL + "/rest/v1/players?key=eq." + encodeURIComponent(oldKey), {
                method: "PATCH",
                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": "Bearer " + SUPABASE_KEY,
                    "Content-Type": "application/json",
                    "Prefer": "return=minimal"
                },
                body: JSON.stringify({ key: newKey, name: newName })
            }).then(function () {
                try {
                    if (typeof computeMyStats === "function" && typeof publishOnline === "function") {
                        publishOnline(computeMyStats());
                    }
                } catch (e) { /* ignore */ }
            }).catch(function () { /* ignore */ });
        } catch (e) { /* ignore */ }
    }

    function renameAccount() {
        var msg = document.getElementById("st-rename-msg");
        var newName = (document.getElementById("st-newname").value || "").trim();
        var oldName = currentUser();
        if (!oldName) return;
        if (newName.length < 3 || newName.length > 20) {
            msg.textContent = "\u26A0\uFE0F Le pseudo doit faire entre 3 et 20 caract\u00e8res.";
            return;
        }
        if (newName === oldName) { msg.textContent = "\u26A0\uFE0F C\u2019est d\u00e9j\u00e0 ton pseudo actuel."; return; }
        try {
            var users = window.AuthState.users || [];
            var pris = users.some(function (u) { return u.username.toLowerCase() === newName.toLowerCase(); });
            if (pris) { msg.textContent = "\u26A0\uFE0F Ce pseudo est d\u00e9j\u00e0 utilis\u00e9 par un autre compte."; return; }

            // 1. Migrer les packs et les amis (cles basees sur le pseudo)
            var oldPacks = "franceMastersPacks_" + oldName;
            var newPacks = "franceMastersPacks_" + newName;
            var packsData = localStorage.getItem(oldPacks);
            if (packsData !== null) {
                localStorage.setItem(newPacks, packsData);
                localStorage.removeItem(oldPacks);
            }
            var oldFriends = "franceMastersFriends_" + oldName;
            var newFriends = "franceMastersFriends_" + newName;
            var friendsData = localStorage.getItem(oldFriends);
            if (friendsData !== null) {
                localStorage.setItem(newFriends, friendsData);
                localStorage.removeItem(oldFriends);
            }

            // 2. Mettre a jour le compte et l'utilisateur courant
            var user = users.find(function (u) { return u.username === oldName; });
            if (user) user.username = newName;
            localStorage.setItem("franceMastersUsers", JSON.stringify(users));
            window.AuthState.currentUser.username = newName;
            localStorage.setItem("franceMastersCurrentUser", JSON.stringify(window.AuthState.currentUser));

            // 3. Rafraichir l'interface et renommer l'entree du classement en ligne
            if (typeof updateAuthUI === "function") updateAuthUI();
            if (typeof renderFriends === "function") renderFriends();
            if (typeof loadUserPacks === "function") loadUserPacks();
            renameOnlineEntry(oldName, newName);

            msg.textContent = "\u2705 Pseudo chang\u00e9 en \"" + newName + "\" ! Le classement en ligne est mis \u00e0 jour.";
            document.getElementById("st-newname").value = "";
            renderAccount();
            toast("\uD83D\uDC64 Bonjour " + newName + " !");
        } catch (e) {
            msg.textContent = "\u26A0\uFE0F Erreur lors du changement de pseudo.";
        }
    }

    function renderAccount() {
        var zone = document.getElementById("st-account-zone");
        if (!zone) return;
        var name = currentUser();
        if (name) {
            zone.innerHTML =
                '<div class="st-account">' +
                '<div class="st-avatar">' + escapeHtml(name.charAt(0).toUpperCase()) + "</div>" +
                "<div><strong>" + escapeHtml(name) + "</strong><br><span style=\"opacity:0.7; font-size:0.85rem;\">Connect\u00e9</span></div>" +
                '<button type="button" class="st-btn" id="st-rename">\u270F\uFE0F Changer de pseudo</button>' +
                '<button type="button" class="st-btn" id="st-logout">\uD83D\uDEAA Se d\u00e9connecter</button>' +
                "</div>" +
                '<div class="st-pw-row" id="st-rename-row" style="display:none;">' +
                '<input type="text" id="st-newname" placeholder="Nouveau pseudo (3-20 caract\u00e8res)" maxlength="20" />' +
                '<button type="button" class="st-btn" id="st-rename-save">Valider</button>' +
                "</div>" +
                '<div class="st-pw-msg" id="st-rename-msg"></div>' +
                '<div class="st-pw-row">' +
                '<input type="password" id="st-pw1" placeholder="Nouveau mot de passe" />' +
                '<input type="password" id="st-pw2" placeholder="Confirmer" />' +
                '<button type="button" class="st-btn" id="st-pw-save">Changer</button>' +
                "</div>" +
                '<div class="st-pw-msg" id="st-pw-msg"></div>';
            document.getElementById("st-logout").addEventListener("click", function () {
                if (typeof logout === "function") { logout(); renderAccount(); }
            });
            document.getElementById("st-pw-save").addEventListener("click", changePassword);
            document.getElementById("st-rename").addEventListener("click", function () {
                var row = document.getElementById("st-rename-row");
                row.style.display = row.style.display === "none" ? "flex" : "none";
                if (row.style.display === "flex") document.getElementById("st-newname").focus();
            });
            document.getElementById("st-rename-save").addEventListener("click", renameAccount);
            document.getElementById("st-newname").addEventListener("keydown", function (e) {
                if (e.key === "Enter") renameAccount();
            });
        } else {
            zone.innerHTML =
                '<div class="st-account">' +
                '<div class="st-avatar">?</div>' +
                "<div><strong>Non connect\u00e9</strong><br><span style=\"opacity:0.7; font-size:0.85rem;\">Connecte-toi pour ouvrir des packs et figurer au classement</span></div>" +
                '<button type="button" class="st-btn" id="st-login">\uD83D\uDD11 Se connecter / Cr\u00e9er un compte</button>' +
                "</div>";
            document.getElementById("st-login").addEventListener("click", function () {
                if (typeof showAuthModal === "function") showAuthModal();
            });
        }
    }

    // ----- Donnees -----
    function renderData() {
        var zone = document.getElementById("st-data-zone");
        if (!zone) return;
        var save = localStorage.getItem("franceMastersSave") || "";
        var tailleKo = (save.length / 1024).toFixed(1);
        var nComptes = 0;
        try { nComptes = JSON.parse(localStorage.getItem("franceMastersUsers") || "[]").length; } catch (e) { nComptes = 0; }
        var nSouhaits = 0;
        try { nSouhaits = Object.keys(JSON.parse(save).wishlist || {}).length; } catch (e) { nSouhaits = 0; }
        zone.innerHTML =
            '<div class="st-io-btns" style="margin-bottom:10px;">' +
            '<span class="st-btn" style="cursor:default;">\uD83D\uDCBE Sauvegarde : ' + tailleKo + " Ko</span>" +
            '<span class="st-btn" style="cursor:default;">\uD83D\uDC65 Comptes : ' + nComptes + "</span>" +
            '<span class="st-btn" style="cursor:default;">\u2764\uFE0F Souhaits : ' + nSouhaits + "</span>" +
            "</div>" +
            '<div class="st-io-btns">' +
            '<button type="button" class="st-btn" id="st-clear-wl">Vider la liste de souhait</button>' +
            '<button type="button" class="st-btn" id="st-clear-lb">R\u00e9initialiser mon score au classement local</button>' +
            "</div>";
        document.getElementById("st-clear-wl").addEventListener("click", function () {
            if (!confirm("Vider toute la liste de souhait ?")) return;
            try {
                var parsed = JSON.parse(localStorage.getItem("franceMastersSave") || "{}");
                parsed.wishlist = {};
                localStorage.setItem("franceMastersSave", JSON.stringify(parsed));
                if (typeof GameState !== "undefined") GameState.wishlist = {};
                if (typeof renderWishlist === "function") renderWishlist();
                renderData();
                toast("\u2764\uFE0F Liste de souhait vid\u00e9e");
            } catch (e) { /* ignore */ }
        });
        document.getElementById("st-clear-lb").addEventListener("click", function () {
            if (!confirm("Effacer les scores locaux du classement sur cet appareil ?")) return;
            localStorage.removeItem("franceMastersLocalLeaderboard");
            renderData();
            toast("\uD83C\uDFC6 Score local effac\u00e9");
        });
    }

    // ----- Aide -----
    function buildFaq() {
        var zone = document.getElementById("st-faq-zone");
        if (!zone) return;
        zone.innerHTML =
            "<details><summary>\uD83C\uDFAF Comment jouer ?</summary><p>Collectionne des cartes inspir\u00e9es d'articles Wikip\u00e9dia sur la France : ouvre des packs (un pack gratuit s'ajoute \u00e0 ta r\u00e9serve toutes les 15 minutes), compl\u00e8te ton album et affronte l'IA ou tes amis en duels quiz.</p></details>" +
            "<details><summary>\uD83D\uDC8E Quelles sont les raret\u00e9s et leur valeur ?</summary><p>Commune (C) 10 pts \u00b7 Rare (R) 25 pts \u00b7 Super Rare (SR) 60 pts \u00b7 Ultra Rare (UR) 150 pts \u00b7 L\u00e9gendaire (L) 400 pts. La valeur de ta collection au classement est la somme des points de toutes tes cartes.</p></details>" +
            "<details><summary>\uD83D\uDC64 Puis-je changer de pseudo ?</summary><p>Oui ! Dans la section Compte ci-dessus, clique sur Changer de pseudo. Ton pseudo change partout : compte, amis, packs et classement en ligne (ton ancienne entr\u00e9e est renomm\u00e9e, pas dupliqu\u00e9e).</p></details>" +
            "<details><summary>\uD83C\uDCCF Comment fonctionne la liste de souhait ?</summary><p>Dans l'onglet Collection, ajoute les cartes que tu r\u00eaves d'obtenir. D\u00e8s que tu les obtiens dans un pack, elles sortent automatiquement de la liste.</p></details>" +
            "<details><summary>\u2694\uFE0F Comment d\u00e9fier un ami ?</summary><p>Dans l'onglet Amis, ajoute son pseudo et lance un duel amical (3, 5 ou 10 questions). Tu peux aussi ajouter un pseudo non inscrit pour jouer \u00e0 deux sur le m\u00eame appareil.</p></details>" +
            "<details><summary>\uD83D\uDCBE Comment transf\u00e9rer ma progression ?</summary><p>Exporte ta sauvegarde ici m\u00eame (bouton Exporter), puis importe le fichier sur l'autre appareil.</p></details>";
    }

    function buildUI() {
        var section = document.getElementById("settings");
        if (!section || document.getElementById("st-grid")) return;

        var account = document.createElement("div");
        account.className = "settings-section";
        account.innerHTML = "<h3>\uD83D\uDC64 Compte</h3><div id=\"st-account-zone\"></div>";
        section.insertBefore(account, section.querySelector(".settings-section"));

        var box = document.createElement("div");
        box.className = "settings-section";
        box.innerHTML =
            "<h3>\u2699\uFE0F Pr\u00e9f\u00e9rences</h3>" +
            '<div class="st-grid" id="st-grid">' +
            '<div class="st-row"><span class="st-label">\uD83C\uDFA8 Th\u00e8me<span class="st-desc">Choisis le style du site</span></span>' +
            '<span class="st-theme-btns"><button type="button" class="st-theme-btn" id="st-theme-dark">\uD83C\uDF15 Sombre</button><button type="button" class="st-theme-btn" id="st-theme-light">\u2600\uFE0F Clair</button></span></div>' +
            '<div class="st-row"><span class="st-label">\uD83D\uDD0A Sons<span class="st-desc">Effets sonores des packs et duels</span></span><button type="button" class="st-toggle" id="st-sound" role="switch"></button></div>' +
            '<div class="st-row"><span class="st-label">\u2728 Animations<span class="st-desc">D\u00e9sactive pour plus de confort visuel</span></span><button type="button" class="st-toggle" id="st-anim" role="switch"></button></div>' +
            "</div>";
        section.insertBefore(box, section.querySelector(".settings-section"));

        var data = document.createElement("div");
        data.className = "settings-section";
        data.innerHTML = "<h3>\uD83D\uDDC2\uFE0F Mes donn\u00e9es</h3><div id=\"st-data-zone\"></div>";
        section.insertBefore(data, section.querySelector(".settings-section"));

        var faq = document.createElement("div");
        faq.className = "settings-section";
        faq.innerHTML = "<h3>\u2753 Aide</h3><div class=\"st-faq\" id=\"st-faq-zone\"></div>";
        var about = Array.prototype.find.call(section.querySelectorAll(".settings-section"), function (s) { return s.querySelector("h3") && s.querySelector("h3").textContent.indexOf("propos") !== -1; });
        if (about) section.insertBefore(faq, about); else section.appendChild(faq);

        var io = document.createElement("div");
        io.className = "settings-section";
        io.innerHTML =
            "<h3>\uD83D\uDCBE Sauvegarde</h3>" +
            "<p>Exporte ta progression pour la transf\u00e9rer sur un autre appareil, ou importe un fichier de sauvegarde.</p>" +
            '<div class="st-io-btns"><button type="button" id="st-export">\u2B07\uFE0F Exporter ma sauvegarde</button><button type="button" id="st-import">\u2B06\uFE0F Importer une sauvegarde</button></div>' +
            '<input type="file" id="st-file" accept=".json,application/json" style="display:none" />';
        if (about) section.insertBefore(io, about); else section.appendChild(io);

        document.getElementById("st-export").addEventListener("click", exportSave);
        document.getElementById("st-import").addEventListener("click", function () { document.getElementById("st-file").click(); });
        document.getElementById("st-file").addEventListener("change", function (e) {
            if (e.target.files && e.target.files[0]) importSave(e.target.files[0]);
            e.target.value = "";
        });

        document.getElementById("st-theme-dark").addEventListener("click", function () { setPref(LS_THEME, "dark"); applyTheme(); });
        document.getElementById("st-theme-light").addEventListener("click", function () { setPref(LS_THEME, "light"); applyTheme(); });
        var bSound = document.getElementById("st-sound");
        var bAnim = document.getElementById("st-anim");
        function refreshToggles() {
            bSound.classList.toggle("on", soundOn());
            bAnim.classList.toggle("on", getPref(LS_ANIM, "on") === "on");
        }
        bSound.addEventListener("click", function () {
            setPref(LS_SOUND, soundOn() ? "off" : "on");
            refreshToggles();
            toast(soundOn() ? "\uD83D\uDD0A Sons activ\u00e9s" : "\uD83D\uDD07 Sons coup\u00e9s");
        });
        bAnim.addEventListener("click", function () {
            var on = getPref(LS_ANIM, "on") === "on";
            setPref(LS_ANIM, on ? "reduced" : "on");
            applyAnim();
            refreshToggles();
        });
        refreshToggles();

        renderAccount();
        renderData();
        buildFaq();
    }

    function init() {
        injectSettingsStyles();
        applyTheme();
        applyAnim();
        mutePackSfx();
        buildUI();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () { setTimeout(init, 300); });
    } else {
        setTimeout(init, 300);
    }
})();
