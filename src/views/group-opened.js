import { element as el } from 'deku';

const icon = el('i', { class: 'icon-opened' });

function render({ name, children, toggle }) {

  // Render each child to a VDOM node.
  let views = children.map(el);

  // Wrap each view in a row node, so we can get consistent layout.
  let rows = views.map(view => el('div', { class: 'tweeq-row' }, view));

  let label  = el('label', null, name);
  let icon   = el('i', { class: 'icon-opened' });
  let closer = el('div', { onClick: toggle }, label, icon);

  rows.unshift(el('div', { class: 'tweeq-row' }, closer));

  return el('div', { class: 'tweeq-group opened' }, rows);

}

export default { render };
