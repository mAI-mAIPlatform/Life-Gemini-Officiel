import Engine from './core/Engine.js';
import Physics from './core/Physics.js';
import GameLoop from './core/GameLoop.js';
import InputHandler from './core/InputHandler.js';
import WorldManager from './world/WorldManager.js';
import Player from './entities/player/Player.js';
import PlayerController from './entities/player/PlayerController.js';
import { GAME_CONFIG } from './utils/Constants.js';

class CodonsLife {
    constructor() {
        console.log(`🚀 Lancement de Codons Life v${GAME_CONFIG.version}...`);
        this.init();
    }

    async init() {
        try {
            // 1. Initialisation des moteurs de base
            this.engine = new Engine();
            this.physics = new Physics();
            this.input = new InputHandler();
            
            // 2. Création de l'univers
            this.world = new WorldManager(this.engine, this.physics);
            
            // 3. Spawn du joueur et de ses contrôles
            this.player = new Player(this.engine, this.physics);
            this.playerController = new PlayerController(this.player, this.input, this.engine.camera);
            
            // 4. Lancement de la machine !
            this.gameLoop = new GameLoop(this.engine, this.physics);
            this.gameLoop.start();
            
            console.log("✅ Jeu initialisé ! Rendu 3D et Physique synchronisés.");
        } catch (error) {
            console.error("❌ Erreur critique au lancement :", error);
        }
    }
}

// Lancement automatique quand le DOM est prêt
window.addEventListener('DOMContentLoaded', () => {
    window.game = new CodonsLife();
});
