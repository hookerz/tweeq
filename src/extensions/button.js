function fit(value) {

  return value === undefined;

}

function render(control, el) {

  let { name, value } = control;

  let onClick = event => control.emit('change');

  let label = el('label', null, name);

  return el('div', { class: 'tweeq-control', onClick }, label);

}

export default { fit, render };
