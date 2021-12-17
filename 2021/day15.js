const _ = require('lodash');

module.exports.part1Examples = [
    `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`
];

module.exports.part1ExampleAnswers = [
    40
];

module.exports.part2Examples = [
    `
----PASTE EXAMPLES HERE
`
];

module.exports.part2ExampleAnswers = [
    // ----PASTE EXAMPLE ANSWERS HERE
];

const findBestPath = (xy, map, { bestPath, pathRisk }) => {
    const point = map.get(xy);

    const sidesRisk = point.sides.map((sidePoint) => {
        return map.get(sidePoint).risk;
    });

    console.log('sidesRisk', sidesRisk);

    return bestPath;
};


module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    let answer;

    const input = inputArray;

    const map = new Map();

    for (let y = 0; y < input.length; y++) {
        const row = input[y];
        for (let x = 0; x < row.length; x++) {
            const xy = `${x},${y}`;
            const risk = _.toNumber(row[x]);

            const leftX = x > 0 ? x - 1 : undefined;
            const rightX = x < (row.length - 1) ? x + 1 : undefined;

            const upY = y > 0 ? y - 1 : undefined;
            const downY = y < (input.length - 1) ? y + 1 : undefined;

            const sides = [];

            // if (_.isFinite(leftX)) {
            //     sides.push(`${leftX},${y}`);
            // }

            if (_.isFinite(rightX)) {
                sides.push(`${rightX},${y}`);
            }

            // if (_.isFinite(upY)) {
            //     sides.push(`${x},${upY}`);
            // }

            if (_.isFinite(downY)) {
                sides.push(`${x},${downY}`);
            }

            map.set(xy, { risk, sides });
        }
    }

    console.log('map', map);

    const result = { pathRisk: 0, bestPath: [] };

    const bestPath = findBestPath('0,0', map, result);

    const risk = bestPath.map((xy) => {
        return map.get(xy).risk;
    }).reduce((acc, { risk }) => {
        return acc + risk;
    }, 0);

    return risk;
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    let answer;

    const input = inputArray;

    return answer;
};
