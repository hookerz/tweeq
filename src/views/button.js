import element from 'virtual-element';

export default function(component) {

  const { control } = component.props;

  function clicked() {

    // Emit the change event directly because the button control doesn't have
    // any value we can set or state we can update.
    control.emit('change');

  }

  return <div onClick={ clicked }>
    <label>{ control.label }</label>
  </div>

}
