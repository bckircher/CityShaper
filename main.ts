const missions: Menu.MenuList[] = [
    { name: "Crane", func: crane },
    { name: "Swing", func: swing },
    { name: "Blocks Black", func: blocksBlack },
    { name: "Blocks Tan", func: blocksTan },
    { name: "Blocks Red", func: blocksRed }
]

Menu.run(missions);
