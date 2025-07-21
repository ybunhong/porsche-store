// usage:
// - image : for changing card image
// - title : for changing the title

import "./category-card.css";
import { arrow } from "@assets";
import "../index.js";

class CategoryCard extends BaseComponent {
  constructor() {
    super();
    this.render();
  }

  static get observedAttributes() {
    return ["image", "title"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="cards flex relative w-full h-full rounded-lg overflow-hidden">
          <img class="card-image w-full h-full relative top-0 left-0 bottom-0 z-0" alt="card-image" />
          <div class="text-area w-full h-fit flex absolute top-0 left-0 z-100 p-3">
            <div class="texts w-fit h-fit">
                <span class="title-text">Text</span>
            </div>
            <div class="icon-arrow flex">
                <icon-button icon="${arrow}"></icon-button>
            </div>
          </div>
        </div>
    `;

    // Image logic
    const image = this.getAttribute("image") || "/src/assets/card/car.png";
    const cardImage = this.querySelector(".card-image");
    if (cardImage) {
      cardImage.src = image;
    }

    // Title logic
    const title = this.getAttribute("title") || "Text";
    const textElement = this.querySelector(".title-text");
    if (textElement) {
      textElement.textContent = title;
    }
  }
}

customElements.define("category-card", CategoryCard);
