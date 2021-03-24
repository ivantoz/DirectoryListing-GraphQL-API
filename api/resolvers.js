const fs = require('fs');
const path = require("path");


class TreeNode {
    constructor(path) {
        this.path = path;
        this.name = "";
        this.type = "";
        this.size = "";
        this.extension = "";
        this.children = [];
    }
}

const convertBytes = function(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    if (bytes == 0) {
        return "n/a";
    }

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    if (i == 0) {
        return bytes + " " + sizes[i];
    }

    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
}

function buildTree(rootPath, depth) {
    try {
        const root = new TreeNode(rootPath);

        const stack = [root];

        const LIMIT = 100000

        while (stack.length) {
            const currentNode = stack.pop();

            if (currentNode) {
                const children = fs.readdirSync(currentNode.path);

                for (let child of children) {
                    const childPath = `${currentNode.path}/${child}`;
                    const childNode = new TreeNode(childPath);
                    let totalSize = 0;
                    if (fs.statSync(currentNode.path).isDirectory()) {
                        totalSize += fs.statSync(currentNode.path).size;
                        currentNode.size = convertBytes(totalSize);
                        currentNode.type = "directory";
                        currentNode.extension = "n/a";
                        currentNode.name = path.parse(currentNode.path).name;
                    }

                    let childTotalSize = 0;

                    if (fs.statSync(childNode.path).isDirectory()) {
                        childTotalSize += fs.statSync(childNode.path).size;
                        childNode.size = convertBytes(childTotalSize);
                        childNode.extension = "n/a";
                        childNode.type = "directory";
                        childNode.name = path.parse(childNode.path).name;
                    }

                    if (fs.statSync(childNode.path).isFile()) {
                        childNode.size = convertBytes(fs.statSync(childNode.path).size)
                        childNode.extension = path.extname(childNode.path);
                        childNode.type = "file";
                        childNode.name = path.parse(childNode.path).base;
                    }

                    currentNode.children.push(childNode);
                    const isDirectory = fs.statSync(childNode.path).isDirectory();
                    const isUnderLimit = depth <= LIMIT;

                    if (isDirectory && isUnderLimit) {
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
        directoryListing: (root, {rootPath, depth}) => {
            return buildTree(rootPath, depth);
        }
    }
}

export default resolvers;