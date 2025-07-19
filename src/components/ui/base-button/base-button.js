import "./base-button.css";

class BaseButton extends BaseComponent {
  static get observedAttributes() {
    return ["label", "variant", "disabled", "type", "action"];
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
    this.addEventListener("click", event => {
      if (this.disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (this.action) {
        this.dispatchEvent(
          new CustomEvent("base-button", {
            bubbles: true,
            detail: { action: this.action },
          })
        );
      }
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "label":
          this.label = newValue;
          break;
        case "variant":
          this.variant = newValue;
          break;
        case "type":
          this.type = newValue;
          break;
        case "action":
          this.action = newValue;
          break;
        case "disabled":
          this.disabled = newValue !== null && newValue !== "false";
          break;
        default: {
          console.warn(`Unhandled observed attribute: ${name}`);
          break;
        }
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    let classes = " rounded-sm  text-center w-full whitespace-nowrap ";

    classes += `button-${this.variant} `;

    if (this.type === "button") {
      classes += "py-3 px-4 heading-xs";
    } else if (this.type === "status") {
      classes += "py-1  px-2 body-3xs ";
    }

    this.template = `
      <button class="${classes}">${this.label}</button>
      
    `;
    this.render();
  }
}

customElements.define("base-button", BaseButton);
