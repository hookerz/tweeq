import { element as el } from 'deku';

function fit(value) {

  return value === true || value === false;

}

function render({ name, value, update }) {

  let onClick = event => update(!value);

  let label = el('label', null, name);
  let input = el('input', { type: 'checkbox', checked: value });

  return el('div', { class: 'tweeq-control clickable', onClick }, label, input);

}

export default { fit, render };
