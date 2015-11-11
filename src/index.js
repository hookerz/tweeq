import './views/button';
import './views/boolean';
import './views/container';
import './views/number';
import './views/string';

import insertCSS from 'insert-css';
import container from './container';
import control from './control';
import styles from './styles';

insertCSS(styles, { prepend: true });

// Babel compiles `export default` to `exports.default` which means that any
// CommonJS module would have to do
//
//   const tweeq = require('tweeq').default;
//
// which isn't awesome. Using `module.exports` keeps compatability.

module.exports = { container, control };
