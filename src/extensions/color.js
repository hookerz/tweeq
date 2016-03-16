import { element as el } from 'deku';

const valueGradient = el('div', { style: 'background: linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);' });
const hueGradient   = el('div', { style: 'background: linear-gradient(top, red 0%, magenta 17%, blue 33%, cyan 50%, green 67%, yellow 83%, red 100%)'});

function fit(value) {

  return typeof value === 'string' && value.match(/#[0-9abcdef]{6}/);

}

function render(control, el) {

  let { name, value } = control;

  let label = el('label', null, name);

  let saturationGradient = el('div', { style: `background: linear-gradient(left, white 0%, ${value} 100%);` });

  let colorSquare = el('div', { style: 'width: 100px; height: 100px;' }, saturationGradient, valueGradient);

  // Render the color preview using the color value as the background.
  let preview = el('div', { class: 'tweeq-color-preview', style: `background: ${ value }` }, el('span', null, value));

  return el('div', { class: 'tweeq-control' }, label, preview);

}

export default { fit, render };
