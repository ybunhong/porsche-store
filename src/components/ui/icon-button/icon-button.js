import "./icon-button.css";

/**
 * IconButton Web Component
 *
 * Usage in HTML:
 * <icon-button
 *   icon="/path/to/default-icon.svg"
 *   toggle-icon="/path/to/toggle-icon.svg"
 *   size="1.5"
 *   disabled
 *   action="some-panel"
 *   class="your-css-classes"
 * ></icon-button>
 *
 * Attributes:
 * - icon (string): URL/path of the default icon image (required)
 * - toggle-icon (string): URL/path of the icon to toggle to on click (optional)
 * - size (number): Scale multiplier for the icon size, defaults to 1 (optional)
 * - disabled (boolean): Disables the button and prevents interaction (optional)
 * - action (string): Custom identifier dispatched with "toggle-panel" event on click (optional)
 *
 * Example:
 * <icon-button
 *   icon="/icons/heart.svg"
 *   toggle-icon="/icons/menu.svg"
 *   size="1"
 *   action="sidebar"
 * ></icon-button>
 *
 * In JavaScript:
 * const btn = document.querySelector('icon-button');
 *
 * // Programmatically toggle the icon
 * btn.toggle();
 *
 * // Set toggle state explicitly
 * btn.setToggleState(true);  // shows toggle icon
 * btn.setToggleState(false); // shows original icon
 *
 * // Disable and enable the button
 * btn.disable();
 * btn.enable();
 *
 * Events:
 * - "toggle-panel": dispatched on click if 'action' attribute is set.
 *   Event.detail contains: { panel: actionValue }
 *
 * Accessibility:
 * - Disabled button uses 'disabled' attribute and updates tabindex accordingly.
 */

class IconButton extends BaseComponent {
  static get observedAttributes() {
    return ["icon", "size", "toggle-icon", "disabled"];
  }

  constructor() {
    super();
    this.icon = "";
    this.variant = "primary";
    this.size = 1;
    this.originalIcon = "";
    this.toggleIcon = "";
    this.hasToggleIcon = false;
    this.isToggled = false;
    this.disabled = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.action = this.getAttribute("action");
    this.updateTemplate();
    this.addEventListener("click", event => {
      if (this.disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (this.hasToggleIcon) {
        this.isToggled = !this.isToggled;
        this.setToggleIcon();
      }
      if (this.action) {
        this.dispatchEvent(
          new CustomEvent("toggle-panel", {
            bubbles: true,
            composed: true,
            detail: { panel: this.action },
          })
        );
      }
    });
  }

  static validateSize(value) {
    const num = parseFloat(value);
    if (Number.isNaN(num) || num <= 0) {
      console.warn(`Invalid size value: ${value}. Using default size 1.`);
      return 1;
    }
    return Math.min(Math.max(num, 0.1), 5);
  }

  setToggleIcon() {
    this.icon = this.isToggled ? this.toggleIcon : this.originalIcon;
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "icon":
          this.icon = newValue || "";
          if (!this.originalIcon) {
            this.originalIcon = newValue || "";
          }
          break;
        case "size":
          this.size = IconButton.validateSize(newValue);

          break;
        case "toggle-icon":
          this.toggleIcon = newValue || "";
          this.hasToggleIcon = Boolean(newValue);
          break;
        case "disabled":
          this.disabled = newValue !== null;
          break;
        default:
          console.warn(`Unhandled observed attribute: ${name}`);
          break;
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    this.template = `
      <button class="icon-button border-none bg-transparent flex justify-center" 
      style="transform: scale(${this.size || 1})">
        <img src="${this.icon}" 
        alt="MenuIcon" 
        ${this.disabled ? "disabled" : ""}/>
      </button>
    `;

    this.render();
  }

  // Public methods for external control
  toggle() {
    if (this.hasToggleIcon) {
      this.isToggled = !this.isToggled;
      this.setToggleIcon();
    }
  }

  setToggleState(toggled) {
    if (this.hasToggleIcon) {
      this.isToggled = Boolean(toggled);
      this.setToggleIcon();
    }
  }

  disable() {
    this.disabled = true;
    this.setAttribute("disabled", "");
    this.updateTemplate();
  }

  enable() {
    this.disabled = false;
    this.removeAttribute("disabled");
    this.updateTemplate();
  }
}

customElements.define("icon-button", IconButton);
