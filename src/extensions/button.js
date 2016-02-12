function fit(value) {

  return typeof value === 'function';

}

function render(control, el) {

  let { name, value } = control;

  let label = el('label', null, name);

  return el('div', { class: 'tweeq-control clickable', onClick: value }, label);

}

export default { fit, render };
