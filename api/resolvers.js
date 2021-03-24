const fs = require('fs');
const path = require("path")


class TreeNode {
    constructor(path) {
        this.path = path;
        this.type = ""
        this.size = ""
        this.extension = ""
        this.children = [];
    }
}

const convertBytes = function(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

    if (bytes == 0) {
        return "n/a"
    }

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

    if (i == 0) {
        return bytes + " " + sizes[i]
    }

    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
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
                    let totalSize = 0
                    if (fs.statSync(currentNode.path).isDirectory()) {
                        totalSize += fs.statSync(currentNode.path).size
                        currentNode.size = convertBytes(totalSize)
                        currentNode.type = "Directory"
                        currentNode.extension = "n/a"
                    }

                    if (fs.statSync(currentNode.path).isFile()) {
                        currentNode.extension = path.extname(currentNode.path);
                        currentNode.type = "File"
                    }

                    let childTotalSize = 0

                    if (fs.statSync(childNode.path).isDirectory()) {
                        childTotalSize += fs.statSync(childNode.path).size
                        childNode.size = convertBytes(childTotalSize)
                        childNode.extension = "n/a"
                        childNode.type = "Directory"
                    }

                    if (fs.statSync(childNode.path).isFile()) {
                        childNode.size = convertBytes(fs.statSync(childNode.path).size)
                        childNode.extension = path.extname(childNode.path);
                        childNode.type = "File"
                    }

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
        listing: (root, {rootPath}) => {
            return buildTree(rootPath)
        }
    }
}

export default resolvers