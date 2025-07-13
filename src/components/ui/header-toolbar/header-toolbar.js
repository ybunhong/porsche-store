import "./header-toolbar.css";
import {
  BagIcon,
  MenuIcon,
  ProfileIcon,
  SearchIcon,
  PorscheLogoIcon,
  PorscheLogoIconText,
  Heart,
} from "../../../assets/assets.js";
import "../index.js";
import "../../layout/index.js";

class HeaderToolbar extends BaseComponent {
  static get observedAttributes() {
    return ["label"];
  }

  constructor() {
    super();
    this.label = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
    this.addEventListener("toggle-panel", event => {
      const panelName = event.detail.panel;

      if (panelName === "search") {
        const searchPanel = this.querySelector("search-panel");
        if (searchPanel && typeof searchPanel.toggleOpen === "function") {
          searchPanel.toggleOpen();
        }
      } else if (panelName === "hamburger") {
        const hamburgerPanel = this.querySelector("hamburger-panel");
        if (hamburgerPanel && typeof hamburgerPanel.toggleOpen === "function") {
          hamburgerPanel.toggleOpen();
        }
      }
    });
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
    this.template = /* html */ `

    <!-- to do make the left section and right section evenly to (grid) -->
    <div class="header flex items-center py-4 px-5  border-thin ">

    <!-- left logo section -->
      <div class="flex grow shrink border-medium">
        <icon-button icon="${MenuIcon}" size="${0.6}" action="hamburger" ></icon-button>
        <icon-button icon="${SearchIcon}" class="hide-tablet hide-desktop " action="search"></icon-button>
        
      </div>

    <!-- center logo section -->
      <div class="flex justify-center">
        <icon-button icon="${PorscheLogoIcon}" size="2" class="hide-tablet hide-desktop"></icon-button>
        <icon-button icon="${PorscheLogoIconText}" class="show-tablet show-desktop" size="0.6"></icon-button>
      </div>

    <!-- right side logo  section -->
      <div class="flex grow shrink justify-end">
          <icon-button icon="${SearchIcon}" class="show-tablet show-desktop" action="search"></icon-button>
          <icon-button icon="${Heart}" class="show-tablet show-desktop"></icon-button>
          <icon-button icon="${BagIcon}" class=""></icon-button>
          <icon-button icon="${ProfileIcon}" class=""></icon-button>
      </div>

    <!-- hidden panel -->
      <hamburger-panel></hamburger-panel>
      <search-panel></search-panel>
    </div>
      
    `;
    this.render();
  }
}

customElements.define("header-toolbar", HeaderToolbar);
export { HeaderToolbar };
