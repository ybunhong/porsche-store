// import "/src/components/ui/filter-button/filter-button.css";
import { sort, filter, chevron } from "@assets";

class FilterTopResultButtons extends BaseComponent {
  constructor() {
    super();
    this.updateTemplate();
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  updateTemplate() {
    this.template = `

      <div class="border-b border-t flex justify-center items-center w-full h-full hide-desktop">
        <div class="filter-button gap-2 border-r flex justify-center items-center w-half h-full">
          <icon-button icon="${filter}" size="1.1"></icon-button>
          <span>Filter</span>
        </div>
        <div class="topresult-button gap-2 flex justify-center items-center w-half h-full">
          <icon-button icon="${sort}" size="1.1"></icon-button>
          <span>Top Result</span>
        </div>
      </div>      

      <div class="flex justify-between hide-mobile hide-tablet">
        <div class="flex justify-between px-4 py-2 gap-2 border border-medium rounded-sm">
          <icon-button icon="../src/assets/icons/interface-controll/sliders.svg"></icon-button>
          <span class=" flex justify-center items-center">Filter</span>
        </div>

        <div class="flex flex-row gap-5">
        <div class="quantity-product flex justify-center items-center">
          <div class="flex items-center w-fit">
            <span>30 Products</span>
            <icon-button icon="/src/assets/icons/indicator/information.svg"></icon-button>
          </div>
        </div>

        <div class="flex justify-between items-center gap-12 px-3 py-2 border border-medium rounded-sm">
          <span>Top results</span>
          <icon-button 
            icon="${chevron}"
            size="1.1"
            class="chevron-down">
          </icon-button>
        </div>
        </div>
      </div>
      `;
    this.render();
  }
}

customElements.define("filter-topresult-buttons", FilterTopResultButtons);
