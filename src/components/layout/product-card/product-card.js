import "./product-card.css";
import { heart, heartFilled } from "@assets";
import productCard from "../../../assets/product_card.avif";
import "@ui";
import "@layout";

class ProductCard extends BaseComponent {
  static get observedAttributes() {
    return ["title", "src", "description", "price", "section", "discount"];
  }

  constructor() {
    super();
    this.title = "";
    this.description = "";
    this.price = "";
    this.section = "";
    this.discount = "";
    this.src = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "title": {
          this.title = newValue || "";
          break;
        }
        case "description": {
          this.description = newValue || "";
          break;
        }
        case "price": {
          this.price = newValue || "$";
          break;
        }
        case "section": {
          this.section = newValue || "";
          break;
        }
        case "discount": {
          this.discount = newValue || "";
          break;
        }
        case "src": {
          this.src = newValue || "";
          break;
        }
        default: {
          break;
        }
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    this.template = `
    <div class="product-card bg-gray-100 p-4 flex flex-col items-center h-96">
      <div class="flex items-center justify-between w-full">
        <base-button label="Out of stock" type="status"></base-button>
        <icon-button icon="${heart}" toggle-icon="${heartFilled}"></icon-button>
      </div>
      
      <div class="flex-1 flex items-center justify-center my-4">
          <a href="/pages/product_list.html">
            <img src="${this.src}" class="product-card-image w-full h-full object-cover max-h-48" />
          </a>
      </div>
      
      <div class="text-center mt-auto">
          <toggle-color></toggle-color>
          <p class="body-xs font-medium">${this.title}</p>
          <p class="body-xs text-gray-600">${this.description}</p>
          ${
            this.discount
              ? `<div class="flex gap-2 items-center justify-center mt-1">
                  <del class="body-xs text-gray-400">${this.price}</del>
                  <p class="body-xs text-error font-medium">${this.discount}</p>
                </div>`
              : `<p class="body-xs font-medium mt-1">${this.price}</p>`
          }
          <p class="body-xs text-gray-500">${this.section}</p>
      </div>
      
    </div>
    `;
    this.render();
  }
}

customElements.define("product-card", ProductCard);
