import element from 'virtual-element';

function render(component, update) {

  const { props } = component;
  const { control } = props;

  function clicked() {

    control.value = !control.value;
    update({ valid: true });

  }

  return <div onClick={ clicked }>
    <label>{ control.label }</label>
    <input type='checkbox' checked={ control.value }/>
  </div>

}

export default { render };
