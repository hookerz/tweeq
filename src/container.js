import element from 'virtual-element';
import {render, tree} from 'deku';
import TweeqGroup from './views/group';

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

    let root = document.createElement('div');
    root.classList.add('tweeq-root');

    let view = tree(<TweeqGroup container={ obj } open={ true }/>);

    el.appendChild(root);

    render(view, root);

  }

  obj.unmount = function unmount(el) {

    console.log('unmounting', el);

  }

  Object.defineProperty(obj, 'view', { value: TweeqGroup });

  return obj;

}
