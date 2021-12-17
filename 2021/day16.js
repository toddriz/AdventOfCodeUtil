const _ = require('lodash');

const hex2bin = (hexString) => {
    return _.parseInt(hexString, 16).toString(2).padStart(8, '0');
};

module.exports.part1Examples = [
    `D2FE28`,
    `38006F45291200`,
    `EE00D40C823060`,
    `8A004A801A8002F478`,
    `620080001611562C8802118E34`,
    `C0015000016115A2E0802F182340`,
    `A0016C880162017C3686B18A3D4780`
];

module.exports.part1ExampleAnswers = [
    true,
    true,
    true,
    16,
    12,
    23,
    31
];

module.exports.part2Examples = [
    `
    ----PASTE EXAMPLES HERE
`
];

module.exports.part2ExampleAnswers = [
    //  ----PASTE EXAMPLE ANSWERS HERE
];

const interpretLiteral = (remainingBits) =>{
    if (_.size(remainingBits) % 4) {

    }


    return _.parseInt(remainingBits, 2);
}

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    let answer;

    const hex = inputArray[0];

    const bin = hex2bin(hex);

    const version = _.parseInt(bin.substring(0, 3), 2);
    const typeId = _.parseInt(bin.substring(3, 6), 2);
    const bigI = _.parseInt(bin.substring(6, 7), 2)

    console.log('bin', bin)

    console.log('interpretLiteral()', interpretLiteral())

    console.log('version', version)
    console.log('typeId', typeId)
    console.log('bigI', bigI)



    // const version = _.toString(_.splice())



    return answer;
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    let answer;

    const input = inputArray;

    return answer;
};
