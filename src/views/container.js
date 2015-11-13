import element from 'virtual-element';

const view = { render };

export default view;

function render({ props, state }, update) {

  let { depth = 0, container } = props;
  let open = state.open || props.open;

  function clicked(event) {

    update({ open: !open });

  }

  if (open) {

    let controls = container.children.map(child => {

      let isContainer = (child.view.render === render);

      let props = (isContainer)
        ? { depth: depth + 1, container: child }
        : { control: child };

      let markers =
      let el = element(child.view, props);

      return isContainer ? el : <div class='tweeq-row'>{ markers }{ el }</div>

    });

    let classlist = [ 'tweeq-container', `depth-${ depth }` ];

    return <div class={ classlist.join(' ') }>

      <div class='tweeq-row'>
        <div onClick={ clicked }>
          <label>{ container.label || 'collapse' }</label>
          <i class='icon-down-dir'></i>
        </div>
      </div>

      { controls }

    </div>


  } else {

    // This is the closed view of the container. It's just a button that opens
    // the container.

    return <div class='tweeq-row'>
      <div onClick={ clicked }>
        <label>{ container.label || 'expand' }</label>
      </div>
    </div>

  }
}

function flames(depth) {

  let collection = [];

  for (let i = 0; i < depth; i++)
    markers.push(<div class='tweeq-depth'/>);

  return collection;

}
