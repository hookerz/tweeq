import element from 'virtual-element';
import { register } from '../control';

const view = { render };

register(view, value => typeof value === 'string');

function render({ props, state }, update) {

  let { control } = props;
  let { valid = true } = state;

  function changed(event) {
    try {
      control.value = event.target.value;
      update({ valid: true });
    } catch(err) {
      update({ valid: false });
    }
  }

  return <div>
    <label>{ control.label }</label>
    <input type='text' onChange={ changed } value={ control.value }/>
  </div>

}
