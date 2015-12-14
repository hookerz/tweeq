import element from 'virtual-element';
import {render, tree} from 'deku';
import TweeqGroup from './views/group';

export default function(label) {

  let obj = {};

  let el = document.createElement('div');
  let controls = new Set();

  /**
   * Add a control to the container.
   */
  obj.add = function add(control) {

    console.log('adding', control);
    controls.add(control);

  }

  /**
   * Remove a control from the container.
   */
  obj.remove = function remove(control) {

    console.log('removing', control);
    controls.delete(control);

  }

  obj.mount = function mount(el) {

    console.log('mounting', el);

    let el = document.createElement('div');
    el.classList.add('tweeq-root');

    let view = tree(<TweeqGroup container={ obj } open={ true }/>);

    el.appendChild(el);

    render(view, el);

  }

  obj.unmount = function unmount(el) {

    console.log('unmounting', el);

  }

  Object.defineProperty(obj, 'view', { value: TweeqGroup });

  return obj;

}
