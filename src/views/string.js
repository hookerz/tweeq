/** @jsx element **/

import element from 'virtual-element';

function render({ props, state }, update) {

  let { control } = props;

  // Inherit the state from the control.
  let value = state.value || control.value;
  let valid = !!state.valid;

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
    <input type='text' onchange={ changed } value={ control.value } />
  </div>

}

export default { initialState, afterUpdate, render };
