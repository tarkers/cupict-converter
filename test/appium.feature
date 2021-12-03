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