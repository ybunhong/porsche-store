// usage:
// - image : for changing card image
// - title : for changing the title
// - href : link url path

import "./category-card.css";
import { arrow } from "../../../assets/assets.js";
import { BaseComponent } from "../../base-component.js";
import "../index.js";

class CategoryCard extends BaseComponent {
  constructor() {
    super();
    this.render();
  }

  static get observedAttributes() {
    return ["image", "title", "href"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const href = this.getAttribute("href") || "#";
    const image = this.getAttribute("image") || "/src/assets/card/car.png";
    const title = this.getAttribute("title") || "Text";

    this.innerHTML = `
      <div class="cards flex relative w-full h-full rounded-lg overflow-hidden">
        <a href="${href}" class="image-link w-full h-full block">
          <img class="card-image w-full h-full relative top-0 left-0 bottom-0 z-0" alt="card-image"/>
        </a>
        <div class="text-area w-full h-fit flex absolute top-0 left-0 z-100 p-3">
          <div class="texts w-fit h-fit">
              <span class="title-text">${title}</span>
          </div>
          <div class="icon-arrow flex">
              <icon-button icon="${arrow}"></icon-button>
          </div>
        </div>
      </div>
    `;

    const cardImage = this.querySelector(".card-image");
    if (cardImage) {
      cardImage.src = image;
    }
  }
}

customElements.define("category-card", CategoryCard);
