/** @jsx el */

function fit(value) {

  return value === true || value === false;

}

function render(control, el) {

  const { name, value } = control;
  const clicked = event => control.update(!value);

  return (

    <div onClick={ clicked }>
      <name>{ name }</name>
      <input type='checkbox' checked={ value }/>
    </div>

  );

}

export default { fit, render };
