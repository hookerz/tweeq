import lo from 'lodash';
import tweeq from '../../';

let container = tweeq.container();

let controls = [

  tweeq.control('a button'),
  tweeq.control('a toggle', true),
  tweeq.control('a number', 100),
  tweeq.control('a textbox', 'hello world')

];

controls.forEach(control => {

  control.on('change', value => console.log(value));
  container.add(control);

});

let mountpoint = document.getElementById('mount');
mountpoint.style.position = 'absolute';
mountpoint.style.left = '20%';
mountpoint.style.top = 0;

container.mount(mountpoint);
