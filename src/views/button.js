/** @jsx element **/

import element from 'virtual-element';
import { register } from '../control';

const view = { render };
export default view;

register(view, value => value === undefined);

function render({ props, state }) {

  let { control } = props;

  let classlist = [ 'tweeq-control', 'tweeq-button' ];

  function clicked(event) {
    // Emit the change event directly because the button control doesn't have
    // any value to update.
    control.emit('change');
  }

  return <div class={ classlist.join(' ') } onclick={ clicked }>
    <label>{ control.label }</label>
  </div>

}
