import { element as el } from 'deku';

function fit(value, meta) {

  return meta.hasOwnProperty('options');

}

function render({ name, value, meta, update }) {

  const { options } = meta;

  const onChange = function(event) {

    const selection = options[event.target.value];
    update(selection);

  }

  // Map the keys of the value object to <option> elements.
  const keys = Object.keys(options);
  const views = keys.map(key => el('option', { selected: value === options[key] }, key));

  // Construct the control.
  const $label = el('label', null, name);
  const $select = el('select', { onChange }, views);

  return el('div', { class: 'tweeq-control' }, $label, $select);

}

export default { fit, render }
