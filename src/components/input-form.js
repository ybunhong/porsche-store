import { html, BaseComponent } from "./base-component/component-base.js";

class InputForm extends BaseComponent {
  static get observedAttributes() {
    return ["label", "title"];
  }

  render() {
    const label = this.getAttribute("label") || "Default";

    this.setHTML(html`
      <input class="input" type="text" id="porsche-id" name="porsche-id" placeholder=${label} />
    `);
  }
}

customElements.define("input-form", InputForm);
