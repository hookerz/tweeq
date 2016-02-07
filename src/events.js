export function on(target, type, handler) {

  target.addEventListener(type, handler);

}

export function off(target, type, handler) {

  target.removeEventListener(type, handler);

}

export function once(target, type, handler) {

  let closure = event => {
    handler.call(target, event);
    target.removeEventListener(type, closure);
  }

  target.addEventListener(type, closure);

}

export default { on, off, once }
