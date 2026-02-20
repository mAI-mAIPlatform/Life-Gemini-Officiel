import { COLORS } from '../../utils/Constants.js';

export default class mOS_Core {
    constructor() {
        this.container = document.getElementById('mos-container');
        this.apps = []; // Liste des apps installées
        this.boot();
    }

    boot() {
        console.log("📱 Démarrage de mOS...");
        this.renderHomeScreen();
    }

    renderHomeScreen() {
        // Design du Springboard (l'écran d'accueil)
        this.container.innerHTML = `
            <div style="padding: 20px; height: 100%; display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; color: white; font-size: 12px; margin-bottom: 20px;">
                    <span>mOS 1.0</span>
                    <span>100% 🔋</span>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;">
                    ${this.renderAppIcon('🏦', 'Bank', COLORS.mOS_primary)}
                    ${this.renderAppIcon('📈', 'Crypto', '#FF9500')}
                    ${this.renderAppIcon('🗺️', 'Maps', '#34C759')}
                    ${this.renderAppIcon('⚙️', 'Settings', '#8E8E93')}
                </div>
                
                <div style="margin-top: auto; display: flex; justify-content: center; padding-bottom: 10px;">
                    <div style="width: 100px; height: 5px; background: white; border-radius: 10px; opacity: 0.5;"></div>
                </div>
            </div>
        `;
    }

    renderAppIcon(emoji, name, color) {
        return `
            <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer;">
                <div style="width: 50px; height: 50px; background: ${color}; border-radius: 12px; display: flex; justify-content: center; align-items: center; font-size: 24px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
                    ${emoji}
                </div>
                <span style="color: white; font-size: 10px; margin-top: 5px; font-weight: 500;">${name}</span>
            </div>
        `;
    }
}
