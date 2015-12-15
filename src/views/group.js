import element from 'virtual-element';

export default function(component, update) {

  const { props, state } = component;

  // Prefer open-ness from the state, but accept it from the props.
  const open = state.open !== undefined ? state.open : props.open;

  function clicked() {

    update({ open: !open });

  }

  return element(openedView, props);

}

/**
 * Render a depth (number) as a classname (string).
 */
function deepness(depth) {

  depth = Math.max(1, depth);
  return Array(depth + 1).join('d') + 'eep';

}

/**
 * Render an open button.
 */
function opener(clicked, label) {

  return <div onClick={ clicked }>
    <label>{ label || 'expand' }</label>
    <i class='icon-closed'></i>
  </div>

}

/**
 * Render a list of elements of `depth` length.
 */
function markers(depth) {

  let collection = [];

  for (let i = 0; i < depth; i++) {

    let style = `left: ${ i * 5 }px`;
    let classes = `tweeq-depth ${ deepness(i + 1) }`;
    let el = <div class={ classes } style={ style }/>;

    collection.push(el);

  }

  return collection;

}
