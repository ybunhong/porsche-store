import "@ui";

class BaseHeader extends BaseComponent {
  static get observedAttributes() {
    return ["label"];
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
     <header class="header flex flex-col z-1000">
      <header-toolbar></header-toolbar>
      <main-navigation><main-navigation>
    </header>
    `;
    this.render();
  }
}

customElements.define("base-header", BaseHeader);
