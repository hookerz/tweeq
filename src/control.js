import emitter from 'component-emitter';
import * as util from './util';

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
export default function Control(target, name, meta = {}) {

  // If the name exists on the target object, the user wants us to use that
  // property as the control value. Otherwise they've passed the literal value.
  let value = target.hasOwnProperty(name) ? target[name] : target;

  // Start by looking for a view extension that can render the value.
  let view = extensions.find(ext => ext.fit(value, meta));
  if (view === undefined) throw new Error(`Unable to find a suitable control for ${ value }`);

  // Construct the control with its properties.
  let control = Object.create(emitter.prototype, {

    name: {
      value: name,
      writable: false,
      enumerable: true
    },

    meta: {
      value: Object.freeze(meta),
      writable: false,
      enumerable: true
    },

    value: {
      get: () => value,
      set: (next) => control.update(next),
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

    if (arguments.length < 1) {

      console.debug('forced render');

      rendered = null;
      control.emit('render');

    } else if (value !== next) {

      value = next;

      // Automatically update the property on the target, if it exists.
      if (target.hasOwnProperty(name)) target[name] = value;

      console.debug('natural render');

      rendered = null;
      control.emit('render');
      control.emit('change', value);

    }

  };

  /**
   * A simple wrapper for attaching a change event listener.
   */
  control.changed = function() {

    control.on('change', ...arguments);

  }

  /**
   * Deku method.
   */
  control.render = function(model) {

    if (!rendered) {

      console.group('rendering', name);

      let state = util.safeget(model.context, control, {});
      rendered = view.render(control, state);

      console.groupEnd();

    }

    return rendered;

  }

  return control;

}
