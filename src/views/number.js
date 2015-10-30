/** @jsx element **/

import element from 'virtual-element';

function render({ props, state }, update) {

  let { control } = props;

  let value = ;
  let valid = !!state.valid;

  let classlist = [ 'tweeq-control', 'tweeq-number' ];
  if (!valid) classlist.push('invalid');

  function changed(event) {
    try {
      control.value = parseInt(event.target.value);
      update({ valid: true });
    } catch(err) {
      update({ valid: false });
    }
  }

  return <div class={ classlist.join(' ') }>
    <label>{ control.label }</label>
    <input type='text' onChange={ changed } value={ control.value }/>
  </div>

}

export default { render };
