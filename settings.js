// France Masters - Parametres additionnels
// Theme clair/sombre, sons, animations reduites, export/import de sauvegarde.
// Les preferences sont stockees dans localStorage et appliquees au demarrage.

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
            ".st-io-btns button { padding: 9px 16px; border-radius: 8px; border: 1px solid rgba(128,128,128,0.4); background: transparent; color: inherit; font: inherit; cursor: pointer; }",
            ".st-io-btns button:hover { background: rgba(128,128,128,0.15); }",
            "body.st-no-anim *, body.st-no-anim *::before, body.st-no-anim *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }",
            ".st-toast { position: fixed; bottom: 22px; left: 50%; transform: translateX(-50%); background: var(--surface, #222); color: inherit; padding: 12px 22px; border-radius: 999px; box-shadow: 0 6px 20px rgba(0,0,0,0.3); z-index: 9999; font-size: 0.95rem; animation: st-toast-in 0.3s ease both; }",
            "@keyframes st-toast-in { from { opacity: 0; transform: translate(-50%, 12px); } to { opacity: 1; transform: translate(-50%, 0); } }"
        ].join("\n");
        document.head.appendChild(st);
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

    function buildUI() {
        var section = document.getElementById("settings");
        if (!section || document.getElementById("st-grid")) return;

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

        var io = document.createElement("div");
        io.className = "settings-section";
        io.innerHTML =
            "<h3>\uD83D\uDCBE Sauvegarde</h3>" +
            "<p>Exporte ta progression pour la transf\u00e9rer sur un autre appareil, ou importe un fichier de sauvegarde.</p>" +
            '<div class="st-io-btns"><button type="button" id="st-export">\u2B07\uFE0F Exporter ma sauvegarde</button><button type="button" id="st-import">\u2B06\uFE0F Importer une sauvegarde</button></div>' +
            '<input type="file" id="st-file" accept=".json,application/json" style="display:none" />';
        var about = Array.prototype.find.call(section.querySelectorAll(".settings-section"), function (s) { return s.querySelector("h3") && s.querySelector("h3").textContent.indexOf("propos") !== -1; });
        if (about) section.insertBefore(io, about); else section.appendChild(io);

        document.getElementById("st-export").addEventListener("click", exportSave);
        document.getElementById("st-import").addEventListener("click", function () { document.getElementById("st-file").click(); });
        document.getElementById("st-file").addEventListener("change", function (e) {
            if (e.target.files && e.target.files[0]) importSave(e.target.files[0]);
            e.target.value = "";
        });
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
