# Tweeq

## Running the examples

To run the examples, first you'll need to install [budo](https://github.com/mattdesl/budo).

    npm install -g budo

Then just navigate to the example you want to run, install its dependencies, and run the start script.

    cd ./examples/basic
    npm install && npm start

This will host the example on a local web server and should automatically open a browser window for you. These examples reference the local (built) version of tweeq, so if you can run `gulp watch` in a seperate terminal and any edits to the tweeq source code will update the example page. This is the best way to do some iterative development on tweeq itself.
