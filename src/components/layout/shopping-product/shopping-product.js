import "./shopping-product.css";
import { cross, plus, minus } from "@assets";
import { shoppingProductData } from "../../../data/shopping-product-data.js";

class ShoppingProduct extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  updateTemplate() {
    this.template = shoppingProductData
      .map(({ title, size, material, color, price, quantity, image }) => {
        const total = price * quantity;
        return `
          <div class="shopping-card relative flex border border-small rounded-md p-3 w-full">
            <div class=" absolute top-2 right-6 flex flex-col justify-between h-full pb-4 pl-3">
              <icon-button icon="${cross}" action="remove"></icon-button>
              <p class="font-bold text-right">$${total.toFixed(2)}</p>
            </div>

            <div class="img-container">
              <img src="${image}" alt="${title}" />
            </div>

            <div class="flex flex-col gap-4 pl-4 flex-1">
              <div class="flex flex-col">
                <p class="body-md">${title}</p>
                <p class="body-xs">Size: ${size}</p>
                <p class="body-xs">Material: ${material}</p>
                <p class="body-xs">Color: ${color}</p>
              </div>

              <div class="flex justify-between items-center w-full">
                <div class="flex gap-2 items-center">
                  <icon-button icon="${minus}" action="decrease"></icon-button>
                  <span>${quantity}</span>
                  <icon-button icon="${plus}" action="increase"></icon-button>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    this.render();
  }
}

customElements.define("shopping-product", ShoppingProduct);
