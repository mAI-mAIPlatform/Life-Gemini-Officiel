import Engine from './core/Engine.js';
import Physics from './core/Physics.js';
import GameLoop from './core/GameLoop.js';
import InputHandler from './core/InputHandler.js';
import WorldManager from './world/WorldManager.js';
import Player from './entities/player/Player.js';
import PlayerController from './entities/player/PlayerController.js';

// 📱 Imports de l'Interface
import UIManager from './ui/UIManager.js';
import mOS_Core from './ui/mOS/mOS_Core.js';

// 🏎️ Imports Véhicules
import Car from './entities/vehicles/Car.js';
import VehicleController from './entities/vehicles/VehicleController.js';

import { GAME_CONFIG } from './utils/Constants.js';

class CodonsLife {
    constructor() {
        console.log(`🚀 Lancement de Codons Life v${GAME_CONFIG.version}...`);
        this.init();
    }

    async init() {
        try {
            // 1. Moteurs & Inputs
            this.engine = new Engine();
            this.physics = new Physics();
            this.input = new InputHandler();
            
            // 2. Interface UI & mOS (Mode Liquid Glass activé 💧)
            this.uiManager = new UIManager();
            this.mos = new mOS_Core();

            // 3. Monde & Ville
            this.world = new WorldManager(this.engine, this.physics);
            
            // 4. Joueur
            this.player = new Player(this.engine, this.physics);
            this.playerController = new PlayerController(this.player, this.input, this.engine.camera);
            
            // 5. Véhicules (On spawn une caisse à côté de toi)
            this.testCar = new Car(this.engine, this.physics, { x: 5, y: 2, z: -5 });
            // Astuce : On ne lance le VehicleController que quand le joueur monte dedans
            
            // 6. Lancement de la boucle à 60 FPS
            this.gameLoop = new GameLoop(this.engine, this.physics);
            this.gameLoop.start();
            
            console.log("✅ Jeu et écosystème mOS initialisés avec succès !");
        } catch (error) {
            console.error("❌ Erreur critique au lancement :", error);
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.game = new CodonsLife();
});
