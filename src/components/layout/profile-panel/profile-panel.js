import "./profile-panel.css";
import { cross, search } from "../../../assets/assets.js";
import { BaseComponent } from "../../base-component.js";
import "@ui";

class ProfilePanel extends BaseComponent {
  constructor() {
    super();
    this.isOpen = false;
    this.historyData = ["testing1", "testing2", "testing3", "testing4"];
    this.list = [
      { label: "Messages", href: "#" },
      { label: "Saved Searchs", href: "#" },
      { label: "Saved Cars", href: "#" },
      { label: "Find Connect Services", href: "#" },
      { label: "Shop Wishlist", href: "#" },
      { label: "Bookings & Orders", href: "#" },
      { label: "My Porsche App", href: "#" },
      { label: "Profile Setting", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Contact & Support", href: "#" },
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.renderTemplate();
    this.addEventListener("toggle-panel", event => {
      const panelName = event.detail.panel;

      if (panelName === "profilePanelClose") {
        this.toggleOpen();
      }
    });
  }

  toggleOpen() {
    console.log("toggle here");
    this.isOpen = !this.isOpen;
    const panel = this.querySelector("aside");
    if (panel) {
      panel.classList.toggle("open", this.isOpen);
    }
  }

  renderTemplate() {
    const menulist = this.list.map(item => `<a href='${item.href}'> ${item.label}</a>`).join("");

    this.template = /* html */ `
    <aside id="profilepanel" class="profile-panel ${this.isOpen ? "open" : ""} absolute bg-white h-full z-1000 left-0 top-0 flex">
    <div class="profile-panel-content bg-white px-5 h-full w-full pb-3 pt-6 ">
      <div class="flex items-center justify-center w-full pb-3 hide-tablet hide-desktop">
        <h4>Account</h4>
        <icon-button id="close-button" icon="${cross}" action="profilePanelClose" class="absolute right-6"></icon-button>
      </div>
      <div class="profile-panel-buttons pb-5 ">
        <base-button label="Log In" href="../../pages/authentication-page/login-page.html"></base-button>
        <base-button label="Discovery More" variant="secondary"></base-button>
      </div>
      <div class="flex flex-col gap-4 heading-sm">
        ${menulist}
      </div>
    </div>

    <!-- Right section -->
    <div class="hide-mobile pt-3 pl-3">
         <icon-button id="close-button" icon="${cross}" action="profilePanelClose" class="self-end"></icon-button>
    </div>
    </aside>
  `;

    this.render();
  }
}

customElements.define("profile-panel", ProfilePanel);
