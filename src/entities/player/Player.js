import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { GAME_CONFIG, COLORS } from '../../utils/Constants.js';

export default class Player {
    constructor(engine, physics, startPos = { x: 0, y: 5, z: 0 }) {
        this.engine = engine;
        this.physics = physics;

        // Stats de base du joueur
        this.health = GAME_CONFIG.player.maxHealth;
        this.money = GAME_CONFIG.player.startingMoney;

        this.createBody(startPos);
    }

    createBody(startPos) {
        // Visuel 3D temporaire (Un cylindre aux couleurs de mOS)
        const geo = new THREE.CylinderGeometry(0.5, 0.5, 2, 16);
        const mat = new THREE.MeshStandardMaterial({ color: COLORS.mOS_primary });
        this.mesh = new THREE.Mesh(geo, mat);
        this.mesh.castShadow = true;
        this.engine.scene.add(this.mesh);

        // Hitbox physique
        const shape = new CANNON.Cylinder(0.5, 0.5, 2, 16);
        this.body = new CANNON.Body({
            mass: 75, // Poids d'un humain moyen
            position: new CANNON.Vec3(startPos.x, startPos.y, startPos.z),
            shape: shape,
            fixedRotation: true // Empêche le perso de rouler sur lui-même comme un tonneau
        });
        this.physics.addBody(this.body);
    }

    update() {
        // À chaque frame, on colle le visuel 3D sur la position physique
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }
}
