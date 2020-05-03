function calibrateColor() {
    brick.font = fonts.font16;
    brick.clearScreen();
    brick.showString("Calibrating", 4);

    motors.largeBC.steer(0, 10);
    sensors.color2.calibrateLight(LightIntensityMode.Reflected);
    motors.largeBC.stop();
}