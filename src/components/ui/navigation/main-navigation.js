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
      { href: "/pages/all-category/all-category.html", label: "All categories  |" },
      { href: "/pages/porsche-design/porsche-design.html", label: "PORSCHE DESIGN" },
      { href: "/pages/watches/watches.html", label: "Watches" },
      {
        href: "/pages/vehicle-accessories/vehicle-accessories.html",
        label: "Vehicle Accessories",
      },
      { href: "/pages/eye-wear/eyewear.html", label: "Eyewear" },
    ];

    const navList = navItems
      .map(item => `<li class="px-2 py-2 medium"><a href="${item.href}">${item.label}</a></li>`)
      .join("");

    this.template = /* html */ `
      <nav class="header-nav  border-t border-b justify-center" style="border-color: var(--color-gray-300)">
      <div class="ml-12 pl-6">
      <ul class="flex">
        ${navList}
      </ul>
      </div>
    </nav>
  
    `;
    this.render();
  }
}

customElements.define("main-navigation", MainNavigation);
