import { createStore } from 'redux';
import types from './types';

// Assign some properties to a new object.
const assign = (...sources) => Object.assign({}, ...sources);

// The starting state of the store.
const initial = { controls: [], containers: [] };

// Our state reducer.
const reducer = (state = initial, action) => {

  // Every action has a type and ID.
  let { type, id } = action;

  if (type === types.createControl) {

    let controls = state.controls.concat({ id, name: action.name, value: action.value });

    return assign(state, { controls });

  } else if (type === types.updateControl) {

    // Construct an update object with only the properties provided by the action.
    let update = {};
    if (action.hasOwnProperty('name')) update.name = action.name;
    if (action.hasOwnProperty('value')) update.value = action.value;

    // Map the controls, updating the one with the matching ID.
    let controls = state.controls.map(control => {

      return control.id === id
        ? assign(control, update)
        : control;

    });

    return assign(state, { controls });

  } else if (type === types.parentControl) {

    // Map the containers, updating the one that is the parent.
    let containers = state.containers.map(container => {

      // If this is the parent container, add the child ID to the list of children.
      return container.id === action.parent
        ? assign(container, { children: container.children.concat(id) })
        : container;

    });

    return assign(state, { containers });

  } else if (type === types.orphanControl) {

    let containers = state.containers.map(container => {

      return container.id === action.parent
        ? assign(container, { children: container.children.filter(child => child.id === id) })
        : container;

    });

    return assign(state, { containers });

  } else if (type === types.createContainer) {

    let containers = state.containers.concat({ id, name: action.name });

    return assign(state, { containers });

  } else {

    return state;

  }

}

// Export the shared global state container.
export default createStore(reducer);
