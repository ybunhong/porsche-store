/**
 * ProductGallery Web Component
 *
 * Usage:
 * <product-gallery images='[...]' index="2" zoom="2"></product-gallery>
 *
 * JS:
 * import "./product-gallery.js";
 *
 * const overlay = document.getElementById("gallery-overlay");
 * const gallery = overlay.querySelector("product-gallery");
 *
 * gallery.addEventListener("close-gallery", () => {
 *   overlay.style.display = "none";
 * });
 *
 * Optional attributes:
 * - images: JSON string of image objects to override default images
 * - index: initial image index (number)
 * - zoom: zoom scale factor (number, default 1.5)
 *
 * Features:
 * - Hover thumbnails to preview
 * - Click thumbnail to select image
 * - Click main image to toggle zoom + pan
 * - Prev/Next buttons with disabled state
 * - Close button triggers 'close-gallery' event
 */

import { cross, cursorminus, cursorplus, arrow } from "../../../assets/assets.js";
import "./product-gallery.css";
import { BaseComponent } from "../../base-component.js";
import { sampleProductDataList } from "../../../sample/sample-data";

class ProductGallery extends BaseComponent {
  static get observedAttributes() {
    return ["images", "index", "zoom"];
  }

  constructor() {
    super();
    const [firstItem] = sampleProductDataList;
    this.productImages = firstItem.images || [];
    this.currentIndex = 0;
    this.zoomScale = 1.5;
    this.isZoomed = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
    // Handle clicks (as before)
    this.addEventListener("click", this.onClick.bind(this));
    // Handle mouse move for zoom panning (as before)
    this.addEventListener("mousemove", this.onMouseMove.bind(this));
    // Add mouseenter on thumbnails container to detect hover on thumbnails
    this.addEventListener("mouseover", e => {
      const { target } = e;
      if (target.dataset.role === "thumb") {
        const idx = Number(target.dataset.index);
        if (!Number.isNaN(idx) && idx !== this.currentIndex) {
          this.currentIndex = idx;
          this.isZoomed = false; // reset zoom on hover change
          this.updateTemplate();
        }
      }
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "images") {
        try {
          this.productImages = JSON.parse(newValue) || this.productImages;
        } catch (error) {
          console.warn("Invalid images JSON", error);
        }
      }
      if (name === "index") {
        const idx = parseInt(newValue, 10);
        if (!Number.isNaN(idx)) this.currentIndex = idx;
      }
      if (name === "zoom") {
        const z = parseFloat(newValue);
        if (!Number.isNaN(z) && z > 0) this.zoomScale = z;
      }
      this.updateTemplate();
    }
  }

  onClick(e) {
    const target = e.target.closest("[data-role]");
    if (!target) return;
    const { role, index } = target.dataset;

    if (role === "close") {
      this.dispatchEvent(new CustomEvent("close-gallery", { bubbles: true }));
    }

    if (role === "prev" && this.currentIndex > 0) {
      this.currentIndex -= 1;
      this.updateTemplate();
    }

    if (role === "next" && this.currentIndex < this.productImages.length - 1) {
      this.currentIndex += 1;
      this.updateTemplate();
    }

    if (role === "thumb") {
      this.currentIndex = parseInt(index, 10);
      this.isZoomed = false;
      this.updateTemplate();
    }

    if (role === "main-img") {
      this.isZoomed = !this.isZoomed;
      this.updateTemplate();
    }
  }

  onMouseMove(e) {
    if (!this.isZoomed) return;
    const container = e.currentTarget.querySelector(".pg-main-view");
    const img = e.currentTarget.querySelector(".pg-main-img");
    if (!container || !img) return;

    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
    img.style.transform = `scale(${this.zoomScale}) translate(${x}%, ${y}%)`;
  }

  updateTemplate() {
    const img = this.productImages[this.currentIndex];
    const isFirst = this.currentIndex === 0;
    const isLast = this.currentIndex === this.productImages.length - 1;

    this.template = `
      <section class="product-gallery w-full h-screen overflow-hidden relative">
        <div class="pg-container flex items-start h-screen">
          <div class="pg-thumbnails ${this.isZoomed ? "pg-thumbnails-zoomed" : ""}} flex flex-col gap-2 p-2 hide-mobile hide-tablet">
            ${this.productImages
              .map(
                ({ src, alt }, i) => `
              <img
                src="${src}"
                alt="${alt || "Thumbnail"}"
                class="pg-thumb ${i === this.currentIndex ? "pg-active" : ""}"
                data-role="thumb"
                data-index="${i}"
              />
            `
              )
              .join("")}
          </div>
             
          <div class="pg-main-view w-full flex items-center justify-center">
            <img
              src="${img.src}"
              alt="${img.alt || "Main Image"}"
              class="pg-main-img ${this.isZoomed ? "pg-zoomed" : ""}"
              data-role="main-img"
              style="cursor: url('${this.isZoomed ? cursorminus : cursorplus}') 16 16, ${this.isZoomed ? "zoom-out" : "zoom-in"};
                transform: scale(${this.isZoomed ? this.zoomScale : 1})"
            />
          </div>

          <div class="pg-nav hide-desktop">
            <icon-button icon="${arrow}" class="pg-btn-icon pg-arrow-left ${isFirst ? "disabled" : ""}" data-role="prev"></icon-button>
            <span class="pg-counter">${this.currentIndex + 1}/${this.productImages.length}</span>
            <icon-button icon="${arrow}" class="pg-btn-icon pg-arrow-right ${isLast ? "disabled" : ""}" data-role="next"></icon-button>
          </div>

          <icon-button icon="${cross}" class="pg-close-btn" data-role="close"></icon-button>
        </div>
      </section>
    `;
    this.render();
  }
}

customElements.define("product-gallery", ProductGallery);
