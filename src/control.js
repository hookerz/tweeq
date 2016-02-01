import emitter from 'component-emitter';
import { element as el } from 'deku';

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
 * @param name - The name of the control.
 * @param value - The value of the control.
 *
 */
export default function control(name, value, options) {

  if (options === undefined) options = {};

  // Before we do anything, look for a view extension that can render this
  // value. Reject it if we can't find one.
  let view = extensions.find(ext => ext.fit(value, options));
  if (view === undefined) throw new Error(`Unable to find a suitable control for ${ value }`);

  // Construct the control with its properties.
  let control = Object.create(emitter.prototype, {

    name: {
      value: name,
      writable: false,
      enumerable: true
    },

    value: {
      get: () => value,
      set: () => { throw new TypeError('Use control#update to modify the value of a control') },
      enumerable: true
    }

  });

  /**
   * Modify the value of the control directly.
   */
  control.update = function(next) {

    // TODO nested equivalency on a value like { x, y, z }.
    if (value !== next) {

      value = next;
      control.emit('change', value);
      control.emit('render');

    }

  };

  /**
   * A simple wrapper for attaching a change event listener.
   */
  control.changed = function() {

    control.on('change', ...arguments);

  }

  /**
   * Used by Deku to render the control.
   */
  control.render = function() {

    // Render the view using the custom Tweeq extension signature.
    return view.render(control, el);

  }

  return control;

}
