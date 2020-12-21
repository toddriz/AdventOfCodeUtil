const _ = require('lodash');

module.exports.part1Examples = [
    `Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`
];

module.exports.part1ExampleAnswers = [20899048083289];

module.exports.part2Examples = [
    `Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`
];

module.exports.part2ExampleAnswers = [
    273
];

const getNeighbors = (tileId, [tileTop, tileLeft, tileRight, tileBottom], tiles) => {
    const neighbors = {};

    tiles.forEach((tile) => {
        if (tileId === tile.id) {
            return;
        }

        const sides = [tile.top, tile.left, tile.right, tile.bottom];

        const reversed = sides.map(sideStr => sideStr.split('').reverse().join(''));

        sides.push(...reversed);

        // console.log('sides', sides);

        if (_.includes(sides, tileTop)) {
            neighbors.top = tile;
        } else if (_.includes(sides, tileLeft)) {
            neighbors.left = tile;
        } else if (_.includes(sides, tileRight)) {
            neighbors.right = tile;
        } else if (_.includes(sides, tileBottom)) {
            neighbors.bottom = tile;
        }
    });


    return neighbors;
};

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    let answer;

    const tiles = inputArray.reduce((acc, line) => {
        if (line.length === 0) {
            // nothing
        } else if (_.startsWith(line, 'Tile')) {
            const newTile = { id: line.match(/Tile ([\d]+):/)[1], tile: [] };
            acc.push(newTile);
        } else {
            _.last(acc).tile.push(line);
        }

        return acc;
    }, []).map((tile) => {
        const top = tile.tile[0];
        const bottom = tile.tile[tile.tile.length - 1].split('').reverse().join('');
        const left = tile.tile.reduce((left, row) => {
            return `${row[0]}${left}`;
        }, '');

        const right = tile.tile.reduce((right, row) => {
            return right += row[row.length - 1];
        }, '');

        return { id: Number(tile.id), top, left, right, bottom };
    }).map((tile, i, arr) => {
        const neighbors = getNeighbors(tile.id, [tile.top, tile.left, tile.right, tile.bottom], arr);

        let pos;
        switch (_.size(neighbors)) {
            case 2:
                pos = 'corner';
                break;
            case 3:
                pos = 'side';
                break;
            case 4:
                pos = 'middle';
            default:
                console.log('_.size(neighbors)', _.size(neighbors));
                pos = 'unknown';
                break;
        }

        return { ...tile, neighbors, pos };
    });


    answer = 1;
    tiles.forEach(tile => {
        if (tile.pos === 'corner') {
            answer *= tile.id;
        }
    });

    // console.log('tiles', tiles);

    return answer;
};

const rotateTile = (tile, rotations) => {
    switch (rotations) {
        case 1:
            tile.top = tile.left;
            tile.left = tile.bottom;
            tile.bottom = tile.right;
            tile.right = tile.top;

            tile.neighbors.top = tile.neighbors.left;
            tile.neighbors.left = tile.neighbors.bottom;
            tile.neighbors.bottom = tile.neighbors.right;
            tile.neighbors.right = tile.neighbors.top;
        case 2:
            tile.top = tile.bottom;
            tile.left = tile.right;
            tile.bottom = tile.top;
            tile.right = tile.left;

            tile.neighbors.top = tile.neighbors.bottom;
            tile.neighbors.left = tile.neighbors.right;
            tile.neighbors.bottom = tile.neighbors.top;
            tile.neighbors.right = tile.neighbors.left;
        case 3:
            tile.top = tile.right;
            tile.left = tile.top;
            tile.bottom = tile.left;
            tile.right = tile.bottom;

            tile.neighbors.top = tile.neighbors.right;
            tile.neighbors.left = tile.neighbors.top;
            tile.neighbors.bottom = tile.neighbors.left;
            tile.neighbors.right = tile.neighbors.bottom;
        default:
            return tile;
    }
};

const orientTile = (tile, rotations) => {
    switch (rotations) {
        case 0:

            break;

        default:
            break;
    }
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    let answer;

    const tiles = inputArray.reduce((acc, line) => {
        if (line.length === 0) {
            // nothing
        } else if (_.startsWith(line, 'Tile')) {
            const newTile = { id: line.match(/Tile ([\d]+):/)[1], tile: [] };
            acc.push(newTile);
        } else {
            _.last(acc).tile.push(line);
        }

        return acc;
    }, []).map((tile) => {
        const top = tile.tile[0];
        const bottom = tile.tile[tile.tile.length - 1].split('').reverse().join('');
        const left = tile.tile.reduce((left, row) => {
            return `${row[0]}${left}`;
        }, '');

        const right = tile.tile.reduce((right, row) => {
            return right += row[row.length - 1];
        }, '');

        return { id: Number(tile.id), top, left, right, bottom };
    }).map((tile, i, arr) => {
        const neighbors = getNeighbors(tile.id, [tile.top, tile.left, tile.right, tile.bottom], arr);

        return { ...tile, neighbors };
    }).sort((a, b) => {
        const aLen = _.size(a.neighbors);
        const bLen = _.size(b.neighbors);

        if (aLen > bLen) {
            return 1;
        } else if (bLen > aLen) {
            return -1;
        } else {
            return 0;
        }
    });

    if (tile[0].neighbors.left) {
        if (tile[0].neighbors.bottom) {
            orientTile(tile[0], 3);
        } else {
            orientTile(tile[0], 2);
        }
    } else if (tile[0].neighbors.top && tile[0].neighbors.right) {
        orientTile(tile[0], 1);
    }

    console.log('tiles', tiles);

    return answer;
};


