import { Events } from '../utils/Events.js';

export default class InputHandler {
    constructor() {
        this.keys = {};
        this.mouse = { x: 0, y: 0, isDown: false };
        
        this.initEventListeners();
    }

    initEventListeners() {
        // Clavier
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            Events.emit('KEY_DOWN', e.code);
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
            Events.emit('KEY_UP', e.code);
        });

        // Souris
        window.addEventListener('mousedown', () => {
            this.mouse.isDown = true;
            Events.emit('MOUSE_DOWN');
        });

        window.addEventListener('mouseup', () => {
            this.mouse.isDown = false;
            Events.emit('MOUSE_UP');
        });

        window.addEventListener('mousemove', (e) => {
            // Normalisation des coordonnées de la souris (-1 à +1) pour la 3D
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });
    }

    // Fonction utilitaire pour vérifier si une touche est pressée
    isKeyPressed(keyCode) {
        return !!this.keys[keyCode];
    }
}
