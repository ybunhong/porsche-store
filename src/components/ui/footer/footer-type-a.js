import "@ui";
import "./footer-main.css";
import { YoutubeIcon } from "@assets";

class FooterTypeA extends BaseComponent {
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
    const iconItems = [
      { text: "Fast<br>Shipping", label: YoutubeIcon },
      { text: "30-day<br>return policy", label: YoutubeIcon },
      { text: "Offical products<br>directly from Porsche", label: YoutubeIcon },
      { text: "Secure<br>Data Transmission", label: YoutubeIcon },
    ];

    const iconList = iconItems
      .map(
        item => `<div class="flex items-center gap-4">
          <span class="bg-white rounded-xl flex items-center justify-center">
          <icon-button icon="${item.label}" size= "2"class=""></icon-button>
          </span>
          <p class="px-4">${item.text}</p>
          </div>`
      )
      .join("");

    this.template = /* html */ `
      <!--icon svg-->
      <div class="footer p-4 flex flex-col gap-4">
        <div class="flex flex-row flex-wrap gap-6"> 
          ${iconList}
        </div>
         <hr class="opacity-40 w-full">
         <p class="">Change your delivery country</p>
         
         <div class="flex items-center gap-4 ">
           <span class="bg-white rounded-xl flex items-center justify-center">
           <icon-button icon="${YoutubeIcon}" size= "2"class=""></icon-button>
           </span>
           <p class="">North America/ United States</p>
         </div>

         <div class="">
         <p>waiting phal component</p>
         <p>waiting phal component</p>
         <p>waiting phal component</p>
         <p>waiting phal component</p>
         </div>
       </div>
    `;
    this.render();
  }
}

customElements.define("footer-a", FooterTypeA);
