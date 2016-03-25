import { element as el } from 'deku';

function fit(value, meta) {

  return meta.hasOwnProperty('options');

}

function render({ name, value, meta, update }) {

  let { options } = meta;

  let onChange = event => {

    let selection = options[event.target.value];
    update(selection);

  }

  // Map the keys of the value object to <option> elements.
  let keys = Object.keys(options);
  let views = keys.map(key => el('option', { selected: value === options[key] }, key));

  // Construct the control.
  let label = el('label', null, name);
  let select = el('select', { onChange }, views);

  return el('div', { class: 'tweeq-control' }, label, select);

}

export default { fit, render }
