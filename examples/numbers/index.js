import lo from 'lodash';
import tweeq from '../../';

let container = tweeq.container();

let controls = [

  tweeq.control('a number', 100),

  tweeq.control({
    label: 'a slider',
    value: 50,
    min: 0,
    max: 100
  })

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
