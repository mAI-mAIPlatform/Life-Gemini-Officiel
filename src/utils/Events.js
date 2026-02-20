// Système central de communication (Event Bus)
class EventManager {
    constructor() {
        this.events = {};
    }

    // Écouter un événement
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    // Déclencher un événement
    emit(eventName, data = {}) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => callback(data));
        }
    }

    // Arrêter d'écouter
    off(eventName, callbackToRemove) {
        if (!this.events[eventName]) return;
        this.events[eventName] = this.events[eventName].filter(cb => cb !== callbackToRemove);
    }
}

// On exporte une seule instance globale
export const Events = new EventManager();
