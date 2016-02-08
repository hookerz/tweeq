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

  extensions.unshift(view);

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

    options: {
      value: Object.freeze(options),
      writable: false,
      enumerable: true
    },

    value: {
      get: () => value,
      set: () => { throw new TypeError('Use control#update to modify the value of a control') },
      enumerable: true
    }

  });

  // Keep a reference to the rendered view. This will get wiped out when the
  // value is udpated.
  let rendered = null;

  /**
   * Modify the value of the control directly.
   */
  control.update = function(next) {

    // TODO nested equivalency on a value like { x, y, z }.
    if (value !== next) {

      value = next;

      // Wipe out the cached view so it can be rendered with the updated value.
      rendered = null;

      // Notify the user of the change.
      control.emit('change', value);

      // Notify the parent container that its tree needs to be rendered.
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

    if (!rendered) rendered = view.render(control, el);
    return rendered;

  }

  return control;

}
