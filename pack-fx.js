// France Masters - Amelioration de l'animation d'ouverture de pack
// Remplace la revelation des cartes par une version plus rythmee :
// bouton "Tout reveler", aura pulsante sur les cartes rares, rayons de
// lumiere pour UR/L, bandeau d'annonce anime, paquet qui flotte et
// ouverture en PLEIN ECRAN.

(function () {
    "use strict";

    function injectPackFxStyles() {
        if (document.getElementById("pkfx-styles")) return;
        var st = document.createElement("style");
        st.id = "pkfx-styles";
        st.textContent = [
            /* ----- Plein ecran ----- */
            "#pack-modal { padding: 0; }",
            "#pack-modal .pack-modal-content { width: 100vw; height: 100vh; height: 100dvh; max-width: none; max-height: none; margin: 0; border-radius: 0; border: none; overflow-y: auto; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; background: radial-gradient(ellipse at center, rgba(30, 34, 54, 0.97) 0%, rgba(10, 12, 22, 0.99) 75%); }",
            "#pack-modal .modal-close { position: fixed; top: 14px; right: 20px; z-index: 10; font-size: 2rem; }",
            "#pack-modal .pack-announcement { font-size: 1.35rem; min-height: 2.2em; }",
            "#pack-modal .modal-pack-container { width: 100%; max-width: 1100px; flex: 1; display: flex; align-items: center; justify-content: center; gap: 18px; flex-wrap: wrap; padding: 10px 20px; }",
            "#pack-modal .pack-stage { width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; }",
            "@media (min-width: 900px) { #pack-modal .modal-pack-container .pack-card-slot { transform: scale(1.15); } }",
            /* ----- Effets ----- */
            "@keyframes pkfx-float { 0%, 100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-9px) rotate(1.2deg); } }",
            "#booster-pack { animation: pkfx-float 2.8s ease-in-out infinite; }",
            "#booster-pack.grabbed, #booster-pack.torn { animation: none; }",
            "@keyframes pkfx-banner-in { 0% { opacity: 0; transform: translateY(16px) scale(0.8); } 60% { opacity: 1; transform: translateY(-3px) scale(1.08); } 100% { opacity: 1; transform: translateY(0) scale(1); } }",
            ".pack-announcement .pkfx-banner { display: inline-block; animation: pkfx-banner-in 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.4) both; }",
            "@keyframes pkfx-aura-pulse { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.09); } }",
            ".pack-card-slot { position: relative; }",
            ".pack-card-slot.pkfx-aura::before { content: \"\"; position: absolute; inset: -16px; border-radius: 20px; background: radial-gradient(circle, var(--pkfx-c, #ffd700) 0%, transparent 70%); opacity: 0.7; animation: pkfx-aura-pulse 1.6s ease-in-out infinite; pointer-events: none; z-index: 0; }",
            ".pack-card-slot .flip-wrap { position: relative; z-index: 1; }",
            "@keyframes pkfx-beam { 0% { opacity: 0; transform: translateY(40px) scaleY(0.4); } 30% { opacity: 0.9; } 100% { opacity: 0; transform: translateY(-70px) scaleY(1.5); } }",
            ".pkfx-beam { position: absolute; top: 15%; width: 3px; height: 75px; background: linear-gradient(to top, rgba(255, 215, 0, 0), #ffd700, rgba(255, 215, 0, 0)); animation: pkfx-beam 1.1s ease-out both; pointer-events: none; z-index: 2; }",
            ".pkfx-skip { margin-top: 14px; padding: 8px 20px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.3); background: rgba(255, 255, 255, 0.1); color: #fff; font: inherit; font-size: 0.95rem; cursor: pointer; transition: background 0.2s, transform 0.15s; }",
            ".pkfx-skip:hover { background: rgba(255, 255, 255, 0.22); transform: scale(1.06); }",
            ".pkfx-skip:active { transform: scale(0.97); }"
        ].join("\n");
        document.head.appendChild(st);
    }

    function enhancedRevealPackCards(cards, ctx) {
        var container = ctx.container;
        var continueBtn = ctx.continueBtn;
        var announce = ctx.announce;
        var title = ctx.title;
        var content = ctx.content;

        container.style.display = "flex";

        var announceText = { C: "Carte Commune", R: "💙 Carte Rare", SR: "✨ Super Rare !", UR: "🌟 ULTRA RARE !", L: "🌈 LÉGENDAIRE !!" };
        var particleColors = { SR: "#b57bff", UR: "#ffd700", L: "#ff69b4" };

        var timers = [];
        var flipped = cards.map(function () { return false; });
        var finished = false;

        function later(fn, ms) {
            var id = setTimeout(fn, ms);
            timers.push(id);
            return id;
        }

        function spawnParticles(slot, color) {
            for (var j = 0; j < 14; j++) {
                var p = document.createElement("span");
                p.className = "pack-particle";
                var angle = Math.random() * Math.PI * 2;
                var dist = 40 + Math.random() * 55;
                p.style.setProperty("--dx", Math.cos(angle) * dist + "px");
                p.style.setProperty("--dy", Math.sin(angle) * dist + "px");
                p.style.setProperty("--pc", color);
                slot.appendChild(p);
            }
        }

        function spawnFlash() {
            if (!content) return;
            var f = document.createElement("div");
            f.className = "pack-flash";
            content.appendChild(f);
        }

        function spawnConfetti() {
            if (!content) return;
            var colors = ["#ff69b4", "#ffd700", "#4169e1", "#8a2be2", "#00e676", "#ff6f00"];
            for (var j = 0; j < 36; j++) {
                var c = document.createElement("div");
                c.className = "pack-confetti";
                c.style.left = (Math.random() * 100) + "%";
                c.style.width = (5 + Math.random() * 6) + "px";
                c.style.height = (8 + Math.random() * 8) + "px";
                c.style.animationDuration = (2.2 + Math.random() * 2.2) + "s";
                c.style.animationDelay = (Math.random() * 0.6) + "s";
                c.style.setProperty("--c", colors[j % colors.length]);
                content.appendChild(c);
            }
        }

        function spawnBeams(slot) {
            for (var j = 0; j < 3; j++) {
                var b = document.createElement("div");
                b.className = "pkfx-beam";
                b.style.left = (35 + Math.random() * 30) + "%";
                b.style.animationDelay = (j * 0.12) + "s";
                slot.appendChild(b);
            }
        }

        var slots = [];
        var flips = [];
        for (var i = 0; i < cards.length; i++) {
            var slot = document.createElement("div");
            slot.className = "pack-card-slot";
            var wrap = document.createElement("div");
            wrap.className = "flip-wrap";
            var back = document.createElement("div");
            back.className = "card back fm-back";
            back.innerHTML = '<span class="fm-crest">🇫🇷</span>';
            var front = document.createElement("div");
            front.className = "card front flip-face";
            wrap.appendChild(back);
            wrap.appendChild(front);
            slot.appendChild(wrap);
            container.appendChild(slot);
            slots.push(slot);
            flips.push({ wrap: wrap, front: front });
        }

        var skipBtn = document.createElement("button");
        skipBtn.className = "pkfx-skip";
        skipBtn.type = "button";
        skipBtn.textContent = "⚡ Tout révéler";
        skipBtn.addEventListener("click", revealAll);
        content.appendChild(skipBtn);

        function finish() {
            if (finished) return;
            finished = true;
            if (skipBtn.parentNode) skipBtn.parentNode.removeChild(skipBtn);
            if (title) title.textContent = "🎉 Pack Ouvert !";
            continueBtn.style.display = "block";
            continueBtn.classList.add("pack-fade-up");
        }

        function flipCard(index, fast) {
            if (flipped[index]) return;
            flipped[index] = true;
            var c = flips[index];
            PackSfx.whoosh();
            c.wrap.classList.add("card-out");
            later(function () {
                c.wrap.classList.remove("card-out");
                c.wrap.classList.add("settled");
                later(function () {
                    c.front.innerHTML = createCardHTML(cards[index], true);
                    c.front.classList.add(cards[index].rarity);
                    c.wrap.classList.add("flipped");
                    PackSfx.flip();
                    later(function () {
                        var r = cards[index].rarity;
                        if (r === "SR" || r === "UR" || r === "L") {
                            c.front.classList.add("glow");
                            slots[index].classList.add("pkfx-aura");
                            slots[index].style.setProperty("--pkfx-c", particleColors[r] || "#ffd700");
                            spawnParticles(slots[index], particleColors[r] || "#ffd700");
                            PackSfx.chime(r);
                        }
                        if (r === "UR" || r === "L") { spawnFlash(); spawnBeams(slots[index]); }
                        if (r === "L") { spawnConfetti(); PackSfx.legend(); }
                        if (announce) announce.innerHTML = '<span class="announce-' + r + ' pkfx-banner">' + announceText[r] + "</span>";
                        var reste = flipped.filter(function (f) { return !f; }).length;
                        if (reste === 0) later(finish, fast ? 350 : 650);
                    }, fast ? 260 : 480);
                }, fast ? 60 : 140);
            }, fast ? 380 : 640);
        }

        function revealAll() {
            var reste = flipped.filter(function (f) { return !f; }).length;
            if (reste === 0) return;
            timers.forEach(clearTimeout);
            timers = [];
            var delay = 0;
            for (var i = 0; i < cards.length; i++) {
                if (!flipped[i]) {
                    (function (idx) { later(function () { flipCard(idx, true); }, delay); })(i);
                    delay += 170;
                }
            }
        }

        cards.forEach(function (card, index) {
            later(function () { flipCard(index, false); }, index * 700);
        });
    }

    window.revealPackCards = enhancedRevealPackCards;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectPackFxStyles);
    } else {
        injectPackFxStyles();
    }
})();
