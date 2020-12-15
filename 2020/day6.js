const fs = require('fs');
const _ = require('lodash');

const utils = require('../utils');

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    let answer;

    const groupsAnswers = inputArray.reduce(
        (answers, line) => {
            if (line.length === 0) {
                answers.push([]);

                return answers;
            }

            let currentAnswers = answers[answers.length - 1];

            currentAnswers.push(...line.split(''));

            return answers;
        },
        [[]]
    );

    answer = groupsAnswers.reduce((count, groupAnswers) => {
        count += new Set(groupAnswers).size;

        return count;
    }, 0);

    return answer;
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    let answer;

    let isNewGroup = true;
    const groupsAnswers = inputArray.reduce(
        (answers, line) => {
            // console.log('line', line);
            if (line.length === 0) {
                isNewGroup = true;
                answers.push([]);

                return answers;
            }

            const personAnswers = line.split('');

            // console.log('personAnswers', personAnswers);
            if (isNewGroup) {
                // console.log('********************newGroup********************');
                answers[answers.length - 1].push(...personAnswers);
            } else {
                const same = _.intersection(answers[answers.length - 1], personAnswers);

                // console.log('same', same);

                answers[answers.length - 1] = same;
            }

            isNewGroup = false;

            // console.log('answers', answers);

            return answers;
        },
        [[]]
    );

    // console.log('groupsAnswers', groupsAnswers);

    answer = groupsAnswers.reduce((count, groupAnswers) => {
        // console.log('groupAnswers', groupAnswers);
        count += groupAnswers.length;

        return count;
    }, 0);

    return answer;
};
