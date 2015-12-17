/** @jsx element */

import element from 'virtual-element';

export default function(component, update) {

  const { control } = component.props;
  const { valid = true } = component.state;

  function changed(event) {

    try {

      control.value = Number(event.target.value);
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
