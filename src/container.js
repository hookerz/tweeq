/** @jsx el */

import { dom, element as el } from 'deku';
import views from './views';

export default function container(name) {

  const id = actions.createContainer({ name });

  const container = Object.create({}, {

    id: {
      value: id,
      writable: false,
      enumerable: false
    }

  });

  /**
   * Add children to the container.
   */
  container.add = function(control) {

    actions.parentControl(control.id, id);

    // children = children.concat(rest);

  }

  /**
   * Remove children from the container.
   */
  container.remove = function(control) {

    actions.orphanControl(control.id, id);

  }

  /**
   * Render the container and all of its children as a DOM tree, and append it to the provided element.
   */
  container.mount = function(mountpoint) {

    console.log('mounting');

  }

  /**
   * Remove the container from the provided element.
   */
  container.unmount = function(el) {

    console.log('unmounting');

  }

  return container;

}
