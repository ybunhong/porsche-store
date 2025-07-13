import "./search-panel.css";
import { CrossIcon } from "../../../assets/assets";
import "@ui";

class SearchPanel extends BaseComponent {
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
    const panel = this.querySelector(".search-panel");
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
    <aside class="search-panel ${this.isOpen ? "open" : ""} bg-white px-5 py-4 absolute  h-full z-100 left-0 top-0">
      <div class="flex justify-center items-center">
        <h5>Porsche Shop</h5>
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

customElements.define("search-panel", SearchPanel);
