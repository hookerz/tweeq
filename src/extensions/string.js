function fit(value) {

  return typeof value === 'string';

}

function render(control, el) {

  let { name, value } = control;

  let onChange = event => control.update(event.target.value);

  let label = el('label', null, name);
  let input = el('input', { type: 'text', value, onChange });

  return el('div', { class: 'tweeq-control' }, label, input);

}

export default { fit, render };
