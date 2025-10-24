import "../../index.js";
import "./base-header.css";
import { BaseComponent } from "../../base-component.js";

class BaseHeader extends BaseComponent {
  static get observedAttributes() {
    return ["label", "mode"];
  }

  constructor() {
    super();
    this.label = "";
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
      this.updateTemplate();
    }
  }

  updateTemplate() {
    this.template = /* html */ `
     <header class="flex flex-col z-1000">
      <header-toolbar></header-toolbar>
      <main-navigation></main-navigation>
      
    </header>
    `;
    this.render();
  }
}

customElements.define("base-header", BaseHeader);
