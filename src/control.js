import emitter from 'component-emitter';

/**
 * Create a new control.
 *
 * @param label - The label of the control.
 *
 */
function control(label, value) {

  if (typeof label !== 'string') {

    let opts = label;
    label = opts.label;
    value = opts.value;

  }

  // inherit emitter
  const obj = Object.create(emitter);

  const registration = registrations.find(r => r.fit(value));
  if (!registration) throw new Error(`Unrecognized value ${ value }`);

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
    if (!registration.fit(value)) throw new Error(`Invalid value ${ next }`);

    // Only emit meaningful change events.
    // TODO handle nested equality like { x, y, z };
    if (next === value) return;

    value = next;
    obj.emit('change', value);

  }

  Object.defineProperty(obj, 'value', { get: getter, set: setter, enumerable: true });

  /**
   * Used by deku to render the container.
   */
  function render() {

    return element(view, { label, value });

  }

  return obj;

}

export default control;
