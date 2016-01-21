/** @jsx el */

function render(controls, el) {

  const rows = controls.map(control => {

    return <div class='tweeq-row'>{ el(control) }</div>

  });

  return (

    <div class='tweeq-group'>
      { rows }
    </div>

  );

}

export default { render };
