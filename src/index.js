import insertCSS from 'insert-css';

import control, { register } from './control';
import container from './container';
import styles from './styles';
import store from './store';
import views from './views';

// Inject the styles into the page.
insertCSS(styles, { prepend: true });

// Register the default views.
register(views.button,  value => typeof value === 'undefined');
register(views.boolean, value => typeof value === 'boolean');
register(views.string,  value => typeof value === 'string');
register(views.number,  value => Number.isFinite(value));

// Debuggggg
window.store = store;

// Babel compiles `export default` to `exports.default` which means that any
// CommonJS module would have to do
//
//   const tweeq = require('tweeq').default;
//
// which isn't awesome. Using `module.exports` keeps compatability.

module.exports = { container, control, register };
