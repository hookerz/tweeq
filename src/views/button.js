import element from 'virtual-element';

function render(component) {

  const { props } = component;
  const { control } = props;

  function clicked() {

    // Emit the change event directly because the button control doesn't have
    // any value we can set or state we can update.
    control.emit('change');

  }

  return <div onClick={ clicked }>
    <label>{ control.label }</label>
  </div>

}

export default { render };
