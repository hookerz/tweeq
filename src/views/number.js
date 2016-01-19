/** @jsx el */

import { element as el } from 'deku';

function fit(value) {

  return Number.isFinite(value);

}

function render(control) {

  let { label, value } = control;

  let changed = event => control.update(value);

  return <div>
    <label>{ label }</label>
    <input type='text' onChange={ changed } value={ value }/>
  </div>

}

export default { fit, render };
