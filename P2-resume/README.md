# Project 2: Online Resume

## How to run
Navigate to the project directory and `python -m SimpleHTTPServer 1234`

## Features
- Bootstrap navbar
- CSS style changes
- Dynamically fill resume contents from JavaScript


## Notes
Thanks, Udacity coach, Susan!

1. Turns out polymer treats properties beginning with 'target-' in a different way. 

From the Polymer site: "When binding to style, href, class, for or data-* attributes, it is recommend that you use attribute binding syntax."
Basically, stick a dollar sign after the property name or it won't be inserted in your img element.`data-target$=`

See more in [data binding](https://www.polymer-project.org/1.0/docs/devguide/data-binding.html#attribute-binding)

2. For the css issue, you can use external stylesheets with Polymer, but you need to include the css link right after the open template element. I think that is rather a hack though. Polymer recommends using style modules instead.  See more about this in the Shared Styles and External CSS section of this document:

https://www.polymer-project.org/1.0/docs/devguide/styling.html
