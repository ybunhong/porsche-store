import "./hamburger-panel.css";
import { cross, arrow } from "@assets";
import { BaseComponent } from "../../base-component.js";
import "@ui";

class HamBurgerPanel extends BaseComponent {
  constructor() {
    super();
    this.isOpen = false;
    this.currentMenu = "Porsche Shop"; // Start with main menu
    this.menuHistory = []; // Track navigation history
    this.menuData = [
      {
        label: "All categories",
        href: "#",
        submenu: [
          { label: "New Arrivals", href: "#" },
          { label: "Best Sellers", href: "#" },
          { label: "Sale Items", href: "#" },
          { label: "Limited Edition", href: "#" },
        ],
      },
      {
        label: "PORSCHE DESIGN",
        href: "#",
        submenu: [
          { label: "New Arrivals", href: "#" },
          { label: "Best Sellers", href: "#" },
          { label: "Sale Items", href: "#" },
          { label: "Limited Edition", href: "#" },
        ],
      },
      {
        label: "Watches",
        href: "#",
      },

      {
        label: "Vehicle Accessories",
        href: "#",
      },
      {
        label: "Eyewear",
        href: "/pages/eye-wear/eyewear.html",
      },
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.renderTemplate();
    this.addEventListener("menu-item", event => {
      const clickedEmitter = event.detail.emitter;
      this.handleMenuNavigation(clickedEmitter);
    });
    this.addEventListener("toggle-panel", event => {
      const panelName = event.detail.panel;
      if (panelName === "hamburgerPanelClose") {
        this.toggleOpen();
      }
      if (panelName === "previousMenu") {
        this.goBack();
      }
    });
  }

  handleMenuNavigation(clickedItem) {
    const currentMenuItems = this.getCurrentMenuItems();

    const menuItem = currentMenuItems.find(item => item.label === clickedItem);

    if (menuItem && menuItem.submenu) {
      this.menuHistory.push(this.currentMenu);
      this.currentMenu = clickedItem;
      this.renderTemplate();
    }
  }

  goBack() {
    if (this.menuHistory.length > 0) {
      // Go back to previous menu
      this.currentMenu = this.menuHistory.pop();
      this.renderTemplate();
    }
  }

  getCurrentMenuItems() {
    if (this.currentMenu === "Porsche Shop") {
      // Return main menu items
      return this.menuData;
    }
    // Return submenu items
    const parentMenu = this.menuData.find(item => item.label === this.currentMenu);
    return parentMenu ? parentMenu.submenu.map(item => ({ ...item, isSubmenuItem: true })) : [];
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
    const currentMenuItems = this.getCurrentMenuItems();

    const menuItems = currentMenuItems
      .map(item => {
        const submenuJson = item.submenu ? JSON.stringify(item.submenu) : "";
        return `<menu-item label='${item.label}' submenu='${submenuJson}' emitter='${item.label}'></menu-item>`;
      })
      .join("");

    this.template = /* html */ `
  <aside class="hamburger-panel ${this.isOpen ? "open" : ""} absolute h-full z-1000 left-0 top-0 flex">

    <div class="hamburger-panel-content bg-white  h-full w-full">

      <div class="flex justify-between items-center px-4 mb-3">
      <!-- top navigation section -->
        <div class="flex-1">
          ${this.currentMenu !== "Porsche Shop" ? `<icon-button id="back-button" icon="${arrow}" action="previousMenu" class="self-end hide-tablet hide-desktop"></icon-button>` : ""}
          ${this.currentMenu !== "Porsche Shop" ? `<icon-button id="back-button" text='${this.currentMenu}' icon="${arrow}" action="previousMenu" class="self-end hide-mobile"></icon-button>` : ""}
          </div>
            <h3 class="flex-1 text-center heading-lg hide-tablet hide-desktop">${this.currentMenu}</h3>
            <div class="flex-1 flex justify-end">
            <icon-button id="close-button" icon="${cross}" action="hamburgerPanelClose" class="self-end hide-tablet hide-desktop"></icon-button>
          </div>
        </div>

      <!-- menu section -->
        <div class="px-6 flex flex-col gap-1">
          ${menuItems}
        </div>

     </div>

    <!-- Close button section -->
    <div class="hide-mobile pt-3 pl-3">
        <icon-button id="close-button" icon="${cross}" action="hamburgerPanelClose" class="self-end"></icon-button>
    </div>
  </aside>
  `;

    this.render();
  }
}

customElements.define("hamburger-panel", HamBurgerPanel);
