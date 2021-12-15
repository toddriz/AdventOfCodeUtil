const { map } = require('lodash');
const _ = require('lodash');

module.exports.part1Examples = [
    `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`
];

module.exports.part1ExampleAnswers = [
    17
];

module.exports.part2Examples = [
    `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0
fold along y=7
fold along x=5`
];

module.exports.part2ExampleAnswers = [
    true
];

let maxX = 0;
let maxY = 0;

const foldPaper = (dots, { axis, point }) => {
    const newDots = dots.map((dot) => {
        const newDot = { x: dot.x, y: dot.y };
        if (dot[axis] > point) {
            const delta = newDot[axis] - point;

            newDot[axis] = newDot[axis] - (delta * 2);
        }

        return newDot;
    });


    return newDots;
};

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    let answer;

    let { dots, folds } = inputArray.reduce((acc, line) => {
        if (_.isEmpty(line)) {
        }

        if (_.includes(line, ',')) {
            acc.dots.push(line);
        }

        if (_.includes(line, 'fold')) {
            acc.folds.push(line);
        }


        return acc;
    }, { dots: [], folds: [] });

    dots = dots.map((dotString) => {
        const [x, y] = _.split(dotString, ',');
        return { x: _.toNumber(x), y: _.toNumber(y) };
    });


    folds = folds.map((foldString) => {
        let [, fold] = _.split(foldString, 'along ');

        const [axis, point] = _.split(fold, '=');
        return { axis, point: _.toNumber(point) };
    });

    const fold = _.first(folds);


    const newDots = foldPaper(dots, fold);



    console.log('dots', dots);
    console.log('folds', folds);


    let uniqueDots = _.uniqWith(newDots, _.isEqual);


    return _.size(uniqueDots);
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    maxX = 0;
    maxY = 0;
    let answer;

    let { dots, folds } = inputArray.reduce((acc, line) => {
        if (_.isEmpty(line)) {
        }

        if (_.includes(line, ',')) {
            acc.dots.push(line);
        }

        if (_.includes(line, 'fold')) {
            acc.folds.push(line);
        }


        return acc;
    }, { dots: [], folds: [] });

    dots = dots.map((dotString) => {
        const [x, y] = _.split(dotString, ',');
        return { x: _.toNumber(x), y: _.toNumber(y) };
    });


    folds = folds.map((foldString) => {
        let [, fold] = _.split(foldString, 'along ');

        const [axis, point] = _.split(fold, '=');
        return { axis, point: _.toNumber(point) };
    });

    let newDots = [...dots];

    folds.forEach((fold) => {
        newDots = foldPaper(newDots, fold);
    });


    console.log('folds', folds);


    console.log('newDots', newDots);

    let uniqueDots = _.uniqWith(newDots, _.isEqual);

    console.log('maxX', maxX);
    console.log('maxY', maxY);

    const dotMap = new Map();

    uniqueDots.forEach(({ x, y }) => {
        // console.log('x', x)
        if (x > maxX) {
            maxX = x;
        }

        if (y > maxY) {
            maxY = y;
        }

        dotMap.set(`${x},${y}`, '#');
    });


    const line = _.fill(Array(maxX+1), '.');

    // console.log('line', line)

    let lines = _.fill(Array(maxY+1), [...line]);

    // lines.forEach((line) => {
    //     const formattedLine = line.join('');

    //     console.log(formattedLine);
    // });

    console.log('maxX', maxX)
    console.log('maxY', maxY)

    lines = lines.map((line, y) => {
        return line.map((point, x) => {

            if (dotMap.get(`${x},${y}`)) {
               return '#'
            }

            return '.';
        })
    })

    // for (let y = 0; y <= maxY; y++) {
    //     console.log('lines[y]', lines[y])
    //     for (let x = 0; x <= maxX; x++) {
    //         // console.log('x', x)
    //         // console.log('y', y)
    //         console.log('dotMap.get(`${x},${y}`)', dotMap.get(`${x},${y}`))
    //     }
    // }

    lines.forEach((line) => {
        // console.log('line', line)
        const formattedLine = line.join('');

        console.log(formattedLine);
    });

    // console.log('lines', lines)

    return true;
};
