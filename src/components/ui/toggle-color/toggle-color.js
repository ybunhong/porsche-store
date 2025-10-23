import { BaseComponent } from "../../base-component.js";

class ToggleColor extends BaseComponent {
  static get observedAttributes() {
    return ["icon"];
  }

  constructor() {
    super();
    this.icon = "";
    this.data = ["red", "blue", "pink", "orange"];
    this.selected = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.action = this.getAttribute("action");
    this.updateTemplate();
    this.attachEvents();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "toggle-icon": {
          this.toggleIcon = newValue || "";
          this.hasToggleIcon = Boolean(newValue);
          break;
        }
        default: {
          console.warn(`Unhandled observed attribute: ${name}`);
          break;
        }
      }
      this.updateTemplate();
      this.attachEvents();
    }
  }

  updateTemplate() {
    this.template = `
      <div class="p-2 bg-white flex gap-1 bg-transparent">
        ${this.data
          .map(
            color => `
              <div class="cursor-pointer" data-color="${color}">
                <svg width="20" height="20">
                  <circle cx="10" cy="10" r="8" fill="${color}"/>
                  ${
                    this.selected === color
                      ? "<circle cx='10' cy='10' r='10' fill='none' stroke='black' stroke-width='1'/>"
                      : ""
                  }
                </svg>
              </div>
        `
          )
          .join("")}
      </div>
    `;
    this.render();
  }

  attachEvents() {
    const colorItems = this.querySelectorAll("[data-color]");
    colorItems.forEach(el => {
      el.addEventListener("click", () => {
        const color = el.getAttribute("data-color");
        this.selected = color;
        this.dispatchEvent(
          new CustomEvent("color-change", {
            detail: { color },
            bubbles: true,
          })
        );

        this.updateTemplate();
        this.attachEvents();
      });
    });
  }
}

customElements.define("toggle-color", ToggleColor);
