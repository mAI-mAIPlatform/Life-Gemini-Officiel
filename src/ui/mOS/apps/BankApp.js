import { Events } from '../../../utils/Events.js';
import { COLORS } from '../../../utils/Constants.js';

export default class BankApp {
    constructor(container) {
        this.container = container;
        this.balance = 500; // Argent de départ
        
        // On écoute quand on gagne ou perd de l'argent
        Events.on('MONEY_UPDATED', (newBalance) => {
            this.balance = newBalance;
            this.render();
        });
    }

    render() {
        // UI façon app bancaire moderne
        this.container.innerHTML = `
            <div style="padding: 20px; height: 100%; color: white; display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                    <span style="font-size: 24px; cursor: pointer;" id="close-bank">⬅️</span>
                    <span style="font-weight: bold;">Maze Bank</span>
                    <span></span>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 20px; text-align: center; backdrop-filter: blur(10px);">
                    <p style="font-size: 14px; opacity: 0.8;">Solde Actuel</p>
                    <h1 style="font-size: 36px; margin: 10px 0;">$${this.balance.toLocaleString()}</h1>
                    <button id="send-money-btn" style="background: ${COLORS.mOS_primary}; color: white; border: none; padding: 10px 20px; border-radius: 12px; font-weight: bold; width: 100%; cursor: pointer; margin-top: 10px;">
                        Transférer
                    </button>
                </div>

                <h3 style="margin-top: 30px; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 10px;">Historique</h3>
                <div style="margin-top: 10px; overflow-y: auto; flex-grow: 1;">
                    <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <span>Dépôt initial</span>
                        <span style="color: ${COLORS.mOS_success};">+$500</span>
                    </div>
                </div>
            </div>
        `;

        // Bouton pour fermer l'appli et retourner au menu mOS
        document.getElementById('close-bank').addEventListener('click', () => {
            Events.emit('APP_CLOSED');
        });
    }
}
