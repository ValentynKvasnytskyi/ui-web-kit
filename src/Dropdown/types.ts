export interface DropdownOptions {
  dropdownSelector?: string;
  buttonSelector?: string;
  itemSelector?: string;
  activeClassName?: string;
  selectedClassName?: string;
  collapseOnSelect?: boolean;
  handleItemAsLink?: boolean;
  preventDropdownItemClick?: boolean;
  onItemClick?: DropdownItemClick;
}

export type DropdownItemClick = (dropdownItem: HTMLElement, dropdown: HTMLElement) => void | (() => void);
