import * as CANNON from 'cannon-es';
import { GAME_CONFIG } from '../utils/Constants.js';

export default class Physics {
    constructor() {
        // Création du monde physique
        this.world = new CANNON.World({
            gravity: new CANNON.Vec3(0, GAME_CONFIG.physics.gravity, 0),
        });

        // Optimisation des collisions (Broadphase)
        this.world.broadphase = new CANNON.SAPBroadphase(this.world);
        this.world.solver.iterations = 10; // Précision des chocs

        // Matériau par défaut
        this.defaultMaterial = new CANNON.Material('default');
        const defaultContactMaterial = new CANNON.ContactMaterial(
            this.defaultMaterial,
            this.defaultMaterial,
            {
                friction: 0.3,
                restitution: 0.2 // Rebond léger
            }
        );
        this.world.addContactMaterial(defaultContactMaterial);
    }

    // Met à jour la physique à chaque frame
    update(deltaTime) {
        this.world.step(GAME_CONFIG.physics.timeStep, deltaTime, 3);
    }

    // Ajouter un objet au monde physique
    addBody(body) {
        this.world.addBody(body);
    }

    // Retirer un objet
    removeBody(body) {
        this.world.removeBody(body);
    }
}
