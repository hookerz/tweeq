import { element as el } from 'deku';

// Reuse the same icon virtual element between renders.
const icon = el('i', { class: 'icon-down-dir' });

// A list of colors to cycle through when styling the flame markers.
const flamecolors = [ '#ff0000', '#00ff00', '#0000ff' ];

// Make n flame markers, offset from each other.
// TODO memoize this
const flames = (n) => {

  let result = [];
  let color = flamecolors[ (n - 1) % flamecolors.length ];

  for (let i = 0; i < n; i++) {

    let offset = i * 5;
    let style  = `left: ${ offset }px; background: ${ color };`
    let marker = el('div', { class: 'tweeq-depth', style });

    result[i] = marker;

  }

  return result;

}


// Just wrap a control view in a row div, so we can get consistent styling.
const row = children => el('div', { class: 'tweeq-row' }, children);

function render({ name, children, depth, toggle }) {

  // Render each child to a VDOM node.
  let views = children.map(child => el(child, { style: `padding-left: ${ depth * 5 }px` }));

  // Construct the closer control.
  let label  = el('label', null, name);
  let closer = el('div', { class: 'tweeq-control clickable', onClick: toggle }, label, icon);

  // Construct the list of depth markers and insert them in front of each view.
  let markers = flames(depth - 1);
  views = views.map(view => [ markers, view ]);

  // Add the closer to the views we're going to render.
  views.unshift(closer);

  // Wrap each view in a row node, so we can get consistent layout.
  let rows = views.map(row);

  return el('div', { class: 'tweeq-group opened' }, rows);

}

export default { render };
