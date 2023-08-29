import { DropdownOptions } from "../types";

export const defaultOptions: DropdownOptions = Object.freeze({
  dropdownSelector: ".ui-dropdown",
  buttonSelector: ".ui-dropdown__button",
  itemSelector: ".ui-dropdown__item",
  activeClassName: "active",
  selectedClassName: "selected",
  collapseOnSelect: true,
  handleItemAsLink: false,
  preventDropdownItemClick: false,
  onItemClick: () => {},
});
