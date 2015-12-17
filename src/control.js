import element from 'virtual-element';
import emitter from 'component-emitter';
import assert from './assert';

const extensions = [];

/**
 * Register a control view.
 *
 * @param factory
 * @param filter
 *
 */
export function extend(factory, filter) {

  extensions.push({ factory, filter });

}

/**
 * Create a new control.
 *
 * @param label - The label of the control.
 * @param value - The value of the control.
 *
 */
export default function(options, ...rest) {

  let label, value;

  // Normalize the arguments.

  if (typeof options === 'string') {

    label = options;
    value = rest[0];

    options = { label, value };

  } else {

    label = options.label;
    value = options.value;

  }

  // Construct a new control that extends event emitter.

  const control = Object.create(emitter.prototype, {

    value: { get: getter, set: setter, enumerable: true }

  });

  // Search the control registry for a view that can render/modify this value.

  const ext = extensions.find(ext => ext.fit(value));

  assert(ext, `Unrecognized value ${ value }. You need to register a view that fits this value.`);

  /**
   * Get the value of the control.
   */
  function getter() {

    return value;

  }

  /**
   * Set the value of the control.
   */
  function setter(next) {

    // Use the original registration to make sure the new value fits.
    assert(ext.fit(next), `Invalid value ${ next } for this control.`);

    // Only emit meaningful change events.
    // TODO handle nested equality like { x, y, z };
    if (next === value) return;

    value = next;
    control.emit('change', value);

  }

  /**
   * Used by deku to render the container.
   */
  control.render = function render() {

    return element(ext.factory, { control });

  }

  return control;

}
