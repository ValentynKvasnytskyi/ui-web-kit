import Dropdown from "../../src/Dropdown";
import { DomClassHelper } from "../../src/utils/DomClassHelper";
import userEvent from "@testing-library/user-event";

jest.mock("../../src/utils/DomClassHelper");

const user = userEvent.setup();

describe("Dropdown", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    container.innerHTML = getDropdownHtml();
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    jest.clearAllMocks();
  });

  describe("Initialization", () => {
    it("throws an error when no dropdowns match the provided selector", () => {
      expect(() => new Dropdown({ dropdownSelector: ".nonexistent" })).toThrow();
    });

    it("initializes with default options", () => {
      const dropdown = new Dropdown();
      expect(dropdown).toBeTruthy();
    });

    it("initializes with the specified selector", () => {
      document.body.removeChild(container);
      container = document.createElement("div");
      container.innerHTML = getDropdownHtml(false);
      document.body.appendChild(container);

      const dropdown = new Dropdown({ dropdownSelector: ".dropdown" });
      expect(dropdown).toBeTruthy();
    });
  });

  describe("Click Listeners", () => {
    it("toggles dropdown active state when button is clicked", async () => {
      const dropdown = new Dropdown();
      dropdown.init();

      const dropdownElement = container?.querySelector(".ui-dropdown");
      const button = container?.querySelector(".ui-dropdown__button");

      await user.click(button!);

      expect(DomClassHelper.toggleClass).toHaveBeenCalledTimes(1);
      expect(DomClassHelper.toggleClass).toHaveBeenCalledWith(dropdownElement, "active");

      dropdown.destroy();
    });

    it("closes dropdown when clicked outside", async () => {
      const dropdown = new Dropdown();
      dropdown.init();

      const dropdownElement = container?.querySelector(".ui-dropdown");

      await user.click(document.body);

      expect(DomClassHelper.removeClass).toHaveBeenCalledTimes(1);
      expect(DomClassHelper.removeClass).toHaveBeenCalledWith(dropdownElement, "active");

      dropdown.destroy();
    });
  });

  describe("Item Selection", () => {
    it("updates button text when an item is clicked", async () => {
      const dropdown = new Dropdown();
      dropdown.init();

      const item = container?.querySelector(".ui-dropdown__item");

      await user.click(item!);

      const button = container.querySelector(".ui-dropdown__button");
      expect(button?.textContent).toBe(item?.textContent);
      expect(DomClassHelper.removeClass).toHaveBeenCalledWith(item, "selected");

      dropdown.destroy();
    });

    it("return if handleItemAsLink is true", async () => {
      const dropdown = new Dropdown({ handleItemAsLink: true });
      dropdown.init();

      const item = container?.querySelector(".ui-dropdown__item");

      await user.click(item!);

      expect(DomClassHelper.removeClass).not.toHaveBeenCalled();

      dropdown.destroy();
    });
  });

  it("openDropdown", () => {
    const dropdown = new Dropdown();
    dropdown.init();

    const dropdownElement = container?.querySelector(".ui-dropdown");

    dropdown.openDropdown();

    expect(DomClassHelper.addClass).toHaveBeenCalledTimes(1);
    expect(DomClassHelper.addClass).toHaveBeenCalledWith(dropdownElement, "active");
  });
  it("closeDropdown", () => {
    const dropdown = new Dropdown();
    dropdown.init();

    const dropdownElement = container?.querySelector(".ui-dropdown");

    dropdown.closeDropdown();

    expect(DomClassHelper.removeClass).toHaveBeenCalledTimes(1);
    expect(DomClassHelper.removeClass).toHaveBeenCalledWith(dropdownElement, "active");
  });
});
function getDropdownHtml(defaultDropdown = true) {
  return `
      <div class="${defaultDropdown ? "ui-dropdown" : "dropdown"}">
        <button class="${defaultDropdown ? "ui-dropdown__button" : "dropdown__button"}">Toggle</button>
        <div>
            <div class="${defaultDropdown ? "ui-dropdown__item" : "dropdown__item"}">Item 1</div>
            <div class="${defaultDropdown ? "ui-dropdown__item" : "dropdown__item"}">Item 2</div>
        </div>
      </div>
  `;
}
