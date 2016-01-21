/** @jsx el */

import { createApp, element as el } from 'deku';
import debounce from 'lodash.debounce';
import emitter from 'component-emitter';
import view from './views/group';

export default function container(name) {

  const container = Object.create(emitter.prototype);

  let children = [];

  // Echoes render events from the children.
  const echo = event => container.emit('render');

  /**
   * Add children to the container.
   */
  container.add = function(control) {

    children = children.concat(control);
    control.on('render', echo);

  };

  /**
   * Remove children from the container.
   */
  container.remove = function(control) {

    children = children.filter(child => child === control);
    control.off('render', echo);

  };

  /**
   * Render the container and all of its children as a DOM tree, and append it to the provided element.
   */
  container.mount = function(target) {

    console.log('mounting');

    const renderer = createApp(target);
    const render = function() {

      console.log('rendering');
      renderer(<div class='tweeq-root'>{ el(container) }</div>);

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

  container.render = function() {

    return view.render(children, el);

  }

  return container;

}
