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

    if (examples.length !== answers.length) {
        console.log('Number of examples does not equal number of example answers.');
        return false;
    }

    return examples.every((example, index) => {
        const correctAnswer = answers[index];
        const inputArray = example.split('\n');
        console.log('example:', inputArray);

        const actualAnswer = solver({ inputArray });

        if (actualAnswer === correctAnswer) {
            return true;
        } else {
            console.log(
                `Example answer: ${actualAnswer} does not equal correct answer: ${correctAnswer}`
            );
            return false;
        }
    });
};

const main = async () => {
    performance.mark('start');

    const codePath = `./${year}/day${day}.js`;
    const codeForDay = require(codePath);

    console.log('year', year);
    console.log('day', day);
    console.log('level', level);

    if (!year || !day || !level) {
        return 'Missing year, day, or level';
    }

    const inputFilePath = `./${year}/day${day}.txt`;
    const inputArray = utils.convertTextFileToArray(inputFilePath);

    const {
        examples,
        part1ExampleAnswers,
        part2ExampleAnswers,
        getSolutionForLevel1,
        getSolutionForLevel2
    } = codeForDay;

    let answer;
    if (level === '1') {
        const doExamplesWork = checkExamples({
            solver: getSolutionForLevel1,
            examples,
            answers: part1ExampleAnswers
        });

        if (!doExamplesWork) {
            return;
        }

        answer = codeForDay.getSolutionForLevel1({ inputArray, inputFilePath });
    } else {
        const doExamplesWork = checkExamples({
            solver: getSolutionForLevel2,
            examples,
            answers: part2ExampleAnswers
        });

        if (!doExamplesWork) {
            return;
        }

        answer = codeForDay.getSolutionForLevel2({ inputArray, inputFilePath });
    }

    if (['', undefined, null].includes(answer)) {
        return 'Answer is undefined';
    }

    console.log('answer', answer);

    performance.mark('end');

    performance.measure('run', 'start', 'end');

    const isDryRun = shouldSubmitAnswerString !== 'true';

    if (!isDryRun) {
        await utils.submitAnswer(answer, year, day, level);
    }
};

main();
