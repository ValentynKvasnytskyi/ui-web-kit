import { DomClassHelper } from "../utils/DomClassHelper";
import { DropdownOptions, DropdownItemClick } from "./types";
import { defaultOptions } from "./consts/defaultConfig";
import OutsideClickListener from "../utils/OutsideClickListener";

/**
 * Dropdown class that manages and initializes dropdown behavior.
 */
class Dropdown {
  private readonly activeClassName: string;
  private readonly selectedClassName: string;
  private readonly dropdown: HTMLElement;
  private readonly collapseOnSelect: boolean;
  private readonly preventItemClick: boolean;
  private readonly handleItemAsLink: boolean;
  private readonly buttonSelector: string;
  private readonly itemSelector: string;
  private readonly onDropdownItemClick: DropdownItemClick;
  private outsideClickListener: OutsideClickListener | null;

  /**
   * Initializes a new instance of the Dropdown class.
   * @param {DropdownOptions} options - Configuration options for the dropdown.
   */
  constructor(options?: DropdownOptions) {
    const formattedOptions: DropdownOptions = { ...defaultOptions, ...options };
    this.dropdown = document.querySelector(formattedOptions.dropdownSelector as string) as HTMLElement;
    if (!this.dropdown) {
      throw new Error("Dropdowns with the specified selector are not found on the page.");
    }

    this.buttonSelector = formattedOptions.buttonSelector as string;
    this.itemSelector = formattedOptions.itemSelector as string;
    this.collapseOnSelect = formattedOptions.collapseOnSelect as boolean;
    this.preventItemClick = formattedOptions.preventDropdownItemClick as boolean;
    this.handleItemAsLink = formattedOptions.handleItemAsLink as boolean;
    this.onDropdownItemClick = formattedOptions.onItemClick as DropdownItemClick;
    this.activeClassName = formattedOptions.activeClassName as string;
    this.selectedClassName = formattedOptions.selectedClassName as string;
    this.outsideClickListener = null;
  }

  public init(): void {
    this.outsideClickListener = new OutsideClickListener(this.dropdown, this.closeDropdown.bind(this));
    this.activateDropdownClickListener();
  }

  public openDropdown(): void {
    DomClassHelper.addClass(this.dropdown, this.activeClassName);
  }

  public closeDropdown(): void {
    DomClassHelper.removeClass(this.dropdown, this.activeClassName);
  }

  public destroy(): void {
    (this.outsideClickListener as OutsideClickListener).destroy();
    this.dropdown.removeEventListener("click", this.dropdownClickListener); // Changed addEventListener to removeEventListener
  }

  /**
   * Activates click listener for the dropdown.
   */
  private activateDropdownClickListener(): void {
    this.dropdown.addEventListener("click", this.dropdownClickListener.bind(this));
  }

  /**
   * Handles dropdown click event.
   * @param {MouseEvent} e - The event object.
   */
  private dropdownClickListener(e: MouseEvent): void {
    const target = e.target as HTMLElement;

    if (target.closest(this.buttonSelector)) {
      DomClassHelper.toggleClass(this.dropdown, this.activeClassName);
    }

    if (target.closest(this.itemSelector)) {
      this.handleItemClickCallback(target);
    }
  }

  /**
   * Handles item selection within a dropdown.
   * @param {HTMLElement} target - The clicked item.
   */
  private handleItemClickCallback(target: HTMLElement): void {
    const targetItem = target.closest(this.itemSelector) as HTMLElement;
    if (!targetItem || (targetItem && this.handleItemAsLink)) {
      return;
    }

    const items = this.dropdown.querySelectorAll(this.itemSelector) as NodeListOf<HTMLElement>;
    const button = this.dropdown.querySelector(this.buttonSelector) as HTMLElement;

    if (!this.preventItemClick) {
      button.textContent = targetItem.textContent;
      items.forEach((item) => DomClassHelper.removeClass(item, this.selectedClassName));
      DomClassHelper.addClass(targetItem, this.selectedClassName);

      if (this.collapseOnSelect) {
        this.closeDropdown();
      }
    }

    this.onDropdownItemClick(targetItem, this.dropdown);
  }
}

export default Dropdown;
