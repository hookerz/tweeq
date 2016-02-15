import { clamp } from '../util';
import vent from '../events';

function fit(value, meta) {

  return Number.isFinite(value)
    && meta.hasOwnProperty('min')
    && meta.hasOwnProperty('max')
    && Number.isFinite(meta.min)
    && Number.isFinite(meta.max);

}

function render(control, el) {

  let { name, value, meta: { min, max } } = control;

  // This is reused by both the click and the drag interaction to map the mouse
  // position to a control value. It uses the absolute position of both the
  // slider element and the mouse. We don't use event.offsetX or anything like
  // that because it would limit the drag interaction to the bounds of the
  // slider. By using absolute positions, the user can keep dragging the control
  // anywhere on the page. It's just easier to use that way.
  let update = function(target) {

    let bounds = target.getBoundingClientRect();
    let offset = clamp(bounds.left, bounds.right, event.pageX) - bounds.left;

    let percent = offset / bounds.width;
    let absolute = min + (max - min) * percent;

    control.update(absolute);

  }

  // This is the simpler event handler because it doesn't need to maintain any
  // references across renders. Just update the control based on the position
  // of the mouse in the slider.
  let onClick = event => update(event.currentTarget);


  // This is attached to the slider element and starts the dragging interaction.
  // It creates two additional event listeners, for mouse movement and mouse
  // button up. They are scoped to the closure because we don't want to keep
  // any persistant state in the view.
  let onMouseDown = event => {

    let target = event.currentTarget;

    let onMouseMove = event => update(target);
    vent.on(window, 'mousemove', onMouseMove);

    let onMouseUp = event => vent.off(window, 'mousemove', onMouseMove);
    vent.once(window, 'mouseup', onMouseUp);

  }

  let controlLabel = el('label', null, name);
  let valueLabel = el('div', { style: 'position: absolute; left: 0; right: 0; text-align: center;' }, value.toPrecision(2));

  let foregroundWidth = 100 * (value - min) / (max - min);

  let background = el('div', { style: 'position: absolute; top: 0; left: 0; bottom: 0; right: 0; background: black;' });
  let foreground = el('div', { style: `position: absolute; top: 0; left: 0; bottom: 0; right: ${ 100 - foregroundWidth }%; background: #4C6767;` });

  let slider = el('div', { class: 'clickable', style: 'flex: 1; position: relative', onClick, onMouseDown }, background, foreground, valueLabel);

  return el('div', { class: 'tweeq-control' }, controlLabel, slider);

}

export default { fit, render };
