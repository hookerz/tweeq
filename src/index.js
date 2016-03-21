import { element }         from 'deku';
import insertCSS           from 'insert-css';
import control, { extend } from './control';
import container           from './container';
import extensions          from './extensions';
import styles              from './styles';

// Inject the styles into the page.
insertCSS(styles, { prepend: true });

// Register the default views.
for (let key in extensions) {

  console.log(`registering ${ key } extension`)
  extend(extensions[key]);

}

export default { container, control, extend, element };
