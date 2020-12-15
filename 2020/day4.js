const fs = require('fs');
const _ = require('lodash');

const utils = require('../utils');

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    let answer;

    const formattedPassports = inputArray.reduce(
        (passports, line) => {
            if (line.length === 0) {
                passports.push({});

                return passports;
            }

            const currentPassport = passports[passports.length - 1];

            line.split(' ').forEach((rawField) => {
                const [key, value] = rawField.split(':');

                currentPassport[key] = value;
            });

            return passports;
        },
        [{}]
    );

    // 'byr', (Birth Year)
    // 'iyr', (Issue Year)
    // 'eyr', (Expiration Year)
    // 'hgt', (Height)
    // 'hcl', (Hair Color)
    // 'ecl', (Eye Color)
    // 'pid', (Passport ID)
    // 'cid', (Country ID) - not required

    // console.log('formattedPassports', formattedPassports);

    const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    const validPassports = formattedPassports.filter((pass) => {
        return requiredFields.every((field) => !!pass[field]);
    });

    console.log('formattedPassports.length', formattedPassports.length);
    console.log('validPassports.length', validPassports.length);

    answer = validPassports.length;

    return answer;
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    let answer;

    const formattedPassports = inputArray.reduce(
        (passports, line) => {
            if (line.length === 0) {
                passports.push({});

                return passports;
            }

            const currentPassport = passports[passports.length - 1];

            line.split(' ').forEach((rawField) => {
                const [key, value] = rawField.split(':');

                currentPassport[key] = value;
            });

            return passports;
        },
        [{}]
    );

    const requiredFields = [
        {
            // byr (Birth Year) - four digits; at least 1920 and at most 2002.
            field: 'byr',
            validator: (value) => {
                if (value.length !== 4) {
                    return false;
                }

                const numVal = _.toNumber(value);

                return numVal >= 1920 && numVal <= 2002;
            }
        },
        {
            // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
            field: 'iyr',
            validator: (value) => {
                if (value.length !== 4) {
                    return false;
                }

                const numVal = _.toNumber(value);

                return numVal >= 2010 && numVal <= 2020;
            }
        },
        {
            // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
            field: 'eyr',
            validator: (value) => {
                if (value.length !== 4) {
                    return false;
                }

                const numVal = _.toNumber(value);

                return numVal >= 2020 && numVal <= 2030;
            }
        },
        {
            // hgt (Height) - a number followed by either cm or in:
            // If cm, the number must be at least 150 and at most 193.
            // If in, the number must be at least 59 and at most 76.
            field: 'hgt',
            validator: (value) => {
                const cmValueString = _.includes(value, 'cm') && _.replace(value, 'cm', '');
                const inchValueString = _.includes(value, 'in') && _.replace(value, 'in', '');

                if (cmValueString) {
                    const cmNum = _.toNumber(cmValueString);

                    return cmNum >= 150 && cmNum <= 193;
                } else if (inchValueString) {
                    const inchNum = _.toNumber(inchValueString);

                    return inchNum >= 59 && inchNum <= 76;
                }

                return false;
            }
        },
        {
            // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
            field: 'hcl',
            validator: (value) => {
                return /#[a-f|0-9]{6}/.test(value);
            }
        },
        {
            // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
            field: 'ecl',
            validator: (value) => {
                return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
            }
        },
        {
            // pid (Passport ID) - a nine-digit number, including leading zeroes.
            field: 'pid',
            validator: (value) => {
                return value.length === 9;
            }
        }
        // cid (Country ID) - ignored, missing or not.
    ];
    const validPassports = formattedPassports.filter((pass) => {
        return requiredFields.every(({ field, validator }) => {
            return validator(pass[field] || '');
        });
    });

    console.log('formattedPassports.length', formattedPassports.length);
    console.log('validPassports.length', validPassports.length);

    answer = validPassports.length;

    return answer;
};
