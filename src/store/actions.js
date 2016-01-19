import types from './types';

let nextID = 0;

export function create({ name, value }) {

  let id = nextID++;

  store.dispatch({ type: types.create, id, name, value });

  return id;

}

export function get(id) {

  return store.getState().controls.find(control => control.id === id);

}

export function update(id, { name, value }) {

  store.dispatch({ type: types.update, id, name, value });

  return id;

}

export default { create, get, update };
