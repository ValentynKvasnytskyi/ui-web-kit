
## UI-Web-Kit Dropdown Component

### Overview

The Dropdown component from UI-Web-Kit offers a versatile and easily implementable dropdown feature for web projects. Designed for flexibility, it ensures that all project-specific requirements can be met without fuss.

### Features

- **Customizable Behavior:** Customize your dropdown's functionality.
- **Event Handling:** With custom callback functions on item clicks.
- **Flexible Class Naming:** Choose between custom class names or provided defaults.
- **Out-of-the-Box Configuration:** A ready-to-use set with a standard set of configurations.

### Styles and Customization

#### Styles

The Dropdown component comes with predefined styles. Choose between:

- **CSS:** Located at `dist/Dropdown/styles/dropdown.css`
- **SCSS:** Located at `src/Dropdown/styles/dropdown.scss`

Or implement your own styling

### Configuration

The Dropdown component accepts a `DropdownOptions` configuration object:

| Option                   | Type        | Default Value          | Description                                       |
|--------------------------|-------------|------------------------|---------------------------------------------------|
| `dropdownSelector`       | String      | `.ui-dropdown`         | CSS selector for the dropdown.                    |
| `buttonSelector`         | String      | `.ui-dropdown__button` | CSS selector for the dropdown button.             |
| `itemSelector`           | String      | `.ui-dropdown__item`   | CSS selector for each dropdown item.              |
| `activeClassName`        | String      | `active`               | Class name for the active state.                  |
| `selectedClassName`      | String      | `selected`             | Class name for the selected item.                 |
| `collapseOnSelect`       | Boolean     | `true`                 | Collapse dropdown upon item selection.            |
| `handleItemAsLink`       | Boolean     | `false`                | Treat items as links.                             |
| `preventDropdownItemClick`| Boolean    | `false`                | Prevent default click behavior on dropdown items. |
| `onItemClick`            | Function    | None                   | Callback function for item clicks. It accepts two arguments: <br> - dropdownItem: HTMLElement: The specific dropdown item that was clicked. <br> - dropdown: HTMLElement: The parent dropdown element where the item resides.                |

### Usage

####  HTML Structure

```html
<div class="ui-dropdown">
    <button class="ui-dropdown__button">Select item</button>
    <div class="ui-dropdown__content">
        <div class="ui-dropdown__item">Item 1</div>
        <div class="ui-dropdown__item">Item 2</div>
        <div class="ui-dropdown__item">Item 3</div>
        <div class="ui-dropdown__item">Item 4</div>
    </div>
</div>
```

#### Import
```js 
import { Dropdown } from 'ui-web-kit/Dropdown';
```

#### Simple initialize the dropdown:

Your HTML structure and classes should be as described above

```js 
const myDropdown = new Dropdown();

myDropdown.init();
```

#### Initialize drowdown with options
```js  
const options = {
    dropdownSelector: ".custom-dropdown",
    buttonSelector: ".custom-button",
    activeClassName: "open",
    selectedClassName: "chosen",
    onItemClick: (dropdownItem, dropdown) => {
        console.log(dropdownItem.textContent);
    },
};

const myDropdown = new Dropdown(options);

myDropdown.init();
```
**If you use more than one component from library**
```js 
import uiWebKit from 'ui-web-kit';
const { Dropdown } = uiWebkit;
or
const Dropdown = uiWebkit.Dropdown;
```

### Public Methods of Dropdown instance
Once you've initialized the Dropdown, the following methods are available on instance:

**init(): void** 

Initialize a dropdown

**Example:**
```js 
const myDropdown = new Dropdown();

myDropdown.init();
```

**destroy(): void** 

Will destroy the dropdown and remove all event listeners

**Example:**
```js 
myDropdown.destroy();
```

**openDropdown(): void**  

Will open a specific dropdown.

**Example:**
```js 
myDropdown.openDropdown();
```

**closeDropdown(): void**  

Will close a specific dropdown.

**Example:**
```js
myDropdown.closeDropdown();
```
