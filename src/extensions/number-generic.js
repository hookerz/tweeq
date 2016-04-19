import { element as el } from 'deku';
import { clamp, dragInteraction } from '../util';

function fit(value) {

  return Number.isFinite(value);

}

function render(model) {

  const $label = renderLabel(model);
  const $input = renderInput(model);

  return el('div', { class: 'tweeq-control' }, $label, $input);

}

export function renderLabel(model) {

  const { name } = model;

  return el('label', null, name);

}

export function renderInput(model) {

  const { value, meta, update } = model;

  const onChange = function(event) {

    const n = Number.parseFloat(event.target.value);
    update(Number.isNaN(n) ? value : n);

  }

  const { onMouseDown } = dragInteraction(function(offset, bounds) {

    const n = offset.y - bounds.height * 0.5;

    // If the user didn't provide a step infer it from the initial value.
    let step = meta.step || (value * 0.01);

    // Flip the step if the value is negative, so dragging up still makes
    // the value less postive, and vice versa. This is more intuitive.
    if (value < 0) step = -step;

    update(value + n * step);

  });

  return el('input', { type: 'text', value: value.toPrecision(2), onChange, onMouseDown });

}

export default { fit, render };
