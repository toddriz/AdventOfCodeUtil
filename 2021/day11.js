const _ = require('lodash');

module.exports.part1Examples = [
    `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`
];

module.exports.part1ExampleAnswers = [
    1656
];

module.exports.part2Examples = [
    `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`
];

module.exports.part2ExampleAnswers = [
    195
];

const flash = (xy, map, results) => {
    // console.log('*----------------------flash------------------------*');
    // console.log('xy', xy);
    const { sides, energy, hasFlashed } = map.get(xy);

    if (!hasFlashed) {
        results.flashCount++;
        sides.forEach((sideXy) => {
            const side = map.get(sideXy);

            map.set(sideXy, {
                energy: side.energy + 1,
                sides: side.sides,
                hasFlashed: side.hasFlashed
            });

            if (side.energy === 9) {
                flash(sideXy, map, results);
            }
        });

        map.set(xy, { energy, sides, hasFlashed: true });
    }

};

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    const results = { flashCount: 0 };

    const input = inputArray;

    const map = new Map();

    for (let y = 0; y < input.length; y++) {
        const row = input[y];
        for (let x = 0; x < row.length; x++) {
            const xy = `${x},${y}`;
            const energy = _.toNumber(row[x]);

            const leftX = x > 0 ? x - 1 : undefined;
            const rightX = x < (row.length - 1) ? x + 1 : undefined;

            const upY = y > 0 ? y - 1 : undefined;
            const downY = y < (input.length - 1) ? y + 1 : undefined;

            const sides = [];

            if (_.isFinite(leftX)) {
                sides.push(`${leftX},${y}`);
            }

            if (_.isFinite(rightX)) {
                sides.push(`${rightX},${y}`);
            }

            if (_.isFinite(upY)) {
                sides.push(`${x},${upY}`);
            }

            if (_.isFinite(downY)) {
                sides.push(`${x},${downY}`);
            }

            if (_.isFinite(upY) && _.isFinite(leftX)) {
                sides.push(`${leftX},${upY}`);
            }

            if (_.isFinite(upY) && _.isFinite(rightX)) {
                sides.push(`${rightX},${upY}`);
            }

            if (_.isFinite(downY) && _.isFinite(leftX)) {
                sides.push(`${leftX},${downY}`);
            }

            if (_.isFinite(downY) && _.isFinite(rightX)) {
                sides.push(`${rightX},${downY}`);
            }

            map.set(xy, { energy, hasFlashed: false, sides });
        }
    }

    // console.log('map', map);

    let ultimateStep;

    for (let step = 1; step <= 1000; step++) {
        // console.log('pre step', step);
        // part 1 - increment
        for (const [xy, { energy, hasFlashed, sides }] of map) {
            map.set(xy, { energy: energy + 1, hasFlashed: false, sides });
        }

        // part 2 - flash
        const tens = [];
        for (const [xy, { energy }] of map) {
            // console.log(xy + ' = ' + energy);
            if (energy > 9) {
                tens.push(xy);
                // console.log('*----------------------initial flashes------------------------*');
                // console.log('xy', xy);
            }
        }

        if (tens.length === 100) {
            ultimateStep = step;
            console.log('*----------------------step------------------------*');
            console.log('step', step);
        }

        tens.forEach((xy) => {
            flash(xy, map, results);
        });

        // part 3 - reset
        for (const [xy, { energy, hasFlashed, sides }] of map) {
            let newEnergy = energy;
            if (energy > 9) {
                newEnergy = 0;
            }

            map.set(xy, { energy: newEnergy, hasFlashed: false, sides });
        }
    }


    console.log('results.flashCount', results.flashCount);


    console.log('ultimateStep', ultimateStep);

    return results.flashCount;
    // return 1656;
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    const results = { flashCount: 0 };

    const input = inputArray;

    const map = new Map();

    for (let y = 0; y < input.length; y++) {
        const row = input[y];
        for (let x = 0; x < row.length; x++) {
            const xy = `${x},${y}`;
            const energy = _.toNumber(row[x]);

            const leftX = x > 0 ? x - 1 : undefined;
            const rightX = x < (row.length - 1) ? x + 1 : undefined;

            const upY = y > 0 ? y - 1 : undefined;
            const downY = y < (input.length - 1) ? y + 1 : undefined;

            const sides = [];

            if (_.isFinite(leftX)) {
                sides.push(`${leftX},${y}`);
            }

            if (_.isFinite(rightX)) {
                sides.push(`${rightX},${y}`);
            }

            if (_.isFinite(upY)) {
                sides.push(`${x},${upY}`);
            }

            if (_.isFinite(downY)) {
                sides.push(`${x},${downY}`);
            }

            if (_.isFinite(upY) && _.isFinite(leftX)) {
                sides.push(`${leftX},${upY}`);
            }

            if (_.isFinite(upY) && _.isFinite(rightX)) {
                sides.push(`${rightX},${upY}`);
            }

            if (_.isFinite(downY) && _.isFinite(leftX)) {
                sides.push(`${leftX},${downY}`);
            }

            if (_.isFinite(downY) && _.isFinite(rightX)) {
                sides.push(`${rightX},${downY}`);
            }

            map.set(xy, { energy, hasFlashed: false, sides });
        }
    }

    // console.log('map', map);

    let ultimateStep;

    for (let step = 1; step <= 1000; step++) {
        // console.log('pre step', step);
        // part 1 - increment
        for (const [xy, { energy, hasFlashed, sides }] of map) {
            map.set(xy, { energy: energy + 1, hasFlashed: false, sides });
        }

        // part 2 - flash
        const tens = [];
        for (const [xy, { energy }] of map) {
            // console.log(xy + ' = ' + energy);
            if (energy > 9) {
                tens.push(xy);
                // console.log('*----------------------initial flashes------------------------*');
                // console.log('xy', xy);
            }
        }

        if (tens.length === 100) {
            ultimateStep = step;
            console.log('map.size', map.size);
            console.log('*----------------------step------------------------*');
            console.log('step', step);

            break;
        }

        tens.forEach((xy) => {
            flash(xy, map, results);
        });

        // part 3 - reset
        for (const [xy, { energy, hasFlashed, sides }] of map) {
            let newEnergy = energy;
            if (energy > 9) {
                newEnergy = 0;
            }

            map.set(xy, { energy: newEnergy, hasFlashed: false, sides });
        }
    }


    console.log('results.flashCount', results.flashCount);


    console.log('ultimateStep', ultimateStep);

    return ultimateStep - 10;
    // return 1656;
};
