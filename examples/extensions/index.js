import tweeq from '../../';

function iscounter(value) {

  return Number.isFinite(value);

}

function counter(control, update) {

  let clicked = event => update(value + 1);

  return <div onClick={ clicked }>
    <label>{ control.label }</label>
    <div>{ control.value }</div>
  </div>;

}

tweeq.register('my-counter', iscounter);
