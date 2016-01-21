import insertCSS from 'insert-css';

import control, { extend } from './control';
import container from './container';
import styles from './styles';
import views from './views';

// Inject the styles into the page.
insertCSS(styles, { prepend: true });

// Register the default views.
extend(views.button);
extend(views.boolean);
extend(views.string);
extend(views.number);

// Babel compiles `export default` to `exports.default` which means that any
// CommonJS module would have to do
//
//   const tweeq = require('tweeq').default;
//
// which isn't awesome. Using `module.exports` keeps compatability.

module.exports = { container, control, extend };
