import events from './events';

export function clamp(l, h, n) {

  if (n < l) return l;
  if (n > h) return h;
  return n;

}

/**
 * Get a value from a map. If the map doesn't have a value for the key,
 * set it to a default value and return that instead.
 */
export function safeget(map, key, val) {

  if (!map.has(key)) map.set(key, val);
  return map.get(key);

}

export function dragInteraction(handler) {

  const onChange = function(event, target) {

    // Derive the position of the mouse relative to the initial target of
    // the drag interaction. We compute the bounding box on every event
    // in case it changes. We don't use event.offsetX/Y because it is
    // relative to the target of the event, which can change if the user
    // is dragging outside of the bounds of the initial target.
    const bounds = target.getBoundingClientRect();
    const x = event.pageX - bounds.left;
    const y = event.pageY - bounds.top;
    const offset = { x, y };

    handler(offset, bounds, target);

  }

  const onMouseDown = function(event) {

    const initialTarget = event.currentTarget;

    let ignoreMove = true;

    const onMouseMove = function(event) {

      // https://bugs.chromium.org/p/chromium/issues/detail?id=161464
      if (ignoreMove) {
        ignoreMove = false;
        return;
      }

      onChange(event, initialTarget);

    }

    const onMouseUp = (event) => {

      events.off(window, 'mousemove', onMouseMove);
      events.off(window, 'mouseup', onMouseUp);

    }

    events.on(window, 'mousemove', onMouseMove);
    events.on(window, 'mouseup', onMouseUp);

  }

  const onClick = function(event) {

    onChange(event, event.currentTarget);

  }

  return { onClick, onMouseDown };

}
