/** @jsx el */

function render(controls, el) {

  let views = controls.map(el);

  // Wrap each view in a row node, so we can get consistent layout.
  let rows = views.map(view => el('div', { class: 'tweeq-row' }, view));

  return el('div', { class: 'tweeq-group' }, rows);

}

export default { render };
