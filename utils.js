const fs = require('fs');
const fetch = require('node-fetch');

const adventCookie = 'PASTE YOURS HERE';

module.exports.convertTextFileToArray = (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);

    return fileBuffer.toString().split('\n').slice(0, -1);
};

module.exports.convertTextFileTo2dArray = (filePath) => {
    const fileArray = this.convertTextFileToArray(filePath);

    return fileArray.map((line) => line.split(''));
};

module.exports.fetchInputForDay = async (year, day) => {
    const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
        headers: { cookie: adventCookie },
        method: 'GET'
    });

    const input = await response.text();

    return input;
};

module.exports.submitAnswer = async (answer, year, day, level) => {
    console.log('**********Submitting Answer***********');

    const url = `https://adventofcode.com/${year}/day/${day}/answer`;

    const response = await fetch(url, {
        headers: {
            accept: 'text/html',
            'content-type': 'application/x-www-form-urlencoded',
            cookie: adventCookie
        },
        body: `level=${level}&answer=${answer}`,
        method: 'POST',
        mode: 'cors'
    });

    const htmlResponse = await response.text();

    if (htmlResponse.includes("That's not the right answer")) {
        console.log('********************Incorrect Answer**********************');

        // TODO write wrong answer to file
    } else if (htmlResponse.includes("That's the right answer")) {
        console.log('********************Right Answer**********************');
    } else {
        console.log('********************Some Unknown Response**********************');
    }
};

module.exports.createCodeFileForDay = (year, day, codePath) => {
    const template = `const _ = require('lodash');

const utils = require('../utils');

module.exports.getSolutionForLevel1 = (inputFilePath) => {
    let answer;

    const inputArray = utils.convertTextFileToArray(inputFilePath);

    return answer;
};

module.exports.getSolutionForLevel2 = (inputFilePath) => {
    let answer;

    const inputArray = utils.convertTextFileToArray(inputFilePath);

    return answer;
};
`;

    fs.writeFileSync(codePath, template);
};
