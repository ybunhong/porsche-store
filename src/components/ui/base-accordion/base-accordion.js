import "./base-accordion.css";
import { plus, minus } from "@assets";
import { sampleSets } from "../../../data/sample-data.js";

/**
 * BaseAccordion Web Component
 *
 * Usage:
 * <base-accordion
 *    title="your-title"
 *    responsive (optional)
 *    data-key="yout-data-key">
 * </base-accordion>
 *
 * Attributes:
 * - title (string): Optional. Accordion heading (default: "Untitled").
 * - responsive (boolean): Optional. Adds responsive spacing if present.
 * - data-key (string): Required. Matches a key in your imported JSON (e.g., sampleSets).
 *
 * Data Source:
 * - Uses external JSON (e.g. sampleSets["productDetails"]) from your JS module.
 * - Avoids inline JSON to reduce clutter and prevent HTML validation errors.
 *
 * Supported Row Types:
 * - { "label": "Label Text", "value": "Value Text" }
 * - { "desc-label": "Label Text", "desc-value": "Item 1; Item 2; Item 3" }
 *    → desc-value is split by semicolon and rendered as a list.
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
 * //In your sample-data.js file
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
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadData();
    this.updateTemplate();
    this.render();
    this.setupToggle();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "title") {
        this.title = newValue || "Untitled";
      }
      if (name === "data-key") {
        this.loadData();
      }
      if (name === "responsive") {
        this.responsive = this.hasAttribute("responsive");
      }
      this.updateTemplate();
      this.render();
      this.setupToggle();
    }
  }

  // Loads data from sampleSets based on the 'data-key' attribute, or shows a warning if not found.
  loadData() {
    const key = this.getAttribute("data-key");
    if (key && sampleSets[key]) {
      this.data = sampleSets[key];
    } else {
      this.data = [];
      console.warn(`No data found for key: "${key}"`);
    }
  }

  updateTemplate() {
    // Generate JSON data into actual HTML rows
    const rows = this.data
      .map(item => {
        const labelHtml = item["desc-label"]
          ? // Determine the label content and class
            `<div>${item["desc-label"]}</div>`
          : // Default to 'label' class and 'label' property
            `<div class="font-semibold body-xs">${item.label || ""}</div>`;

        const valueHtml = item["desc-value"]
          ? // If desc-value exists, split by semicolon and create a list
            `<ul class="desc-value-list pl-3">${String(item["desc-value"])
              .split(";")
              .map(val => `<li>${val.trim()}</li>`)
              .join("")}</ul>`
          : // Default to 'value' class and 'value' property
            `<div class="text-disable">${item.value || ""}</div>`;

        return `<div class="row mb-4">${labelHtml}${valueHtml}</div>`;
      })
      .join("");

    this.template = `
      <div class="accordion border-b">
        <div class="accordion-head flex justify-between items-center py-3 hover-bg-accent">
          <span class="font-semibold body-xs">${this.title}</span>
          <icon-button class="accordion-toggle"
            icon="${plus}"
            toggle-icon="${minus}"
            size="0.8"
            action="accordion-toggle"
          ></icon-button>
        </div>
        <div class="accordion-content ${this.responsive ? "responsive" : ""}">${rows}</div>
      </div>
    `;
  }

  render() {
    this.innerHTML = this.template;
  }

  // Centralized click handler
  setupToggle() {
    const accordion = this.querySelector(".accordion");
    const head = this.querySelector(".accordion-head");
    const content = this.querySelector(".accordion-content");
    const toggleButton = this.querySelector(".accordion-toggle");

    if (!head || !accordion || !toggleButton) return;

    head.addEventListener("click", () => {
      accordion.classList.toggle("open");
      ["pb-4", "mt-4"].forEach(cls => content.classList.toggle(cls));
      toggleButton.toggle(); // Call method from <icon-button>
    });
  }
}

customElements.define("base-accordion", BaseAccordion);
