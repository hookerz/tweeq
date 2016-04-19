import { element as el } from 'deku';
import { clamp, dragInteraction } from '../util';
import vent from '../events';

function fit(value) {

  return Number.isFinite(value);

}

function render(model) {

  const { name, value, meta, update } = model;

  // True if the number is a bounded range.
  const bounded = Number.isFinite(meta.min) && Number.isFinite(meta.max);

  const $label = el('label', null, name);
  const children = [ $label ];

  if (bounded) {

    const clampedUpdate = value => update(clamp(meta.min, meta.max, value));
    const clampedModel = { name, value, meta, update: clampedUpdate };

    children.push(renderSlider(clampedModel), renderInput(clampedModel));

  } else {

    children.push(renderInput(model));

  }

  return el('div', { class: 'tweeq-control tweeq-number' }, children);

}

function renderInput(model) {

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

function renderSlider(model) {

  const { value, meta, update } = model;

  const { onClick, onMouseDown } = dragInteraction((offset, bounds) => {

    const normalized = clamp(0, bounds.width, offset.x) / bounds.width;
    const mapped = meta.min + (meta.max - meta.min) * normalized;

    update(mapped);

  });

  // Compute the value as a percentage of the total range.
  const percentage = 100 * (value - meta.min) / (meta.max - meta.min);

  const $background = el('div', { style: 'position: absolute; top: 0; left: 0; bottom: 0; right: 0;' });
  const $foreground = el('div', { style: `position: absolute; top: 0; left: 0; bottom: 0; right: ${ 100 - percentage }%;` });

  return el('div', { class: 'tweeq-number-slider', onClick, onMouseDown }, $background, $foreground);

}

export default { fit, render };
