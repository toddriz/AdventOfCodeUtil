const _ = require('lodash');

module.exports.part1Examples = [
    `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`
];

module.exports.part1ExampleAnswers = [
    5
];

module.exports.part2Examples = [
    `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`
];

module.exports.part2ExampleAnswers = [
    12
];

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    const ventLines = inputArray;

    const points = new Map();
    const dupePoints = [];

    ventLines.forEach((line) => {
        const [start, end] = _.split(line, ' -> ');

        let [startX, startY] = _.split(start, ',');
        startX = _.toNumber(startX);
        startY = _.toNumber(startY);

        let [endX, endY] = _.split(end, ',');
        endX = _.toNumber(endX);
        endY = _.toNumber(endY);

        const ventPoints = getPointsInLine(startX, startY, endX, endY);

        // console.log('ventPoints', ventPoints);

        ventPoints.forEach((point) => {
            if (points.get(point)) {
                dupePoints.push(point);
            } else {
                points.set(point, 1);
            }
        });
    });


    console.log('_.uniq(dupePoints)', _.uniq(dupePoints));
    const answer = _.size(_.uniq(dupePoints));

    const badAnswers = [8421];

    if (badAnswers.includes(answer)) {
        console.log('answer', answer);
        throw '==============Bad answer===================';
    }

    return answer;
};

const getPointsInLine = (startX, startY, endX, endY, shouldDoDiagonal = false) => {
    const ventPoints = [];

    let deltaX = startX > endX ? -1 : 1;
    let deltaY = startY > endY ? -1 : 1;

    if (startX === endX) {
        deltaX = 0;
    }

    if (startY === endY) {
        deltaY = 0;
    }
    // console.log('*----------------------start------------------------*');
    // console.log('startX', startX);
    // console.log('endX', endX);
    // console.log('deltaX', deltaX);
    // console.log('*------------------*');

    // console.log('startY', startY);
    // console.log('endY', endY);
    // console.log('deltaY', deltaY);


    if (!shouldDoDiagonal && (deltaX && deltaY)) {
        // console.log('*----------------------diag------------------------*');
        return ventPoints;
    }

    // console.log('startX !== endX || startY !== endY', startX !== endX || startY !== endY);

    startX -= deltaX;
    startY -= deltaY;
    while (startX !== endX || startY !== endY) {
        // console.log('startX', startX);
        // console.log('startY', startY);
        startX += deltaX;
        startY += deltaY;
        const xy = `${startX},${startY}`;
        // console.log('xy', xy);

        ventPoints.push(xy);

    }

    return ventPoints;
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    const ventLines = inputArray;

    const points = new Map();
    const dupePoints = [];

    ventLines.forEach((line) => {
        const [start, end] = _.split(line, ' -> ');

        let [startX, startY] = _.split(start, ',');
        startX = _.toNumber(startX);
        startY = _.toNumber(startY);

        let [endX, endY] = _.split(end, ',');
        endX = _.toNumber(endX);
        endY = _.toNumber(endY);

        const ventPoints = getPointsInLine(startX, startY, endX, endY, true);

        ventPoints.forEach((point) => {
            if (points.get(point)) {
                dupePoints.push(point);
            } else {
                points.set(point, 1);
            }
        });
    });

    console.log('_.uniq(dupePoints)', _.uniq(_.sortBy(dupePoints)));

    const answer = _.size(_.uniq(dupePoints));

    // too low
    const badAnswers = [21554];

    if (badAnswers.includes(answer)) {
        console.log('answer', answer);
        throw '==============Bad answer===================';
    }

    if (answer === 21577) {
        console.log('*----------------------Right Answer------------------------*');
    }

    // throw `--------${answer}------------`;

    return answer;

};
