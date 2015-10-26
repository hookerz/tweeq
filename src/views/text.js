/** @jsx element **/

import element from 'virtual-element';
import rcolor from '../util/random-color';

function initialState(props) {

  let { value } = props.control;
  return { value };

}

function afterUpdate(component) {

  let { control } = component.props;
  let { value } = component.state;

  control.value = value;
  control.emit('change', control.value);

}

function render(component, setState) {

  let { control } = component.props;
  let { value } = component.state;

  function changed(event) {

    let next = event.target.value;
    if (value !== next) setState({ value: next });

  }

  let classes = 'tweeq-control tweeq-text ' + rcolor();

  return <div class={classes}>
    <label>{control.label}</label>
    <input type='text' onChange={changed} value={value} />
  </div>

}

export default { initialState, afterUpdate, render };
