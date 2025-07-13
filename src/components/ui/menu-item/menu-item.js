import "./menu-item.css";

class MenuItem extends BaseComponent {
  static get observedAttributes() {
    return ["label", "has-submenu", "href"];
  }

  constructor() {
    super();
    this.hasSubmenu = false;
    this.label = "";
    this.href = "#";
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
      if (name === "has-submenu") {
        this.hasSubmenu = newValue !== null;
      }
      if (name === "href") {
        this.href = newValue;
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    this.template = /* html */ `
    <div class="text-h6 py-2">
        <a href="${this.href || "#"} " class="flex justify-between">
          <span>${this.label || ""}</span>
          ${this.hasSubmenu ? "<span>></span>" : ""}
        </a>
    </div>
  
    `;
    this.render();
  }
}

customElements.define("menu-item", MenuItem);
