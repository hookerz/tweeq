import { element as el } from 'deku';
import { dragInteraction } from '../util';

function fit(value) {

  return Number.isFinite(value);

}

function render({ name, value, meta, update }) {

  let onChange = function(event) {

    let n = Number.parseFloat(event.target.value);
    update(Number.isNaN(n) ? value : n);

  }

  let { onMouseDown } = dragInteraction((offset, bounds) => {

    let n = offset.y - bounds.height * 0.5;

    // If the user didn't provide a step infer it from the initial value.
    let step = meta.step || (value * 0.01);

    // Flip the step if the value is negative, so dragging up still makes
    // the value less postive, and vice versa. This is more intuitive.
    if (value < 0) step = -step;

    update(value + n * step);

  });

  let label = el('label', null, name);
  let input = el('input', { type: 'text', value: value.toPrecision(2), onChange, onMouseDown });

  return el('div', { class: 'tweeq-control' }, label, input);

}

export default { fit, render };
