/** @jsx el */

function fit(value) {

  return value === undefined;

}

function render(control, el) {

  const { name, value } = control;
  const clicked = event => control.emit('change');

  return (

    <div onClick={ clicked }>
      <name>{ name }</name>
    </div>

  );

}

export default { fit, render };
