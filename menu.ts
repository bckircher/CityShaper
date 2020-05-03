namespace Menu {
    const font16 = image.doubledFont(image.font8);
    let internal: boolean;
    let mission: number;
    let item: number;
    let redraw: boolean;

    export interface MenuList {
        name: string;
        func: () => void;
    }

    function missionPrevious() {
        if (mission != 0) {
            mission--;
            redraw = true;
        }
    }

    function missionNext() {
        if (mission != (missions.length - 1)) {
            mission++;
            redraw = true;
        }
    }

    function missionPrepare() {
        motors.largeA.setBrake(true);
        motors.largeA.clearCounts();
        motors.largeB.setBrake(true);
        motors.largeB.clearCounts();
        motors.largeC.setBrake(true);
        motors.largeC.clearCounts();
        motors.largeD.setBrake(true);
        motors.largeD.clearCounts();

        //sensors.gyro1.clearAngle();
    }

    function missionReset() {
        motors.largeA.setBrake(false);
        motors.largeB.setBrake(false);
        motors.largeC.setBrake(false);
        motors.largeD.setBrake(false);

        brick.buttonUp.wasPressed();
        brick.buttonDown.wasPressed();
        brick.buttonLeft.wasPressed();
        brick.buttonRight.wasPressed();
        brick.buttonEnter.wasPressed();
    }

    function calibrateGyro() {
        let i: number;

        brick.font = font16;
        for (i = 0; i < 3; i++) {
            brick.clearScreen();
            brick.showString((3 - i).toString(), 4);
            pause(1000);
        }
        brick.clearScreen();
        brick.showString("Calibrating", 4);
        sensors.gyro1.calibrate();
    }

    function calibrateColor() {
        brick.clearScreen();
        brick.font = font16;
        brick.showString("Calibrating", 4);

        motors.largeBC.steer(0, 10);
        sensors.color2.calibrateLight(LightIntensityMode.Reflected);
        motors.largeBC.stop();
    }

    export function run(missions: MenuList[]) {
        internal = true;
        mission = 0;
        item = 0;
        redraw = true;

        missionReset();

        while (true) {
            if (redraw) {
                brick.clearScreen();
                brick.font = font16;
                if (internal) {
                    if (item == 0) {
                        brick.showPorts();
                    } else if (item == 1) {
                        brick.showString("Gyro", 3);
                        brick.showString("Calibrate", 4);
                    } else {
                        brick.showString("Color", 3);
                        brick.showString("Calibrate", 4);
                    }
                } else {
                    if (mission != 0) {
                        brick.showString("^", 1);
                    }
                    brick.showString("Mission " + (mission + 1).toString(), 3);
                    brick.showString(missions[mission].name, 5);
                    if (mission != (missions.length - 1)) {
                        brick.showString("v", 7);
                    }
                }
                redraw = false;
            }

            pause(100);

            if (brick.buttonUp.wasPressed()) {
                if (internal && (item != 0)) {
                    item--;
                    redraw = true;
                }
                else if (!internal) {
                    missionPrevious();
                }
            }

            if (brick.buttonDown.wasPressed()) {
                if (internal && (item < 2)) {
                    item++;
                    redraw = true;
                } else if (!internal) {
                    missionNext();
                }
            }

            if (brick.buttonLeft.wasPressed()) {
                if (!internal) {
                    internal = true;
                    item = 0;
                    redraw = true;
                }
            }

            if (brick.buttonRight.wasPressed()) {
                if (internal) {
                    internal = false;
                    redraw = true;
                }
            }

            if (brick.buttonEnter.wasPressed()) {
                if (internal) {
                    if (item == 1) {
                        calibrateGyro();
                        redraw = true;
                    } else if (item == 2) {
                        calibrateColor();
                        redraw = true;
                    }
                } else {
                    brick.showString("Running...", 3);
                    missionPrepare();
                    missions[mission].func();
                    missionReset();
                    missionNext();
                    redraw = true;
                }
            }
        }
    }
}
