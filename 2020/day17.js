const _ = require('lodash');

module.exports.part1Examples = [
    `.#.
..#
###
`
];

module.exports.part1ExampleAnswers = [112];

// module.exports.part2Examples = [
// `
// ----PASTE EXAMPLES HERE
// `
// ];

// module.exports.part2ExampleAnswers = [
// ----PASTE EXAMPLE ANSWERS HERE
// ];

const getCubeState = ({ life, x, y, z }) => {
    return life.get(`${x}:${y}:${z}`) || false;
};

const getNumberOfActiveNeighbors = ({ life, x, y, z }) => {
    const xs = [x - 1, x + 1];
    const ys = [y - 1, y + 1];
    const zs = [z - 1, z + 1];

    let actives = 0;

    xs.forEach(x => {
        ys.forEach(y => {
            zs.forEach(z => {
                if (getCubeState({ life, x, y, z })) {
                    actives++;
                }
            });
        });
    });

    return actives;
};

const setCubeState = ({ state, isActive, x, y, z }) => {
    state.set(`${x}:${y}:${0}`, isActive);
};

const expandState = ({ state, min, max }) => {
    console.log('min', min);
    console.log('max', max);


    const newCoordinates = [];

    let newMin = min;
    let newMax = max;
    while (newMin < newMax) {
        newCoordinates.push(newMin);

        newMin++;
    }

    newCoordinates.forEach((x) => {
        newCoordinates.forEach((y) => {
            newCoordinates.forEach((z) => {
                setCubeState({ state, x, y, z, isActive: false });
            });
        });
    });


    state;
};

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    let answer;

    let state = new Map();

    // .#.
    // ..#
    // ###

    let size = inputArray.filter(Boolean).length;
    let min = 0;
    let max = size;

    console.log('size', size);

    inputArray.filter(Boolean).map((line, y) => {
        line.split('').forEach((cube, x) => {
            setCubeState({ state, isActive: cube === '#', x, y, z: 0 });
        });
    });

    console.log('state', state);


    for (let cycle = 0; cycle < 6; cycle++) {
        // update life

        expandState({ state, size, min: --min, max: --max });
        console.log('state', state);
        size++;
    }

    // console.log('state', state);




    const activeCubes = [];
    return answer;
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    let answer;

    const input = inputArray;

    return answer;
};
