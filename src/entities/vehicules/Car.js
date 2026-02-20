import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { Events } from '../../utils/Events.js';

export default class Car {
    constructor(engine, physics, startPos = { x: 0, y: 2, z: -10 }) {
        this.engine = engine;
        this.physics = physics;
        this.wheels = [];

        this.buildChassis(startPos);
        this.buildVehicle();
        
        Events.on('UPDATE', () => this.update());
    }

    buildChassis(startPos) {
        // Visuel 3D du châssis (Un bloc rouge pour l'instant)
        const geo = new THREE.BoxGeometry(2, 1, 4);
        const mat = new THREE.MeshStandardMaterial({ color: 0xe74c3c });
        this.mesh = new THREE.Mesh(geo, mat);
        this.mesh.castShadow = true;
        this.engine.scene.add(this.mesh);

        // Hitbox physique
        const shape = new CANNON.Box(new CANNON.Vec3(1, 0.5, 2));
        this.chassisBody = new CANNON.Body({ mass: 1500 }); // 1.5 tonne
        this.chassisBody.addShape(shape);
        this.chassisBody.position.set(startPos.x, startPos.y, startPos.z);
    }

    buildVehicle() {
        this.vehicle = new CANNON.RaycastVehicle({
            chassisBody: this.chassisBody,
            indexRightAxis: 0, // x
            indexUpAxis: 1,    // y
            indexForwardAxis: 2 // z
        });

        // Options des suspensions
        const options = {
            radius: 0.5,
            directionLocal: new CANNON.Vec3(0, -1, 0),
            suspensionStiffness: 30,
            suspensionRestLength: 0.3,
            frictionSlip: 5,
            dampingRelaxation: 2.3,
            dampingCompression: 4.4,
            maxSuspensionForce: 100000,
            rollInfluence: 0.01,
            axleLocal: new CANNON.Vec3(-1, 0, 0),
            chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
            maxSuspensionTravel: 0.3,
            customSlidingRotationalSpeed: -30,
            useCustomSlidingRotationalSpeed: true
        };

        // Ajout des 4 roues
        options.chassisConnectionPointLocal.set(1, 0, -1);
        this.vehicle.addWheel(options); // Avant Gauche
        options.chassisConnectionPointLocal.set(-1, 0, -1);
        this.vehicle.addWheel(options); // Avant Droite
        options.chassisConnectionPointLocal.set(1, 0, 1);
        this.vehicle.addWheel(options); // Arrière Gauche
        options.chassisConnectionPointLocal.set(-1, 0, 1);
        this.vehicle.addWheel(options); // Arrière Droite

        this.vehicle.addToWorld(this.physics.world);
    }

    update() {
        // Synchronise le visuel 3D avec le châssis physique
        this.mesh.position.copy(this.chassisBody.position);
        this.mesh.quaternion.copy(this.chassisBody.quaternion);
    }
}
