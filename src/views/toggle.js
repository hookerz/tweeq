/** @jsx element **/

import element from 'virtual-element';
import rcolor from '../util/random-color';

function initialState(props) {

  let { control } = props;
  return { toggled: control.value };

}

function afterUpdate(component) {

  let { control } = component.props;
  let { toggled } = component.state;

  control.value = toggled;
  control.emit('change', control.value);

}

function render(component, setState) {

  let { control } = component.props;
  let { toggled } = component.state;

  function clicked(event) {

    setState({ toggled: !toggled });

  }

  let classes = 'tweeq-control tweeq-number ' + rcolor();

  return <div class={classes} onClick={clicked}>
    <label>{control.label}</label>
    <input type='checkbox' checked={toggled} />
  </div>

}

export default { initialState, afterUpdate, render };
