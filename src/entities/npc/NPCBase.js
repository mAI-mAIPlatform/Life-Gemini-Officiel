import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import BrainAI from './BrainAI.js';
import { Events } from '../../utils/Events.js';

export default class NPCBase {
    constructor(engine, physics, startPos = { x: 5, y: 5, z: 5 }) {
        this.engine = engine;
        this.physics = physics;

        this.createBody(startPos);
        
        // On lui greffe un cerveau
        this.brain = new BrainAI(this.body);

        // On écoute la game loop pour faire réfléchir le PNJ
        Events.on('UPDATE', (deltaTime) => this.update(deltaTime));
    }

    createBody(startPos) {
        // Visuel 3D : Un cylindre gris pour les différencier du joueur
        const geo = new THREE.CylinderGeometry(0.5, 0.5, 2, 16);
        const mat = new THREE.MeshStandardMaterial({ color: 0x8E8E93 }); 
        this.mesh = new THREE.Mesh(geo, mat);
        this.mesh.castShadow = true;
        this.engine.scene.add(this.mesh);

        // Hitbox physique Cannon-es
        const shape = new CANNON.Cylinder(0.5, 0.5, 2, 16);
        this.body = new CANNON.Body({
            mass: 70, // Poids du PNJ
            position: new CANNON.Vec3(startPos.x, startPos.y, startPos.z),
            shape: shape,
            fixedRotation: true
        });
        this.physics.addBody(this.body);
    }

    update(deltaTime) {
        // 1. Faire réfléchir l'IA
        this.brain.update(deltaTime);

        // 2. Coller le visuel 3D sur la position physique
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }
}
