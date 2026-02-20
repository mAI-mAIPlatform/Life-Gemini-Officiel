import { GAME_CONFIG } from './utils/Constants.js';
// Import futur : import Engine from './core/Engine.js';

class CodonsLife {
    constructor() {
        console.log(`🚀 Lancement de Codons Life v${GAME_CONFIG.version}...`);
        this.init();
    }

    async init() {
        try {
            // 1. Initialiser le Moteur 3D et Physique
            // this.engine = new Engine();
            
            // 2. Charger les assets (modèles, textures)
            // await AssetLoader.loadAll();

            // 3. Générer le monde
            // this.world = new WorldManager();

            // 4. Lancer la boucle de jeu
            this.startGameLoop();
            
            console.log("✅ Jeu initialisé avec succès !");
        } catch (error) {
            console.error("❌ Erreur critique au lancement :", error);
        }
    }

    startGameLoop() {
        const loop = (time) => {
            requestAnimationFrame(loop);
            // this.engine.update(time);
        };
        requestAnimationFrame(loop);
    }
}

// Lancement au chargement de la page
window.addEventListener('DOMContentLoaded', () => {
    window.game = new CodonsLife();
});
