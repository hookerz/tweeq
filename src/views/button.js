/** @jsx element **/

import element from 'virtual-element';

function render({ props, state }) {

  let { control } = props;

  let classlist = [ 'tweeq-control', 'tweeq-button' ];

  function clicked(event) {

    control.emit('change');

  }

  return <div class={ classlist.join(' ') } onclick={ clicked }>
    <label>{ control.label }</label>
  </div>

}

export default { render };
