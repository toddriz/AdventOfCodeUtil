const _ = require('lodash');

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    let answer;

    const numbers = inputArray.map(_.toNumber);

    for (let i = 0; i < numbers.length; i++) {
        const num1 = numbers[i];

        for (let j = 0; j < numbers.length; j++) {
            const num2 = numbers[j];

            if (num1 + num2 === 2020) {
                answer = num1 * num2;

                return answer;
            }
        }
    }

    console.log('result', answer);

    return answer;
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    let answer;

    const numbers = inputArray.map(_.toNumber);

    for (let i = 0; i < numbers.length; i++) {
        const num1 = numbers[i];

        for (let j = 0; j < numbers.length; j++) {
            const num2 = numbers[j];

            for (let k = 0; k < numbers.length; k++) {
                const num3 = numbers[k];

                if (num1 + num2 + num3 === 2020) {
                    console.log('num1', num1);
                    console.log('num2', num2);
                    console.log('num3', num3);
                    answer = num1 * num2 * num3;
                    return answer;
                    break;
                }
            }
        }
    }

    console.log('result', answer);

    return answer;
};
