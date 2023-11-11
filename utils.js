const fs = require('fs');

const adventCookie =
    'session=53616c7465645f5f37fa0f9ed803158615a850fd9dcd9c177d27c5afe4d25dbe9927253b5ecf1eaeaf0bb0d2868462128ce00e191bb9ced46db13a62b08d50d3';

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
        method: 'GET',
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
            cookie: adventCookie,
        },
        body: `level=${level}&answer=${answer}`,
        method: 'POST',
        mode: 'cors',
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
