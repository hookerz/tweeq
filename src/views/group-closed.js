import { element as el } from 'deku';

// Reuse the same icon virtual element between renders.
const icon = el('i', { class: 'icon-closed' });

function render({ name, children, toggle }) {

  // Construct the opener control.
  let label = el('label', null, name);
  let opener = el('div', { class: 'tweeq-control clickable', onClick: toggle }, label, icon);

  // Wrap it in a row for styling.
  let row = el('div', { class: 'tweeq-row' }, opener);

  return el('div', { class: 'tweeq-group closed' }, row);

}

export default { render };
