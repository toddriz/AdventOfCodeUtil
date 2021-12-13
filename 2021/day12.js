const _ = require('lodash');

module.exports.part1Examples = [
    `start-A
start-b
A-c
A-b
b-d
A-end
b-end`
];

module.exports.part1ExampleAnswers = [
    10
];

module.exports.part2Examples = [
    `start-A
start-b
A-b
A-c
b-d
A-end
b-end`,

    `dc-end
start-HN
start-kj
start-dc
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`,

    `end-fs
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
pj-start
he-WI
zg-he
pj-fs
start-RW`
];

module.exports.part2ExampleAnswers = [
    36,
    103,
    3509
];

const findPath = (nodeName, nodes, path, results) => {
    // console.log('nodeName', nodeName);
    const node = nodes.get(nodeName);

    if (nodeName === 'end') {
        results.pathCount++;
        return;
    }

    if (node.isSmallCave && _.includes(path, nodeName) && _.last(path) !== nodeName) {
        // console.log('*---------------------- here?------------------------*');
        return;
    }

    const newPath = [...path, nodeName];

    node.connections.forEach((cNodeName) => {
        findPath(cNodeName, nodes, newPath, results);
    });
};

module.exports.getSolutionForLevel1 = ({ inputArray }) => {
    const nodes = new Map();

    inputArray.forEach((nodePair) => {
        let [node1, node2] = _.split(nodePair, '-');

        const flip = node1;

        if (node2 === 'start') {
            node1 = 'start';
            node2 = flip;
        }

        const existingNode1 = nodes.get(node1);

        if (existingNode1) {
            nodes.set(node1, {
                isSmallCave: _.lowerCase(node1) === node1,
                connections: _.uniq([...existingNode1.connections, node2])
            });
        } else {
            nodes.set(node1, {
                isSmallCave: _.lowerCase(node1) === node1,
                connections: [node2]
            });
        }

        const existingNode2 = nodes.get(node2);
        if (existingNode2) {
            const connections = [...existingNode2.connections];

            if (node1 !== 'start') {
                connections.push(node1);
            }

            nodes.set(node2, {
                isSmallCave: _.lowerCase(node2) === node2,
                connections: _.uniq(connections)
            });
        } else {
            nodes.set(node2, {
                isSmallCave: _.lowerCase(node2) === node2,
                connections: node1 !== 'start' ? [node1] : []
            });
        }
    });

    console.log('nodes', nodes);

    const startNode = nodes.get('start');

    const results = { pathCount: 0 };

    startNode.connections.forEach((nodeName) => {
        const path = ['start', nodeName];

        findPath(nodeName, nodes, path, results);
    });

    return results.pathCount;
};

let paths = [];

const findPath2 = (nodeName, nodes, path, results) => {
    // console.log('nodeName', nodeName);
    const node = nodes.get(nodeName);

    // console.log('node', node);

    if (nodeName === 'end') {
        path = _.tail([...path, 'end']);

        paths.push(path);
        results.pathCount++;

        return;
    }

    const goodSmallCave = _.first(path);

    // console.log('goodSmallCave', goodSmallCave);

    // const smallCaves = path.filter((cNodeName) => {
    //     return (cNodeName !== 'start' || cNodeName !== 'end') && _.lowerCase(cNodeName) === cNodeName;
    // });

    if (node.isSmallCave) {
        // console.log('*----------------------smallcave------------------------*');
        if (nodeName === goodSmallCave) {
            const smallCaveCount = _.size(_.filter(path, (cave) => cave === goodSmallCave));
            // console.log('smallCaveCount', smallCaveCount);
            if (smallCaveCount === 3) {
                return;
            }

        } else if (_.includes(path, nodeName) && _.last(path) !== nodeName) {
            return;
        }
    }

    const newPath = [...path];
    // console.log('_.last(path)', _.last(path));

    if (_.last(path) !== nodeName) {
        newPath.push(nodeName);
    }

    node.connections.forEach((cNodeName) => {
        findPath2(cNodeName, nodes, newPath, results);
    });

    // _.reverse(node.connections).forEach((cNodeName) => {
    //     findPath2(cNodeName, nodes, newPath, results);
    // });
};

module.exports.getSolutionForLevel2 = ({ inputArray }) => {
    const nodes = new Map();

    paths = [];
    inputArray.forEach((nodePair) => {
        let [node1, node2] = _.split(nodePair, '-');


        if (node2 === 'start') {
            node2 = node1;
            node1 = 'start';
        }

        if (node1 === 'end') {
            node1 = node2;
            node2 = 'end';
        }

        const existingNode1 = nodes.get(node1);

        if (existingNode1) {
            nodes.set(node1, {
                isSmallCave: _.lowerCase(node1) === node1,
                connections: _.uniq([...existingNode1.connections, node2])
            });
        } else {
            nodes.set(node1, {
                isSmallCave: _.lowerCase(node1) === node1,
                connections: [node2]
            });
        }

        const existingNode2 = nodes.get(node2);
        if (existingNode2) {
            const connections = [...existingNode2.connections];

            if (node1 !== 'start') {
                connections.push(node1);
            }

            nodes.set(node2, {
                isSmallCave: _.lowerCase(node2) === node2,
                connections: _.uniq(connections)
            });
        } else {
            nodes.set(node2, {
                isSmallCave: _.lowerCase(node2) === node2,
                connections: node1 !== 'start' ? [node1] : []
            });
        }
    });

    console.log('nodes', nodes);

    const startNode = nodes.get('start');

    const results = { pathCount: 0 };
    const smallCaves = [];
    // nodes.keys().filter((cNodeName) => {
    //     return (cNodeName !== 'start' || cNodeName !== 'end') && _.lowerCase(cNodeName) === cNodeName;
    // });

    for (const [nodeName] of nodes) {
        if (nodeName !== 'start' && nodeName !== 'end' && _.lowerCase(nodeName) === nodeName) {
            smallCaves.push(nodeName);
        }
    }
    console.log('smallCaves', smallCaves);

    startNode.connections.forEach((nodeName) => {
        smallCaves.forEach((cave) => {
            const path = ['start', nodeName];
            path.unshift(cave);

            // console.log('path', path);

            // console.log('nodeName', nodeName);

            findPath2(nodeName, nodes, path, results);
        });
    });


    // console.log('paths.size', paths.size);
    console.log('_.size(paths)', _.size(paths));


    // console.log('_.size(_.uniqWith(_.map(paths, _.tail), _.isEqual))', _.size(_.uniqWith(_.map(paths, _.tail), _.isEqual)));

    return _.size(_.uniqWith(paths, _.isEqual));
    // return _.size(paths);

};
