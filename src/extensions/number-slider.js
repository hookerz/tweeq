function fit(value, options) {

  return Number.isFinite(value)
    && options.hasOwnProperty('min')
    && options.hasOwnProperty('max')
    && Number.isFinite(options.min)
    && Number.isFinite(options.max);

}

function render(control, el) {

  let { name, value, options } = control;

  let onClick = event => {

    let relative = event.offsetX / event.currentTarget.clientWidth;
    let absolute = options.min + (options.max - options.min) * relative;

    control.update(absolute);

  }

  let onMouseMove = event => {

    if (event.buttons & 1) onClick(event);

  }

  let label = el('label', null, name);

  let background = el('div', { style: 'position: absolute; top: 0; left: 0; bottom: 0; right: 0; background: black;' });
  let foreground = el('div', { style: `position: absolute; top: 0; left: 0; bottom: 0; right: ${ 100 - (100 * ((value / options.max) - options.min)) }%; background: cyan;` });

  let slider = el('div', { style: 'flex: 1; position: relative', onClick, onMouseMove }, background, foreground);

  return el('div', null, label, slider);

}

export default { fit, render };
