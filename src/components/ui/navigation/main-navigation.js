import { BaseComponent } from "../../base-component.js";
import "../../../styles/index.css";
import "./main-navigation.css";

class MainNavigation extends BaseComponent {
  static get observedAttributes() {
    return ["label"];
  }

  constructor() {
    super();
    this.label = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate(); // <- Add this to trigger initial render
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
    const navItems = [
      { href: "#", label: "All categories  |" },
      { href: "#", label: "PORSCHE DESIGN" },
      { href: "#", label: "Watches" },
      { href: "#", label: "Bag & Luggage" },
      { href: "#", label: "Example" },
      { href: "#", label: "Heritage" },
      { href: "#", label: "Vehicle Accessories" },
      { href: "#", label: "Eyewear" },
    ];

    const navList = navItems
      .map(item => `<li class="px-2 py-2 medium"><a href="${item.href}">${item.label}</a></li>`)
      .join("");

    this.template = /* html */ `
      <nav class="header-nav flex border-t justify-center">
      <ul class="flex ml-8">
        ${navList}
      </ul>
    </nav>
  
    `;
    this.render();
  }
}

customElements.define("main-navigation", MainNavigation);
