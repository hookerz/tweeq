import { element as el } from 'deku';

export function renderInput({ value, meta, update }) {

  const onChange = function(event) {

    const n = Number.parseFloat(event.target.value);
    update(Number.isNaN(n) ? value : n);

  }

  const { onMouseDown } = dragInteraction((offset, bounds) => {

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
