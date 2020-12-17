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

module.exports.part1ExampleAnswers = [71];

module.exports.part2Examples = [
    `departure class: 0-1 or 4-19
departure row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`
];

module.exports.part2ExampleAnswers = [132];

const isValidNumber = (rules, num) => {
    return rules.some(([lower, upper]) => num <= upper && num >= lower);
};

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    let answer;

    let rules = [];
    let myTicket = [];
    let nearbyTickets = [];

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

    const rulesRegex = /[a-z]+: ([\d]+)-([\d]+) or ([\d]+)-([\d]+)/;
    rules = rules
        .map((ruleString) => {
            const match = ruleString.match(rulesRegex);

            return [
                [match[1], match[2]],
                [match[3], match[4]]
            ];
        })
        .flat()
        .map((arr) => arr.map(Number));

    myTicket = myTicket[1].split(',').map(Number);
    nearbyTickets = nearbyTickets
        .slice(1)
        .map((ticketString) => ticketString.split(','))
        .map((arr) => arr.map(Number));

    answer = nearbyTickets
        .flat()
        .filter((num) => !isValidNumber(rules, num))
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

    let currentSection = rules;

    inputArray.forEach((line) => {
        if (line === '\r' || line.length === 0) {
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

    const rulesRegex = /([a-z | \S]+): ([\d]+)-([\d]+) or ([\d]+)-([\d]+)/;

    console.log('rules', rules);
    rules = rules.map((ruleString) => {
        const match = ruleString.match(rulesRegex);

        if (match === null) {
            console.log('ruleString', ruleString);
        }

        return {
            field: match[1],
            bounds: [
                [Number(match[2]), Number(match[3])],
                [Number(match[4]), Number(match[5])]
            ]
        };
    });

    myTicket = myTicket[1].split(',').map(Number);

    console.log('myTicket', myTicket);
    nearbyTickets = nearbyTickets
        .slice(1)
        .map((ticketString) => ticketString.split(','))
        .map((arr) => arr.map(Number));

    validTickets = [myTicket, ...nearbyTickets].filter((ticket) => {
        return ticket.every((num) => {
            return isValidNumber(rules.map(({ bounds }) => bounds).flat(), num);
        });
    });

    let validValuesByField = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];

    validTickets.forEach((ticket) => {
        ticket.forEach((num, i) => {
            validValuesByField[i].push(num);
        });
    });

    let possiblePositions = validValuesByField
        .filter((f) => !_.isEmpty(f))
        .map((fieldValues, i) => {
            const possibleFields = rules
                .filter(({ bounds }) => {
                    return fieldValues.every((num) => {
                        return isValidNumber(bounds, num);
                    });
                })
                .map(({ field }) => field);

            return { i, possibleFields };
        });

    const positions = [];
    const singled = [];
    while (possiblePositions.some(({ possibleFields }) => possibleFields.length > 1)) {
        const { i, possibleFields } =
            possiblePositions.find(({ possibleFields }) => {
                // console.log('possibleFields', possibleFields);
                const isOne = possibleFields.length === 1;
                const single = _.first(possibleFields);

                const wasAlreadySingled = _.includes(singled, single);

                return isOne && !wasAlreadySingled;
            }) || {};

        const nextSingled = possibleFields[0];

        _.set(positions, i, nextSingled);

        singled.push(nextSingled);
        possiblePositions = possiblePositions.map(({ i, possibleFields }) => {
            return {
                i,
                possibleFields: _.isEqual(singled, possibleFields)
                    ? possibleFields
                    : _.difference(possibleFields, singled)
            };
        });
    }

    answer = positions.reduce((mult, pos, i) => {
        if (pos.includes('departure')) {
            const val = myTicket[i];

            return (mult *= myTicket[i]);
        }

        return mult;
    }, 1);

    return answer;
};
