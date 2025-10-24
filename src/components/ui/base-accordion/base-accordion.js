import "./base-accordion.css";
import { plus, minus } from "../../../assets/assets.js";
import { BaseComponent } from "../../base-component.js";
import { sampleSets } from "../../../sample/accordion-data.js";

/**
 * BaseAccordion Web Component
 *
 * Usage:
 * <base-accordion
 *    title="your-title"
 *    responsive (optional)
 *    data-key="your-data-key">
 * </base-accordion>
 *
 * Attributes:
 * - title (string): Optional. Accordion heading (default: "Untitled").
 * - responsive (boolean): Optional. Adds responsive spacing if present.
 * - data-key (string): Required. Matches a key in your imported JSON-like data
 *    (e.g., In accordion-data.js,
 *    your data-key would be "productDetails" or "shippingInfo").
 *
 * Supported Row Types:
 * - { label: "Label-Text", value: "Value-Text" } (This is one row)
 * - { "desc-label": "Label-Text", "desc-value": "Item 1; Item 2; Item 3" } (This is one row)
 *
 *  label (font-weight: 600)
 *  value (font-weight: 400, color: #6b6b6b)
 *  "desc-label" (font-weight: 400)
 *  "desc-value" is split by semicolon to make a list. (font-weight: 400)
 *                (e.g., "Item 1; Item 2; Item 3")
 *
 * Example:
 *
 * //In your html
 *
 *    <base-accordion
 *        title="Product Details"
 *        data-key="productDetails"
 *        responsive>
 *    </base-accordion>
 *
 *    <base-accordion
 *        title="Shipping Info"
 *        data-key="shippingInfo"
 *        responsive>
 *    </base-accordion>
 *
 * //In your JS data file (e.g., accordion-data.js...etc)
 *
 *    export const sampleSets = {
 *      productDetails: [
 *        { "desc-label": "Weight", "desc-value": "Light; Compact; Durable" },
 *        { label: "Size", value: "Medium" },
 *      ],
 *      shippingInfo: [
 *        { "desc-label": "Delivery", "desc-value": "1–3 Days; Local Only" },
 *        { label: "Carrier", value: "DHL Express" },
 *      ],
 *    };
 */

class BaseAccordion extends BaseComponent {
  static get observedAttributes() {
    return ["title", "data-key", "responsive"];
  }

  constructor() {
    super();
    this.title = "Untitled";
    this.data = [];
    this.responsive = false;

    // internal refs
    this.accordionEl = null;
    this.headEl = null;
    this.contentEl = null;
    this.toggleButtonEl = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadData();
    this.updateTemplate();
    this.render();
    this.cacheElements(); // store element refs
    this.setupToggle();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "title") this.title = newValue || "Untitled";
      if (name === "data-key") this.loadData();
      if (name === "responsive") this.responsive = this.hasAttribute("responsive");

      this.updateTemplate();
      this.render();
      this.cacheElements(); // update refs after render
      this.setupToggle();
    }
  }

  loadData() {
    const key = this.getAttribute("data-key");
    this.data = sampleSets[key] || [];
    if (!sampleSets[key]) {
      console.warn(`No data found for key: "${key}"`);
    }
  }

  updateTemplate() {
    const rows = this.data
      .map(item => {
        const labelHtml = item["desc-label"]
          ? `<div>${item["desc-label"]}</div>`
          : `<div class="font-semibold body-xs">${item.label || ""}</div>`;

        const valueHtml = item["desc-value"]
          ? `<ul class="desc-value-list pl-3">${String(item["desc-value"])
              .split(";")
              .map(val => `<li>${val.trim()}</li>`)
              .join("")}</ul>`
          : `<div class="text-disable">${item.value || ""}</div>`;

        return `<div class="row mb-4">${labelHtml}${valueHtml}</div>`;
      })
      .join("");

    this.template = `
      <div class="accordion border-b">
        <div class="accordion-head flex justify-between items-center py-3 px-1 hover-bg-primary">
          <span class="font-semibold body-xs">${this.title}</span>
          <icon-button class="accordion-toggle toggle-icon flex justify-center items-center"
            icon="${plus}"
            toggle-icon="${minus}"
            size="0.8"
            action="accordion-toggle"
          ></icon-button>
        </div>
        <div class="accordion-content ${this.responsive ? "responsive" : ""} px-1">${rows}</div>
      </div>
    `;
  }

  render() {
    this.innerHTML = this.template;
  }

  cacheElements() {
    this.accordionEl = this.firstElementChild;
    if (!this.accordionEl) return;

    const [headEl, contentEl] = this.accordionEl.children;
    this.headEl = headEl;
    this.contentEl = contentEl;

    this.toggleButtonEl = this.headEl && this.headEl.querySelector("icon-button");
    if (this.headEl) this.headEl.style.cursor = "pointer";
  }

  setupToggle() {
    if (!this.accordionEl || !this.headEl || !this.contentEl || !this.toggleButtonEl) return;

    const toggleAccordion = () => {
      this.accordionEl.classList.toggle("open");
      ["pb-4", "mt-4"].forEach(cls => this.contentEl.classList.toggle(cls));
    };

    this.headEl.addEventListener("click", () => {
      toggleAccordion();
      this.toggleButtonEl.toggle(); // toggle icon only when clicking accordion head
    });

    this.toggleButtonEl.addEventListener("click", e => {
      e.stopPropagation();
      toggleAccordion();
    });
  }
}

customElements.define("base-accordion", BaseAccordion);
