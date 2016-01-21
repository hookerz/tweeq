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
export default function control(options, ...rest) {

  // Normalize the arguments.
  if (typeof options === 'string') {

    let name = options;
    let value = rest[0];

    options = { name, value };

  }

  let { name, value } = options;

  // Construct the control with its properties.
  const control = Object.create(emitter.prototype, {

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

  const view = extensions.find(ext => ext.fit(value));
  if (view === undefined) throw new Error(`Unable to find a suitable control for ${ value }`);

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
   * Used by Deku to render the view.
   */
  control.render = function() {

    return view.render(control, el);

  }

  return control;

}
