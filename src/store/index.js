import { createStore } from 'redux';
import types from './types';

// Assign some properties to a new object.
const assign = (...sources) => Object.assign({}, ...sources);

// The starting state of the store.
const initial = { controls: [] };

// Our state reducer.
const reducer = (state = initial, action) => {

  let { type } = action;

  if (type === types.create) {

    let { id, name, value } = action;

    // Append the new control.
    let controls = state.controls.concat({ id, name, value });

    return { controls };

  } else if (type === types.remove) {

    let { id } = action;

    // Filter out the control.
    let controls = state.controls.filter(control => control.id !== id);

    return { controls };

  } else if (type === types.update) {

    let { id, name, value } = action;

    let updates = {};
    if (name) updates.name = name;
    if (value) updates.value = value;

    // Map the controls, updating the one with the matching ID.
    let controls = state.controls.map(control => control.id === id ? assign(control, updates) : control);

    return { controls };

  } else {

    return state;

  }

}

// Export the shared global state container.
export default createStore(reducer);
