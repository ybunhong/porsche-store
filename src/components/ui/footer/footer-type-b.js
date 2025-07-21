import "./footer-main.css";

class FooterTypeB extends BaseComponent {
  static get obseredAttributes() {
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
      { href: "index.html", label: "Terms and Conditions." },
      { href: "#", label: "Privacy Notice." },
      { href: "#", label: "California Privacy." },
      { href: "#", label: "Imprint and Legal Notice." },
      { href: "#", label: "Accessibility Statement." },
      { href: "#", label: "Consumption Information." },
      { href: "#", label: "Do Not Sell or Share My Personal Information." },
      { href: "#", label: "Business and Human Rights." },
      { href: "#", label: "Open Source Software Notice." },
    ];

    const navList = navItems
      .map(item => `<span><a href="${item.href}">${item.label}</a></span>`)
      .join("");

    this.template = /* html */ `
      <div class="footer py-4">
         <p class="">
          © 2025 Porsche Sales and Marketplace Inc..
         ${navList}
         </p>
       </div>
    `;
    this.render();
  }
}

customElements.define("footer-b", FooterTypeB);
