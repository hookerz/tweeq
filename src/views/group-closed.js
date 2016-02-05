import { element as el } from 'deku';

function render({ name, children, toggle }) {

  let label  = el('label', null, name);
  let icon   = el('i', { class: 'icon-closed' });
  let opener = el('div', { onClick: toggle }, label, icon);

  let row = el('div', { class: 'tweeq-row' }, opener);

  return el('div', { class: 'tweeq-group closed' }, row);

}

export default { render };
