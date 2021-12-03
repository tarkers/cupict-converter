const fs = require('fs');
// Store the Feature File to specific place
class FeatureWrite {
    constructor(featureLines, outputpath) {    
        this.writerStream = fs.createWriteStream(outputpath);
        this.featureLines = featureLines;
        this.lastStopLine = 0;
        this.writerStream.on('finish', function () {
            console.log("寫入完成。");
        });
        this.writerStream.on('error', function (err) {
            console.log("錯誤:", err.stack);
        });
    }
    WriteExamples(pictDataStartLine, contentLines, exampleContent) {
        for (let i = 0; i < pictDataStartLine - this.lastStopLine; ++i) {
            const line = this.featureLines.shift();
            this.writerStream.write(line + "\n", 'UTF8');
            this.test++;
        }
        let _lineCutOff = contentLines + 1
        this.featureLines.splice(0, _lineCutOff)
        this.lastStopLine = pictDataStartLine + _lineCutOff;
        this.writerStream.write(exampleContent, 'UTF8');
    }
    WriteEnd() {
        this.featureLines.forEach(line => {
            this.writerStream.write(`${line}\n`, 'UTF8')
        });
        this.writerStream.end();
    }

}
module.exports = FeatureWrite