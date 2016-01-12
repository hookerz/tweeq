import { createStore } from 'redux';
import actions from './actions';

function reducer(state = [], action) {

  switch (action.type) {

    case actions.ADD_CONTROL:

      return state.concat({ label: action.label, value: action.value });

    case actions.REMOVE_CONTROL:

      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];

    default:

      return state;

  }

}

const store = createStore(reducer);

export { actions, reducer };
export default store;
