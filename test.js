const fs = require('fs');
const path = require("path")
var methods = ['isBlockDevice', 'isCharacterDevice', 'isDirectory', 'isFIFO', 'isFile', 'isSocket', 'isSymbolicLink'];

var res = fs.readdirSync("/Users/ikipyegon/WebstormProjects/directory-tree-graphql-api", { withFileTypes: true }).map(d => {
    console.log(d)
    var cur = { name: d.name }
    for (var method of methods) cur[method] = d[method]()
    return cur
})
console.log(res)

console.table(res)