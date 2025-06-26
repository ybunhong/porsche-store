import { render } from "lit/html.js";

export class BaseComponent extends HTMLElement {
  connectedCallback() {
    if (typeof this.render === "function") {
      this.render();
    }
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(_name, _oldValue, _newValue) {
    if (typeof this.render === "function") {
      this.render();
    }
  }

  setHTML(templateResult) {
    render(templateResult, this);
  }
}
