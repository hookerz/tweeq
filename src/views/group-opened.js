import { element as el } from 'deku';

// Just wrap a control view in a row div, so we can get consistent styling.
const row = view => el('div', { class: 'tweeq-row' }, view);

// Reuse the same icon virtual element between renders.
const icon = el('i', { class: 'icon-opened' });

function render({ name, children, toggle }) {

  // Render each child to a VDOM node.
  let views = children.map(el);

  // Construct the closer control.
  let label  = el('label', null, name);
  let closer = el('div', { class: 'tweeq-control clickable', onClick: toggle }, label, icon);

  // Wrap each view in a row node, so we can get consistent layout.
  let rows = [ closer, ...views ].map(row);

  return el('div', { class: 'tweeq-group opened' }, rows);

}

export default { render };
