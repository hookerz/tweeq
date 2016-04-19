import { element as el } from 'deku';

function fit(value) {

  return value === true || value === false;

}

function render(model) {

  const { name, value, update } = model;

  const onClick = event => update(!value);

  const $label = el('label', null, name);
  const $input = el('input', { type: 'checkbox', checked: value });

  return el('div', { class: 'tweeq-control tweeq-toggle', onClick }, $label, $input);

}

export default { fit, render };
