import element from 'virtual-element';
import { register } from '../control';

const view = { render };

register(view, value => (value === true) || (value === false));

function render({ props, state }, update) {

  let { control } = props;

  function clicked(event) {

    control.value = !control.value;
    update({ valid: true });

  }

  return <div onClick={ clicked }>
    <label>{ control.label }</label>
    <input type='checkbox' checked={ control.value }/>
  </div>

}
