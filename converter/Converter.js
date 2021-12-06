// JavaScript
const Gherkin = require('@cucumber/gherkin')
const Messages = require('@cucumber/messages')
const jp = require('jsonpath');
const colors = require('colors');
const pict = require('./Pict').pict
const TransformMode = require('./TransformMode/Mode.json')
const FeatureWrite = require("./FeatureWrite")
const FeatureRead = require("./FeatureRead")
/* Main Class to Convert the feature file */
class CupictConverter {
    // take the path 
    constructor(inputpath,outputpath) {
        let _matcher = new Gherkin.GherkinClassicTokenMatcher() // or Gherkin.GherkinInMarkdownTokenMatcher()
        let _builder = new Gherkin.AstBuilder(Messages.IdGenerator.uuid())
        this.parser = new Gherkin.Parser(_builder, _matcher)
        this.nowLine = 0;
        this.featureRead = new FeatureRead(inputpath)
        this.FeatureWrite = new FeatureWrite(this.featureRead.lines,outputpath)
    }
    ConvertFeature() {
        const _gherkinDocument = this.parser.parse(this.featureRead.featureStr)
        this.GetDataTables(_gherkinDocument)
    }
    // this is the function for various transformation
    GetDataTables(gherkinDocument) {
        const scenarioSteps = jp.query(gherkinDocument, '$..steps');
        scenarioSteps.forEach(steps => {
            steps.forEach(step => {
                if (step['keyword'] == "Given " && step["text"] == TransformMode.Pict) {
                    //check Pict line Place
                    const pictData = jp.query(step, "$..content")   
                    const _originline=jp.query(step, "$.location.line")[0]
                    const locationLine = _originline - this.nowLine - 1; 
                    const contentLines = pictData[0].split("\n").length + 2;
                    const testCase = pict(pictData[0]).testCases
                    if (testCase == undefined) {
                        console.log(`PictData Format Error at Block ${_originline}`.yellow)
                    } else {
                        const examplewriting = this.ExampleWriting(testCase)
                        this.FeatureWrite.WriteExamples(locationLine, contentLines, examplewriting);
                    }

                }
            })

        });
        this.FeatureWrite.WriteEnd();
    }
    // to Change Pict format to Cucumber Table
    ExampleWriting = (testCase) => {
        const DataKeyMapping = (keys) => {
            let _TableHeader = "|";
            keys.forEach(key => {
                _TableHeader += `${key}|`
            });
            return _TableHeader;
        }
        const TableHeader = DataKeyMapping(Object.keys(testCase[0]));
        var TableBody = "";
        testCase.forEach(obj => {
            const all_value = Object.values(obj);
            TableBody += "|"
            all_value.forEach(val => {
                TableBody += val + "|"
            });
            TableBody += "\n";
        });
        return `Examples:\n${TableHeader}\n${TableBody}`;
    }
}
module.exports = CupictConverter

