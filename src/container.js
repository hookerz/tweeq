/** @jsx element **/

import element from 'virtual-element';
import {render, tree} from 'deku';
import TweeqContainer from './views/container';

export default function(label) {

  let obj = {};

  let parent = undefined;
  let children = [];

  obj.label = label;
  obj.children = children;

  obj.type = 'container';

  obj.add = function add(child) {

    console.log('adding', child);
    let i = children.indexOf(child);
    if (i < 0) children.push(child);

  }

  obj.remove = function remove(child) {

    console.log('removing', child);
    let i = children.indexOf(child);
    if (i >= 0) children.splice(i, 1);

  }

  obj.mount = function mount(el) {

    console.log('mounting', el);
    let view = tree(<TweeqContainer container={obj} open={true} />);

    render(view, el);

  }

  obj.unmount = function unmount(el) {

    console.log('unmounting', el);

  }

  return obj;

}
