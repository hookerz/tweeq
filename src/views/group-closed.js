import { element as el } from 'deku';

const icon = el('i', { class: 'icon-closed' });

function render({ name, children, toggle }) {

  let opener = el('div', { class: 'tweeq-row', onClick: toggle }, name, icon);

  return el('div', { class: 'tweeq-group closed' }, opener);

}

export default { render };
