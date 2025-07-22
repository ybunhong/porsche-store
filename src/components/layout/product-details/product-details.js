/**
 * ProductDetail Web Component
 *
 * Usage in HTML:
 * <product-detail data-product-id="0"></product-detail>
 * <!-- OR -->
 * <product-detail data-product='{"name": "Product", "images": [], ...}'></product-detail>
 *
 * Attributes:
 * - data-product-id (string|number): Unique ID of the product from sampleProductDataList.
 * - data-product (string): JSON string of product data.
 *
 * Examples:
 * <product-detail data-product-id="1"></product-detail>
 * <product-detail data-product='{"name": "Jacket", "price": "$99", "images": [{"src": "img.jpg", "alt": "Image"}], "sizes": ["S", "M"]}'></product-detail>
 *
 * In JavaScript:
 * const productDetail = document.querySelector("product-detail");
 * productDetail.setAttribute("data-product-id", "2");
 * productDetail.setAttribute("data-product", JSON.stringify({ name: "Shirt", price: "$49" }));
 *
 * const overlay = document.getElementById("gallery-overlay");
 * overlay.addEventListener("close-gallery", () => console.log("Gallery closed"));
 *
 * Features:
 * - Displays product details, images, sizes, and delivery options.
 * - Opens/closes image gallery overlay on image click, Escape key, or close button.
 * - Keyboard-accessible size selection and gallery navigation.
 *
 * Events:
 * - Listens for "close-gallery" from product-gallery to close overlay.
 */

import "./product-details.css";
import { cartEmpty, heart, warning } from "@assets";
import { sampleProductDataList } from "../../../data/sample-data";
import "../../ui/index";

class ProductDetail extends BaseComponent {
  static get observedAttributes() {
    return ["data-product-id", "data-product"];
  }

  constructor() {
    super();
    this.product = null;
    this.selectedSize = "None";
    this.onEvent = this.onEvent.bind(this);
  }

  attributeChangedCallback(name, _, value) {
    if (!value) return;
    try {
      if (name === "data-product-id") {
        this.product = sampleProductDataList.find(p => p.id === +value) || null; // +value convert string "0" to a number to match the id number
      } else if (name === "data-product") {
        // Parse JSON string from 'data-product' attribute to allow custom product data.
        this.product = JSON.parse(value);
      }
    } catch (e) {
      console.error("Invalid product data:", e);
      // Log errors for invalid JSON or ID to aid debugging.
    }
    this.render();
  }

  connectedCallback() {
    this.product = this.product || sampleProductDataList[0] || null; // Set default product (first in list) if none is set.
    this.ensureOverlay();
    this.render();
    this.addEventListener("click", this.onEvent);
    this.addEventListener("keydown", this.onEvent);
    const overlay = document.getElementById("gallery-overlay");
    if (overlay) {
      // Listen for 'close-gallery' event from ProductGallery component to close the overlay when the close button is clicked.
      overlay.addEventListener("close-gallery", this.closeGallery.bind(this));
    }
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.onEvent);
    this.removeEventListener("keydown", this.onEvent);
    const overlay = document.getElementById("gallery-overlay");
    if (overlay) {
      // Remove 'close-gallery' listener to avoid memory leaks when component is removed.
      overlay.removeEventListener("close-gallery", this.closeGallery.bind(this));
    }
    document.removeEventListener("keydown", this.onEvent);
  }

  ensureOverlay() {
    if (!document.getElementById("gallery-overlay")) {
      const div = document.createElement("div");
      div.id = "gallery-overlay";
      div.className = "gallery-overlay";
      // Add click listener to close gallery when clicking overlay background.
      div.addEventListener("click", e => {
        if (e.target.id === "gallery-overlay") this.closeGallery();
      });
      document.body.appendChild(div); // Append overlay to body for full-screen gallery.
    }
  }

  onEvent(e) {
    const key = e.key || ""; // Only handle specific keys (Enter, Escape, Space) for keyboard accessibility.
    if (e.type === "keydown" && key !== "Enter" && key !== "Escape" && key !== " ") return;
    if (key === "Escape") {
      this.closeGallery(); // Close gallery on Escape key for accessibility.
      return;
    }
    const sizeItem = e.target.closest(".size-selector-item");
    if (sizeItem) {
      this.selectedSize = sizeItem.textContent.trim(); // Update selected size and re-render.
      this.render();
    }
    const img = e.target.closest(".product-detail-image-scroll img");
    if (img) this.openGallery(img.dataset.index); // Open gallery when clicking an image.
  }

  openGallery(index = 0) {
    const overlay = document.getElementById("gallery-overlay");
    if (
      // heck for valid product, images, overlay, and ProductGallery component before opening.
      !this.product ||
      !Array.isArray(this.product.images) ||
      !this.product.images.length ||
      !overlay ||
      !customElements.get("product-gallery")
    )
      return;
    // Set ProductGallery component with images and initial index in overlay.
    overlay.innerHTML = `<product-gallery images='${JSON.stringify(this.product.images)}' index="${index}" zoom="1.5"></product-gallery>`;
    overlay.style.display = "block";
    document.addEventListener("keydown", this.onEvent);
  }

  closeGallery() {
    const overlay = document.getElementById("gallery-overlay");
    if (overlay) {
      overlay.style.display = "none"; // Hide overlay.
      overlay.innerHTML = ""; // Clear overlay to remove ProductGallery.
    }
    document.removeEventListener("keydown", this.onEvent); // Remove keydown listener.
  }

  static getDefaultProduct() {
    return {
      images: [],
      category: "",
      name: "",
      price: "",
      normalPrice: "",
      discountPrice: "",
      priceNote: "",
      description: "",
      sizes: [],
      deliveryOption: "",
      deliveryButtons: [],
      shippingInfo: "",
      sellerInfo: "",
    };
  }

  render() {
    if (!this.product) {
      this.innerHTML = "<p>No product data available</p>";
      return;
    }
    const defaultProduct = this.constructor.getDefaultProduct();
    const p = { ...defaultProduct, ...this.product };
    const imgs = p.images.length
      ? p.images
          .map(
            (img, i) =>
              `<img src="${typeof img === "string" ? img : img.src}" alt="${img.alt || "Product"}" loading="lazy" data-index="${i}" tabindex="0" role="button"/>`
          )
          .join("")
      : "<p>No images available</p>";
    const sizes = p.sizes.length
      ? `<div class="product-info-sizes"><span>Size:</span><span class="font-bold">${this.selectedSize}</span>
         <div class="size-selector">${p.sizes.map(s => `<div class="size-selector-item ${s === this.selectedSize ? "selected" : ""}">${s}</div>`).join("")}</div>
         <div class="warning-text-icon flex"><icon-button icon="${warning}"></icon-button><span>UK sizes may vary</span></div></div>`
      : "";
    const delivery = p.deliveryButtons.length
      ? p.deliveryButtons
          .map(d => `<base-button label="${d}" variant="secondary"></base-button>`)
          .join("")
      : "<p>No delivery options available</p>";

    this.innerHTML = `
      <section class="product-detail flex justify-between min-h-screen">
        <div class="product-fixed sticky-top flex justify-between w-full p-3 z-999 box-border">
          <div class="product-btn flex">
            <icon-button text="New"></icon-button>
            <icon-button text="Coming soon" class="mr-4"></icon-button>
          </div>
          <div class="product-heart"><icon-button icon="${heart}"></icon-button></div>
        </div>
        <div class="product-detail-image w-45 mr-5 line-height-0 float-left">
          <div class="product-detail-image-scroll relative overflow-hidden cursor-pointer cursor-plus">
            ${imgs}
          </div>
        </div>
        <div class="product-detail-info w-55 sticky top-0 h-screen flex items-center justify-center p-3">
          <div class="product-info max-w-400 w-full flex flex-col">
            <div class="product-info-breadcrumb inline-flex gap-2 items-center cursor-pointer hover:bg-gray-200 hover:rounded-sm">
              <p class="font-p1">${p.category}</p>
            </div>
            <h1 class="product-info-name font-semibold text-clamp-1-27-0-51vw-1-16rem-1-78rem leading-calc-6px-2-125ex">${p.name}</h1>
            <div class="product-info-price">
              <span class="price line-through">${p.price}</span> &nbsp;
              ${p.discountPrice ? `<span class="text-error ml-2">${p.discountPrice}</span> &nbsp;` : ""}
              ${p.normalPrice ? `<span>${p.normalPrice}</span>&nbsp;` : ""}
              ${p.priceNote ? `<span class="text-disable ml-2">${p.priceNote}</span>` : ""}
            </div>
            <p>${p.description}</p>
            ${sizes}
            <div class="product-info-delivery-options py-3 border-b border-gray-300">
              <div class="flex gap-1 product-info-flex items-center">
                <h5>Delivery:</h5>
                <span>${p.deliveryOption}</span>
              </div>
              <horizontal-scroller>${delivery}</horizontal-scroller>
            </div>
            <div class="product-action flex flex-col gap-3 pt-4 text-p2 text-black font-bold">
              <icon-button icon="${cartEmpty}" action="add-to-cart" text="Add to cart"></icon-button>
              <div class="product-action-info flex items-start gap-2">
                <span class="product-action-line gray-line w-4 h-6 rounded-2"></span>
                <span class="product-action-shipping-text">${p.shippingInfo}</span>
              </div>
              <div class="product-action-info flex items-start gap-2">
                <span class="product-action-line green-line w-4 h-6 rounded-2"></span>
                <span class="product-action-shipping-text"></span>Sold by <a href="#">${p.sellerInfo}</a>
              </div>
            </div>
          </div>
        </div>
      </section>`;
  }
}

customElements.define("product-detail", ProductDetail);
