/** @jsx element **/

import element from 'virtual-element';

const view = { render };
export default view;

function render({ props, state }, update) {

  let { depth = 0, container } = component.props;
  let open = state.open || props.open;

  function clicked(event) {

    update({ open: !open });

  }

  if (open) {

    let controls = container.children.map(child => {

      let props = (child.view.render === render)
        ? { depth: depth + 1, container: child }
        : { control: child };

      return element(child.view, props);

    });

    let classlist = [ 'tweeq-control', `depth-${ depth }` ];

    return <div class={ classlist.join(' ') }>

      <div class='tweeq-control tweeq-close' clicked={ clicked }>
        <label>{ container.label || 'collapse' }</label>
        <i class='icon-down-dir'></i>
      </div>

      {controls}

    </div>


  } else {

    let classlist = [ 'tweeq-control', 'tweeq-open' ];

    return <div class={ classlist.join(' ') } onclick={ clicked }>
      <label>{ container.label || 'expand' }</label>
    </div>

  }
}
