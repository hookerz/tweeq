import test from 'tape';
import * as color from '../../src/extensions/color';

test('fit', function(t) {

  const { fit } = color.default;

  t.true(fit('#ffffff'));
  t.true(fit('#f9f9f9'));
  t.true(fit('#000000'));

  t.false(fit('ffffff'));
  t.false(fit('#fffff'));
  t.false(fit('#fffffff'));
  t.false(fit(' #ffffff'));
  t.false(fit('#gggggg'));

  t.end();

});

test('parse hex string', function(t) {

  const { parseHexString } = color;

  let parsed = parseHexString('#ffffff');
  t.same(parsed, [ 255, 255, 255 ]);

  parsed = parseHexString('#ff0000');
  t.same(parsed, [ 255, 0, 0 ]);

  parsed = parseHexString('#00ff00');
  t.same(parsed, [ 0, 255, 0 ]);

  parsed = parseHexString('#0000ff');
  t.same(parsed, [ 0, 0, 255 ]);

  parsed = parseHexString('#999999');
  t.same(parsed, [ 153, 153, 153 ]);

  t.end()

});

test('render hex string', function(t) {

  const { renderHexString } = color;

  let rendered = renderHexString([ 255, 255, 255 ]);
  t.equal(rendered, '#ffffff');

  rendered = renderHexString([ 255, 0, 0 ]);
  t.equal(rendered, '#ff0000');

  rendered = renderHexString([ 0, 255, 0 ]);
  t.equal(rendered, '#00ff00');

  rendered = renderHexString([ 0, 0, 255 ]);
  t.equal(rendered, '#0000ff');

  rendered = renderHexString([ 153, 153, 153 ]);
  t.equal(rendered, '#999999');

  t.end()

});

test('render rgb string', function(t) {

  const { renderRGBString } = color;

  let rendered = renderRGBString([ 255, 255, 255 ]);
  t.same(rendered, 'rgb(255, 255, 255)');

  rendered = renderRGBString([ 255, 0, 0 ]);
  t.same(rendered, 'rgb(255, 0, 0)');

  rendered = renderRGBString([ 0, 255, 0 ]);
  t.same(rendered, 'rgb(0, 255, 0)');

  rendered = renderRGBString([ 0, 0, 255 ]);
  t.same(rendered, 'rgb(0, 0, 255)');

  rendered = renderRGBString([ 153, 153, 153 ]);
  t.same(rendered, 'rgb(153, 153, 153)');

  t.end()

});

test('RGB to HSV', function(t) {

  const { RGBtoHSV } = color;

  let hsv = RGBtoHSV([ 255, 255, 255 ]);
  t.same(hsv, [ 0.0, 0.0, 1.0 ]);

  hsv = RGBtoHSV([ 255, 0, 0 ]);
  t.same(hsv, [ 0.0, 1.0, 1.0 ]);

  hsv = RGBtoHSV([ 0, 255, 0 ]);
  t.same(hsv, [ 120.0, 1.0, 1.0 ]);

  hsv = RGBtoHSV([ 0, 0, 255 ]);
  t.same(hsv, [ 240.0, 1.0, 1.0 ]);

  hsv = RGBtoHSV([ 0, 0, 255 ]);
  t.same(hsv, [ 240.0, 1.0, 1.0 ]);

  hsv = RGBtoHSV([ 51, 102, 51 ]);
  t.same(hsv, [ 120.0, 0.5, 0.4 ]);

  t.end();

});

test('HSV to RGB', function(t) {

  const { HSVtoRGB } = color;

  let rgb = HSVtoRGB([ 0.0, 0.0, 1.0 ]);
  t.same(rgb, [ 255, 255, 255 ]);

  rgb = HSVtoRGB([ 0.0, 1.0, 1.0 ]);
  t.same(rgb, [ 255, 0, 0 ]);

  rgb = HSVtoRGB([ 120.0, 1.0, 1.0 ]);
  t.same(rgb, [ 0, 255, 0 ]);

  rgb = HSVtoRGB([ 240.0, 1.0, 1.0 ]);
  t.same(rgb, [ 0, 0, 255 ]);

  rgb = HSVtoRGB([ 240.0, 1.0, 1.0 ]);
  t.same(rgb, [ 0, 0, 255 ]);

  rgb = HSVtoRGB([ 120.0, 0.5, 0.4 ]);
  t.same(rgb, [ 51, 102, 51 ]);

  t.end();

});
