import "@ui";
import "./footer-main.css";
import { TruckIcon } from "@assets";

class FooterTypeC extends BaseComponent {
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
      { label: TruckIcon },
      { label: TruckIcon },
      { label: TruckIcon },
      { label: TruckIcon },
      { label: TruckIcon },
      { label: TruckIcon },
    ];

    const iconList = iconItems
      .map(
        item => `<div class="flex items-center gap-5 ">
          <span class="bg-white square flex items-center justify-center">
          <icon-button icon="${item.label}" size= "2"class=""></icon-button>
          </span>
          </div>`
      )
      .join("");

    this.template = /* html */ `
      <div class="footer p-4 flex-col flex gap-5">
        <h2 class="">Current Region/ Language</h2>
        <div class="flex items-center gap-4 ">
           <span class="bg-white rounded-xl flex items-center justify-center">
           <icon-button icon="${TruckIcon}" size= "2"class=""></icon-button>
           </span>
           <p class="">United States/ English</p>
           <p class="region">Change</p>
         </div>

      <!--icon payment-->
         <h2 class="">Payment methods</h2>
         <div class="flex flex-row flex-wrap gap-6">
            ${iconList}
         </div>

         <div>
         <h2 class="">Service and Help</h2>
         <p>My Active Subscriptions</p>
         <p>My orders</p>
         <p>Questions and Answers</p>
         <p>Contact and Support</p>
         </div>

         <div>
         <h2 class="">Porsche on Web</h2>
         <p>Porsche Website</p>
         <p>Porsche Shop</p>
         <p>Porsche Car Configuarator</p>
         <p>Porsche new and pre-owned cars</p>
         </div>
         <hr class="opacity-40 w-full">

         <footer-b></footer-b>
        </div>
    `;
    this.render();
  }
}

customElements.define("footer-c", FooterTypeC);
