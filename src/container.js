import deku from 'deku';
import element from 'virtual-element';
import views from './views';

export default function(label) {

  const children = new Set();

  /**
   * Add a child to the container.
   */
  function add(child) {

    children.add(child);

  }

  /**
   * Remove a child from the container.
   */
  function remove(child) {

    children.delete(child);

  }

  /**
   * Used by deku to render the container.
   */
  function render() {

    return element(views.group, { label }, ...children);

  }

  /**
   * Render the container and all of its children as a DOM tree, and append it to the provided element.
   */
  function mount(el) {

    const root = element('div', { class: 'tweeq-root' }, render());
    const tree = deku.tree(root);

    return deku.render(tree, el);

  }

  /**
   * Remove the container from the provided element.
   */
  function unmount(el) {

    console.log('unmounting', el);

    // TODO

  }

  return { add, remove, render, mount, unmount };

}
