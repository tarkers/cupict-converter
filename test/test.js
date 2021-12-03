const Converter =require('../index.js')
const inputpath="./appium.feature"
const outputpath="./test.feature"
const converter=new Converter(inputpath,outputpath)
converter.ConvertFeature()