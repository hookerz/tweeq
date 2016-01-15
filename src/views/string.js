/** @jsx el */

function fit(value) {

  return typeof value === 'string';

}

function render(control, el) {

  let { label, value } = control;

  let changed = event => control.update(value);

  return <div>
    <label>{ label }</label>
    <input type='text' onChange={ changed } value={ value }/>
  </div>

}

export default { fit, render };
