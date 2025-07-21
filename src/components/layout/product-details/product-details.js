import "./product-details.css";
import { sampleProductDataList } from "../../../data/sample-data";
import { cartEmpty, heart } from "../../../assets/assets";
import "../../ui/index";

class ProductDetail extends BaseComponent {
  constructor() {
    super();
    this.product = null;
    this.selectedSize = "None";
    this.handleSizeSelection = this.handleSizeSelection.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleCloseGallery = this.handleCloseGallery.bind(this);
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
  }

  static get observedAttributes() {
    return ["data-product-index", "data-product"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data-product-index" && newValue) {
      this.product = sampleProductDataList[parseInt(newValue, 10)] || null;
    } else if (name === "data-product" && newValue) {
      try {
        this.product = JSON.parse(newValue);
      } catch (error) {
        console.error("Invalid JSON for data-product:", error);
      }
    }
    this.render();
  }

  connectedCallback() {
    if (!this.product) {
      this.product = sampleProductDataList[0] || null;
    }
    this.ensureOverlayExists();
    this.render();
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListeners();
    const overlay = document.getElementById("gallery-overlay");
    if (overlay) {
      overlay.removeEventListener("click", this.handleCloseGallery);

      this.removeEventListeners();
      window.removeEventListener("scroll", this.handleScroll);
    }
  }

  ensureOverlayExists() {
    let overlay = document.getElementById("gallery-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "gallery-overlay";
      overlay.className = "gallery-overlay";
      document.body.appendChild(overlay);
    }
    overlay.addEventListener("click", this.handleCloseGallery);
  }

  handleCloseGallery(event) {
    if (event.target.id === "gallery-overlay") {
      const overlay = document.getElementById("gallery-overlay");
      overlay.style.display = "none";
      overlay.innerHTML = "";
      document.removeEventListener("keydown", this.handleEscapeKey);
    }
  }

  addEventListeners() {
    const sizeItems = this.querySelectorAll(".size-selector-item");
    sizeItems.forEach(item => {
      item.addEventListener("click", this.handleSizeSelection);
    });

    const images = this.querySelectorAll(".product-detail-image-scroll img");
    images.forEach((img, index) => {
      img.addEventListener("click", () => this.handleImageClick(index));
      img.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.handleImageClick(index);
        }
      });
    });
  }

  removeEventListeners() {
    const sizeItems = this.querySelectorAll(".size-selector-item");
    sizeItems.forEach(item => {
      item.removeEventListener("click", this.handleSizeSelection);
    });

    const images = this.querySelectorAll(".product-detail-image-scroll img");
    images.forEach((img, index) => {
      img.removeEventListener("click", () => this.handleImageClick(index));
      img.removeEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.handleImageClick(index);
        }
      });
    });
  }

  handleSizeSelection(event) {
    const clickedSize = event.target.textContent.trim();
    this.selectedSize = clickedSize;
    this.render();
  }

  handleImageClick(index) {
    const overlay = document.getElementById("gallery-overlay");
    if (!overlay) {
      console.error("Overlay element '#gallery-overlay' not found in DOM");
      return;
    }

    if (!customElements.get("product-gallery")) {
      console.error("Custom element 'product-gallery' is not defined");
      return;
    }

    if (this.product && Array.isArray(this.product.images) && this.product.images.length > 0) {
      overlay.innerHTML = "";

      const gallery = document.createElement("product-gallery");
      gallery.setAttribute("images", JSON.stringify(this.product.images));
      gallery.setAttribute("index", index.toString());
      gallery.setAttribute("zoom", "1.5"); // Optional: set default zoom level

      // Listen for close-gallery event from ProductGallery
      gallery.addEventListener("close-gallery", () => {
        overlay.style.display = "none";
        overlay.innerHTML = "";
        document.removeEventListener("keydown", this.handleEscapeKey);
      });

      overlay.appendChild(gallery);
      overlay.style.display = "block";

      // Add keyboard support for closing (Escape key)
      document.addEventListener("keydown", this.handleEscapeKey);
    } else {
      console.error("No valid images found in product data");
    }
  }

  handleEscapeKey(event) {
    if (event.key === "Escape") {
      const overlay = document.getElementById("gallery-overlay");
      if (overlay) {
        overlay.style.display = "none";
        overlay.innerHTML = "";
      }
      document.removeEventListener("keydown", this.handleEscapeKey);
    }
  }

  render() {
    if (!this.product) {
      this.innerHTML = "<p>No product data available</p>";
      return;
    }

    const {
      images = [],
      category = "Unknown Category",
      name = "Unnamed Product",
      price = "$0",
      normalPrice = price,
      discountPrice = "",
      priceNote = "",
      description = "No description available",
      sizes = [],
      deliveryOption = "Standard Delivery",
      deliveryButtons = [],
      shippingInfo = "No shipping info available",
      sellerInfo = "Unknown Seller",
    } = this.product;

    const validImages = images.filter(
      img => typeof img === "string" || (typeof img === "object" && img.src)
    );

    this.innerHTML = `
      <section class="product-detail">
        <div class="product-fixed sticky-top flex z-5000 justify-content-between w-full">
          <div class="product-btn">
            <icon-button text="New"></icon-button>
            <icon-button text="comming soom"></icon-button>
          </div>
          <div class="product-heart">
            <icon-button icon="${heart}"></icon-button>
          </div>
        </div>
        <div class="product-detail-image">
          <div class="product-detail-image-scroll">
            ${
              validImages.length > 0
                ? validImages
                    .map(
                      (img, index) => `
                        <img 
                          src="${typeof img === "string" ? img : img.src}" 
                          alt="${typeof img === "object" && img.alt ? img.alt : "Product Image"}" 
                          loading="lazy"
                          data-index="${index}"
                          role="button"
                          tabindex="0"
                          aria-label="View larger image"
                        />`
                    )
                    .join("")
                : "<p>No images available</p>"
            }
          </div>
        </div>
        <div class="product-detail-info p-4">
          <div class="product-info gap-3">
            <div class="product-info-description">
              <div class="product-info-breadcrumb mb-2">
                <p>${category}</p>
              </div>
              <div class="product-info-title mb-3">
                <h1 class="product-info-name">${name}</h1>
                <div class="product-info-price gap-2">
                  <span class="price">${price}</span>
                  ${discountPrice ? `<span class="price-discount">${discountPrice}</span>` : ""}
                  ${normalPrice ? `<span class="normal-price">${normalPrice}</span>` : ""}
                  ${priceNote ? `<span class="price-note">${priceNote}</span>` : ""}
                </div>
              </div>
              <div class="product-info-short-description mb-4">
                <p>${description}</p>
              </div>
            </div>
            ${
              sizes.length > 0
                ? `
                  <div class="product-info-sizes py-3">
                    <span>Size: </span>
                    <span id="selectedSizeDisplay" class="font-bold">${this.selectedSize}</span>
                    <div class="size-selector gap-1">
                    ${sizes
                      .map(
                        size => `
                        <div class="size-selector-item ${this.selectedSize === size ? "selected" : ""}" data-size="${size}">
                        ${size}
                        </div>
                    `
                      )
                      .join("")}
                    </div>
                  </div>
                `
                : ""
            }
            <div class="product-info-delivery-options py-3">
                <div class="delivery-header gap-2 mb-3">
                    <h3>Delivery:</h3>
                    <span>${deliveryOption}</span>
                </div>
                <horizontal-scroller>
                    ${
                      deliveryButtons.length > 0
                        ? deliveryButtons
                            .map(
                              label =>
                                `<base-button label="${label}" variant="secondary"></base-button>`
                            )
                            .join("")
                        : "<p>No delivery options available</p>"
                    }
                </horizontal-scroller>
            </div>
            <div class="product-action flex flex-col gap-3 pt-4">
              <icon-button icon="${cartEmpty}" size="0.6" action="add-to-cart"></icon-button>
              <div class="product-action-line green-line hide-tablet hide-desktop"></div>
              <div class="product-action-info flex items-start gap-2">
                <div class="product-action-line green-line hide-mobile"></div>
                <div class="product-action-shipping-text">${shippingInfo}</div>
              </div>
              <div class="product-action-info flex items-start gap-2">
                <div class="product-action-line gray-line hide-mobile"></div>
                <div class="product-action-seller-text">
                  Sold by <a href="#">${sellerInfo}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    this.addEventListeners();
  }
}

customElements.define("product-detail", ProductDetail);
