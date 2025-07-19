import { cross, cursorminus, cursorplus, arrow } from "@assets";

import "./product-gallery.css";
import { sampleProductDataList } from "../../../data/sample-data";

export class ProductGallery extends HTMLElement {
  constructor() {
    super();
    const [firstItem] = sampleProductDataList;
    this.sampleProductDataList = firstItem;
    this.productImages = this.sampleProductDataList.images || [];
    this.currentIndex = 0;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <link rel="stylesheet" href="./product-gallery.css" />
      <section class="product-gallery w-full h-screen overflow-hidden relative">
        <div class="image-container flex items-start h-screen hide-mobile">
          <div
            class="image-list hide-tablet hide-mobile flex flex-col items-start gap-2 p-2 max-h-screen overflow-hidden top-4 absolute z-2000"
          >
            ${this.productImages
              .map(
                ({ src, alt }, i) => `
              <img
                src="${src}"
                alt="${alt || "Porsche product"}"
                class="${i === 0 ? "selected" : ""} img-lst top-4 transition-smooth w-full"
                data-index="${i}"
              />
            `
              )
              .join("")}
          </div>
          <div
            class="main-image w-full h-full flex items-center justify-center overflow-hidden z-1000"
          >
            <img
              id="main-img"
              src="${this.productImages[0].src}"
              alt="${this.productImages[0].alt || "Main product image"}"
              class="img-main rounded-md h-screen h-full transition-transform duration-300 ease-in-out bottom-0 block left-0 right-0 top-0 transition-smooth"
            />
          </div>
          <div
            class="gallery-nav hide-desktop d-flex justify-around items-center m-4 w-full relative bottom-0 left-0 z-2000"
          >
            <button
              class="show-tablet prev-img"
              id="prev-img"
              aria-label="Previous image"
              ${this.productImages.length <= 1 ? "disabled" : ""}
            >
              <img src="${arrow}" alt="Previous" class="btn-img arrow-icon rotate-left" />
            </button>
            <span class="image-counter">${this.currentIndex + 1}/${this.productImages.length}</span>
            <button
              class="show-tablet next-img"
              id="next-img"
              aria-label="Next image"
              ${this.productImages.length <= 1 ? "disabled" : ""}
            >
              <img src="${arrow}" alt="Next" class="arrow-icon rotate-right" />
            </button>
          </div>

          <button
            class="cancel-button bg-secondary border-2 border-black bg-transparent rounded-md p-3 self-start absolute top-4 right-4 z-2000"
            aria-label="Close Gallery"
          >
            <img src="${cross}" alt="Close" class="block img-cancel" />
          </button>
        </div>
      </section>
    `;

    this.setupEvents();
  }

  setupEvents() {
    const mainImage = this.querySelector("#main-img");
    const thumbnails = this.querySelectorAll(".image-list img");
    const container = this.querySelector(".main-image");
    const counter = this.querySelector(".image-counter");
    const prevButton = this.querySelector("#prev-img");
    const nextButton = this.querySelector("#next-img");
    const cancelButton = this.querySelector(".cancel-button");

    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        const overlay = this.closest("#gallery-overlay");
        if (overlay instanceof HTMLElement) {
          overlay.style.display = "none";
          overlay.innerHTML = ""; // Clear content
        }
      });
    }

    const updateImage = index => {
      const image = this.productImages[index];
      if (!image) return;
      mainImage.src = image.src;
      mainImage.alt = image.alt || "Product image";
      thumbnails.forEach(img => img.classList.remove("selected"));
      const selectedThumb = this.querySelector(`.image-list img[data-index="${index}"]`);
      if (selectedThumb) selectedThumb.classList.add("selected");
      if (counter) {
        counter.textContent = `${index + 1}/${this.productImages.length}`;
      }
      if (this.productImages.length > 1) {
        prevButton.disabled = index === 0;
        nextButton.disabled = index === this.productImages.length - 1;
      }
    };

    thumbnails.forEach(thumb => {
      thumb.addEventListener("click", () => {
        this.currentIndex = parseInt(thumb.dataset.index, 10);
        updateImage(this.currentIndex);
        mainImage.classList.remove("zoomed");
        mainImage.style.transform = "scale(1)";
      });

      thumb.addEventListener("mouseover", () => {
        mainImage.src = thumb.src;
        mainImage.alt = thumb.alt;
        mainImage.classList.remove("zoomed");
        mainImage.style.transform = "scale(1)";
      });
    });

    mainImage.addEventListener("click", () => {
      mainImage.classList.toggle("zoomed");
      if (mainImage.classList.contains("zoomed")) {
        mainImage.style.transform = "scale(1.5)";
        mainImage.style.cursor = `url('${cursorminus}') 16 16, zoom-out`;
      } else {
        mainImage.style.transform = "scale(1)";
        mainImage.style.cursor = `url('${cursorplus}') 16 16, zoom-in`;
      }
    });

    container.addEventListener("mousemove", e => {
      if (mainImage.classList.contains("zoomed")) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = (x / rect.width - 0.5) * 100;
        const yPercent = (y / rect.height - 0.5) * 100;
        mainImage.style.transform = `scale(1.5) translate(${xPercent * 0.2}%, ${yPercent * 0.2}%)`;
      }
    });

    container.addEventListener("mouseleave", () => {
      if (mainImage.classList.contains("zoomed")) {
        mainImage.style.transform = "scale(1.5)";
      }
    });

    if (this.productImages.length > 1) {
      prevButton.addEventListener("click", () => {
        this.currentIndex =
          (this.currentIndex - 1 + this.productImages.length) % this.productImages.length;
        updateImage(this.currentIndex);
      });

      nextButton.addEventListener("click", () => {
        this.currentIndex = (this.currentIndex + 1) % this.productImages.length;
        updateImage(this.currentIndex);
      });
    }
  }
}

customElements.define("product-gallery", ProductGallery);
