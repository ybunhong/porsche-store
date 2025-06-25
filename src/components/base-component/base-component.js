import { html, render } from "lit/html.js";

export class BaseComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (typeof this.render === "function") {
      this.render();
    }
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (typeof this.render === "function") {
      this.render();
    }
  }

  // Utility to set HTML content
  setHTML(templateResult) {
    render(templateResult, this.shadowRoot);
  }

  // Utility to append CSS styles
  setStyle(css) {
    const style = document.createElement("style");
    style.textContent = css;
    this.shadowRoot.appendChild(style);
  }
}
