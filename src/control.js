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
export function extend(view) {

  extensions.push(view);

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
  const control = Object.create(emitter.prototype);

  // Define the value as a read-only property of the control.
  Object.defineProperty(control, 'value', { value, writable: false, enumerable: true });

  // Search the control registry for a view that can render/modify this value.
  const view = extensions.find(view => view.fit(value));
  assert(view, `Unrecognized value ${ value }. You need to register a view that fits this value.`);

  /**
   * Set the value of the control.
   */
  control.update = function(next) {

    // Use the original view extension to make sure the new value fits.
    assert(view.fit(next), `Invalid value ${ next } for this control.`);

    // Only emit meaningful change events.
    // TODO handle nested equality like { x, y, z };
    if (next !== value) {

      value = next;
      control.emit('change', value);

    }

  }

  /**
   * Used by deku to render the container.
   */
  control.render = function() {

    return view.render(control, el);

  }

  return control;

}
