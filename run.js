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

const checkExamples = ({ solver, examples, answers }) => {
    if (_.isEmpty(examples)) {
        console.log('No examples provided');
        return true;
    }

    return examples.every((example, index) => {
        const correctAnswer = answers[index];
        const inputArray = example.split('\n');
        const input2dArray = example.split('\n').map((line) => line.split(''));
        console.log('example:', inputArray);
        // console.log('example:', input2dArray);

        const actualAnswer = solver({ inputArray, input2dArray });

        if (actualAnswer === correctAnswer) {
            return true;
        } else {
            console.log(`Example answer: ${actualAnswer} does not equal correct answer: ${correctAnswer}`);
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
    const codeForDay = require(codePath);
    const {
        part1Examples,
        part1ExampleAnswers,
        part2Examples,
        part2ExampleAnswers,
        getSolutionForLevel1,
        getSolutionForLevel2,
    } = codeForDay;

    let answer;
    if (level === '1') {
        const doExamplesWork = checkExamples({
            solver: getSolutionForLevel1,
            examples: part1Examples,
            answers: part1ExampleAnswers,
        });

        if (!doExamplesWork) {
            return;
        }

        answer = getSolutionForLevel1({ inputArray, input2dArray });
    } else {
        const doExamplesWork = checkExamples({
            solver: getSolutionForLevel2,
            examples: part2Examples,
            answers: part2ExampleAnswers,
        });

        if (!doExamplesWork) {
            return;
        }

        answer = getSolutionForLevel2({ inputArray, input2dArray });
    }

    if (['', undefined, null].includes(answer)) {
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
