import clamp from 'lodash.clamp';
import vent from '../events';

function fit(value, options) {

  return Number.isFinite(value)
    && options.hasOwnProperty('min')
    && options.hasOwnProperty('max')
    && Number.isFinite(options.min)
    && Number.isFinite(options.max);

}

function render(control, el) {

  let { name, value, options } = control;

  let update = function(target) {

    let bounds = target.getBoundingClientRect();
    let offset = clamp(event.pageX, bounds.left, bounds.right) - bounds.left;

    let percent = offset / bounds.width;
    let absolute = options.min + (options.max - options.min) * percent;

    control.update(absolute);

  }

  let onClick = event => update(event.target.parentElement);

  let onMouseDown = event => {

    let target = event.target.parentElement;

    let onMouseMove = event => update(target);
    vent.on(window, 'mousemove', onMouseMove);

    let onMouseUp = event => vent.off(window, 'mousemove', onMouseMove);
    vent.once(window, 'mouseup', onMouseUp);

  }

  let controlLabel = el('label', null, name);
  let valueLabel = el('div', { style: 'position: absolute; left: 0; right: 0; text-align: center;' }, value.toPrecision(2));

  let background = el('div', { style: 'position: absolute; top: 0; left: 0; bottom: 0; right: 0; background: black;' });
  let foreground = el('div', { style: `position: absolute; top: 0; left: 0; bottom: 0; right: ${ 100 - (100 * ((value / options.max) - options.min)) }%; background: #4C6767;` });

  let slider = el('div', { style: 'flex: 1; position: relative', onClick, onMouseDown }, background, foreground, valueLabel);

  return el('div', null, controlLabel, slider);

}

export default { fit, render };
