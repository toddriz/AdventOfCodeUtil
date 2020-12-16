const { isValid } = require('date-fns');
const _ = require('lodash');

module.exports.part1Examples = [
    `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`
];

module.exports.part1ExampleAnswers = [
    71
];

module.exports.part2Examples = [
    `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`
];

module.exports.part2ExampleAnswers = [
    { class: 12, row: 11, seat: 13 }
];

const isValidNumber = (rules, num) => {
    return rules.some(([lower, upper]) => {
        // console.log('lower', lower);
        // console.log('upper', upper);

        const isInRange = num <= upper && num >= lower;

        // console.log(`${num} is ${isInRange ? '' : 'not'} in range`);

        return isInRange;
    });
};

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    let answer;

    let rules = [];
    let myTicket = [];
    let nearbyTickets = [];

    let areRulesParse = false;
    let isMyTicketParsed = false;
    let areNearbyTicketsParsed = false;

    let currentSection = rules;

    inputArray.forEach((line) => {
        if (line.length === 0) {
            switch (currentSection) {
                case rules:
                    currentSection = myTicket;
                    break;

                case myTicket:
                    currentSection = nearbyTickets;
                    break;
                default:
                    break;
            }
        } else {
            // console.log('currentSection', currentSection)
            currentSection.push(line);
        }
    });

    const rulesRegex = /[a-z]+: ([\d]+)-([\d]+) or ([\d]+)-([\d]+)/;
    rules = rules.map((ruleString) => {
        const match = ruleString.match(rulesRegex);

        return [[match[1], match[2]], [match[3], match[4]]];
    }).flat().map((arr) => arr.map(Number));

    myTicket = myTicket[1].split(',').map(Number);
    nearbyTickets = nearbyTickets.slice(1).map((ticketString) => ticketString.split(',')).map((arr) => arr.map(Number));


    answer = nearbyTickets.flat().filter((num) => !isValidNumber(rules, num))
        .reduce((errorRate, invalidTicketValue) => {
            return errorRate + invalidTicketValue;
        }, 0);


    return answer;
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    let answer;

    let rules = [];
    let myTicket = [];
    let nearbyTickets = [];

    let areRulesParse = false;
    let isMyTicketParsed = false;
    let areNearbyTicketsParsed = false;

    let currentSection = rules;

    inputArray.forEach((line) => {
        if (line.length === 0) {
            switch (currentSection) {
                case rules:
                    currentSection = myTicket;
                    break;

                case myTicket:
                    currentSection = nearbyTickets;
                    break;
                default:
                    break;
            }
        } else {
            currentSection.push(line);
        }
    });

    const rulesRegex = /([a-z])+: ([\d]+)-([\d]+) or ([\d]+)-([\d]+)/;
    rules = rules.map((ruleString) => {
        const match = ruleString.match(rulesRegex);

        return { field: match[1], bounds: [[Number(match[2]), Number(match[3])], [Number(match[4]), Number(match[5])]] };
    });

    // console.log('rules', rules);

    // console.log('rules[0].bounds.flat()', rules[0].bounds.flat());

    myTicket = myTicket[1].split(',').map(Number);
    nearbyTickets = nearbyTickets.slice(1).map((ticketString) => ticketString.split(',')).map((arr) => arr.map(Number));


    // console.log('nearbyTickets.length', nearbyTickets.length);

    // console.log('myTicket.every((num) => isValidNumber(rules.map(({bounds}) => bounds.flat()), num));', myTicket.every((num) => isValidNumber(rules.map(({ bounds }) => bounds.flat()), num)));

    validTickets = [myTicket, ...nearbyTickets].filter((ticket) => {
        return ticket.every((num) => isValidNumber(rules.map(({ bounds }) => bounds.flat()), num));
    });



    console.log('validTickets.length', validTickets.length);

    const validValuesByField = validTickets.slice(0, 2).reduce((validValues, ticket) => {
        // console.log('validValues', validValues)
        // console.log('ticket', ticket)
        // console.log('ticket.length', ticket.length)
        ticket.forEach((num, i) => {
            console.log('i', i);
            console.log('num', num);
            console.log('validValues[i]', validValues[i]);
            validValues[i].push(num);
        });

        return validValues;

    }, new Array(20).fill([]));

    console.log('validValuesByField', validValuesByField);

    const translatedTicket = {

    };

    answer = translatedTicket;

    return answer;
};
