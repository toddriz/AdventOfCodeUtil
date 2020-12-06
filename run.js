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

    let answer;
    if (level === '1') {
        answer = codeForDay.getSolutionForLevel1(inputFilePath);
    } else {
        answer = codeForDay.getSolutionForLevel2(inputFilePath);
    }

    if (['', undefined, null].includes(answer)) {
        return `This is not the answer: ${answer}`;
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
