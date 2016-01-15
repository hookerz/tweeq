import lo from 'lodash';
import tweeq from '../../';

let container = tweeq.container();

let controls = [

  tweeq.control('a button'),
  tweeq.control('a toggle', true),
  tweeq.control('a number', 100),
  tweeq.control('a textbox', 'hello world')

];

for (let control of controls) {

  control.on('change', value => console.log(value));
  container.add(control);

}

let mountpoint = document.getElementById('mount');
container.mount(mountpoint);
