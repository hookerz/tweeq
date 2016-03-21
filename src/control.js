import emitter from 'component-emitter';

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
export default function(target, name, meta = {}) {

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

      // Automatically update the property on the target, if it exists.
      if (target.hasOwnProperty(name)) target[name] = value;

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
  control.render = function(model) {

    let uniqref = model.context[this] || Symbol();
    model.context[this] = uniqref;

    if (!rendered) rendered = view.render(control, uniqref);
    return rendered;

  }

  return control;

}
