function fit(value, options) {

  return Number.isFinite(value)
    && options.hasOwnProperty('min')
    && options.hasOwnProperty('max')
    && Number.isFinite(options.min)
    && Number.isFinite(options.max);

}

// A place to maintain the dragging state of the view, between renders.
const dragging = new WeakMap();

function render(control, el) {

  let { name, value, options } = control;

  // The event listener that actually updates the control value. It finds the
  // position of the mouse within the slider as a percentage of the total width
  // and then applies it to the range of the value.
  let onClick = event => {

    let relative = event.offsetX / event.target.parentElement.clientWidth;
    let absolute = options.min + (options.max - options.min) * relative;

    control.update(absolute);

  }

  // A set of event listeners to make the slider draggable. We store the
  // draggable state of the view in the WeakMap so that it doesn't lose
  // scope between renders. To update the control, we just proxy the onClick
  // event listener.
  let onMouseDown = event => {

    dragging.set(control, true);

    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

  }

  let onMouseUp = event => {

    dragging.set(control, false);

    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('mousemove', onMouseMove);

  }

  let onMouseMove = event => {

    console.log(event);

    if (dragging.get(control)) onClick(event);

  }

  let controlLabel = el('label', null, name);
  let valueLabel = el('div', { style: 'position: absolute; left: 0; right: 0; text-align: center;' }, value.toPrecision(2));

  let background = el('div', { style: 'position: absolute; top: 0; left: 0; bottom: 0; right: 0; background: black;' });
  let foreground = el('div', { style: `position: absolute; top: 0; left: 0; bottom: 0; right: ${ 100 - (100 * ((value / options.max) - options.min)) }%; background: #4C6767;` });

  let slider = el('div', { style: 'flex: 1; position: relative', onClick, onMouseDown }, background, foreground, valueLabel);

  return el('div', null, controlLabel, slider);

}

export default { fit, render };
