/**
 * Helper class for common DOM operations related to element classes.
 */
export class DomClassHelper {
  /**
   * Adds a class to the specified HTML element.
   *
   * @param {HTMLElement} element - The HTML element to which the class should be added.
   * @param {string} className - The name of the class to be added.
   */
  static addClass(element: HTMLElement | undefined, className: string) {
    if (!element) {
      return;
    }
    element.classList.add(className);
  }

  /**
   * Removes a class from the specified HTML element.
   *
   * @param {HTMLElement} element - The HTML element from which the class should be removed.
   * @param {string} className - The name of the class to be removed.
   */
  static removeClass(element: HTMLElement | undefined, className: string) {
    if (!element) {
      return;
    }
    element.classList.remove(className);
  }

  /**
   * Toggles a class on the specified HTML element.
   * If the class exists, it will be removed; if it does not exist, it will be added.
   *
   * @param {HTMLElement} element - The HTML element on which the class should be toggled.
   * @param {string} className - The name of the class to be toggled.
   */
  static toggleClass(element: HTMLElement | undefined, className: string) {
    if (!element) {
      return;
    }
    element.classList.toggle(className);
  }
}
