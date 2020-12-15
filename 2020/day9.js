const _ = require('lodash');

const utils = require('../utils');

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    let answer;

    const numbers = inputArray.map(_.toNumber);

    for (let i = 25; i < numbers.length; i++) {
        if (answer) {
            break;
        }
        number = numbers[i];
        console.log('number', number);
        const prev25 = numbers.slice(i - 25, i).filter((num) => num < number);
        // console.log('prev 25', prev25);

        const possibleSums = prev25
            .reduce((sums, num) => {
                sums.push(
                    ...prev25.map((num2) => {
                        if (num !== num2) {
                            return num + num2;
                        }
                    })
                );

                return sums;
            }, [])
            .filter(Boolean);

        // console.log('possibleSums', possibleSums);

        if (!_.includes(possibleSums, number)) {
            answer = number;
        }
    }

    return answer;
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    let answer;

    const numbers = inputArray.map(_.toNumber);

    let badNum;

    for (let i = 25; i < numbers.length; i++) {
        if (badNum) {
            break;
        }
        number = numbers[i];
        const prev25 = numbers.slice(i - 25, i).filter((num) => num < number);

        const possibleSums = prev25
            .reduce((sums, num) => {
                sums.push(
                    ...prev25.map((num2) => {
                        if (num !== num2) {
                            return num + num2;
                        }
                    })
                );

                return sums;
            }, [])
            .filter(Boolean);

        if (!_.includes(possibleSums, number)) {
            badNum = number;
        }
    }

    let i = 0;
    let j = 1;
    while (!answer) {
        const slice = numbers.slice(i, j + 1);

        const sum = _.sum(slice);
        if (sum > badNum) {
            i++;
            j = i + 1;
        } else if (sum < badNum) {
            j++;
        } else if (sum === badNum) {
            const sortedNums = _.sortBy(slice, _.toNumber);
            const lowest = _.first(sortedNums);
            const highest = _.last(sortedNums);

            answer = lowest + highest;

            break;
        }
    }

    return answer;
};
