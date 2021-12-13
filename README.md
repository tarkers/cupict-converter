# CuPict Converter

## About Cupict 
CuPict is a tool of supporting combinatorial tesing for Cucumber.

Visit [Microsoft PICT](https://github.com/Microsoft/pict/blob/main/doc/pict.md) to see more information about PICT and [Cucumber](https://github.com/cucumber/cucumber-js/blob/HEAD/CONTRIBUTING.md) to know more about a BDD Feature file.

## Setup
```
npm i cupict-converter
```

## Basic Usage
```javascript
const Converter =require('cupict-converter')
const inputpath="<your input feature path>"
const outputpath="<your output feature path>"
const converter=new Converter(inputpath,outputpath)
converter.ConvertFeature()
```

## Input feature file
### Use the style <font color="red"> Given PICT </font> to write MS PICT plain-text model. See more Gherkin usage:[cucumber studio](https://cucumber.io/docs/gherkin/reference/)
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

## Output feature file
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
## Using Cupict With Cucumber Studio
See [cucumber CI in 5 minutes](https://cucumber.io/tools/cucumberstudio/ci-in-5-minutes-flat/) for more information about Cucumber CI.

### 1. Sign up for Cucumber Studio
[cucumber studio](https://cucumber.io/) 

### 2. Type the scenerio
![](https://i.imgur.com/DYq25pH.png)

### 3. Select Javascript and download the files
![](https://i.imgur.com/eRsFHIe.png)

### 4. Convert the feature file 
Use CuPict to generate new feature files

### 5.(Optional) Update new feature files to Cucumber Studio in order to set test run cases
![](https://i.imgur.com/BRB2NuL.png)

#### hps-cucumber-javascript 
[hps-cucumber-javascript](https://github.com/hiptest/hps-cucumber-javascript) is the api for connecting with Cucumber Studio 
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
### 5. Write the step-definition
* Put the step-definition file under features folder
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
### 6. Run the test cases
* If you want to generate report for Cucumber Studio
```
# generate report
    node_modules/.bin/cucumber-js --format=json | node_modules/cucumber-junit/bin/cucumber-junit --features-as-suites > junit_output.xml

# push to Cucumber Studio
    hiptest-publisher -c hiptest-publisher.conf - --push=junit_output.xml --test-run-id=<test-run-id>
```
* If you just want to run and get report locally
```
 node_modules/.bin/cucumber-js --publish
```

    





