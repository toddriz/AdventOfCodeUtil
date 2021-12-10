const _ = require('lodash');

module.exports.part1Examples = [
    `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`
];

module.exports.part1ExampleAnswers = [
    4512
];

module.exports.part2Examples = [
    `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`
];

module.exports.part2ExampleAnswers = [
    1924
];

const markBoard = (board, num) => {
    for (let i = 0; i < 5; i++) {
        const row = board[i];
        for (let j = 0; j < 5; j++) {
            const spot = row[j];
            if (spot === num) {
                board[i][j] = 'X';
            }
        }
    }

    return board;
};

const isBoardWinner = (board) => {
    let isRowWinner = _.some(board, (row) => {
        return _.every(row, (spot) => spot === 'X');
    });


    let isColumnWinner = _.some(_.unzip(board), (column) => {
        return _.every(column, (spot) => spot === 'X');
    });

    return isRowWinner || isColumnWinner;
};

const calculateSumOfUnmarkedSpots = (board) => {
    const sum = board.map((row) => {
        let rowSum = _.sum(row.filter((spot) => spot !== 'X').map(_.toNumber));

        return rowSum;
    }).reduce((acc, rowSum) => {
        return acc + rowSum;
    }, 0);

    return sum;
};

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    const numbers = _.split(inputArray[0], ',');

    let boards = inputArray.reduce((acc, line, index) => {
        if (index === 0) {
            return acc;
        } else if (line === '') {
            acc.push([]);
        } else {
            const lastBoard = acc.pop();

            lastBoard.push(_.compact(_.split(line, /\s+/)));
            acc.push(lastBoard);
        }

        return acc;
    }, []);

    let winningNumber;

    let winningBoardIndex = -1;
    for (let i = 0; i < numbers.length; i++) {
        const num = numbers[i];
        console.log('num', num);

        boards = boards.map((board) => markBoard(board, num));

        console.log('boards', boards);

        winningBoardIndex = boards.findIndex(isBoardWinner);

        if (winningBoardIndex !== -1) {
            winningNumber = num;
            break;
        }
    }

    const winningBoard = boards[winningBoardIndex];

    const sumOfUnmarkedSpots = calculateSumOfUnmarkedSpots(winningBoard);

    return sumOfUnmarkedSpots * _.toNumber(winningNumber);
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    const numbers = _.split(inputArray[0], ',');

    let boards = inputArray.reduce((acc, line, index) => {
        if (index === 0) {
            return acc;
        } else if (line === '') {
            acc.push([]);
        } else {
            const lastBoard = acc.pop();

            lastBoard.push(_.compact(_.split(line, /\s+/)));
            acc.push(lastBoard);
        }

        return acc;
    }, []);

    let lastWinnerIndex = -1;

    const winningBoards = [];
    for (let i = 0; i < numbers.length; i++) {
        const num = numbers[i];
        console.log('num', num);

        const alreadyWinners = boards.reduce((acc, board, i) => {
            if (isBoardWinner(board)) {
                acc.push(i);
            }

            return acc;
        }, []);

        boards = boards.map((board) => markBoard(board, num));

        const afterWinners = boards.reduce((acc, board, i) => {
            if (isBoardWinner(board)) {
                acc.push(i);
            }

            return acc;
        }, []);

        let numWinningBoards = _.size(boards.filter(isBoardWinner));

        if (numWinningBoards === _.size(boards)) {
            lastWinnerIndex = _.difference(afterWinners, alreadyWinners)[0];
            winningNumber = num;

            break;
        }
    }

    const winningBoard = boards[lastWinnerIndex];

    const sumOfUnmarkedSpots = calculateSumOfUnmarkedSpots(winningBoard);

    return sumOfUnmarkedSpots * _.toNumber(winningNumber);
};
