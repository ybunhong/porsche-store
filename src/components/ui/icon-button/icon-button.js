import { BaseComponent } from "../../base-component.js";
import "./icon-button.css";

class IconButton extends BaseComponent {
  static get observedAttributes() {
    return ["icon", "size"];
  }

  constructor() {
    super();
    this.label = "";
    this.variant = "primary";
    this.disabled = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.action = this.getAttribute("action");
    this.updateTemplate();
    this.addEventListener("click", () => {
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

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "icon") {
        this.icon = newValue;
      }
      if (name === "size") {
        this.size = newValue;
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    const scale = this.size || 1;
    this.template = `
      <button class="icon-button border-none bg-transparent flex justify-center" style="transform: scale(${scale})">
        <img src="${this.icon}" alt="MenuIcon" class="iconbutton__icon"/>
      </button>
    `;

    this.render();
  }
}

customElements.define("icon-button", IconButton);
export { IconButton };
