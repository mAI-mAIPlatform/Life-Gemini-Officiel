import { Events } from '../../utils/Events.js';

export default class VehicleController {
    constructor(car, inputHandler) {
        this.car = car.vehicle; // Le RaycastVehicle
        this.input = inputHandler;
        
        this.maxSteerVal = 0.5;
        this.maxForce = 1000;
        this.brakeForce = 10;
        
        Events.on('UPDATE', () => this.updateControls());
    }

    updateControls() {
        let engineForce = 0;
        let steeringValue = 0;

        // Accélération (W/Z) et Frein/Recul (S)
        if (this.input.isKeyPressed('KeyW')) engineForce = -this.maxForce;
        if (this.input.isKeyPressed('KeyS')) engineForce = this.maxForce;

        // Direction (A/Q et D)
        if (this.input.isKeyPressed('KeyA')) steeringValue = this.maxSteerVal;
        if (this.input.isKeyPressed('KeyD')) steeringValue = -this.maxSteerVal;

        // Application de la force sur les roues arrière (Propulsion)
        this.car.applyEngineForce(engineForce, 2);
        this.car.applyEngineForce(engineForce, 3);

        // Direction sur les roues avant
        this.car.setSteeringValue(steeringValue, 0);
        this.car.setSteeringValue(steeringValue, 1);

        // Freinage avec Espace
        if (this.input.isKeyPressed('Space')) {
            this.car.setBrake(this.brakeForce, 0);
            this.car.setBrake(this.brakeForce, 1);
            this.car.setBrake(this.brakeForce, 2);
            this.car.setBrake(this.brakeForce, 3);
        } else {
            this.car.setBrake(0, 0);
            this.car.setBrake(0, 1);
            this.car.setBrake(0, 2);
            this.car.setBrake(0, 3);
        }
    }
}
