function fit(value) {

  return typeof value === 'object';

}

function render(control, el) {

  let { name, value } = control;

  let onChange = event => {

    let selection = event.target.value;
    control.emit('change', value[selection]);

  }

  // Map the keys of the value object to <option> elements.
  let keys = Object.keys(value);
  let options = keys.map(key => el('option', null, key));

  // Construct the control.
  let label = el('label', null, name);
  let select = el('select', { onChange }, options);

  return el('div', { class: 'tweeq-control' }, label, select);

}

export default { fit, render }
