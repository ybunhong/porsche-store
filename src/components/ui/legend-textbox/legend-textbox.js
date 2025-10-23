import "./legend-textbox.css";
import { BaseComponent } from "../../base-component.js";

/**
 * LegendTextBox Web Component
 *
 * Usage in HTML:
 * <legend-textbox
 *   value="Initial Value"
 *   placeholder="Enter text here"
 *   width="400px"
 *   height="50px"
 * ></legend-textbox>
 *
 * Attributes:
 * - value (string): The value of the input field (optional, default is empty).
 * - placeholder (string): Placeholder text for the input (optional).
 * - width (string): Width of the textbox (optional, default is 320px).
 * - height (string): Height of the input field (optional, default is auto).
 *
 * Example JavaScript Usage:
 * const legendTextBox = document.querySelector('legend-textbox');
 *
 * legendTextBox.addEventListener('input', (event) => {
 *   console.log('New input value:', event.detail.value);
 * });
 *
 * The 'input' event is triggered every time the user types in the text box, and the
 * event detail will contain the updated value.
 *
 * When the input is focused or has a value, the legend will be visible. If the input
 * is empty and blurred, the legend will be hidden.
 */

class TextBox extends BaseComponent {
  static get observedAttributes() {
    return ["value", "placeholder", "width", "height"];
  }

  constructor() {
    super();
    this.input = null;
    this.legend = null;
  }

  connectedCallback() {
    this.render();
    this.initEventListeners();
    this.applyAttributes();
  }

  applyAttributes() {
    const width = this.getAttribute("width") || "320px";
    const height = this.getAttribute("height") || "";
    const value = this.getAttribute("value") || "";
    const placeholder = this.getAttribute("placeholder") || "";

    this.style.display = "inline-block";
    this.style.width = width;

    if (this.input) {
      this.input.value = value;
      this.input.placeholder = placeholder;
      this.input.style.width = "100%";
      this.input.style.height = height || "auto";
    }

    if (this.legend) {
      this.legend.textContent = placeholder || "Text*";
      const shouldShowLegend = value || this.input === document.activeElement;
      this.legend.classList.toggle("hidden", !shouldShowLegend);
    }
  }

  render() {
    this.innerHTML = `
      <fieldset class="textbox-fieldset border-medium rounded-sm relative mt-2">
        <legend class="textbox-legend hidden bg-white absolute">Text*</legend>
        <input class="textbox-input body-sm" type="text" />
      </fieldset>
    `;
    this.input = this.querySelector(".textbox-input");
    this.legend = this.querySelector(".textbox-legend");
  }

  initEventListeners() {
    if (!this.input) return;

    this.input.addEventListener("focus", () => {
      this.input.placeholder = "";
      if (this.legend) this.legend.classList.remove("hidden");
    });

    this.input.addEventListener("blur", () => {
      if (!this.input.value && this.legend) {
        this.legend.classList.add("hidden");
      }
    });

    this.input.addEventListener("input", () => {
      this.setAttribute("value", this.input.value);
      this.dispatchEvent(
        new CustomEvent("input", {
          detail: { value: this.input.value },
          bubbles: true,
        })
      );
    });
  }
}

customElements.define("legend-textbox", TextBox);
