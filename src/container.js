import { createApp, element as el } from 'deku';
import debounce  from 'lodash.debounce';
import emitter   from 'component-emitter';
import control   from './control';
import view      from './views/group';
import * as util from './util';

export default function Container(name = 'default') {

  // The list of controls in this group.
  let children = [];

  const container = Object.create(emitter.prototype, {

    name: {
      value: name,
      writable: false,
      enumerable: true
    },

    children: {
      get: () => children.concat(),
      enumerable: true
    }

  });

  // Echoes render events from the children. This isn't anonymous because we
  // need to remove it from the children when they are removed from the group.
  const rerender = () => container.emit('render');

  /**
   * Add children to the container.
   */
  container.add = function(child) {

    if (arguments.length > 1) child = control(...arguments);

    children = children.concat(child);
    child.on('change', rerender);
    child.on('render', rerender);

    return child;

  };

  /**
   * Remove children from the container.
   */
  container.remove = function(child) {

    children = children.filter(item => item === child);
    child.off('render', rerender);

  };

  /**
   * Render the container and all of its children as a VDOM tree, and append it
   * to the provided element.
   */
  container.mount = function(target) {

    let renderer = createApp(target);

    // A persistant state map for the groups and controls.
    let context = new WeakMap();

    // Set the initial state of the group. The top level group is open
    // by default, unlike the default state of child groups.
    context.set(container, { open: true });

    let renderTree = function() {

      console.debug('rendering');

      let rendered = el(container);
      let rootnode = el('div', { class: 'tweeq-root' }, rendered);

      renderer(rootnode, context);

    };

    // Subscribe to render events. Debouncing prevents wasted renders when
    // multiple controls are updated in the same frame.
    container.on('render', debounce(renderTree, 0));

    // Do the initial render.
    renderTree();

  };

  /**
   * Remove the container from the provided element.
   */
  container.unmount = function(target) {

    console.debug('unmounting');

  };

  /**
   * Deku method.
   */
  container.render = function(model) {

    let { context, path } = model;

    let state = util.safeget(context, container, { open: false });
    let depth = (path.split('.').length - 1) / 2;

    return view.render({ name, children, depth, update: rerender, state });

  }

  return container;

}
