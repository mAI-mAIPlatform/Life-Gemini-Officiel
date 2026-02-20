import * as THREE from 'three';
import * as CANNON from 'cannon-es';
// import { Events } from '../utils/Events.js';

export default class WorldManager {
    constructor(engine, physics) {
        this.engine = engine;
        this.physics = physics;
        
        this.initEnvironment();
    }

    initEnvironment() {
        // 1. Lumière globale (Ambiance + Soleil)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.engine.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(50, 100, 50);
        dirLight.castShadow = true;
        this.engine.scene.add(dirLight);

        // 2. Le sol 3D (Visuel Three.js)
        const floorGeo = new THREE.PlaneGeometry(500, 500);
        const floorMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50 });
        const floorMesh = new THREE.Mesh(floorGeo, floorMat);
        floorMesh.rotation.x = -Math.PI / 2; // On le couche à l'horizontale
        floorMesh.receiveShadow = true;
        this.engine.scene.add(floorMesh);

        // 3. Le sol Physique (Collisions Cannon-es)
        const floorShape = new CANNON.Plane();
        const floorBody = new CANNON.Body({
            mass: 0, // Masse 0 = objet statique, ne tombe pas avec la gravité
            shape: floorShape
        });
        // On aligne la rotation de la physique avec la 3D
        floorBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); 
        this.physics.addBody(floorBody);

        console.log("🌍 Monde généré avec succès !");
    }
}
