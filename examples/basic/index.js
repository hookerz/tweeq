import lo from 'lodash';
import tweeq from '../../src';

let container = tweeq.container();

let controls = {

  button: tweeq.control('a button'),
  toggle: tweeq.control('a toggle', true),
  number: tweeq.control('a number', 100),
  text:   tweeq.control('a textbox', 'hello world')

};

lo.values(controls).map(control => {

  control.on('change', value => console.log(value));
  container.add(control);

});

let folder = tweeq.container('a folder');
folder.add(tweeq.control('another button'));

let folder2 = tweeq.container('a folder');
folder2.add(tweeq.control('another button'));
folder2.add(tweeq.control('another another button'));
folder.add(folder2);

folder.add(tweeq.control('another another button'));

container.add(folder);

container.mount(document.getElementById('tweeq'));
