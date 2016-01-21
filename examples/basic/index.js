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

  container.add(control);

  // Log any changes to the console.
  control.on('change', value => console.log(value));

}

let subcontainer = tweeq.container('a folder');

subcontainer.add(tweeq.control('another button'));
subcontainer.add(tweeq.control('a third button'));

container.add(subcontainer);

let mountpoint = document.getElementById('mount');
container.mount(mountpoint);
