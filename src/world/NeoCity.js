import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export default class NeoCity {
    constructor(engine, physics) {
        this.engine = engine;
        this.physics = physics;
        this.buildings = [];
        
        this.generateCityBlock();
    }

    generateCityBlock() {
        console.log("🏙️ Génération de NeoCity en cours...");
        
        // On crée une petite zone urbaine avec 5 bâtiments aléatoires
        for (let i = 0; i < 5; i++) {
            const width = 10 + Math.random() * 10;
            const height = 15 + Math.random() * 30; // Des tours plus ou moins hautes
            const depth = 10 + Math.random() * 10;
            
            const x = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 100;
            
            this.createBuilding(width, height, depth, x, z);
        }
    }

    createBuilding(w, h, d, x, z) {
        // 1. Visuel 3D
        const geo = new THREE.BoxGeometry(w, h, d);
        const mat = new THREE.MeshStandardMaterial({ 
            color: 0x34495e, 
            roughness: 0.8 // Effet béton
        });
        const mesh = new THREE.Mesh(geo, mat);
        // Le centre du bloc est à h/2 pour être posé sur le sol
        mesh.position.set(x, h / 2, z); 
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.engine.scene.add(mesh);
        this.buildings.push(mesh);

        // 2. Physique (Masse 0 = Statique, ne bouge pas)
        const shape = new CANNON.Box(new CANNON.Vec3(w/2, h/2, d/2));
        const body = new CANNON.Body({ mass: 0 });
        body.addShape(shape);
        body.position.copy(mesh.position);
        this.physics.addBody(body);
    }
}
