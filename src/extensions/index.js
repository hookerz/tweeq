import boolean from './boolean';
import button  from './button';
import color   from './color';
import number  from './number-generic';
import slider  from './number-slider';
import select  from './select';
import string  from './string';
import vector  from './vector';

// These are ordered carefully from most specific to least specific.
export default {

  button,
  boolean,
  string,
  color,
  number,
  slider,
  select,
  vector

}
