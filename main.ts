const configs: Menu.MenuList[] = [
    { name: "Gyro Cal", run: calibrateGyro },
    { name: "Color Cal", run: calibrateColor }
];

const missions: Menu.MenuList[] = [
    { name: "Crane", run: crane },
    { name: "Swing", run: swing },
    { name: "Blocks Black", run: blocksBlack },
    { name: "Blocks Tan", run: blocksTan },
    { name: "Blocks Red", run: blocksRed }
];

Menu.run(configs, missions);