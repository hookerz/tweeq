import Emitter from 'component-emitter';

/**
 * Create a new control.
 *
 * @param label - The label of the control.
 *
 */
export default function control(label, value) {

  if (typeof label !== 'string') {

    let opts = label;
    label = opts.label;
    value = opts.value;

  }

  // inherit emitter
  let obj = new Emitter();

  let reg = registrations.find(r => r.fit(value));

  // TODO better error messages
  if (!reg) throw new Error(`Unrecognized value ${value}`);

  let getter = () => value;
  let setter = (next) => {

    if (next === value) return;
    if (!reg.fit(value)) throw new Error('Invalid value.');

    value = next;
    obj.emit('change', value);

  }

  Object.defineProperties(obj, {

    view:  { value: reg.view },
    label: { value: label, enumerable: true },
    value: { get: getter, set: setter, enumerable: true }

  });

  return obj;

}
