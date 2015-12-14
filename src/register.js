const registrations = [];

/**
 * Register a control view.
 *
 * @param fit - A function that accepts a value, and returns true if the view
 *   can accept that type of value.
 *
 */
export function register(fit, factory) {

  registrations.push({ fit, factory });

}
