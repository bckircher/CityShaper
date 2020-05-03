function calibrateGyro() {
    let i: number;

    brick.font = fonts.font16;

    for (i = 0; i < 3; i++) {
        brick.clearScreen();
        brick.showString((3 - i).toString(), 4);
        pause(1000);
    }

    brick.clearScreen();
    brick.showString("Calibrating", 4);
    sensors.gyro1.calibrate();
}