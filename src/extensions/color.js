import { element as el } from 'deku';
import { clamp } from '../util';
import vent from '../events';

function fit(value) {

  return typeof value === 'string' && value.match(/#[0-9abcdef]{6}/);

}

// The color extension is tricky because the extension fits RGB values (it's the
// most common in CSS and JS) but the view uses HSV to select new colors.
// Converting RGB to HSV can result in undefined hues for unsaturated colors,
// and hue drifting for low saturations. So we need to maintain HSV data for
// each control. This is essentially a model-view layer. Storing this in the
// local state of the view isn't sufficient because the same control might be
// rendered in two trees, and those views should have consistent HSV values.
// This weak map is keyed by control reference and keeps a model of the HSV
// for each control.
const HSVCache = new WeakMap();

function render(control, state) {

  let { name, update } = control;

  if (state.open === undefined) state.open = false;

  let onClick = (event) => {

    state.open = !state.open;
    update();

  }

  let label = el('label', { onClick }, name);

  let children = state.open
    ? [ label, renderHSVControls(control) ]
    : [ label, renderPreview(control) ];

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

// Some reusable elements to construct the color picker.
const vgradient = el('div', { class: 'tweeq-color-val', style: 'background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);' });
const hgradient = el('div', { class: 'tweeq-color-hue', style: 'background: -webkit-linear-gradient(top, red 0%, magenta 17%, blue 33%, cyan 50%, lime 67%, yellow 83%, red 100%)'});

/**
 * Render the expanded view of the color selector. This includes a hue slider,
 * and a two-dimensional saturation/value selector.
 */
function renderHSVControls(control, state) {

  let { value, update } = control;

  let rgb = parseHexString(value);
  let hsv = null;

  if (HSVCache.has(control)) {

    let cachedHSV = HSVCache.get(control);
    let cachedRGB = HSVtoRGB(cachedHSV);

    // Since the control value can be changed by code outside of the view, we
    // need to check our cached HSV values for consistency.
    let consistent = rgb[0] === cachedRGB[0] && rgb[1] === cachedRGB[1] && rgb[2] === cachedRGB[2];

    consistent ? console.debug('consistent') : console.debug('inconsistent');

    hsv = consistent ? cachedHSV : RGBtoHSV(rgb);

  } else {

    hsv = RGBtoHSV(rgb);

  }

  // Cache the HSV values in case they changed.
  HSVCache.set(control, hsv);

  let selector = renderSatValSelector(hsv[1], hsv[2]);

  let onDrag = function(event, target) {

    console.debug(event.type);

    let bounds = target.getBoundingClientRect();
    let offsetX = clamp(bounds.left, bounds.right, event.pageX) - bounds.left;
    let offsetY = clamp(bounds.top, bounds.bottom, event.pageY) - bounds.top;

    let normalizedX = offsetX / bounds.width;
    let normalizedY = offsetY / bounds.height;

    let newHSV = [ hsv[0], normalizedX, 1 - normalizedY ];
    let newRGB = HSVtoRGB(newHSV);

    HSVCache.set(control, newHSV);

    update(renderHexString(newRGB));

    // Force the control to rerender. Some changes to HSV don't change the RGB
    // value, such as changing the saturation when the value is 0 (black). But
    // the view still needs to be udpated because the saturation/value selector
    // is being dragged.
    update();

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

  let sgradient = renderSatGradient(hsv[0]);

  // Combine the saturation gradient with the value gradient to form the
  // overlapping saturation/value gradient.
  let svgradient = el('div', { class: 'tweeq-color-satval', onMouseDown }, sgradient, vgradient, selector);

  // Put the saturation/value gradient and the hue gradient side by side, with all of their selectors.
  return el('div', { class: 'tweeq-color-hsv' }, svgradient, hgradient);

}

function renderSatGradient(hue) {

  let style = `background: -webkit-linear-gradient(left, white 0%, hsl(${ hue }, 100%, 50%) 100%);`

  return el('div', { class: 'tweeq-color-sat', style });

}

/**
 * Render the hue selector.
 */
function renderHueSelector(hue) {

  let style = `top: ${ 100 * hue / 360 }%`;

  return el('div', { class: 'tweeq-color-selector-hue', style })

}

/**
 * Render the saturation and value selector.
 */
function renderSatValSelector(sat, val) {

  let icon = el('i', { class: 'icon-circle' });

  let style = `position: absolute; top: ${ 100 - (100 * val) }%; left: ${ 100 * sat }%`;

  return el('div', { class: 'tweeq-color-selector-satval', style }, icon);

}

/**
 * Parse an RGB string like "#ff9933" to an RGB array like [ 255, 153, 51 ]. The
 * values are between 0 and 255.
 */
export function parseHexString(value) {

  let r = Number.parseInt(value.substr(1, 2), 16);
  let g = Number.parseInt(value.substr(3, 2), 16);
  let b = Number.parseInt(value.substr(5, 2), 16);

  return [ r, g, b ];

}

export function renderHexString(rgb) {

  let [ r, g, b ] = rgb;
  let str = ((r << 16) + (g << 8) + (b << 0)).toString(16);

  // Left pad, lol.
  while (str.length < 6) str = '0' + str;

  return '#' + str;

}

export function renderRGBString(rgb) {

  return `rgb(${ rgb[0] }, ${ rgb[1] }, ${ rgb[2] })`;

}

/**
 * Convert an RGB array like [ 255, 153, 51 ] to an HSV array like
 * [ 30, 0.8, 1.0 ]. The hue is between 0 and 360; the saturation and value
 * are between 0 and 1.
 */
export function RGBtoHSV(rgb) {

  // Decompose and normalize the RGB array.
  let r = rgb[0] / 255;
  let g = rgb[1] / 255;
  let b = rgb[2] / 255;

  let min = Math.min(r, g, b);
  let max = Math.max(r, g, b);

  if (min == max) {

    return [ 0, 0, max ];

  } else {

    let delta = max - min;

    let h = 0;

    switch (max) {

      case r: h = 60 * (0 + (g - b) / delta); break;
      case g: h = 60 * (2 + (b - r) / delta); break;
      case b: h = 60 * (4 + (r - g) / delta); break;

    }

    if (h < 0) h = h + 360;

    let s = delta / max;
    let v = max;

    return [ h, s, v ];

  }

}

/**
 * Convert an HSV array like [ 30, 0.8, 1.0 ] to an RGB array like
 * [ 255, 153, 51 ]. The all three RGB components are between 0 and 255.
 */
export function HSVtoRGB(hsv) {

  let h = hsv[0];
  let s = hsv[1];
  let v = hsv[2];

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
