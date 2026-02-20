import * as THREE from 'three';
import { GAME_CONFIG } from '../../utils/Constants.js';
import { Events } from '../../utils/Events.js';

export default class PlayerController {
    constructor(player, inputHandler, camera) {
        this.player = player;
        this.input = inputHandler;
        this.camera = camera;
        
        // Caméra placée derrière et au-dessus du joueur
        this.cameraOffset = new THREE.Vector3(0, 5, 10);
        
        // On écoute la GameLoop pour bouger à chaque frame
        Events.on('UPDATE', () => this.update());
    }

    update() {
        // 1. Mettre à jour la position 3D du joueur
        this.player.update();

        const body = this.player.body;
        const speed = this.input.isKeyPressed('ShiftLeft') 
            ? GAME_CONFIG.player.runSpeed 
            : GAME_CONFIG.player.walkSpeed;

        // 2. Calcul des déplacements (ZQSD / WASD)
        let velocityX = 0;
        let velocityZ = 0;

        if (this.input.isKeyPressed('KeyW')) velocityZ = -speed;
        if (this.input.isKeyPressed('KeyS')) velocityZ = speed;
        if (this.input.isKeyPressed('KeyA')) velocityX = -speed;
        if (this.input.isKeyPressed('KeyD')) velocityX = speed;

        // On applique la vitesse en gardant la chute de gravité intacte
        body.velocity.set(velocityX, body.velocity.y, velocityZ);

        // 3. Saut (si on touche le sol)
        if (this.input.isKeyPressed('Space') && Math.abs(body.velocity.y) < 0.1) {
            body.velocity.y = GAME_CONFIG.player.jumpForce;
        }

        // 4. La caméra suit le perso
        this.camera.position.copy(body.position).add(this.cameraOffset);
        this.camera.lookAt(body.position);
    }
}
