/** @jsx el */

import { dom, element as el } from 'deku';
import views from './views';

export default function(label) {

  let container = {};
  let children = [];

  /**
   * Add children to the container.
   */
  container.add = function(...rest) {

    children = children.concat(rest);

  }

  /**
   * Remove children from the container.
   */
  container.remove = function(...rest) {

    children = children.filter(c => rest.indexOf(c) > 0);

  }

  /**
   * Render the container and all of its children as a DOM tree, and append it to the provided element.
   */
  container.mount = function(mountpoint) {

    let render = dom.createRenderer(mountpoint);
    render(<div class='tweeq-root'><container/></div>);

  }

  /**
   * Remove the container from the provided element.
   */
  container.unmount = function(el) {

    console.log('unmounting');
    // TODO

  }

  container.render = function() {

    return <div>children: { children.length }</div>

  }

  return container;

}
