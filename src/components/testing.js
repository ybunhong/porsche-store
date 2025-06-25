import { html } from "lit";
import { BaseComponent } from "./base-component/base-component.js";

class ButtonProduct extends BaseComponent {
  static get observedAttributes() {
    return ["label", "title"];
  }

  render() {
    const label = this.getAttribute("label") || "Default";
    const title = this.getAttribute("title") || "Hello";

    this.setHTML(html`
      <h1>${title}</h1>
      <button>${label}</button>
    `);

    this.setStyle(`
      h1 {
        color: #333;
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      button:hover {
        background-color: #0056b3;
      }
    `);
  }
}

customElements.define("button-product", ButtonProduct);
