"use strict";
const fs = require('fs');
//Read the InputPath
class FeatureRead {
    constructor(inputpath) {
        this.featureStr = fs.readFileSync(inputpath, 'utf8');
        this.lines = this.featureStr.split(/\r?\n/);
        if (this.lines.length > 0 && this.lines[this.lines.length - 1].trim() === '') {
            this.lines.pop();
        }
    }
}
module.exports = FeatureRead