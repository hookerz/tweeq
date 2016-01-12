import test from 'tape';
import { reducer, actions } from '../src/store';

test('add control', function(assert) {

  let before = undefined;
  let result = reducer(before, {

    type: actions.ADD_CONTROL,
    label: 'test',
    value: 0

  });

  assert.same(result, [{ label: 'test', value: 0 }]);
  assert.end();

});

test('remove control', function(assert) {

  let before = [{ label: 'test', value: 0 }]
  let result = reducer(before, {

    type: actions.REMOVE_CONTROL,
    index: 0

  });

  assert.same(result, [])
  assert.end();

});
