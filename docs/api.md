# API

---

## Groups

### tweeq(\[controls...\]\[, options\]) -> Group

Construct a new tweeq group. Groups are collections of tweeq controls.

```javascript
let emptyGroup = tweeq();
let namedGroup = tweeq({ name: 'game settings' });
let filledGroup = tweeq(fovCtrl, aspectCtrl, { name: 'camera settings' });)
```

#### options.name

The name of the group.

#### options.color

The color of the group. This is used to show hierarchy when multiple groups are nested in each other. If you don't provide one, tweeq will pick a nice bright color for you. 

### Group#add(controls...)

Add one or more tweeq controls to the group.

### Group#remove(controls...)

Remove one or more tweeq controls from the group.

### Group#children -> Array

Get a copy of the list of controls in the group. Modifiying this directly won't change the controls in the group; use `add` or `remove` for that.

### Group#mount(element)

Mount a group of controls on a [DOM Element](https://developer.mozilla.org/en-US/docs/Web/API/Element). This will start rendering the controls as part of the page, and give you a GUI to interact with them.

```javascript
let toppings = { pepperoni: true, mushrooms: false };

let group = tweeq('toppings');
group.add(toppings, 'pepperoni');
group.add(toppings, 'mushrooms');

group.mount(document.getElementById('#toppings-controls'));
```

### Group#unmount(element)

Unmount a group from the a [DOM Element](https://developer.mozilla.org/en-US/docs/Web/API/Element). If the group isn't mounted on the element, nothing happens.

---

# Controls

### tweeq.control(value, name\[, metadata\]) -> Control

Create a new control. The `value` can be just about anything, as long as there is an extension that can display it. [See the list of default extensions]() to see what is supported out of the box.

If the `value` is an object, tweeq will look for the `name` as a property. This is the data-binding syntax and you don't have to listen for change events.

```javascript
let toppings = { pepperoni: true };
let pepperoniControl = tweeq.control(toppings, 'pepperoni');

// Any changes (directly, or through the view) are automatically applied.
pepperoniControl.update(false);
toppings.pepperoni === false; 
```

If the `value` is a primative, or the `name` isn't a property of the `value` object, the value itself is modified and you'll need to listen for change events.

```javascript
let colorControl = tweeq.control('#ff0000', 'color');

// The value is a primitive, so the control can only notify you of the change.
colorControl.on('change', value => console.log(value));
```

#### metadata.?

Each extension has its own set of metadata that it will look for. [See the list of default extensions]() for their names.

### Control#name : String

Get the name of the control.

```javascript
let foobar = tweeq.control(true, 'foobar');
foobar.name === 'foobar';
```

### Control#value : ?

Get or set the current value of the control.

```javascript
let foobar = tweeq.control(true, 'foobar');
// Get the value...
foobar.value === true;
// or set it.
foobar.value = false;
```

### Control#meta : Object

Get the metadata. The metadata is frozen when you create the control.

```javascript
let cats = tweeq.control(10, 'cats i own', { min: 0, max: 100 });
cats.meta.min === 0;
cats.meta.max === 100;

try {
  cats.meta.max = 1000;
} catch(e) {
  // The metadata object is frozen. How many cats do you need?
}
```
