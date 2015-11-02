/** @jsx element **/

import element from 'virtual-element';
import { register } from '../control';

export default const TweeqString = { render };

// Register the control view.
register(TweeqString, value => typeof value === 'string');

function render({ props, state }, update) {

  let { control } = props;
  let { valid = true } = state;

  let classlist = [ 'tweeq-control', 'tweeq-string' ];
  if (!valid) classlist.push('invalid');

  function changed(event) {
    try {
      control.value = event.target.value;
      update({ valid: true });
    } catch(err) {
      update({ valid: false });
    }
  }

  return <div class={ classlist.join(' ') }>
    <label>{ control.label }</label>
    <input type='text' onchange={ changed } value={ control.value }/>
  </div>

}
