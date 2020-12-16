const _ = require('lodash');

module.exports.part1Examples = ['0,3,6', '1,3,2', '2,1,3', '1,2,3', '2,3,1', '3,2,1', '3,1,2'];
module.exports.part1ExampleAnswers = [436, 1, 10, 27, 78, 438, 1836];

module.exports.part2Examples = ['0,3,6', '1,3,2', '2,1,3', '1,2,3', '2,3,1', '3,2,1', '3,1,2'];
module.exports.part2ExampleAnswers = [175594, 2578, 3544142, 261214, 6895259, 18, 362];

// module.exports.part2ExampleAnswers = [
//     ----PASTE EXAMPLE ANSWERS HERE
// ];

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    let answer;
    const game = new Map();

    const input = inputArray;

    const startingNumbers = inputArray[0].split(',').map(Number);

    startingNumbers.forEach((num, index) => game.set(num, [index + 1]));
    console.log('startingNumbers', startingNumbers);

    let lastNum;
    for (let turn = startingNumbers.length + 1; turn <= 2020; turn++) {
        // console.log('turn', turn);
        // console.log('lastNum', lastNum);

        if (_.isNil(lastNum)) {
            const lastTimeZero = game.get(0);
            lastNum = 0;
            const said = [_.last(lastTimeZero), turn];

            game.set(lastNum, _.compact(said));
        } else {
            const said = game.get(lastNum);

            if (said.length === 1) {
                const lastTimeZero = game.get(0);
                lastNum = 0;
                game.set(lastNum, [_.last(lastTimeZero), turn]);
            } else if (_.size(said) === 2) {
                const delta = _.last(said) - _.first(said);
                const lastTimeDelta = game.get(delta);

                lastNum = delta;

                if (lastTimeDelta) {
                    game.set(lastNum, [_.last(lastTimeDelta), turn]);
                } else {
                    game.set(lastNum, [turn]);
                }
            }
        }
    }
    // console.log('game', game);

    answer = lastNum;

    return answer;
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    let answer;
    const game = new Map();

    const input = inputArray;

    const startingNumbers = inputArray[0].split(',').map(Number);

    startingNumbers.forEach((num, index) => game.set(num, [index + 1]));
    // console.log('startingNumbers', startingNumbers);

    let lastNum;
    for (let turn = startingNumbers.length + 1; turn <= 30000000; turn++) {
        // console.log('turn', turn);
        // console.log('lastNum', lastNum);

        if (_.isNil(lastNum)) {
            const lastTimeZero = game.get(0);
            lastNum = 0;
            const said = [_.last(lastTimeZero), turn];

            game.set(lastNum, _.compact(said));
        } else {
            const said = game.get(lastNum);

            if (said.length === 1) {
                const lastTimeZero = game.get(0);
                lastNum = 0;
                game.set(lastNum, [_.last(lastTimeZero), turn]);
            } else if (_.size(said) === 2) {
                const delta = _.last(said) - _.first(said);
                const lastTimeDelta = game.get(delta);

                lastNum = delta;

                if (lastTimeDelta) {
                    game.set(lastNum, [_.last(lastTimeDelta), turn]);
                } else {
                    game.set(lastNum, [turn]);
                }
            }
        }
    }
    // console.log('game', game);

    answer = lastNum;

    return answer;
};
