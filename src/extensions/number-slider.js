import { element as el } from 'deku';
import { clamp, dragInteraction } from '../util';
import vent from '../events';

function fit(value, meta) {

  return Number.isFinite(value)
    && meta.hasOwnProperty('min')
    && meta.hasOwnProperty('max')
    && Number.isFinite(meta.min)
    && Number.isFinite(meta.max);

}

function render({ name, value, meta, update }) {

  let { min, max } = meta;

  let { onClick, onMouseDown } = dragInteraction((offset, bounds) => {

    let normalized = clamp(0, bounds.width, offset.x) / bounds.width;
    let mapped = min + (max - min) * normalized;

    update(mapped);

  });

  let label = el('label', null, name);

  // Compute the value as a percentage of the total range.
  let percentage = 100 * (value - min) / (max - min);

  let background = el('div', { style: 'position: absolute; top: 0; left: 0; bottom: 0; right: 0;' });
  let foreground = el('div', { style: `position: absolute; top: 0; left: 0; bottom: 0; right: ${ 100 - percentage }%;` });

  let slider = el('div', { class: 'tweeq-slider clickable', onClick, onMouseDown }, background, foreground);

  return el('div', { class: 'tweeq-control' }, label, slider);

}

export default { fit, render };
