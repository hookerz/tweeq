import { element as el } from 'deku';

function fit(value) {

  return typeof value === 'string';

}

function render({ name, value, update }) {

  const onChange = event => update(event.target.value);

  const $label = el('label', null, name);
  const $input = el('input', { type: 'text', value, onChange });

  return el('div', { class: 'tweeq-control' }, $label, $input);

}

export default { fit, render };
