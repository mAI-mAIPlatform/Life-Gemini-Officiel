import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Events } from '../utils/Events.js';

export default class AssetLoader {
    constructor() {
        this.gltfLoader = new GLTFLoader();
        this.textureLoader = new THREE.TextureLoader();
        
        this.assets = {
            models: {},
            textures: {}
        };
        
        this.totalAssets = 0;
        this.loadedAssets = 0;
    }

    async loadModel(name, path) {
        this.totalAssets++;
        return new Promise((resolve, reject) => {
            this.gltfLoader.load(
                path,
                (gltf) => {
                    this.assets.models[name] = gltf.scene;
                    this.onProgress();
                    resolve(gltf.scene);
                },
                undefined, // On peut ajouter une callback de progression ici
                (error) => {
                    console.error(`❌ Erreur de chargement du modèle ${name}:`, error);
                    reject(error);
                }
            );
        });
    }

    async loadTexture(name, path) {
        this.totalAssets++;
        return new Promise((resolve, reject) => {
            this.textureLoader.load(
                path,
                (texture) => {
                    this.assets.textures[name] = texture;
                    this.onProgress();
                    resolve(texture);
                },
                undefined,
                (error) => {
                    console.error(`❌ Erreur de chargement de la texture ${name}:`, error);
                    reject(error);
                }
            );
        });
    }

    onProgress() {
        this.loadedAssets++;
        const progress = (this.loadedAssets / this.totalAssets) * 100;
        Events.emit('LOADING_PROGRESS', progress);
        
        if (this.loadedAssets === this.totalAssets) {
            Events.emit('LOADING_COMPLETE');
        }
    }

    getAsset(type, name) {
        return this.assets[type][name];
    }
}
