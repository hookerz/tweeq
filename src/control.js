import {EventEmitter} from 'events';

export default function(label, value) {

  // inherit EventEmitter
  let obj = Object.create(EventEmitter.prototype);
  EventEmitter.call(obj);

  switch (typeof value) {

    case 'undefined':
      Object.assign(obj, { type: 'button', label });
      break;

    case 'number':
      Object.assign(obj, { type: 'number', label, value });
      break;

    case 'boolean':
      Object.assign(obj, { type: 'toggle', label, value });
      break;

    case 'string':
      Object.assign(obj, { type: 'text', label, value });
      break;

    default: throw new Error('unrecognized control type');

  }

  return obj;

}
