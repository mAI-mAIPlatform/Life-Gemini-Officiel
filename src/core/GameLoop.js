import { Events } from '../utils/Events.js';

export default class GameLoop {
    constructor(engine, physics) {
        this.engine = engine;
        this.physics = physics;
        this.clock = new THREE.Clock();
        this.isRunning = false;
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.clock.start();
        this.loop();
        Events.emit('GAME_STARTED');
    }

    stop() {
        this.isRunning = false;
        this.clock.stop();
        Events.emit('GAME_PAUSED');
    }

    loop() {
        if (!this.isRunning) return;

        requestAnimationFrame(() => this.loop());

        // Delta time pour des mouvements fluides peu importe les FPS
        const deltaTime = this.clock.getDelta();

        // 1. Mise à jour de la physique
        this.physics.update(deltaTime);

        // 2. Broadcast de l'update pour les entités (joueur, PNJ, véhicules)
        Events.emit('UPDATE', deltaTime);

        // 3. Rendu 3D
        this.engine.render();
    }
}
