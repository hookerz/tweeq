import { element as el } from 'deku';
import { clamp } from '../util';
import vent from '../events';

const val = el('div', { class: 'tweeq-color-val', style: 'background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);' });
const hue = el('div', { class: 'tweeq-color-hue', style: 'background: -webkit-linear-gradient(top, red 0%, magenta 17%, blue 33%, cyan 50%, lime 67%, yellow 83%, red 100%)'});

function fit(value) {

  return typeof value === 'string' && value.match(/#[0-9abcdef]{6}/);

}

function render(model) {

  let { name, state, update } = model;

  if (state.open === undefined) state.open = false;

  let onClick = (event) => {

    state.open = !state.open;
    update();

  }

  let label = el('label', { onClick }, name);

  let children = state.open
    ? [ label, renderHSVControls(model) ]
    : [ label, renderPreview(model) ];

  return el('div', { class: 'tweeq-control' }, children);

}

/**
 * Render the collapsed view of the color selector. This just shows a preview
 * of the color, and the value as text.
 */
function renderPreview({ value }) {

  // Wrap the text in a span, for the layout.
  let text = el('span', null, value);
  let style = `background: ${ value }`;

  return el('div', { class: 'tweeq-color-preview', style }, text);

}

/**
 * Render the expanded view of the color selector. This includes a hue slider,
 * and a two-dimensional saturation/value selector.
 */
function renderHSVControls({ value, update }) {

  let rgb = parseRGBString(value);
  let hsv = RGBtoHSV.apply(null, rgb);
  let selector = renderSatValSelector(hsv[1], hsv[2]);

  let sat = el('div', { class: 'tweeq-color-sat', style: `background: -webkit-linear-gradient(left, white 0%, ${ renderRGBString.apply(null, HSVtoRGB(hsv[0], 1, 1)) } 100%);` });

  let onDrag = function(event, target) {

    let bounds = target.getBoundingClientRect();
    let offsetX = clamp(bounds.left, bounds.right, event.pageX) - bounds.left;
    let offsetY = clamp(bounds.top, bounds.bottom, event.pageY) - bounds.top;

    let percentX = offsetX / bounds.width;
    let percentY = offsetY / bounds.height;

    let rgb = HSVtoRGB(hsv[0], percentX, 1 - percentY);

    console.log(rgb);

    let strRGB = renderRGBString.apply(null, rgb);

    console.log(strRGB);

    update(strRGB);

  }

  let onClick = (event) => onDrag(event, event.currentTarget);

  let onMouseDown = function(event) {

    // Capture the initial event target.
    let target = event.currentTarget;

    let onMouseMove = event => onDrag(event, target);
    vent.on(window, 'mousemove', onMouseMove);

    let onMouseUp = event => vent.off(window, 'mousemove', onMouseMove);
    vent.once(window, 'mouseup', onMouseUp);

  }

  // Combine the saturation gradient with the prerended value gradient to form the two-dimensional saturation/value gradient.
  let satval = el('div', { class: 'tweeq-color-satval', onClick, onMouseDown }, sat, val, selector);

  return el('div', { class: 'tweeq-color-hsv' }, satval, hue);

}

function renderHueSelector(hue) {

  let style = `top: ${ 100 * hue / 360 }%`;

  return el('div', { class: 'tweeq-color-selector-hue', style })

}

function renderSatValSelector(sat, val) {

  let style = `top: ${ 100 - (100 * val) }%; left: ${ 100 * sat }%`;

  return el('div', { class: 'tweeq-color-selector-satval', style });

}

/**
 * Parse an RGB string like "#ff9933" to an RGB array like [ 255, 153, 51 ]. The
 * values are between zero and two hundred and fifty five.
 */
export function parseRGBString(value) {

  let r = Number.parseInt(value[1] + value[2], 16);
  let g = Number.parseInt(value[3] + value[4], 16);
  let b = Number.parseInt(value[5] + value[6], 16);

  return [ r, g, b ];

}

export function renderRGBString(r, g, b) {

  let rgb = (r << 16) + (g << 8) + (b << 0);
  let str = rgb.toString(16);

  while (str.length < 6) str = '0' + str;

  return '#' + str;

}

/**
 * Convert RGB values like [ 255, 153, 51 ] to an HSV array like
 * [ 30, 0.8, 1.0 ]. The hue is between zero and three hundred and sixty,
 * while the saturation and value are between zero and one.
 */
export function RGBtoHSV(r, g, b) {

  r = r / 255;
  g = g / 255;
  b = b / 255;

  let min = Math.min(r, g, b);
  let max = Math.max(r, g, b);

  if (min == max) {

    return [ 0, 0, max ];

  } else {

    let delta = max - min;

    let h = 0;

    switch (max) {

      case r:  h = 60 * (0 + (g - b) / delta); break;
      case g:  h = 60 * (2 + (b - r) / delta); break;
      case b:  h = 60 * (4 + (r - g) / delta); break;

    }

    if (h < 0) h = h + 360;

    let s = delta / max;
    let v = max;

    return [ h, s, v ];

  }

}

export function HSVtoRGB(h, s, v) {

  let c = s * v;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1))
  let m = v - c;

  let r, g, b;

  switch (true) {

    case (h <  60): r = c; g = x; b = 0; break;
    case (h < 120): r = x; g = c; b = 0; break;
    case (h < 180): r = 0; g = c; b = x; break;
    case (h < 240): r = 0; g = x; b = c; break;
    case (h < 300): r = x; g = 0; b = c; break;
    case (h < 360): r = c; g = 0; b = x; break;

  }

  r = Math.floor((r + m) * 255);
  g = Math.floor((g + m) * 255);
  b = Math.floor((b + m) * 255);

  return [ r, g, b ];

}

export default { fit, render };
