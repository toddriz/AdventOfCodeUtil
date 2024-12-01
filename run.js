const _ = require('lodash');

const utils = require('./utils');

const { performance, PerformanceObserver } = require('perf_hooks');

const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(entry);
    });
});

perfObserver.observe({ entryTypes: ['measure'], buffer: true });

const args = process.argv.slice(2);

const [year, day, level, shouldSubmitAnswerString] = args;

const checkExamples = ({ solver, examples }) => {
    if (_.isEmpty(examples)) {
        console.log('No examples provided');
        return true;
    }

    return examples.every(({ input, answer }) => {
        const inputArray = input.split('\n');
        const input2dArray = input.split('\n').map((line) => line.split(''));

        const computedAnswer = solver({ inputArray, input2dArray });

        if (computedAnswer === answer) {
            return true;
        } else {
            console.log(`Example answer: ${computedAnswer} does not equal correct answer: ${answer}`);
            return false;
        }
    });
};

const main = async () => {
    performance.mark('start');

    console.log('year', year);
    console.log('day', day);
    console.log('level', level);

    if (!year || !day || !level) {
        return 'Missing year, day, or level';
    }

    const inputFilePath = `./${year}/day${day}.txt`;

    const inputArray = utils.convertTextFileToArray(inputFilePath);
    const input2dArray = utils.convertTextFileTo2dArray(inputFilePath);

    const codePath = `./${year}/day${day}.js`;

    const {
        part1Examples,
        part2Examples,
        getSolutionForLevel1,
        getSolutionForLevel2
    } = require(codePath);

    let answer;
    if (level === '1') {
        const doExamplesWork = checkExamples({
            solver: getSolutionForLevel1,
            examples: part1Examples,
        });

        if (!doExamplesWork) {
            return;
        }

        answer = getSolutionForLevel1({ inputArray, input2dArray });
    } else {
        const doExamplesWork = checkExamples({
            solver: getSolutionForLevel2,
            examples: part2Examples,
        });

        if (!doExamplesWork) {
            return;
        }

        answer = getSolutionForLevel2({ inputArray, input2dArray });
    }

    if (['', undefined, null, Number.NaN].includes(answer)) {
        return 'Answer is undefined';
    }

    console.log('answer', answer);

    performance.mark('end');

    performance.measure('run', 'start', 'end');

    const isDryRun = shouldSubmitAnswerString !== 'true';

    const willBeWrongAnswer = utils.willBeWrongAnswer(answer, year, day, level);

    if (!willBeWrongAnswer && !isDryRun) {
        await utils.submitAnswer(answer, year, day, level);
    }
};

main();
