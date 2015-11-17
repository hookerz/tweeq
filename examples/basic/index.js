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

let target = document.getElementById('tweeq');
target.style.position = 'absolute';
target.style.right = '20%';
target.style.top = 0;

container.mount(target);
