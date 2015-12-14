import element from 'virtual-element';

function render(component, update) {

  const { props, state } = component;
  const { valid = true } = state;
  const { control } = props;

  function changed(event) {
    
    try {
    
      control.value = event.target.value;
      update({ valid: true });
    
    } catch(err) {
    
      update({ valid: false });
    
    }

  }

  return <div>
    <label>{ control.label }</label>
    <input type='text' onChange={ changed } value={ control.value }/>
  </div>

}

export default { render };
