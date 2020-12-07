const fs = require('fs');
const _ = require('lodash');

const utils = require('../utils');

module.exports.getSolutionForLevel1 = (inputFilePath) => {
    let answer;

    const inputArray = utils.convertTextFileToArray(inputFilePath);

    answer = inputArray.reduce((acc, input) => {
        const [range, letter, password] = input.split(' ');

        const [min, max] = range.split('-');

        const char = letter[0];

        const charCount = _.countBy(password)[char];

        if (charCount >= _.toNumber(min) && charCount <= _.toNumber(max)) {
            acc++;
        }
        return acc;
    }, 0);

    return answer;
};

module.exports.getSolutionForLevel2 = (inputFilePath) => {
    let answer;

    const inputArray = utils.convertTextFileToArray(inputFilePath);

    answer = inputArray.reduce((acc, input, index) => {
        const [positions, letter, password] = input.split(' ');

        const [pos1, pos2] = positions.split('-');

        const char = letter[0];

        const charInPos1 = password[_.toNumber(pos1) - 1];
        const charInPos2 = password[_.toNumber(pos2) - 1];

        if (charInPos1 === charInPos2) {
            // nothing
        } else if ([charInPos1, charInPos2].includes(char)) {
            acc++;
        }

        return acc;
    }, 0);

    return answer;
};
