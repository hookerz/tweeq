# Tweeq

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

    gulp build

Now just navigate to the example you want to run, install its dependencies, and run the start script.

    cd ./examples/basic
    npm install && npm start

This will host the example on a local web server and should automatically open a browser window for you.
