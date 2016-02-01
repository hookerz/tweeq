function fit(value, options) {

  return Number.isFinite(value)
    && options.hasOwnProperty('min')
    && options.hasOwnProperty('max')
    && Number.isFinite(options.min)
    && Number.isFinite(options.max);

}

function render(control, el) {

  let { name, value } = control;

  let onChange = event => control.update(event.target.value);

  let label = el('label', null, name);

  let background = el('div', { style: 'position: absolute; top: 0; left: 0; bottom: 0; right: 0; background: black;' });
  let foreground = el('div', { style: 'position: absolute; top: 0; left: 0; bottom: 0; right: 50%; background: cyan;' });

  let slider = el('div', { style: 'flex: 1; position: relative' }, background, foreground);

  return el('div', null, label, slider);

}

export default { fit, render };
