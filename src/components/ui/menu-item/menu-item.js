import "./menu-item.css";
import { chevron } from "@assets";

class MenuItem extends BaseComponent {
  static get observedAttributes() {
    return ["label", "submenu", "href", "emitter"];
  }

  constructor() {
    super();
    this.hasSubmenu = false;
    this.emitter = "";
    this.label = "";
    this.href = "#";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
    this.addEventListener("click", event => {
      event.preventDefault(); // Prevent default link behavior
      this.dispatchEvent(
        new CustomEvent("menu-item", {
          bubbles: true,
          detail: { emitter: this.emitter },
        })
      );
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "label") {
        this.label = newValue;
      }
      if (name === "submenu") {
        this.hasSubmenu = newValue !== null && newValue;
      }
      if (name === "href") {
        this.href = newValue;
      }
      if (name === "emitter") {
        this.emitter = newValue;
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    this.template = /* html */ `
    <div class="body-sm py-2 hover-bg-accent rounded-sm px-1">
        <a href="${this.href || "#"}" class="flex justify-between">
          <span>${this.label || ""}</span>
          ${this.hasSubmenu ? `<img src="${chevron}">` : ""}
        </a>
    </div>
    `;
    this.render();
  }
}

customElements.define("menu-item", MenuItem);
