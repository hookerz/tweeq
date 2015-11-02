/** @jsx element **/

import element from 'virtual-element';
import { register } from '../control';

export default const TweeqBoolean = { render };

// Register the control view.
register(TweeqBoolean, value => (value === true) || (value === false));

function render({ props, state }, update) {

  let { control } = props;
  let { toggled = false } = state;

  let classlist = [ 'tweeq-control', 'tweeq-boolean' ];

  function clicked(event) {

    control.value = !toggled;
    update({ toggled: !toggled });

  }

  return <div class={ classes } onclick={ clicked }>
    <label>{ control.label }</label>
    <input type='checkbox' checked={ toggled }/>
  </div>

}
