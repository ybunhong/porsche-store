import { BaseComponent } from "./base-component.js";
import "../styles/main.css";

class BaseButton extends BaseComponent {
  static get observedAttributes() {
    return ["label", "variant", "disabled"];
  }

  constructor() {
    super();
    this.label = "";
    this.variant = "primary";
    this.disabled = false;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "label") {
        this.label = newValue;
      }
      if (name === "variant") {
        this.variant = newValue;
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    let classes = "py-3 px-1 rounded text-p-base semibold w-full ";

    if (this.variant === "primary") {
      classes += "bg-primary text-white text-center";
    } else if (this.variant === "secondary") {
      classes += "border text-black bg-transparent";
    } else if (this.variant === "tertiary") {
      classes += "text-black bg-white border-none";
    } else if (this.variant === "ghost") {
      classes += "border border-white text-white bg-transparent ";
    }

    this.template = `
      <button class="${classes}">${this.label}</button>
    `;
    this.render();
  }
}

customElements.define("base-button", BaseButton);
