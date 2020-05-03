namespace Menu {
    let internal: boolean;
    let mission: number;
    let item: number;
    let redraw: boolean;

    export interface MenuList {
        name: string;
        run: () => void;
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

    function draw() {
        brick.clearScreen();
        brick.font = fonts.font16;
        if (internal) {
            if (item == 0) {
                brick.showPorts();
            } else {
                brick.showString(configs[item - 1].name, 4);
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

    function up() {
        if (internal && (item != 0)) {
            item--;
            redraw = true;
        }
        else if (!internal) {
            missionPrevious();
        }
    }

    function down() {
        if (internal && (item < configs.length)) {
            item++;
            redraw = true;
        }
        else if (!internal) {
            missionNext();
        }
    }

    function left() {
        if (!internal) {
            internal = true;
            item = 0;
            redraw = true;
        }
    }

    function right() {
        if (internal) {
            internal = false;
            redraw = true;
        }
    }

    function enter() {
        if (internal) {
            if (item != 0) {
                configs[item - 1].run();
                missionReset();
                redraw = true;
            }
        } else {
            brick.showString("Running...", 3);
            missionPrepare();
            missions[mission].run();
            missionReset();
            missionNext();
            redraw = true;
        }
    }

    export function run(configs: MenuList[], missions: MenuList[]) {
        internal = true;
        mission = 0;
        item = 0;
        redraw = true;

        missionReset();

        while (true) {
            if (redraw) {
                draw();
            }

            pause(100);

            if (brick.buttonUp.wasPressed()) {
                up();
            }

            if (brick.buttonDown.wasPressed()) {
                down();
            }

            if (brick.buttonLeft.wasPressed()) {
                left();
            }

            if (brick.buttonRight.wasPressed()) {
                right();
            }

            if (brick.buttonEnter.wasPressed()) {
                enter();
            }
        }
    }
}