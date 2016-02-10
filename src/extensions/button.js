function fit(value) {

  return typeof value === 'functon';

}

function render(control, el) {

  let { name, value } = control;

  let label = el('label', null, name);

  return el('div', { class: 'tweeq-control', onClick: value }, label);

}

export default { fit, render };
