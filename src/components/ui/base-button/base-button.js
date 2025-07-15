import "./base-button.css";

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
      this.updateTemplate();
    }
  }

  updateTemplate() {
    let classes = "py-3 px-2 rounded-sm body-xs text-center heading-lg  w-full ";

    classes += `button-${this.variant} `;

    this.template = `
      <button class="${classes}">${this.label}</button>
      
    `;
    this.render();
  }
}

customElements.define("base-button", BaseButton);
