import { DomClassHelper } from "../../src/utils/DomClassHelper";

describe("DomHelper", () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement("div");
  });

  describe("addClass", () => {
    it("should add a class to the element", () => {
      DomClassHelper.addClass(element, "test-class");
      expect(element.classList.contains("test-class")).toBeTruthy();
    });

    it("should not throw an error if element is undefined", () => {
      expect(() => DomClassHelper.addClass(undefined, "test-class")).not.toThrow();
    });
  });

  describe("removeClass", () => {
    it("should remove a class from the element", () => {
      element.classList.add("test-class");
      DomClassHelper.removeClass(element, "test-class");
      expect(element.classList.contains("test-class")).toBeFalsy();
    });

    it("should not throw an error if element is undefined", () => {
      expect(() => DomClassHelper.removeClass(undefined, "test-class")).not.toThrow();
    });
  });

  describe("toggleClass", () => {
    it("should add the class if it does not exist", () => {
      DomClassHelper.toggleClass(element, "test-class");
      expect(element.classList.contains("test-class")).toBeTruthy();
    });

    it("should remove the class if it exists", () => {
      element.classList.add("test-class");
      DomClassHelper.toggleClass(element, "test-class");
      expect(element.classList.contains("test-class")).toBeFalsy();
    });

    it("should not throw an error if element is undefined", () => {
      expect(() => DomClassHelper.toggleClass(undefined, "test-class")).not.toThrow();
    });
  });
});
