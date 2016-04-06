## API

### Group

`tweeq([options]) -> Group`

`tweeq.group([options]) -> Group`

Construct a new tweeq group. Groups are collections of tweeq controls, and can be added to the page as a GUI.

Returns a `Group`.

```javascript
tweeq({ name: 'camera settings' });
tweeq({ name: 'particle settings', color: '#ff0050' });
```

###### `options.name : String`

The name of the group.

###### `options.color : String`

The color of the group, as a hex string (`#ff0050`). This is used to show hierarchy when multiple groups are nested in each other. If you don't provide one, tweeq will pick a nice bright color for you.

### Group#control

`Group#control(value, name [, options]) -> Control`

A helper method to create a new `Control` and add it to the group. This is equivalent to `group.add(tweeq.control(...))`. See the [control constructor](todo) for more documentation.

Returns the new `Control`.

### Group#add

`Group#add(controls) -> Group`

`Group#add(a, b, ...) -> Group`

Add one or more tweeq controls to the group. You can pass an array of controls, or each control as an argument.

Returns the same `Group`.

### Group#remove

`Group#remove(controls) -> Group`

`Group#remove(a, b, ...) -> Group`

Remove one or more tweeq controls from the group. You can pass an array of controls, or each control as an argument.

Returns the same `Group`.

### Group#mount

`Group#mount(element)`

Mount a group on a [DOM Element](https://developer.mozilla.org/en-US/docs/Web/API/Element). This will start rendering the controls using their views.

```javascript
const toppings = { pepperoni: true, mushrooms: false };

const group = tweeq({ name: 'toppings' });
group.control(toppings, 'pepperoni');
group.control(toppings, 'mushrooms');

group.mount(document.getElementById('#toppings-controls'));
```

### Group#unmount

`Group#unmount(element)`

Unmount a group from a [DOM Element](https://developer.mozilla.org/en-US/docs/Web/API/Element). If the group isn't mounted on the element, nothing happens.

### Group#name

`Group#name -> String`

Get the name of the group. This is a read-only getter.

### Group#color

`Group#color -> String`

Get the color of the group. This is a read-only getter.

### Group#children

`Group#children -> Array`

Get a copy of the list of controls in the group. Modifiying this directly won't change the controls in the group; use `Group#add` or `Group#remove` for that.

This is a read-only getter.

```javascript
// Remove all of the children in a group.
group.remove(group.children);
```

### Control

`tweeq.control(value, name [, options]) -> Control`

Create a new control. The `value` can be just about anything, as long as there is an extension that can display it. [See the list of default extensions](todo) to see what is supported out of the box. If there are no extensions that fit the value, an error will be thrown.

If the `value` is an object, tweeq will look for the `name` as a property. This is the data-binding syntax and you don't have to listen for change events.

```javascript
const toppings = { pepperoni: true };
const control = tweeq.control(toppings, 'pepperoni');

// Any changes (directly, or through the view) are automatically applied.
control.update(false);
toppings.pepperoni === false; 
```

If the `value` is a primative, or the `name` isn't a property of the `value` object, the value itself is modified and you'll need to listen for change events.

```javascript
const log = console.log.bind(console);

// The value is a primitive, so the control can't do any data binding.
const color = tweeq.control('#ff0000', 'color');
color.on('change', log));

// The value is an object, but the name is not a property of it.
const vector = tweeq.control({ x: 0, y: 0, z: 0 }, 'vector');
vector.on('change', log);
```

###### options.?

Each extension has its own set of options that it will look for. [See the list of default extensions]() for their names.

### Control#update

`Control#update(value) -> Control`

Update the value of the control. This will cause the control to apply any data-binding, if appropriate, and emit a `change` event. It will also update the view if the control is in a mounted group.

Returns the same `Control`.

### Control#name

`Control#name -> String`

Get the name of the control. This is a read-only getter.

```javascript
const foobar = tweeq.control(true, 'foobar');
foobar.name === 'foobar';
```

### Control#value

`Control#value -> ?`

Get or set the current value of the control. The setter is a proxy for `Control#update`.

```javascript
const foobar = tweeq.control(true, 'foobar');
// Get the value...
foobar.value === true;
// or set it.
foobar.value = false;
```

### Control#options

`Control#options -> Object`

Get the options. The options object is frozen when you create the control. This is a read-only getter.

```javascript
let cats = tweeq.control(10, 'cats i own', { min: 0, max: 100 });
cats.options.min === 0;
cats.options.max === 100;

// The options object is frozen. How many cats do you need?
try { cats.options.max = 1000 } catch(e) {}
```
