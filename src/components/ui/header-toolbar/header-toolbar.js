import "./header-toolbar.css";
import { cartEmpty, menu, profile, search, porscheIcon, porscheText, heart } from "@assets";
import "@ui";
import "@layout";

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
    <div class="header py-4 px-6  border-thin gap-2 w-full">

    <!-- left logo section -->
      <div class="flex justify-start items-center">
        <icon-button icon="${menu}" action="hamburger"></icon-button>
        <icon-button icon="${search}" class="hide-tablet hide-desktop " action="search"></icon-button>
        
      </div>

    <!-- center logo section -->
      <div class="flex justify-center items-center">
        <icon-button icon="${porscheIcon}" size="2" class="hide-tablet hide-desktop"></icon-button>
        <icon-button icon="${porscheText}" size="0.6" class="show-tablet show-desktop" ></icon-button>
      </div>

    <!-- right side logo  section -->
      <div class="flex justify-end items-center gap-3">
          <icon-button icon="${search}" class="show-tablet show-desktop" action="search"></icon-button>
          <icon-button icon="${heart}" class="show-tablet show-desktop"></icon-button>
          <icon-button icon="${cartEmpty}" class=""></icon-button>
          <icon-button icon="${profile}" class=""></icon-button>
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
