import * as THREE from 'three';
import { Events } from '../utils/Events.js';
import { GAME_CONFIG } from '../utils/Constants.js';

export default class DayNightCycle {
    constructor(engine) {
        this.engine = engine;
        
        // On récupère la lumière directionnelle (le soleil) de la scène
        this.sunLight = this.engine.scene.children.find(c => c.type === 'DirectionalLight');
        this.ambientLight = this.engine.scene.children.find(c => c.type === 'AmbientLight');
        
        this.timeOfDay = 8; // On commence à 8h du mat
        this.dayDuration = GAME_CONFIG.world.dayDuration; // Temps réel pour un jour in-game
        
        Events.on('UPDATE', (deltaTime) => this.update(deltaTime));
    }

    update(deltaTime) {
        // Conversion du deltaTime en heures in-game
        const timeMultiplier = 24 / (this.dayDuration / 1000); 
        this.timeOfDay += deltaTime * timeMultiplier;
        
        if (this.timeOfDay >= 24) this.timeOfDay = 0;

        this.updateLighting();
    }

    updateLighting() {
        if (!this.sunLight) return;

        // Calcul de l'angle du soleil (0 à PI)
        const theta = ((this.timeOfDay - 6) / 12) * Math.PI;
        
        this.sunLight.position.x = Math.cos(theta) * 100;
        this.sunLight.position.y = Math.sin(theta) * 100;
        this.sunLight.position.z = Math.sin(theta) * 50;

        // Gestion de l'intensité selon l'heure
        if (this.timeOfDay > 6 && this.timeOfDay < 18) {
            // Jour
            this.sunLight.intensity = THREE.MathUtils.lerp(this.sunLight.intensity, 1, 0.05);
            this.ambientLight.intensity = 0.6;
            this.engine.scene.background.setHex(0x87CEEB); // Ciel bleu
        } else {
            // Nuit
            this.sunLight.intensity = THREE.MathUtils.lerp(this.sunLight.intensity, 0, 0.05);
            this.ambientLight.intensity = 0.1;
            this.engine.scene.background.setHex(0x050510); // Ciel sombre
        }
    }
}
