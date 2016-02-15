import vent from '../events';

function fit(value) {

  return Number.isFinite(value);

}

function render(control, el) {

  let { name, value, meta } = control;

  let onChange = event => control.update(event.target.value);

  let update = target => {

    let bounds = target.getBoundingClientRect();
    let offset = event.pageY - (bounds.bottom + bounds.height * 0.5);

    // If the user didn't provide a step infer it from the initial value.
    let step = meta.step || (value * 0.01);

    control.update(value + offset * step);

  }

  let onMouseDown = event => {

    let target = event.currentTarget;

    let onMouseMove = event => update(target);
    vent.on(window, 'mousemove', onMouseMove);

    let onMouseUp = event => vent.off(window, 'mousemove', onMouseMove);
    vent.once(window, 'mouseup', onMouseUp);

  }

  let label = el('label', null, name);
  let input = el('input', { type: 'text', value: value.toPrecision(2), onChange, onMouseDown });

  return el('div', { class: 'tweeq-control' }, label, input);

}

export default { fit, render };
