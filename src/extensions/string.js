import { element as el } from 'deku';

function fit(value) {

  return typeof value === 'string';

}

function render({ name, value, update }) {

  let onChange = event => update(event.target.value);

  let label = el('label', null, name);
  let input = el('input', { type: 'text', value, onChange });

  return el('div', { class: 'tweeq-control' }, label, input);

}

export default { fit, render };
