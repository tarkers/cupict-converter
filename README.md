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
```javascript=
const Converter =require('cupict-converter')
const inputpath="<your input feature path>"
const outputpath="<your output feature path>"
const converter=new Converter(inputpath,outputpath)
converter.ConvertFeature()
```

## Our Cupict feature format
### At Line 14 <font color="red"> "Given PICT" </font> is our keyword
see more gherkin usage:[cucumber studio](https://cucumber.io/docs/gherkin/reference/)
```gherkin=
Feature: Phone Setting?
    to test the Phone Setting
    Scenario Outline: Test Setting
        Given  a Phone
        Then click Settings
        Then click Accessibility is
        Then click Display & Text Size
        When Bold Text  is "<Bclick>"
        When Button Shapes is "<Sclick>"
        When On/Off Labels is "<Oclick>"
        Then Increase Contrast is "<Iclick>"
        Then Smart Invert is "<Siclick>"
        Then Close App
        Given  PICT
            """
            Bclick: on,off
            Sclick: on,off
            Oclick: on,off
            Iclick: on,off
            Siclick: on,off
            """
        #specific case
        Examples:
            | Bclick | Sclick | Oclick | Iclick | Siclick |
            | on     | on     | on    | on    | on      |
```

## After Transform
```gherkin=
Feature: Phone Setting?
    to test the Phone Setting
    Scenario Outline: Test Setting
        Given  a Phone
        Then click Settings
        Then click Accessibility is
        Then click Display & Text Size
        When Bold Text  is "<Bclick>"
        When Button Shapes is "<Sclick>"
        When On/Off Labels is "<Oclick>"
        Then Increase Contrast is "<Iclick>"
        Then Smart Invert is "<Siclick>"
        Then Close App
        Examples:
            | Bclick | Sclick | Oclick | Iclick | Siclick |
            | on     | on     | off    | off    | on      |
            | off    | off    | on     | on     | off     |
            | on     | off    | on     | on     | on      |
            | off    | on     | off    | on     | off     |
            | on     | off    | on     | off    | off     |
            | off    | on     | on     | off    | on      |
            | off    | off    | off    | off    | off     |
        #specific case
        Examples:
            | Bclick | Sclick | Oclick | Iclick | Siclick |
            | on     | on     | on     | on     | on      |
```



