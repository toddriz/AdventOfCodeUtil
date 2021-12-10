const _ = require('lodash');

module.exports.part1Examples = [
    `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`
];

module.exports.part1ExampleAnswers = [
    26397
];

module.exports.part2Examples = this.part1Examples;

module.exports.part2ExampleAnswers = [
    288957
];

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    let badParen = 0;
    let badBracket = 0;
    let badCurly = 0;
    let badGreater = 0;

    const lines = inputArray;

    lines.forEach((line) => {
        let stack = [];

        let isIncomplete = false;
        let hasInvalidCharacter = false;

        const symbols = _.split(line, '');

        let leftSymbolCount = 0;
        let rightSymbolCount = 0;

        symbols.forEach((symbol) => {
            if (hasInvalidCharacter) {
                return;
            } else if (_.includes(['(', '[', '{', '<'], symbol)) {
                leftSymbolCount++;
                stack.push(symbol);
            } else {
                rightSymbolCount++;
                const lastSymbol = _.last(stack);

                switch (symbol) {
                    case ')':
                        if (lastSymbol !== '(') {
                            hasInvalidCharacter = true;
                            badParen++;
                        }
                        break;
                    case ']':
                        if (lastSymbol !== '[') {
                            hasInvalidCharacter = true;
                            badBracket++;
                        }
                        break;
                    case '}':
                        if (lastSymbol !== '{') {
                            hasInvalidCharacter = true;
                            badCurly++;
                        }

                        break;
                    case '>':
                        if (lastSymbol !== '<') {
                            hasInvalidCharacter = true;
                            badGreater++;
                        }
                        break;
                }
                stack.pop();
            }
        });

        console.log('*----------------------------------------------*');
        console.log('stack', stack);
        console.log('leftSymbolCount', leftSymbolCount);
        console.log('rightSymbolCount', rightSymbolCount);
        console.log('*----------------------------------------------*');
    });

    console.log('badParen', badParen);
    console.log('badBracket', badBracket);
    console.log('badCurly', badCurly);
    console.log('badGreater', badGreater);


    const answer = (badParen * 3) + (badBracket * 57) + (badCurly * 1197) + (badGreater * 25137);

    return answer;
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    let lines = inputArray;

    let stacks = [];

    lines = lines.filter((line) => {
        let stack = [];

        let isIncomplete = false;
        let hasInvalidCharacter = false;

        const symbols = _.split(line, '');

        let leftSymbolCount = 0;
        let rightSymbolCount = 0;

        symbols.forEach((symbol) => {
            if (hasInvalidCharacter) {
                return;
            } else if (_.includes(['(', '[', '{', '<'], symbol)) {
                leftSymbolCount++;
                stack.push(symbol);
            } else {
                rightSymbolCount++;
                const lastSymbol = _.last(stack);

                switch (symbol) {
                    case ')':
                        if (lastSymbol !== '(') {
                            hasInvalidCharacter = true;
                            // badParen++;
                        }
                        break;
                    case ']':
                        if (lastSymbol !== '[') {
                            hasInvalidCharacter = true;
                            // badBracket++;
                        }
                        break;
                    case '}':
                        if (lastSymbol !== '{') {
                            hasInvalidCharacter = true;
                            // badCurly++;
                        }

                        break;
                    case '>':
                        if (lastSymbol !== '<') {
                            hasInvalidCharacter = true;
                            // badGreater++;
                        }
                        break;
                }
                stack.pop();
            }
        });
        // console.log('leftSymbolCount', leftSymbolCount);
        // console.log('rightSymbolCount', rightSymbolCount);

        // console.log('*----------------------------------------------*');
        // console.log('stack', stack);
        // console.log('*----------------------------------------------*');

        if (!hasInvalidCharacter && !_.isEmpty(stack)) {
            stacks.push(stack);
        }

        return !hasInvalidCharacter;
    });

    // console.log('stacks', stacks);

    const flippedStacks = stacks.map((stack) => {
        return _.reverse(stack);
    }).map((stack) => {
        // console.log('stack', stack);
        return stack.map((symbol) => {
            switch (symbol) {
                case '{':
                    return '}';
                case '[':
                    return ']';
                case '(':
                    return ')';
                case '<':
                    return '>';
            }
        });
    });

    // console.log('flippedStacks', flippedStacks);

    const scores = flippedStacks.map((stack) => {
        // console.log('stack', stack);
        const score = stack.reduce((acc, symbol) => {
            acc *= 5;

            // console.log('acc before', acc);

            switch (symbol) {
                case '}':
                    acc += 3;
                    break;
                case ']':
                    acc += 2;
                    break;
                case ')':
                    acc += 1;
                    break;
                case '>':
                    acc += 4;
                    break;
            }

            // console.log('acc', acc);

            return acc;
        }, 0);

        // console.log('score', score);

        return score;
    });

    // console.log('scores', scores);

    // console.log('_.sortBy(scores)', _.sortBy(scores));

    return _.sortBy(scores)[_.floor(scores.length / 2)];
};
