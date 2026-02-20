// Configuration globale de Codons Life
export const GAME_CONFIG = {
    version: '1.0.0',
    debugMode: true, // À passer en false pour la prod
    
    // Physique & Monde
    physics: {
        gravity: -9.81,
        timeStep: 1 / 60
    },

    // Joueur de base
    player: {
        walkSpeed: 5,
        runSpeed: 10,
        jumpForce: 5,
        maxHealth: 100,
        startingMoney: 500
    },

    // Cycle Jour/Nuit (en millisecondes)
    world: {
        dayDuration: 1200000, // 20 minutes IRL = 1 jour in-game
    }
};

export const COLORS = {
    mOS_primary: '#007AFF', // Bleu iOS vibes
    mOS_alert: '#FF3B30',
    mOS_success: '#34C759'
};
