import * as THREE from 'three';

export default class BrainAI {
    constructor(npcBody) {
        this.body = npcBody;
        this.state = 'IDLE'; // États possibles : IDLE, WALK, FLEE
        this.timer = 0;
        this.targetPoint = new THREE.Vector3();
    }

    update(deltaTime) {
        this.timer -= deltaTime;

        // Le cerveau prend une nouvelle décision toutes les X secondes
        if (this.timer <= 0) {
            this.decideNextAction();
        }

        this.executeAction();
    }

    decideNextAction() {
        const rand = Math.random();
        
        if (rand > 0.6) {
            this.state = 'IDLE';
            this.timer = 2 + Math.random() * 3; // Chill entre 2 et 5 secondes
        } else {
            this.state = 'WALK';
            this.timer = 5 + Math.random() * 5; // Marche entre 5 et 10 sec
            
            // Choisit un point au hasard autour de lui (dans un rayon de 20m)
            this.targetPoint.set(
                this.body.position.x + (Math.random() - 0.5) * 40,
                this.body.position.y,
                this.body.position.z + (Math.random() - 0.5) * 40
            );
        }
    }

    executeAction() {
        if (this.state === 'WALK') {
            // Direction vers le point cible
            const dx = this.targetPoint.x - this.body.position.x;
            const dz = this.targetPoint.z - this.body.position.z;
            const distance = Math.sqrt(dx * dx + dz * dz);
            
            if (distance > 1) {
                // Vitesse de marche de base (environ 2m/s)
                const speed = 2;
                this.body.velocity.x = (dx / distance) * speed;
                this.body.velocity.z = (dz / distance) * speed;
            } else {
                this.state = 'IDLE'; // Arrivé à destination
            }
        } else if (this.state === 'IDLE') {
            // On freine doucement
            this.body.velocity.x *= 0.8;
            this.body.velocity.z *= 0.8;
        }
    }
}
