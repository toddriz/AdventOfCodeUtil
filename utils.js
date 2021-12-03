const fs = require('fs');
const fetch = require('node-fetch');


const adventCookie =
    'session=53616c7465645f5ff8a4e29c5fd73f7adfd9d116fbcf2c4bc7b5a06af5026ca8060916e8068767d0618a51bb2aeca84f';

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
        console.log('htmlResponse', htmlResponse);
        console.log('********************Incorrect Answer**********************');

        // TODO write wrong answer to file
    } else if (htmlResponse.includes("That's the right answer")) {
        console.log('********************Right Answer**********************');
    } else if (htmlResponse.includes("You gave an answer too recently")) {
        console.log('htmlResponse', htmlResponse);
        console.log('********************Wait a bit**********************');
    } else {
        console.log('htmlResponse', htmlResponse);

        console.log('********************Some Unknown Response**********************');
    }
};
