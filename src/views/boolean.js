import element from 'virtual-element';

export default function(component) {

  const { control } = component.props;

  function clicked() {

    control.value = !control.value;

  }

  return <div onClick={ clicked }>
    <label>{ control.label }</label>
    <input type='checkbox' checked={ control.value }/>
  </div>

}
