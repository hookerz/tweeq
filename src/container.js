import deku from 'deku';
import element from 'virtual-element';
import views from './views';

export default function(label) {

  const container = { add, remove, mount, unmount };

  const children = new Set();

  /**
   * Add children to the container.
   */
  function add(...childs) {

    childs.forEach(child => children.add(child));

  }

  /**
   * Remove children from the container.
   */
  function remove(...childs) {

    childs.forEach(child => children.delete(child));

  }

  /**
   * Render the container and all of its children as a DOM tree, and append it to the provided element.
   */
  function mount(el) {

    const group = element(views.group, { label, children: Array.from(children) });
    const root  = element('div', { class: 'tweeq-root' }, group);

    deku.render(deku.tree(root), el);

  }

  /**
   * Remove the container from the provided element.
   */
  function unmount(el) {

    console.log('unmounting', el);

    // TODO

  }

  return container;

}
