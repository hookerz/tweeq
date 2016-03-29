import test from 'tape';
import { parseRGBString, RGBtoHSV } from '../../src/extensions/color';

test('parse RGB string', function(t) {

  let parsed;

  parsed = parseRGBString('#ffffff');
  t.same(parsed, [ 255, 255, 255 ]);

  parsed = parseRGBString('#ff0000');
  t.same(parsed, [ 255, 0, 0 ]);

  parsed = parseRGBString('#00ff00');
  t.same(parsed, [ 0, 255, 0 ]);

  parsed = parseRGBString('#0000ff');
  t.same(parsed, [ 0, 0, 255 ]);

  parsed = parseRGBString('#999999');
  t.same(parsed, [ 153, 153, 153 ]);

  t.end()

});

test('RGB to HSV', function(t) {

  let hsv;

  hsv = RGBtoHSV([ 255, 255, 255 ]);
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
