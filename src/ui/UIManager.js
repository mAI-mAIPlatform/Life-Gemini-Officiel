import { Events } from '../utils/Events.js';

export default class UIManager {
    constructor() {
        this.hudContainer = document.getElementById('hud-container');
        this.mosContainer = document.getElementById('mos-container');
        
        this.isMosOpen = false;

        this.initListeners();
        this.renderHUD();
    }

    initListeners() {
        // Appuyer sur "Tab" ou "M" pour ouvrir mOS
        Events.on('KEY_DOWN', (key) => {
            if (key === 'Tab' || key === 'KeyM') {
                this.toggleMOS();
            }
        });
        
        // Mettre à jour l'argent/vie via les events
        Events.on('MONEY_UPDATED', (amount) => this.updateMoney(amount));
        Events.on('HEALTH_UPDATED', (hp) => this.updateHealth(hp));
    }

    toggleMOS() {
        this.isMosOpen = !this.isMosOpen;
        if (this.isMosOpen) {
            this.mosContainer.classList.remove('hidden');
            this.mosContainer.classList.add('liquid-glass');
        } else {
            this.mosContainer.classList.add('hidden');
        }
        // Informe le reste du jeu que le menu est ouvert (pour pauser ou bloquer les tirs)
        Events.emit('MOS_TOGGLED', this.isMosOpen);
    }

    renderHUD() {
        this.hudContainer.innerHTML = `
            <div style="position: absolute; top: 20px; right: 20px; color: white; font-weight: bold; font-size: 24px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                💰 <span id="hud-money">500</span>$
            </div>
            <div style="position: absolute; bottom: 20px; left: 20px; width: 200px; height: 20px; background: rgba(0,0,0,0.5); border-radius: 10px; overflow: hidden; border: 2px solid white;">
                <div id="hud-health" style="width: 100%; height: 100%; background: #34C759; transition: width 0.3s;"></div>
            </div>
        `;
    }

    updateMoney(amount) {
        document.getElementById('hud-money').innerText = amount;
    }

    updateHealth(hp) {
        document.getElementById('hud-health').style.width = `${hp}%`;
    }
}
