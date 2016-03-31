import closed from './group-closed';
import opened from './group-opened';

function render(model) {

  let { state, update } = model;

  let toggle = () => {

    state.open = !state.open;
    update();

  }

  // Decorate the model with the toggle function.
  model = Object.assign(model, { toggle });

  if (state.open) {

    return opened.render(model);

  } else {

    return closed.render(model);

  }

}

export default { render };
