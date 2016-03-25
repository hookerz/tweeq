import { element as el } from 'deku';
import vent from '../events';

function fit(value) {

  return Number.isFinite(value);

}

function render({ name, value, meta, update }) {

  let onChange = function(event) {

    let n = Number.parseFloat(event.target.value);
    update(Number.isNaN(n) ? value : n);

  }

  let onDrag = function(event, target) {

    let bounds = target.getBoundingClientRect();
    let offset = event.pageY - (bounds.top + bounds.height * 0.5);

    // If the user didn't provide a step infer it from the initial value.
    let step = meta.step || (value * 0.01);

    // Flip the step if the value is negative, so dragging up still makes
    // the value less postive, and vice versa. This is more intuitive.
    if (value < 0) step = -step;

    update(value + offset * step);

  }

  let onMouseDown = function(event) {

    // Capture the initial event target.
    let target = event.currentTarget;

    let onMouseMove = event => onDrag(event, target);
    vent.on(window, 'mousemove', onMouseMove);

    let onMouseUp = event => vent.off(window, 'mousemove', onMouseMove);
    vent.once(window, 'mouseup', onMouseUp);

  }

  let label = el('label', null, name);
  let input = el('input', { type: 'text', value: value.toPrecision(2), onChange, onMouseDown });

  return el('div', { class: 'tweeq-control' }, label, input);

}

export default { fit, render };
