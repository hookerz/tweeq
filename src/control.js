import emitter from 'component-emitter';
import actions from './store/actions';
import store from './store';

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

  const id = actions.createControl({ name: options.name, value: options.value });

  const control = Object.create(emitter.prototype, {

    id: {
      value: id,
      writable: false,
      enumerable: false
    },

    name: {
      get: () => actions.get(id).name,
      set: () => { throw new Error() },
      enumerable: true
    },

    value: {
      get: () => actions.get(id).value,
      set: () => { throw new Error() },
      enumerable: true
    }

  });

  control.update = function(next) {

    actions.updateControl(id, { value: next });

  };

  // Track the previous value so we can emit meaningful events.
  let previous = options.value;

  store.subscribe(function() {

    if (control.value !== previous) {

      previous = control.value;
      control.emit('change', control.value);

    }

  });

  return control;

}
