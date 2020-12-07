const fs = require('fs');
const _ = require('lodash');

const utils = require('../utils');

module.exports.getSolutionForLevel1 = (inputFilePath) => {
    let answer = 0;

    const twoDArray = utils.convertTextFileTo2dArray(inputFilePath);

    answer = checkSlope(twoDArray, 3, 1);
    return answer;
};

const checkSlope = (twoDArray, dx, dy) => {
    let trees = 0;
    const width = twoDArray[0].length;
    const height = twoDArray.length;

    let y = dy;
    let x = dx;

    while (y < height) {
        const val = twoDArray[y][x];

        if (val === '#') {
            trees++;
        }

        y += dy;
        x += dx;
        x = x % width;
    }

    return trees;
};

module.exports.getSolutionForLevel2 = (inputFilePath) => {
    let answer;

    const twoDArray = utils.convertTextFileTo2dArray(inputFilePath);

    const slopes = [
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 5, y: 1 },
        { x: 7, y: 1 },
        { x: 1, y: 2 }
    ];

    answer = slopes
        .map(({ x, y }) => checkSlope(twoDArray, x, y))
        .reduce((total, trees) => {
            return total * trees;
        }, 1);

    return answer;
};
