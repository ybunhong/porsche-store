import "./base-accordion.css";
import { PlusIcon, NegativeIcon } from "../../../assets/assets.js";

class MyAccordion extends HTMLElement {
  connectedCallback() {
    if (this.initialized) return;
    this.initialized = true;
    this.classList.add("acc-body");

    // Header
    const heading = document.createElement("div");
    heading.className = "acc-heading";

    const titleSpan = document.createElement("span");
    titleSpan.textContent = this.getAttribute("title") || "Untitled";

    const icon = document.createElement("img");
    icon.className = "toggle-icon";
    icon.src = PlusIcon;
    icon.alt = "Plus";

    heading.appendChild(titleSpan);
    heading.appendChild(icon);

    // Content
    const content = document.createElement("div");
    content.className = "acc-content";

    if (this.hasAttribute("responsive")) {
      content.classList.add("responsive");
    }

    // Fallback styles from attributes
    const defaultLabelStyle = this.getAttribute("label-style") || "";
    const defaultValueStyle = this.getAttribute("value-style") || "";

    // Read and render rows
    const data = this.getAttribute("data-items");
    if (data) {
      try {
        const rows = JSON.parse(data);

        rows.forEach(item => {
          const row = document.createElement("div");
          row.className = "row";

          // Label
          const labelDiv = document.createElement("div");
          labelDiv.className = "label";
          labelDiv.textContent = item.label || "";
          labelDiv.style.cssText = item.labelStyle || defaultLabelStyle;

          // Value
          const valueDiv = document.createElement("div");
          valueDiv.className = "value";
          valueDiv.style.cssText = item.valueStyle || defaultValueStyle;

          if (item.value) {
            valueDiv.textContent = item.value;
          }

          row.appendChild(labelDiv);
          row.appendChild(valueDiv);
          content.appendChild(row);
        });
      } catch (err) {
        console.error("Invalid JSON in data-items:", err);
      }
    }

    this.appendChild(heading);
    this.appendChild(content);

    // Toggle behavior
    heading.addEventListener("click", () => {
      const isOpen = this.classList.toggle("open");
      icon.src = isOpen ? NegativeIcon : PlusIcon;
      icon.alt = isOpen ? "Minus" : "Plus";
    });
  }
}

customElements.define("base-accordion", MyAccordion);
