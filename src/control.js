import {EventEmitter} from 'events';

// A list of data type registrations. These are used to map values to views.
const registrations = [];

/**
 * Register a control view.
 *
 * @param view - A deku.js view object.
 * @param fit - A function that accepts a value, and returns true if the view
 *   can accept that type of value.
 *
 */
export function register(view, fit) {

  registrations.push({ view, fit });

}

/**
 * Create a new control.
 *
 * @param label - The label of the control.
 *
 */
export default function(label, value) {

  if (typeof label !== 'string') {

    let opts = label;
    label = opts.label;
    value = opts.value;

  }

  // inherit EventEmitter
  let obj = Object.create(EventEmitter.prototype);
  EventEmitter.call(obj);

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
