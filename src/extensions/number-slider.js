import { element as el } from 'deku';
import { clamp, dragInteraction } from '../util';
import * as numberGeneric from './number-generic';
import vent from '../events';

function fit(value, meta) {

  return Number.isFinite(value)
    && meta.hasOwnProperty('min')
    && meta.hasOwnProperty('max')
    && Number.isFinite(meta.min)
    && Number.isFinite(meta.max);

}

function render(model) {

  const { name, value, meta, update } = model;
  const { min, max } = meta;

  const { onClick, onMouseDown } = dragInteraction((offset, bounds) => {

    const normalized = clamp(0, bounds.width, offset.x) / bounds.width;
    const mapped = min + (max - min) * normalized;

    update(mapped);

  });

  const $label = el('label', null, name);

  // Compute the value as a percentage of the total range.
  const percentage = 100 * (value - min) / (max - min);

  const $background = el('div', { style: 'position: absolute; top: 0; left: 0; bottom: 0; right: 0;' });
  const $foreground = el('div', { style: `position: absolute; top: 0; left: 0; bottom: 0; right: ${ 100 - percentage }%;` });
  const $slider = el('div', { class: 'tweeq-slider clickable', onClick, onMouseDown }, $background, $foreground);

  const clampedUpdate = value => update(clamp(min, max, value));
  const $input = numberGeneric.renderInput({ name, value, meta, update: clampedUpdate });

  return el('div', { class: 'tweeq-control' }, $label, $slider, $input);

}

export default { fit, render };
