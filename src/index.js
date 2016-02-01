import insertCSS from 'insert-css';

import control, { extend } from './control';
import container from './container';
import extensions from './extensions';
import styles from './styles';

// Inject the styles into the page.
insertCSS(styles, { prepend: true });

// Register the default views.
for (let key in extensions) {

  console.log(`registering ${ key } extension`)
  extend(extensions[key]);

}

// Babel compiles `export default` to `exports.default` which means that any
// CommonJS module would have to do
//
//   const tweeq = require('tweeq').default;
//
// which isn't awesome. Using `module.exports` keeps compatability.

module.exports = { container, control, extend };
