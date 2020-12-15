const _ = require('lodash');

module.exports.part1Examples = [
    `
mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0
`
];

module.exports.part1ExampleAnswers = [165];

module.exports.part2Examples = [
    `
mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1
`
];

module.exports.part2ExampleAnswers = [208];

const dec2bin36 = (dec) => {
    return _.padStart((dec >>> 0).toString(2), 36, '0');
};

const bin2dec = (bin) => {
    return _.toNumber(parseInt(bin, 2).toString(10));
};

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    let answer;

    const input = _.compact(inputArray);

    const mem = [];

    let mask;
    input.forEach((line) => {
        // console.log('line', line);
        if (_.startsWith(line, 'mask')) {
            mask = line.split(' = ')[1].split('');
        } else {
            let regex = /mem\[([\d]+)\] = ([\d]+)/;

            const addr = line.match(regex)[1];

            // console.log('line.match(regex)', line.match(regex));
            // console.log('addr', addr);
            const decimalVal = line.match(regex)[2];

            const binVal = dec2bin36(decimalVal);

            const maskedVal = mask
                .map((m, i) => {
                    const bit = binVal[i];
                    if (m === 'X') {
                        return bit;
                    } else {
                        return m;
                    }
                })
                .join('');

            // console.log('mask', mask);
            // console.log('binVal', binVal);
            // console.log('maskedVal', maskedVal);

            const decimal = bin2dec(maskedVal);

            // console.log('decimal', decimal);
            _.set(mem, addr, decimal);
        }
    });

    // console.log('mem', mem);
    answer = mem.reduce((sum, val) => {
        if (val) {
            sum += _.toNumber(val);
        }

        return sum;
    }, 0);

    return answer;
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    let answer;

    const input = inputArray;

    return answer;
};
