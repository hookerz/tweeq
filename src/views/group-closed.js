import { element as el } from 'deku';

// Just wrap a control view in a row div, so we can get consistent styling.
const row = view => el('div', { class: 'tweeq-row' }, view);

// Reuse the same icon virtual element between renders.
const icon = el('i', { class: 'icon-closed' });

function render({ name, children, toggle }) {

  // Construct the opener control.
  let label = el('label', null, name);
  let opener = el('div', { class: 'tweeq-control clickable', onClick: toggle }, label, icon);

  let rows = row(opener);

  return el('div', { class: 'tweeq-group closed' }, rows);

}

export default { render };
