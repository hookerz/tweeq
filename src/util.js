export function clamp(l, h, n) {

  if (n < l) return l;
  if (n > h) return h;
  return n;

}

