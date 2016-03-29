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
