import "./warning-info.css";
import { warning } from "@assets";
import { BaseComponent } from "../../base-component.js";

/**
 * InfoWarningComponent Web Component
 *
 * Usage in HTML:
 * <info-warning></info-warning>
 * <info-warning text="Custom warning text" link="https://example.com"></info-warning>
 *
 * Attributes:
 * - text (string): Custom warning message text to display.
 *                  If omitted, default warning text is shown.
 * - link (string): URL for the link shown inside the warning.
 *                  Defaults to "https://www.P65Warnings.ca.gov" if omitted.
 */

export class InfoWarningComponent extends BaseComponent {
  static get observedAttributes() {
    return ["text", "link"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) this.render();
  }

  render() {
    const text =
      this.getAttribute("text") ||
      "Components of some products, including timepieces, eyewear, sandals, gaming chair, seating tuns, hardcases, charging hardware, automotive care and cleaning supplies can expose you to chemicals including Bisphenol A (BPA), Disononyi Phthalate, Lead and Nickel which are known to the State of California to cause cancer, reproductive harm or birth defects. For more information visit";

    const link = this.getAttribute("link") || "https://www.P65Warnings.ca.gov";

    this.innerHTML = `
      <section class="section-spacing">
        <div class="info-warning">
          <div class="info-warning-flex">
            <div class="info-warning-icon">
              <icon-button icon="${warning}"></icon-button>
            </div>
            <strong class="info-warning-strong">WARNING</strong><br />
          </div>
          <p>
            ${text} <a href="${link}" target="_blank" rel="noopener noreferrer" class="info-warning-link">${link}</a>
          </p>
        </div>
      </section>
    `;
  }
}

customElements.define("info-warning", InfoWarningComponent);
