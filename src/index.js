import insertCSS from 'insert-css';

import container from './container';
import control from './control';
import styles from './styles';
import views from './views';

// Inject the styles into the page.
insertCSS(styles, { prepend: true });

// Register the default views.
control.register(views.button,  value => typeof value === 'undefined');
control.register(views.boolean, value => typeof value === 'boolean');
control.register(views.string,  value => typeof value === 'string');
control.register(views.number,  value => Number.isFinite(value));

// Babel compiles `export default` to `exports.default` which means that any
// CommonJS module would have to do
//
//   const tweeq = require('tweeq').default;
//
// which isn't awesome. Using `module.exports` keeps compatability.

module.exports = { container, control };
