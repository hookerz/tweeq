## Extensions

tweeq has a full-featured extension API for controlling new types of values. In fact, all of the default control types are implemented as extensions.

### Default Extensions

When you install the `tweeq` package you already have some extensions available to you.

#### Button

The button extension fits function values.

A button control is rendered as a clickable button. Clicking the button calls the function value.

```javascript
const sayHello = () => alert('Hello!');
const control = tweeq.control(sayHello, 'say hello');
```

#### Toggle

The toggle extension fits `true` and `false` values. It doesn't attempt to coerce anything to those values, so make sure you're using the actual boolean primitives.

A toggle control will be rendered as a checkbox.

```javascript
const control = tweeq.control(true, 'freeroam camera');
```

#### String

The string extension fits any String primitives.

A string control is rendered as a text input.

```javascript
const control = tweeq.control('welcome to tweeq', 'title');
```

#### Number

The number extension fits any finite Number primitive.

`options.min` &mdash; The minimum value.
`options.max` &mdash; The maximum value.
`options.step` &mdash; The step to increment or round the value to.

A basic number control will be renderd as a text input.

```javascript
const basic = tweeq.control(1.0, 'scale');
```

You can also create a bounded range. In this case, the text input will be rendered next to a slider.

```javascript
const range = tweeq.control(30, 'timestep', { min: 30, max: 60, step: 5 });
```

#### Select

The select extension fits any value with `options.values` defined.

`options.values` &mdash; A list of alternative values (these will be coerced to strings in the dropdown view), or an object with named alternatives.

```javascript
const scales = { small: 0.2, meh: 1.0, uuge: 1.8, omg: 4.0 };
tweeq.control(scales.meh, 'scale', { values: scales });
```

```javascript
const pills = [ 'red', 'blue', 'popcorn colored' ];
tweeq.control(pills[0], 'neo\'s choice', { values: pills });
```

#### Color

The color extension fits an RGB hex string. It is rendered as an expandable HSV selector, with a preview of the color.

```javascript
tweeq.control('#ff0050', 'text color');
```
