import { element as el } from 'deku';

function fit(value) {

  return typeof value === 'function';

}

function render(model) {

  const { name, value } = model;

  const $label = el('label', null, name);

  return el('div', { class: 'tweeq-control clickable', onClick: value }, $label);

}

export default { fit, render };
