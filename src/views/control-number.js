/** @jsx el */

function fit(value) {

  return Number.isFinite(value);

}

function render(control, el) {

  const { name, value } = control;
  const changed = event => control.update(event.target.value);

  return (

    <div>
      <name>{ name }</name>
      <input type='text' onChange={ changed } value={ value }/>
    </div>

  );

}

export default { fit, render };
