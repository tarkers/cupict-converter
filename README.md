# Cupict Converter

## About Cupict 
It's the  converter for supporting cucumber feature file with PICT to **generate mutiple test cases more easily**.

Visit [Microsoft Pict](https://github.com/Microsoft/pict/blob/main/doc/pict.md) to see more information about pict and [cucumber](https://github.com/cucumber/cucumber-js/blob/HEAD/CONTRIBUTING.md) to know more about the feature pickle transformation

## Setup
```
npm i cupict-converter
```

## Basic Usage
give the feature file path you want to modify and than output the new file to the place you want
```javascript
const Converter =require('cupict-converter')
const inputpath="<your input feature path>"
const outputpath="<your output feature path>"
const converter=new Converter(inputpath,outputpath)
converter.ConvertFeature()
```

## Our Cupict feature format
### At Line 14 <font color="red"> Given PICT </font> is our keyword
see more gherkin usage:[cucumber studio](https://cucumber.io/docs/gherkin/reference/)
```gherkin
Feature: Make order?
    how to make the order
    Scenario Outline: Prepare Scenario
        Given  a Menu
        When order Appetizer : "<Appetizer>"
        Then order Main course:  "<Main>"
        Then order Beverage: "<Beverage>"
        Then Meal done
        Given  PICT
            """
            Appetizer: Soup,Salad,Entree  
            Main: Fish,Vegetable,Steak,Pork
            Beverage: Coffee ,Tea ,Soft Drinks,Wine,None
            """
```

## After Transform
```gherkin
Feature: Make order?
    how to make the order
    Scenario Outline: Prepare Scenario
        Given  a Menu
        When order Appetizer : "<Appetizer>"
        Then order Main course:  "<Main>"
        Then order Beverage: "<Beverage>"
        Then Meal done
        Examples:
            | Appetizer | Main      | Beverage    |
            | Soup      | Steak     | None        |
            | Soup      | Vegetable | Tea         |
            | Salad     | Steak     | Wine        |
            | Entree    | Vegetable | Wine        |
            | Entree    | Fish      | None        |
            | Entree    | Steak     | Coffee      |
            | Salad     | Pork      | None        |
            | Soup      | Pork      | Soft Drinks |
            | Entree    | Pork      | Tea         |
            | Salad     | Vegetable | Soft Drinks |
            | Soup      | Vegetable | Coffee      |
            | Entree    | Fish      | Soft Drinks |
            | Salad     | Pork      | Coffee      |
            | Salad     | Steak     | Tea         |
            | Soup      | Pork      | Wine        |
            | Salad     | Fish      | Coffee      |
            | Soup      | Vegetable | None        |
            | Soup      | Fish      | Wine        |
            | Soup      | Fish      | Tea         |
            | Soup      | Steak     | Soft Drinks |
```
## Cupict With Cucumber Studio
for more information:[cucumber CI in 5 minutes](https://cucumber.io/tools/cucumberstudio/ci-in-5-minutes-flat/)

### 1.Sign up for CucumberStudio
link: [cucumber studio](https://cucumber.io/) 

### 2. type the scenerio
![](https://i.imgur.com/DYq25pH.png)

### 3. select javascript and download the files
![](https://i.imgur.com/eRsFHIe.png)
### 4. Convert the feature file 
use our converter to generate new feature files
### 5.(optional) update new feature file to CucumberStudio in orderto   set test run cases
![](https://i.imgur.com/BRB2NuL.png)

#### hps-cucumber-javascript 
[hps-cucumber-javascript](https://github.com/hiptest/hps-cucumber-javascript) is the api to for connecting with CucumberStudio 
```
 rvm install 2.3
 rvm use 2.3
 gem install hiptest-publisher
```
* some command work with hiptest-publisher
```
#  connect to specific test-run id which is at test-run url to get the test case to run 
    hiptest-publisher -c hiptest-publisher.conf  --only=features,step_definitions --test-run-id=<test-run-id>

# update yaml to generate new unique step ids
    hiptest-publisher -c .\hiptest-publisher.conf --actionwords-signature

# update the test files (like features,step definition file)  without change the actionword file
    hiptest-publisher -c  .\hiptest-publisher.conf --without=actionwords 

#  push the test case result to cucumber studio after running the test
    hiptest-publisher -c hiptest-publisher.conf - --push=junit_output.xml --test-run-id=<test-run-id>
```
### 5. write the step-definition
* put the step-definition file under features folder
```
feature
    |_step-definition.js
    ...
```
* step definition example
```javascript
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
Before(async function (scenario) {
    // ./actionwords.js is the file to do real work
    this.actionwords = Object.create(require('./actionwords.js').Actionwords);
    await this.actionwords.chromeDriver()
});

After(function (scenario) {
    this.actionwords = null;
});


Given(/^chrome driver$/,{ timeout: 20 * 1000 }, async function () {
    await this.actionwords.chromeDriver();
    
});

Given(/^GoogleForm Page$/,{ timeout: 10 * 1000 }, async function () {
    await this.actionwords.googlePage();
    
});
.........
...
```
### 6. run the test cases
* if you want to generate report for cucumber studio
```
# generate report
    node_modules/.bin/cucumber-js --format=json | node_modules/cucumber-junit/bin/cucumber-junit --features-as-suites > junit_output.xml

#push to CucumberStudio
    hiptest-publisher -c hiptest-publisher.conf - --push=junit_output.xml --test-run-id=<test-run-id>
```
* if you just want to run in local and get report
```
 node_modules/.bin/cucumber-js --publish
```

    





