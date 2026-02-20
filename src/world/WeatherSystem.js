import { Events } from '../utils/Events.js';

export default class WeatherSystem {
    constructor(engine) {
        this.engine = engine;
        this.currentWeather = 'CLEAR'; // CLEAR, RAIN, FOG
        this.weatherTimer = 0;
        
        Events.on('UPDATE', (deltaTime) => this.update(deltaTime));
    }

    update(deltaTime) {
        this.weatherTimer -= deltaTime;
        
        // Change la météo toutes les 5 à 15 minutes in-game
        if (this.weatherTimer <= 0) {
            this.randomizeWeather();
        }
    }

    randomizeWeather() {
        const rand = Math.random();
        
        if (rand < 0.6) {
            this.setWeather('CLEAR');
            this.weatherTimer = 300; // 5 min
        } else if (rand < 0.9) {
            this.setWeather('RAIN');
            this.weatherTimer = 180; // 3 min
        } else {
            this.setWeather('FOG');
            this.weatherTimer = 120; // 2 min
        }
    }

    setWeather(type) {
        this.currentWeather = type;
        console.log(`☁️ Météo mise à jour : ${type}`);
        
        if (type === 'FOG') {
            this.engine.scene.fog = new THREE.FogExp2(0xcccccc, 0.02);
        } else if (type === 'RAIN') {
            this.engine.scene.fog = new THREE.FogExp2(0x555555, 0.01);
            // TODO: Activer le système de particules de pluie
        } else {
            this.engine.scene.fog = null; // Ciel dégagé
        }
        
        Events.emit('WEATHER_CHANGED', type);
    }
}
