const fs = require('fs')
const path = require("path");

function readText(filename){
    var array = [];
    var textPath = path.resolve(path.join(__dirname, filename));
    var contents = fs.readFileSync(textPath).toString().split("\n");
    for(i in contents) {
        array.push(contents[i]);
    }
    return array
}
module.exports.readText = readText;