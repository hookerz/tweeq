import { element as el } from 'deku';

function fit(value) {

  return typeof value === 'object'
    && value.hasOwnProperty('x')
    && value.hasOwnProperty('y')
    && value.hasOwnProperty('z')
    && Number.isFinite(value.x)
    && Number.isFinite(value.y)
    && Number.isFinite(value.z);

}

function render(control) {

  let { name, value } = control;

  let label = el('label', null, name);

  let xaxis = el('line', { x1: 20, y1: 20, x2: 20, y2:  0, stroke: '#00ff88', 'stroke-width': 2 });
  let yaxis = el('line', { x1: 20, y1: 20, x2:  0, y2: 32, stroke: '#00ff88', 'stroke-width': 2 });
  let zaxis = el('line', { x1: 20, y1: 20, x2: 40, y2: 32, stroke: '#00ff88', 'stroke-width': 2 });

  let svg = el('svg', { x: 0, y: 0, width: 40, height: 40 }, xaxis, yaxis, zaxis);

  return el('div', { class: 'tweeq-control' }, label, svg);

}

export default { fit, render };
