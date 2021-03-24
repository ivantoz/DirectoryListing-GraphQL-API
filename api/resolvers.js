const fs = require('fs');
const dree = require('dree');

const options = {
    stat: true,
    normalize: true,
    size: true,
    hash: true,
    sizeInBytes: true,
    depth: 10,
    // exclude: /node_modules/,
    followLinks: true,
    extensions: [ 'js']
};



class TreeNode {
    constructor(path) {
        this.path = path;
        this.children = [];
    }
}

function buildTree(rootPath) {
    try {
        const root = new TreeNode(rootPath);

        const stack = [root];

        while (stack.length) {
            const currentNode = stack.pop();

            if (currentNode) {
                const children = fs.readdirSync(currentNode.path);

                for (let child of children) {
                    const childPath = `${currentNode.path}/${child}`;
                    const childNode = new TreeNode(childPath);
                    currentNode.children.push(childNode);

                    if (fs.statSync(childNode.path).isDirectory()) {
                        stack.push(childNode);
                    }
                }
            }
        }

        return root;
    } catch (e) {
        console.log(e)
    }
}

const resolvers = {
    Query: {
        directoryListing: (root, {rootPath}) => {
           //return buildTree(rootPath)
            return dree.scan(rootPath, options);
        }
    }
}

export default resolvers