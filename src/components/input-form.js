import { html, BaseComponent } from "./base-component/component-base.js";

class InputForm extends BaseComponent {
  static get observedAttributes() {
    return ["label", "title"];
  }

  render() {
    const label = this.getAttribute("label") || "Default";
    const title = this.getAttribute("title") || "Hello";

    this.setHTML(html`
      <div class="input">
        <input
          class="input"
          type="text"
          id="porsche-id"
          name="porsche-id"
          placeholder="Enter your Porsche ID"
        />
      </div>
    `);

    this.setStyle(`
      .input{
       height: 100px;
    padding: 4px;
    font-size: 14px;
      }
      `);
  }
}

customElements.define("input-form", InputForm);
