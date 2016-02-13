import { createApp, element as el } from 'deku';
import debounce from 'lodash.debounce';
import emitter from 'component-emitter';
import control from './control';
import views from './views';

export default function container(name = 'default') {

  let container = Object.create(emitter.prototype);

  let children = [];

  // Echoes render events from the children.
  let echo = event => container.emit('render');

  // Toggles the open-ness of the container and rerenders the container.
  let toggle = event => { open = !open; container.emit('render'); };

  // Tracks whether the container view is open or closed.
  let open = false;

  /**
   * Add children to the container.
   */
  container.add = function(child) {

    if (arguments.length > 1) child = control(...arguments);

    children = children.concat(child);
    child.on('change', echo);
    child.on('render', echo);

    return child;

  };

  /**
   * Remove children from the container.
   */
  container.remove = function(child) {

    children = children.filter(item => item === child);
    child.off('render', echo);

  };

  /**
   * Render the container and all of its children as a VDOM tree, and append it
   * to the provided element.
   */
  container.mount = function(target) {

    let renderer = createApp(target);

    let render = function() {

      console.log('rendering');

      let rendered = el(container);
      let rootnode = el('div', { class: 'tweeq-root' }, rendered);

      renderer(rootnode);

    };

    // Subscribe to render events. Debouncing prevents wasted renders when
    // multiple controls are updated in the same frame.
    container.on('render', debounce(render, 0));

    // Do the initial render.
    render();

  };

  /**
   * Remove the container from the provided element.
   */
  container.unmount = function(target) {

    console.log('unmounting');

  };

  container.render = function(model) {

    let view = open ? views.groupOpened : views.groupClosed;
    let depth = (model.path.split('.').length - 1) / 2;

    // Render the view with some named parameters.
    return view.render({ name, children, open, toggle, depth });

  }

  return container;

}
