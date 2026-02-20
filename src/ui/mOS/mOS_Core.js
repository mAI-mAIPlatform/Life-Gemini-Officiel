import { COLORS } from '../../utils/Constants.js';
import { Events } from '../../utils/Events.js';

// 📦 Import des Apps
import BankApp from './apps/BankApp.js';
import MapsApp from './apps/MapsApp.js';

export default class mOS_Core {
    constructor() {
        this.container = document.getElementById('mos-container');
        
        // Registre des apps installées
        this.apps = {
            'Bank': new BankApp(this.container),
            'Maps': new MapsApp(this.container)
        };
        
        this.currentApp = null;
        
        // On écoute la fermeture d'une app pour réafficher le menu
        Events.on('APP_CLOSED', () => {
            this.currentApp = null;
            this.renderHomeScreen();
        });

        this.boot();
    }

    boot() {
        console.log("📱 Démarrage de mOS...");
        this.renderHomeScreen();
    }

    renderHomeScreen() {
        this.container.innerHTML = `
            <div style="padding: 20px; height: 100%; display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; color: white; font-size: 12px; margin-bottom: 25px; font-weight: 500;">
                    <span>mOS 1.0</span>
                    <span>5G &nbsp; 100% 🔋</span>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;">
                    ${this.renderAppIcon('🏦', 'Bank', COLORS.mOS_primary, 'Bank')}
                    ${this.renderAppIcon('📈', 'Crypto', '#FF9500', null)}
                    ${this.renderAppIcon('🗺️', 'Maps', '#34C759', 'Maps')}
                    ${this.renderAppIcon('⚙️', 'Settings', '#8E8E93', null)}
                </div>
                
                <div style="margin-top: auto; display: flex; justify-content: center; padding-bottom: 10px;">
                    <div style="width: 120px; height: 5px; background: white; border-radius: 10px; opacity: 0.8;"></div>
                </div>
            </div>
        `;

        // Activation des clics sur les icônes
        document.querySelectorAll('.app-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                const appName = e.currentTarget.dataset.app;
                if (appName && this.apps[appName]) {
                    this.openApp(appName);
                } else {
                    console.log("⚠️ Cette app est encore en dev !");
                }
            });
        });
    }

    renderAppIcon(emoji, name, color, appId) {
        // Ajout d'une classe 'app-icon' et d'un data-attribute pour le routing
        return `
            <div class="app-icon" data-app="${appId}" style="display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: transform 0.1s;">
                <div style="width: 50px; height: 50px; background: ${color}; border-radius: 14px; display: flex; justify-content: center; align-items: center; font-size: 24px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                    ${emoji}
                </div>
                <span style="color: white; font-size: 11px; margin-top: 6px; font-weight: 500;">${name}</span>
            </div>
        `;
    }

    openApp(appName) {
        this.currentApp = appName;
        this.apps[appName].render(); // Lance le rendu de l'application ciblée
    }
}
