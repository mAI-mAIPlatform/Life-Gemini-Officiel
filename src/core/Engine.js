import * as THREE from 'three';
import { Events } from '../utils/Events.js';

export default class Engine {
    constructor() {
        this.container = document.getElementById('game-canvas-container');
        
        // 1. La Scène
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB); // Ciel de base (bleu)

        // 2. La Caméra
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        
        // 3. Le Rendu
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Opti perfs
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        this.container.appendChild(this.renderer.domElement);

        // Gestion du redimensionnement (future-proof)
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        Events.emit('ENGINE_RESIZED', { width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
