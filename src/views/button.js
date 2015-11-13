import element from 'virtual-element';
import { register } from '../control';

const view = { render };

register(view, value => value === undefined);

function render({ props, state }) {

  let { control } = props;

  function clicked(event) {

    // Emit the change event directly because the button control doesn't have
    // any value we can set or state we can update.
    control.emit('change');

  }

  return <div onClick={ clicked }>
    <label>{ control.label }</label>
  </div>

}
