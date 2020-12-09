const _ = require('lodash');

const utils = require('../utils');

module.exports.getSolutionForLevel1 = (inputFilePath) => {
    let answer;

    const inputArray = utils.convertTextFileToArray(inputFilePath);

    const instructions = inputArray.map((line) => {
        const [op, arg] = line.split(' ');

        const instruction = {
            op,
            arg
        };

        return instruction;
    });

    let acc = 0;
    let i = 0;

    const executedInstructions = [];

    console.log('instructions.length', instructions.length);

    while (true) {
        console.log('i', i);

        const { op, arg } = instructions[i];
        console.log('op', op);
        console.log('arg', arg);
        if (executedInstructions.includes(i)) {
            console.log('repeat i', i);
            break;
        } else if (op === 'nop') {
            executedInstructions.push(i);
            i++;
        } else if (op === 'acc') {
            executedInstructions.push(i);

            acc += _.toNumber(arg);
            i++;
        } else if (op === 'jmp') {
            executedInstructions.push(i);

            i += _.toNumber(arg);
        }
    }

    console.log('instructions', instructions);
    console.log('i', i);
    console.log('acc', acc);

    answer = acc;

    return answer;
};

module.exports.getSolutionForLevel2 = (inputFilePath) => {
    let answer;

    const inputArray = utils.convertTextFileToArray(inputFilePath);

    const instructions = inputArray.map((line) => {
        const [op, arg] = line.split(' ');

        const instruction = {
            op,
            arg
        };

        return instruction;
    });

    console.log('instructions.length', instructions.length);

    let acc = 0;
    let i = 0;

    let wasJustFlipped = false;
    let accPreFlip;
    let flippedI;
    let flippedOp;

    const executedInstructions = [];

    let executions = 0;

    while (i < instructions.length) {
        executions++;
        let { op, arg } = instructions[i];

        if (!wasJustFlipped && _.isUndefined(flippedI) && _.includes(['jmp', 'nop'], op)) {
            flippedI = i;
            flippedOp = op;
            accPreFlip = acc;

            let newOp = 'jmp';
            if (op === 'jmp') {
                newOp = 'nop';
            }
            op = newOp;
        }

        wasJustFlipped = false;

        if (executedInstructions.includes(i)) {
            i = flippedI;
            acc = accPreFlip;

            const flippedIndex = executedInstructions.findIndex((index) => index === flippedI);

            executedInstructions.splice(flippedIndex);

            flippedI = undefined;

            wasJustFlipped = true;
        } else if (op === 'nop') {
            executedInstructions.push(i);
            i++;
        } else if (op === 'acc') {
            executedInstructions.push(i);

            acc += _.toNumber(arg);
            i++;
        } else if (op === 'jmp') {
            executedInstructions.push(i);

            i += _.toNumber(arg);
        }
    }

    console.log('executions', executions);
    console.log('flippedI', flippedI);

    console.log('i', i);
    console.log('acc', acc);

    answer = acc;

    return answer;
};