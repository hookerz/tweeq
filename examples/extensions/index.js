import lo from 'lodash';
import tweeq from '../../';

function fit(value, metadata) {

  return typeof value !== undefined &&
    Number.isFinite(value.x) &&
    Number.isFinite(value.y) &&
    Number.isFinite(value.z);

}

function factory(control) {

  let el = document.createElement('div');

  let label = document.createElement('label');
  label.appendChild(control.label);

  let x = document.createElement('number');


  return el;

}

tweeq.register()
