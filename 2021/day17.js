const _ = require('lodash');

module.exports.part1Examples = [
    `20:30, -10:-5`
];

module.exports.part1ExampleAnswers = [
    45
];

module.exports.part2Examples = [
    `20:30, -10:-5`
];

module.exports.part2ExampleAnswers = [
    112
];

const isInTarget = (x, y, target) => {
    return (x >= target.xMin && x <= target.xMax) && (y >= target.yMin && y <= target.yMax);
};

const calculateTrajectory = (xVelocity, yVelocity, target) => {
    let maxY = 0;

    let currentX = 0;
    let currentY = 0;

    const result = { didHitTarget: false, maxY };

    // console.log('target', target);
    // console.log('currentY', currentY);
    // console.log('currentX', currentX);

    while (currentY >= target.yMin && ((currentX <= target.xMax && xVelocity > 0) || (currentX >= target.xMin && xVelocity === 0))) {
        // console.log('*----------------------here------------------------*');
        // console.log('currentX', currentX);
        // console.log('currentY', currentY);
        if (currentY > maxY) {
            maxY = currentY;
        }
        if (isInTarget(currentX, currentY, target)) {
            result.didHitTarget = true;
            result.maxY = maxY;
            break;
        } else {
            currentX = currentX + xVelocity;
            currentY = currentY + yVelocity;

            xVelocity = xVelocity ? xVelocity - 1 : 0;
            yVelocity = yVelocity - 1;
        }
    }

    return result;
};

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    const possibleXys = [];
    let answer;

    const [xRange, yRange] = _.split(inputArray[0], ', ');


    const [xMin, xMax] = _.split(xRange, ':');
    const [yMin, yMax] = _.split(yRange, ':');

    // console.log('xMin', xMin);
    // console.log('xMax', xMax);
    // console.log('yMin', yMin);
    // console.log('yMax', yMax);

    const target = { xMin: _.toNumber(xMin), xMax: _.toNumber(xMax), yMin: _.toNumber(yMin), yMax: _.toNumber(yMax) };

    let ultimateMaxY = 0;

    let xVelocity = 6;
    let yVelocity = 9;

    let currentMaxY = 0;

    const allCombosOfXy = [];

    for (let xVel = 0; xVel <= xMax; xVel++) {
        for (let yVel = 0; yVel <= Math.abs(yMin); yVel++) {
            allCombosOfXy.push({ xVel, yVel });
        }
    }

    console.log('allCombosIfXy', allCombosOfXy);

    allCombosOfXy.forEach(({ xVel, yVel }) => {
        // console.log('xVel', xVel);
        // console.log('yVel', yVel);

        const { maxY, didHitTarget } = calculateTrajectory(xVel, yVel, target);

        currentMaxY = maxY;
        // console.log('currentMaxY', currentMaxY);
        // console.log('didHitTarget', didHitTarget);

        // console.log('*----------------------here------------------------*');

        if (currentMaxY > ultimateMaxY) {
            ultimateMaxY = maxY;
        }

        if (didHitTarget) {
            console.log('maxY', maxY);
        }


        if (didHitTarget) {
            possibleXys.push({ x: xVel, y: yVel });
        }
    });

    console.log('possibleXys', possibleXys);

    return ultimateMaxY;
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    const possibleXys = [];
    let answer;

    const [xRange, yRange] = _.split(inputArray[0], ', ');


    const [xMin, xMax] = _.split(xRange, ':');
    const [yMin, yMax] = _.split(yRange, ':');

    // console.log('xMin', xMin);
    // console.log('xMax', xMax);
    // console.log('yMin', yMin);
    // console.log('yMax', yMax);

    const target = { xMin: _.toNumber(xMin), xMax: _.toNumber(xMax), yMin: _.toNumber(yMin), yMax: _.toNumber(yMax) };

    let ultimateMaxY = 0;

    let xVelocity = 6;
    let yVelocity = 9;

    let currentMaxY = 0;

    const allCombosOfXy = [];

    for (let xVel = 0; xVel <= xMax; xVel++) {
        for (let yVel = yMin + 1; yVel <= Math.abs(yMin); yVel++) {
            allCombosOfXy.push({ xVel, yVel });
        }
    }

    // console.log('allCombosIfXy', allCombosOfXy);

    allCombosOfXy.forEach(({ xVel, yVel }) => {
        // console.log('xVel', xVel);
        // console.log('yVel', yVel);

        const { maxY, didHitTarget } = calculateTrajectory(xVel, yVel, target);

        currentMaxY = maxY;
        // console.log('currentMaxY', currentMaxY);
        // console.log('didHitTarget', didHitTarget);

        // console.log('*----------------------here------------------------*');

        if (currentMaxY > ultimateMaxY) {
            ultimateMaxY = maxY;
        }

        if (didHitTarget) {
            // console.log('maxY', maxY);
        }


        if (didHitTarget) {
            possibleXys.push({ x: xVel, y: yVel });
        }
    });

    // console.log('possibleXys', possibleXys);

    return possibleXys.length;
};
