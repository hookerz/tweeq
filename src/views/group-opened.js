import { element as el } from 'deku';

const icon = el('i', { class: 'icon-opened' });

function render({ name, children, toggle }) {

  // Render each child to a VDOM node.
  let views = children.map(el);

  // Wrap each view in a row node, so we can get consistent layout.
  let rows = views.map(view => el('div', { class: 'tweeq-row' }, view));

  let closer = el('div', { class: 'tweeq-row', onClick: toggle }, name, icon);

  return el('div', { class: 'tweeq-group opened' }, closer, rows);

}

export default { render };
