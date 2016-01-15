/** @jsx el */

function fit(value) {

  return value === undefined;

}

function render(control, el) {

  let { label, value } = control;

  // Emit the change event directly, because there is no value to update.
  let clicked = event => control.emit('change');

  return <div onClick={ clicked }>
    <label>{ label }</label>
  </div>

}

export default { fit, render };
