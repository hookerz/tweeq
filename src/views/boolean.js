/** @jsx el */

import { element as el } from 'deku';

function fit(value) {

  return value === true || value === false;

}

function render(control) {

  let { label, value } = control;

  let clicked = event => control.update(!value);

  return (

    <div onClick={ clicked }>
      <label>{ label }</label>
      <input type='checkbox' checked={ value }/>
    </div>

  );

}

export default { fit, render };
