const fs = require('fs');
const _ = require('lodash');

const utils = require('../utils');

module.exports.getSolutionForLevel1 = (inputFilePath) => {
    let answer = 0;

    const inputArray = utils.convertTextFileToArray(inputFilePath);

    inputArray.forEach((bsp) => {
        const rowBsp = bsp.slice(0, 7).split('');
        const columnBsp = bsp.slice(-3).split('');

        let row;
        let column;

        let rows = Array(128).fill(0);
        rows = rows.map((v, index) => index);
        rowBsp.forEach((fOrB) => {
            if (fOrB === 'F') {
                rows = rows.slice(0, Math.ceil(rows.length / 2));
            } else {
                rows = rows.slice(Math.ceil(rows.length / 2));
            }
        });

        row = rows[0];

        let columns = Array(8).fill(0);
        columns = columns.map((v, index) => index);
        columnBsp.forEach((fOrB) => {
            if (fOrB === 'L') {
                columns = columns.slice(0, Math.ceil(columns.length / 2));
            } else {
                columns = columns.slice(Math.ceil(columns.length / 2));
            }
        });

        column = columns[0];

        const seatId = _.toNumber(row) * 8 + _.toNumber(column);

        if (seatId >= answer) {
            console.log('seatId', seatId);
            answer = seatId;
        }
    });

    return answer;
};

module.exports.getSolutionForLevel2 = (inputFilePath) => {
    let answer;

    let seats = [];

    const inputArray = utils.convertTextFileToArray(inputFilePath);

    inputArray.forEach((bsp) => {
        const rowBsp = bsp.slice(0, 7).split('');
        const columnBsp = bsp.slice(-3).split('');

        let row;
        let column;

        let rows = Array(128).fill(0);
        rows = rows.map((v, index) => index);
        rowBsp.forEach((fOrB) => {
            if (fOrB === 'F') {
                rows = rows.slice(0, Math.ceil(rows.length / 2));
            } else {
                rows = rows.slice(Math.ceil(rows.length / 2));
            }
        });

        row = rows[0];

        let columns = Array(8).fill(0);
        columns = columns.map((v, index) => index);
        columnBsp.forEach((fOrB) => {
            if (fOrB === 'L') {
                columns = columns.slice(0, Math.ceil(columns.length / 2));
            } else {
                columns = columns.slice(Math.ceil(columns.length / 2));
            }
        });

        column = columns[0];

        const seatId = _.toNumber(row) * 8 + _.toNumber(column);

        seats.push(seatId);

        seats;

        if (seatId >= answer) {
            console.log('seatId', seatId);
            answer = seatId;
        }
    });

    seats.sort((seat1, seat2) => seat1 - seat2);

    console.log('seats', seats);

    seats.forEach((seat, index) => {
        const nextSeat = seats[index + 1] || 0;

        if (nextSeat - seat > 1) {
            answer = seat + 1;
        }
    });

    return answer;
};
