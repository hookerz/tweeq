/** @jsx element **/

import element from 'virtual-element';
import { register } from '../control';

const view = { render };

register(view, value => (value === true) || (value === false));

function render({ props, state }, update) {

  let { control } = props;
  let { toggled = false } = state;

  let classlist = [ 'tweeq-control', 'tweeq-boolean' ];

  function clicked(event) {

    control.value = !toggled;
    update({ toggled: !toggled });

  }

  return <div class={ classlist.join(' ') } onclick={ clicked }>
    <label>{ control.label }</label>
    <input type='checkbox' checked={ toggled }/>
  </div>

}
