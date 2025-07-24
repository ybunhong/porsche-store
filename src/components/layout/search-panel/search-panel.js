import "./search-panel.css";
import { cross, search } from "../../../assets/assets";
import "@ui";

class SearchPanel extends BaseComponent {
  constructor() {
    super();
    this.isOpen = false;
    this.historyData = ["testing1", "testing2", "testing3", "testing4"];
    this.products = [
      {
        title: "Porsche 911 Carrera",
        description: "The iconic sports car with a timeless design and high performance.",
        price: "$120,000",
      },
      {
        title: "MacBook Pro 16",
        description: "Apple's most powerful laptop, ideal for professionals and creatives.",
        price: "$2,499",
      },
      {
        title: "Sony WH-1000XM5",
        description: "Industry-leading noise cancelling headphones with superb audio quality.",
        price: "$349",
      },
      {
        title: "Samsung Galaxy S24 Ultra",
        description: "Flagship Android smartphone with top-tier specs and camera system.",
        price: "$1,199",
      },
      {
        title: "Dyson V15 Detect",
        description: "Powerful cordless vacuum with laser detection and intelligent cleaning.",
        price: "$749",
      },
      {
        title: "LEGO Porsche 911 RSR",
        description: "Detailed LEGO model of the Porsche 911 RSR for collectors and kids.",
        price: "$149",
      },
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.renderTemplate();
    this.addEventListener("toggle-panel", event => {
      const panelName = event.detail.panel;
      if (panelName === "searchPanelClose") {
        this.toggleOpen();
      }
    });
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    const panel = this.querySelector("aside");
    if (panel) {
      panel.classList.toggle("open", this.isOpen);
    }
  }

  renderTemplate() {
    const historyItem = this.historyData
      .map(item => `<icon-button icon='${search}' text='${item}'></icon-button>`)
      .join("");
    const productItem = this.products
      .map(
        item =>
          `<search-result-item title='${item.title}' description='${item.description}' price='${item.price}'></search-result-item>`
      )
      .join("");

    this.template = /* html */ `
    <aside id="searchpanel" class="search-panel ${this.isOpen ? "open" : ""} absolute  h-full z-1000 left-0 top-0 flex">

    <div class="search-panel-content bg-white px-5 h-full">
    <!-- Right section -->
    <!-- search section -->
      <div class="flex flex-col gap-4 py-3 border-b">
        <icon-button id="close-button" icon="${cross}" searchPanelClose class="self-end hide-tablet hide-desktop"></icon-button>
        <search-input text="search.."></search-input>
      </div>

    <!-- search history section -->
      <div class="py-2"> 
        ${historyItem}
      </div>

     <!-- product history section -->
    <div class="py-2"> 
      <div class="flex items-center justify-between pb-3">
        <p class="body-xs">All category</p>
        <icon-button text="Delete"></icon-button>
      </div>
      ${productItem}
    </div>
       
    </div>

    <!-- Right section -->
    <div class="hide-mobile pt-3 pl-3">
         <icon-button id="close-button" icon="${cross}" action="searchPanelClose" class="self-end"></icon-button>
    </div>
    </aside>
  `;

    this.render();
  }
}

customElements.define("search-panel", SearchPanel);
