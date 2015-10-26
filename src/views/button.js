/** @jsx element **/

import element from 'virtual-element';
import rcolor from '../util/random-color';

function render(component) {

  let { control } = component.props;

  // Emit a data event when the button is clicked.
  function clicked(event) {

    control.emit('change');

  }

  let classes = 'tweeq-control tweeq-button ' + rcolor();

  return <div class={classes} onClick={clicked}>
    <label>{control.label}</label>
  </div>

}

export default { render };
