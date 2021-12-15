const _ = require('lodash');

module.exports.part1Examples = [
    `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`
];

module.exports.part1ExampleAnswers = [
    1588
];

module.exports.part2Examples = [
    `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`
];

module.exports.part2ExampleAnswers = [
    2188189693529
];

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    let answer;

    const { polymerTemplate, insertionRules } = inputArray.reduce((acc, line, index) => {
        if (index === 0) {
            acc.polymerTemplate = line;
        } else if (_.isEmpty(line)) {

        } else {
            const [before, middle] = _.split(line, ' -> ');

            const after = `${_.first(before)}${middle}${_.last(before)}`;

            acc.insertionRules.set(before, after);
        }

        return acc;
    }, { polymerTemplate: '', insertionRules: new Map() });


    console.log('polymerTemplate', polymerTemplate);
    console.log('insertionRules', insertionRules);

    let polymerPairs = _.split(polymerTemplate, '').reduce((acc, letter, index, arr) => {
        if (index < arr.length - 1) {
            const newPair = [letter, arr[index + 1]];


            acc.push(_.join(newPair, ''));
        }

        return acc;
    }, []);


    console.log('polymerPairs', polymerPairs);

    let polymer = '';

    // console.log('insertionRules', insertionRules)

    for (let step = 1; step <= 10; step++) {
        console.log('step', step);
        // console.log('polymerPairs', polymerPairs)
        polymer = polymerPairs.reduce((acc, pair, index) => {
            // console.log('pair', pair);
            // console.log('_.toUpper(pair)', _.toUpper(pair));
            let after = insertionRules.get(_.toUpper(pair)) || '';
            // console.log('after', after);


            // console.log('after', after);
            // console.log('acc', acc)


            if (!index) {
                acc = after;
            } else {
                acc += after.slice(1);
            }

            return acc;
        }, '');

        // console.log('polymer', polymer);

        polymerPairs = _.split(polymer, '').reduce((acc, letter, index, arr) => {
            if (index < arr.length) {
                const newPair = [letter, arr[index + 1]];

                acc.push(_.join(newPair, ''));
            }

            return acc;
        }, []);

        // console.log('polymerPairs', polymerPairs);
    }

    // console.log('polymer', polymer);



    const elementCount = _.split(polymer, '').reduce((acc, element) => {
        const currentElementCount = acc[element] || 0;

        acc[element] = currentElementCount + 1;

        return acc;
    }, {});

    console.log('elementCount', elementCount);



    let mostCommonElement;
    let leastCommonElement;

    let mostCommonElementCount = 0;
    let leastCommonElementCount = 10000;

    _.forEach(elementCount, (value, key) => {
        if (value > mostCommonElementCount) {
            mostCommonElementCount = value;
            mostCommonElement = key;
        } else if (value < leastCommonElementCount) {
            leastCommonElementCount = value;
            leastCommonElement = key;
        }
    });

    console.log('mostCommonElement', mostCommonElement);
    console.log('leastCommonElement', leastCommonElement);

    console.log('mostCommonElementCount', mostCommonElementCount);
    console.log('leastCommonElementCount', leastCommonElementCount);




    return mostCommonElementCount - leastCommonElementCount;
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    let answer;

    const { polymerTemplate, insertionRules } = inputArray.reduce((acc, line, index) => {
        if (index === 0) {
            acc.polymerTemplate = line;
        } else if (_.isEmpty(line)) {

        } else {
            const [before, middle] = _.split(line, ' -> ');

            const firstPair = `${_.first(before)}${middle}`;
            const secondPair = `${middle}${_.last(before)}`;


            acc.insertionRules.set(_.toUpper(before), [_.toUpper(firstPair), _.toUpper(secondPair)]);
        }

        return acc;

    }, { polymerTemplate: '', insertionRules: new Map() });

    // console.log('polymerTemplate', polymerTemplate);
    // console.log('insertionRules', insertionRules);

    let polymerPairs = _.split(polymerTemplate, '').reduce((acc, letter, index, arr) => {
        if (index < arr.length - 1) {
            const newPair = [letter, arr[index + 1]];


            acc.push(_.join(newPair, ''));
        }

        return acc;
    }, []);


    let pairCounts = polymerPairs.reduce((acc, pair) => {
        const currentPairCount = acc[pair] || 0;

        acc[pair] = currentPairCount + 1;

        return acc;
    }, {});


    // console.log('pairCount', pairCounts);


    // console.log('polymerPairs', polymerPairs);




    for (let step = 1; step <= 40; step++) {

        const newPairCounts = {};
        // console.log('step', step);
        // console.log('polymerPairs', polymerPairs)
        _.forEach(pairCounts, (value, pair) => {
            const [newFirstPair, newSecondPair] = insertionRules.get(pair);
            // console.log('newFirstPair', newFirstPair)
            // console.log('newSecondPair', newSecondPair)

            // pairCounts[pair] = 0;

            const currentFirstPairCount = newPairCounts[newFirstPair] || 0;
            newPairCounts[newFirstPair] = currentFirstPairCount + value;

            const currentSecondPairCount = newPairCounts[newSecondPair] || 0;
            newPairCounts[newSecondPair] = currentSecondPairCount + value;
        });

        pairCounts = newPairCounts;
    }

    // console.log('pairCounts', pairCounts)

    const elementCount = _.reduce(pairCounts, (acc, count, pair) => {
        const [element1, element2] = _.split(pair, '');


        // console.log('element1', element1)
        // console.log('element2', element2)
        // console.log('acc', acc)

        const currentElement1Count = acc[element1] || 0;

        // console.log('currentElement1Count', currentElement1Count)

        acc[element1] = currentElement1Count + count;

        const currentElement2Count = acc[element2] || 0;

        // console.log('currentElement2Count', currentElement2Count)

        acc[element2] = currentElement2Count + count;

        return acc;
    }, {});

    console.log('elementCount', elementCount);

    let mostCommonElement;
    let leastCommonElement;

    let mostCommonElementCount = 0;
    let leastCommonElementCount = Number.MAX_SAFE_INTEGER;

    _.forEach(elementCount, (value, key) => {
        // console.log('key', key)
        // console.log('value', value)
        if (value > mostCommonElementCount) {
            mostCommonElementCount = value;
            mostCommonElement = key;
        } else if (value < leastCommonElementCount) {
            leastCommonElementCount = value;
            leastCommonElement = key;
        }
    });

    console.log('mostCommonElement', mostCommonElement);
    console.log('leastCommonElement', leastCommonElement);

    console.log('mostCommonElementCount', mostCommonElementCount);
    console.log('leastCommonElementCount', leastCommonElementCount);




    return  ((mostCommonElementCount / 2)  - (leastCommonElementCount / 2));
};
