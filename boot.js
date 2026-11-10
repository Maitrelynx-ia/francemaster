// France Masters - Amorcage du jeu
// game.js definit initGame() (cablage des onglets, chargement de la sauvegarde,
// mise a jour de l'interface), mais rien ne l'appelait : ce script lance le jeu
// au chargement de la page.

(function () {
    // Couche graphique premium : chargee en dernier pour habiller les deux themes.
    if (!document.querySelector('link[href="style-plus.css"]')) {
        var linkPlus = document.createElement('link');
        linkPlus.rel = 'stylesheet';
        linkPlus.href = 'style-plus.css';
        document.head.appendChild(linkPlus);
    }

    // Filet de securite : jeu de succes par defaut si jamais ils ne sont pas definis.
    if (typeof ACHIEVEMENTS === 'undefined') {
        window.ACHIEVEMENTS = {
            first_pack: { name: 'Premier Pack', description: 'Ouvrir votre premier pack.' },
            first_legendary: { name: 'Premiere Legendaire', description: 'Obtenir une carte Legendaire.' },
            first_duel: { name: 'Premier Duel', description: 'Terminer votre premier duel.' },
            first_duel_win: { name: 'Premiere Victoire', description: 'Gagner un duel.' },
            ten_duels_won: { name: '10 Victoires', description: 'Gagner 10 duels.' },
            fifty_cards: { name: '50 Cartes', description: 'Collectionner 50 cartes.' },
            complete_category: { name: 'Categorie Complete', description: 'Completer une categorie entiere.' },
            full_collection: { name: 'Collection Complete', description: 'Collectionner toutes les cartes.' }
        };
    }

    function boot() {
        // 1. Lancer le jeu : cable les onglets, charge la sauvegarde, rafraichit l'interface.
        if (typeof initGame === 'function') {
            try {
                initGame();
            } catch (e) {
                console.error("Erreur d'initialisation du jeu :", e);
            }
        }
        // 2. Les liens de navigation (ex. Idees) ne sont pas des onglets : on les clone
        //    pour leur retirer l'ecouteur d'onglet, ils gardent leur navigation normale.
        document.querySelectorAll('a.nav-tab').forEach(function (a) {
            if (a.parentNode) a.parentNode.replaceChild(a.cloneNode(true), a);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
