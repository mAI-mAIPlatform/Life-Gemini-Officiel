import { Events } from '../../../utils/Events.js';
import { COLORS } from '../../../utils/Constants.js';

export default class MapsApp {
    constructor(container) {
        this.container = container;
        this.currentLocation = "NeoCity - Centre Ville";
    }

    render() {
        this.container.innerHTML = `
            <div style="padding: 20px; height: 100%; color: white; display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <span style="font-size: 24px; cursor: pointer;" id="close-maps">⬅️</span>
                    <span style="font-weight: bold;">mOS Maps</span>
                    <span style="font-size: 20px;">📍</span>
                </div>
                
                <div style="flex-grow: 1; background: rgba(0,0,0,0.4); border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); position: relative; overflow: hidden; display: flex; justify-content: center; align-items: center;">
                    <div style="position: absolute; width: 200%; height: 200%; background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 20px 20px;"></div>
                    
                    <div style="width: 15px; height: 15px; background: ${COLORS.mOS_primary}; border-radius: 50%; box-shadow: 0 0 15px ${COLORS.mOS_primary}; z-index: 2;"></div>
                </div>

                <div style="margin-top: 20px; background: rgba(255, 255, 255, 0.1); border-radius: 15px; padding: 15px; backdrop-filter: blur(10px);">
                    <p style="font-size: 12px; opacity: 0.7; margin-bottom: 5px;">Position actuelle</p>
                    <p style="font-weight: bold; font-size: 16px;">${this.currentLocation}</p>
                </div>
            </div>
        `;

        document.getElementById('close-maps').addEventListener('click', () => {
            Events.emit('APP_CLOSED');
        });
    }
}
