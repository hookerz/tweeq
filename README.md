# Tweeq

[![version](https://img.shields.io/npm/v/tweeq.svg)](https://www.npmjs.com/package/tweeq)

## Example

```javascript
let geo = new three.BoxGeometry(1, 1, 1);
let mat = new three.MeshBasicMaterial({ color: 0xff0050 })
let cube = new three.Mesh(geo, mat);

let controls = tweeq();

// You can tweak the primitive properties of an object really easily.
controls.add(cube.material, 'wireframe');

// If the property is more complex, just listen for changes.
controls.add(1.0, 'scale').on('change', n => cube.scale.set(n, n, n));

// You can add a variety of controls.
controls.add(true,     'a boolean');
controls.add(() => {}, 'a button');
controls.add('foobar', 'a string');
```

## Running the examples

Before you can run the examples, you'll need to build the project.

```bash
gulp build
```

Now just navigate to the example you want to run, install its dependencies, and run the start script.

```bash
cd ./examples/basic
npm install && npm start
```

This will host the example on a local web server and should automatically open a browser window for you.

## Motivation

[dat.GUI](http://workshop.chromeexperiments.com/examples/gui) has been invaluable for us at [Hook](http://byhook.com), and tweeq owes everything to the simple but powerful idea in the dat.GUI project. Unfortunately it's a fact of life for web developers that our tooling and language change with the seasons. dat.GUI was first released in 2011, before npm, before browserify, before ES6. We wanted a more powerful and extensible framework for creating the wide variety of controls we need. We wanted a tool that worked _with_ modules, not against them. And we wanted to write it in a language that represents the future of javascript. We hope that our ideas offer a valuable iteration on dat.GUI.
