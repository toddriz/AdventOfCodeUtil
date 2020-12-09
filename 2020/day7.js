const _ = require('lodash');

const utils = require('../utils');

let callSize = 0;

const doesBagContainShinyGold = (innerBags, bag) => {
    callSize++;
    if (_.includes(innerBags, 'shinyGold')) {
        // console.log('********************shiny********************');
        return true;
    } else if (_.includes(innerBags, 'noOther')) {
        // console.log('********************no other********************');
        return false;
    } else {
        return _.some(innerBags, (innerBag) => doesBagContainShinyGold(bag[innerBag], bag));
    }
};

module.exports.getSolutionForLevel1 = (inputFilePath) => {
    let answer;

    const inputArray = utils.convertTextFileToArray(inputFilePath);

    const bag = inputArray.reduce((mappedBags, line) => {
        if (line.length <= 10) {
            return mappedBags;
        }
        const [bagName, innerBags] = line.replace(/\.|\d|bags|bag/g, '').split('contain');

        mappedBags[_.camelCase(bagName)] = innerBags.split(' , ').map(_.camelCase);

        return mappedBags;
    }, {});

    console.log('bag', bag);

    // _.map(bag, (innerBags) => console.log(innerBags));

    try {
        answer = _.map(bag, (innerBags) => {
            console.log('innerBags', innerBags);
            return doesBagContainShinyGold(innerBags, bag);
        }).filter(Boolean).length;
    } catch (error) {
        console.log('callSize', callSize);
    }

    console.log('answer', answer);

    return answer;
};

const countBagsInside = (insideBags, bag) => {
    const total = insideBags.reduce((bagCount, insideBag) => {
        if (insideBag === 'noOther') {
            return bagCount;
        }
        const count = _.toNumber(_.first(insideBag));

        bagCount += count;
        bagName = _.camelCase(_.replace(insideBag, /\d/, ''));

        bagCount += count * countBagsInside(bag[bagName], bag);

        return bagCount;
    }, 0);

    return total;
};

module.exports.getSolutionForLevel2 = (inputFilePath) => {
    let answer = 0;

    const inputArray = utils.convertTextFileToArray(inputFilePath);

    const bag = inputArray.reduce((mappedBags, line) => {
        if (line.length <= 10) {
            return mappedBags;
        }
        const [bagName, innerBags] = line.replace(/\.|bags|bag/g, '').split('contain');

        mappedBags[_.camelCase(bagName)] = innerBags.split(' , ').map(_.camelCase);

        return mappedBags;
    }, {});

    const bagsInsideShinyGold = bag.shinyGold;

    console.log('bagsInsideShinyGold', bagsInsideShinyGold);
    answer = countBagsInside(bagsInsideShinyGold, bag, 0);

    return answer;
};
