const _ = require('lodash');

const utils = require('../utils');

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    let answer;

    const numbers = inputArray.map(_.toNumber);

    let delta1s = 0;
    let delta3s = 0;

    const joltRatings = _.sortBy(numbers, _.toNumber);

    joltRatings.unshift(0);

    joltRatings.push(_.last(joltRatings) + 3);

    const deltas = [];

    for (let i = 0; i < joltRatings.length - 1; i++) {
        const rating1 = joltRatings[i];
        const rating2 = joltRatings[i + 1];

        const delta = rating2 - rating1;

        deltas.push(delta);
    }

    delta1s = deltas.filter((d) => d === 1).length;
    delta3s = deltas.filter((d) => d === 3).length;

    answer = delta1s * delta3s;

    return answer;
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    let answer;

    return answer;
};
