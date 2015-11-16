import element from 'virtual-element';

const view = { render };

export default view;

function render({ props, state }, update) {

  let { depth = 0, container } = props;
  let open = state.hasOwnProperty('open') ? state.open : props.open;

  function clicked(event) {

    update({ open: !open });

  }

  if (open) {

    let style = `padding-left: ${ depth * 5 }px`;

    let controls = container.children.map(child => {

      let isContainer = (child.view.render === render);

      let props = (isContainer)
        ? { depth: depth + 1, container: child }
        : { control: child };

      let el = element(child.view, props);

      return isContainer ? el : <div class='tweeq-row' style={ style }>{ markers(depth) }{ el }</div>;

    });

    return <div class='tweeq-group'>

      <div class='tweeq-row' style={ style }>
        { markers(depth) }
        { closer(clicked, container.label) }
      </div>

      { controls }

    </div>


  } else {

    // This is the closed view of the container. It's just a button that opens
    // the container.

    let style = `padding-left: ${ (depth - 1) * 5 }px`;

    return <div class='tweeq-row' style={ style }>
      { markers(depth - 1) }
      { opener(clicked, container.label) }
    </div>

  }
}

function deepness(depth) {

  depth = Math.max(1, depth);
  return Array(depth + 1).join('d') + 'eep';

}

function opener(clicked, label) {

  return <div onClick={ clicked }>
    <label>{ label || 'expand' }</label>
    <i class='icon-closed'></i>
  </div>

}

function closer(clicked, label) {

  return <div onClick={ clicked }>
    <label>{ label || 'collapse' }</label>
    <i class='icon-opened'></i>
  </div>

}

function markers(depth) {

  let collection = [];

  for (let i = 0; i < depth; i++) {

    let style = `left: ${ i * 5 }px`;
    let classes = `tweeq-depth ${ deepness(i + 1) }`;
    let el = <div class={ classes } style={ style } />;

    collection.push(el);

  }

  return collection;

}
