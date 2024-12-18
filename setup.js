const dateFns = require('date-fns');
const fs = require('fs');
const utils = require('./utils');

const currentYear = dateFns.getYear(new Date());

const getInputForYear = async (year) => {
    let dayOfMonth = dateFns.getDate(new Date());

    const now = new Date();

    let tenPm = dateFns.setHours(new Date(), 22);
    tenPm = dateFns.setMinutes(tenPm, 0);

    if (dateFns.isAfter(now, tenPm)) {
        // Advent releases new puzzle at 10pm Mountain
        dayOfMonth++;
    }

    if (currentYear > year) {
        dayOfMonth = 25;
    } else if (dayOfMonth > 25) {
        dayOfMonth = 1;
    }

    const yearFolder = `./${year}`;
    if (!fs.existsSync(yearFolder)) {
        fs.mkdirSync(yearFolder);
    }

    for (let day = 1; day <= dayOfMonth; day++) {
        const inputPath = `${yearFolder}/day${day}.txt`;
        const codePath = `${yearFolder}/day${day}.js`;

        if (!fs.existsSync(inputPath)) {
            const input = await utils.fetchInputForDay(year, day);

            fs.writeFileSync(inputPath, input);
            console.log(`***** Wrote input for Year: ${year} - Day ${day} *****`);
        }

        if (!fs.existsSync(codePath)) {
            createCodeFileForDay(codePath);
            console.log(`***** Wrote code file for Year: ${year} - Day ${day} *****`);
        }
    }
};

const createCodeFileForDay = (codePath) => {
    const template = `const _ = require('lodash');

module.exports.part1Examples = [
    {input: \`INSERT_EXAMPLE_HERE\`, answer: 'INSERT_ANSWER_HERE'}
];


module.exports.part2Examples = [
];


module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    let answer;

    const input = inputArray;

    return answer;
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    let answer;

    const input = inputArray;

    return answer;
};
`;

    fs.writeFileSync(codePath, template);
};

const main = async () => {
    const year = process.argv[2] || dateFns.getYear(new Date());

    await getInputForYear(year);
};

main();
