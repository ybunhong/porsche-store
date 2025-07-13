import { BaseComponent } from "../../base-component";
import "../../../styles/index.css";
import "./hamburger-panel.css";
import { CrossIcon } from "../../../assets/assets";
import "../../ui/index";

class HamBurgerPanel extends BaseComponent {
  constructor() {
    super();
    this.isOpen = false;
    this.menuData = {
      main: [
        {
          label: "All categories",
          href: "#",
          hasSubmenu: true,
          submenu: [
            { label: "← Back", icon: "↩️", action: "back" },
            { label: "New Arrivals", href: "#", action: "navigate" },
            { label: "Best Sellers", href: "#", action: "navigate" },
            { label: "Sale Items", href: "#", action: "navigate" },
            { label: "Limited Edition", href: "#", action: "navigate" },
          ],
        },
        {
          label: "PORSCHE DESIGN",
          href: "#",
          hasSubmenu: true,
          submenu: [
            { label: "← Back", icon: "↩️", action: "back" },
            {
              label: "Accessories",
              href: "#",
              hasSubmenu: true,
              submenu: [
                { label: "← Back", icon: "↩️", action: "back" },
                { label: "Leather Goods", href: "#", action: "navigate" },
                { label: "Tech Accessories", href: "#", action: "navigate" },
                { label: "Travel Gear", href: "#", action: "navigate" },
                { label: "Home & Office", href: "#", action: "navigate" },
              ],
            },
            {
              label: "Apparel",
              href: "#",
              hasSubmenu: true,
              submenu: [
                { label: "← Back", icon: "↩️", action: "back" },
                { label: "Men's Clothing", href: "#", action: "navigate" },
                { label: "Women's Clothing", href: "#", action: "navigate" },
                { label: "Sportswear", href: "#", action: "navigate" },
                { label: "Footwear", href: "#", action: "navigate" },
              ],
            },
            { label: "Lifestyle", href: "#", action: "navigate" },
            { label: "Collectibles", href: "#", action: "navigate" },
          ],
        },
        { label: "Watches", href: "#", action: "navigate" },
        { label: "Bags & Luggage", href: "#", action: "navigate" },
        { label: "Heritage", href: "#", action: "navigate" },
        { label: "Vehicle Accessories", href: "#", action: "navigate" },
        { label: "Eyewear", href: "#", action: "navigate" },
      ],
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.renderTemplate();
    this.updateOpenState();
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    this.updateOpenState();
  }

  updateOpenState() {
    const panel = this.querySelector(".hamburger-panel");
    if (panel) {
      panel.classList.toggle("open", this.isOpen);
    }
  }

  renderTemplate() {
    const Menuitem = this.menuData.main
      .map(item => {
        const hasSubmenuAttr = item.hasSubmenu ? "has-submenu" : "";
        return `<menu-item label="${item.label}" href="${item.href}" ${hasSubmenuAttr}></menu-item>`;
      })
      .join("");

    this.template = /* html */ `
    <aside class="hamburger-panel ${this.isOpen ? "open" : ""}  bg-white px-5 py-4 absolute z-5000  h-full left-0 top-0">
      <div class="flex justify-center items-center">
        <h2>Porsche Shop</h2>
        <icon-button id="close-button" icon="${CrossIcon}" class="absolute right-5"></icon-button>
      </div>
      <div>
        ${Menuitem}
      </div>
    </aside>
  `;

    this.render();

    const closeButton = this.querySelector("#close-button");
    if (closeButton) {
      closeButton.addEventListener("click", () => this.toggleOpen());
    }
  }
}

customElements.define("hamburger-panel", HamBurgerPanel);
