import types from './types';
import store from './index';

function* nextID() {

  let id = 0;
  while (true) yield id++;

}

export function get(id) {

  return store.getState().controls.find(control => control.id === id);

}

export function createControl({ name, value }) {

  let id = nextID();

  store.dispatch({ type: types.create, id, name, value });

  return id;

}

export function updateControl(id, { name, value }) {

  store.dispatch({ type: types.updateControl, id, name, value });

}

export function parentControl(id, parent) {

  store.dispatch({ type: types.parentControl, id, parent });

}

export function orphanControl(id, parent) {

  store.dispatch({ type: types.orphanControl, id, parent });

}

export function createContainer({ name }) {

  let id = nextID();

  store.dispatch({ type: types.createContainer, id, name });

  return id;

}

export default { get, createControl, updateControl, parentControl, orphanControl, createContainer };
