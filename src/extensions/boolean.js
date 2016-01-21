function fit(value) {

  return value === true || value === false;

}

function render(control, el) {

  let { name, value } = control;

  let onClick = event => control.update(!value);

  let label = el('label', null, name);
  let input = el('input', { type: 'checkbox', checked: value });

  return el('div', { onClick }, label, input);

}

export default { fit, render };
