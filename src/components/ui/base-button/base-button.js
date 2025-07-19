import "./base-button.css";

class BaseButton extends BaseComponent {
  static get observedAttributes() {
    return ["label", "variant", "disabled", "type"];
  }

  constructor() {
    super();
    this.label = "";
    this.variant = "primary";
    this.disabled = false;
    this.type = "button";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "label") {
        this.label = newValue;
      }
      if (name === "variant") {
        this.variant = newValue;
      }
      if (name === "type") {
        this.type = newValue;
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    let classes = "px-2 rounded-sm  text-center w-full ";

    classes += `button-${this.variant} `;

    if (this.type === "button") {
      classes += "py-3 heading-lg ";
    } else if (this.type === "status") {
      classes += "py-1 body-3xs ";
    }

    this.template = `
      <button class="${classes}">${this.label}</button>
      
    `;
    this.render();
  }
}

customElements.define("base-button", BaseButton);
