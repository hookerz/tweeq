import { element as el } from 'deku';
import { clamp } from '../util';
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

  // This is reused by both the click and the drag interaction to map the mouse
  // position to a control value. It uses the absolute position of both the
  // slider element and the mouse. We don't use event.offsetX or anything like
  // that because it would limit the drag interaction to the bounds of the
  // slider. By using absolute positions, the user can keep dragging the control
  // anywhere on the page. It's just easier to use that way.
  let onDrag = function(event, target) {

    let bounds = target.getBoundingClientRect();
    let offset = clamp(bounds.left, bounds.right, event.pageX) - bounds.left;

    let percent = offset / bounds.width;
    let absolute = min + (max - min) * percent;

    update(absolute);

  }

  // This is the simpler event handler because it doesn't need to maintain any
  // references across renders. Just update the control based on the position
  // of the mouse in the slider.
  let onClick = (event) => onDrag(event, event.currentTarget);


  // This is attached to the slider element and starts the dragging interaction.
  // It creates two additional event listeners, for mouse movement and mouse
  // button up. They are scoped to the closure because we don't want to keep
  // any persistant state in the view.
  let onMouseDown = function(event) {

    // Capture the initial event target.
    let target = event.currentTarget;

    let onMouseMove = event => onDrag(event, target);
    vent.on(window, 'mousemove', onMouseMove);

    let onMouseUp = event => vent.off(window, 'mousemove', onMouseMove);
    vent.once(window, 'mouseup', onMouseUp);

  }

  let label = el('label', null, name);

  // Compute the value as a percentage of the total range.
  let percentage = 100 * (value - min) / (max - min);

  let background = el('div', { style: 'position: absolute; top: 0; left: 0; bottom: 0; right: 0;' });
  let foreground = el('div', { style: `position: absolute; top: 0; left: 0; bottom: 0; right: ${ 100 - percentage }%;` });

  let slider = el('div', { class: 'tweeq-slider clickable', onClick, onMouseDown }, background, foreground);

  return el('div', { class: 'tweeq-control' }, label, slider);

}

export default { fit, render };
