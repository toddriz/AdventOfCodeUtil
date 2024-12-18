const _ = require('lodash')
const fs = require('fs');

const adventCookie =
    'session=53616c7465645f5f3f6e620d227df33a4b735e2bccbb35fdc4784759fd9c66c1d3725e13dc8cfdec661cbc31267b2de8d3644f70c97c693028d807da5a0df66d';

module.exports.convertTextFileToArray = (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);

    const fileString = fileBuffer.toString()

    const fileLines = fileString.split('\n');

    return _.compact(fileLines)
};

module.exports.convertTextFileTo2dArray = (filePath) => {
    const fileArray = this.convertTextFileToArray(filePath);

    return fileArray.map((line) => line.split(''));
};

module.exports.fetchInputForDay = async (year, day) => {
    const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
        headers: { cookie: adventCookie },
        method: 'GET',
    });

    const input = await response.text();

    return input;
};

module.exports.writeWrongAnswers = (result, year, day) => {
    const results = [result];

    const inputPath = `./${year}/day${day}-wrong.json`;

    if (fs.existsSync(inputPath)) {
        const fileBuffer = fs.readFileSync(inputPath);

        const existingResults = JSON.parse(fileBuffer.toString());

        results.unshift(...existingResults);
    }

    fs.writeFileSync(inputPath, JSON.stringify(results, null, 4));
    console.log(`***** Wrote wrong answers for Year: ${year} - Day ${day} *****`);
};

module.exports.willBeWrongAnswer = (answer, year, day, level) => {
    const inputPath = `./${year}/day${day}-wrong.json`;

    if (fs.existsSync(inputPath)) {
        const fileBuffer = fs.readFileSync(inputPath);

        const wrongAnswers = JSON.parse(fileBuffer.toString());

        const { min, max, prevAnswers } = wrongAnswers.reduce(
            (acc, wrongAnswer) => {
                if (wrongAnswer.level === level) {
                    if (wrongAnswer.answerStatus === 'TOO_LOW' && acc.min < wrongAnswer.answer) {
                        acc.min = wrongAnswer.answer;
                    } else if (wrongAnswer.answerStatus === 'TOO_HIGH' && acc.max > wrongAnswer.answer) {
                        acc.max = wrongAnswer.answer;
                    }
                }

                acc.prevAnswers.push(wrongAnswer.answer);

                return acc;
            },
            { min: 0, max: Number.MAX_SAFE_INTEGER, prevAnswers: [] }
        );

        if (prevAnswers.includes(answer)) {
            console.log(`********** Wrong Answer. already tried ${answer}`);
        }

        if (answer <= min || answer >= max) {
            console.log(`********** Wrong Answer. should be between ${min} and ${max} ***********`);

            return true;
        }

        return false;
    }
};

module.exports.submitAnswer = async (answer, year, day, level) => {
    console.log('********** Submitting Answer ***********');

    const url = `https://adventofcode.com/${year}/day/${day}/answer`;

    const response = await fetch(url, {
        headers: {
            accept: 'text/html',
            'content-type': 'application/x-www-form-urlencoded',
            cookie: adventCookie,
        },
        body: `level=${level}&answer=${answer}`,
        method: 'POST',
        mode: 'cors',
    });

    const htmlResponse = await response.text();

    if (htmlResponse.includes("That's not the right answer")) {
        console.log('********************Incorrect Answer**********************');

        let answerStatus = 'UNKNOWN';

        if (htmlResponse.includes('your answer is too low')) {
            answerStatus = 'TOO_LOW';
        } else if (htmlResponse.includes('your answer is too high')) {
            answerStatus = 'TOO_HIGH';
        }

        const result = {
            answer,
            level,
            answerStatus,
            htmlResponse,
        };

        console.log('answerStatus', answerStatus);

        this.writeWrongAnswers(result, year, day);
    } else if (htmlResponse.includes("That's the right answer")) {
        console.log('********************Right Answer**********************');
    } else {
        console.log('********************Some Unknown Response**********************');
        console.log('htmlResponse', htmlResponse);
    }
};
