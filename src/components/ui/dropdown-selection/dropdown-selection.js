import "./dropdown-selection.css";
import { chevron } from "@assets";
import { BaseComponent } from "../../base-component.js";

/**
 * DropdownSelection Web Component
 *
 * A custom dropdown component with an optional floating legend and stylable appearance.
 *
 *Usage in HTML:
 * <dropdown-selection
 *   value="Mr."
 *   placeholder="Select salutation"
 *   width="200px"
 * ></dropdown-selection>
 *
 * Attributes:
 * - value (string): The selected value (optional).
 * - placeholder (string): Placeholder when no option is selected (optional, defaults to "Salutation*").
 * - width (string): Optional CSS width (handled externally).
 *
 * Events:
 * - change: Fired when an option is selected.
 *   event.detail = { value: string, label: string }
 *
 * Example:
 * const dropdown = document.querySelector("dropdown-selection");
 * dropdown.addEventListener("change", (e) => {
 *   console.log("Selected:", e.detail.value);
 * });
 *
 * Behavior:
 * - Renders a fieldset with floating legend once a selection is made.
 * - Toggles dropdown visibility on button click.
 * - Closes dropdown when clicking outside.
 * - Applies visual styles via `dropdown-selection.css`.
 */

class DropdownSelection extends BaseComponent {
  static get observedAttributes() {
    return ["value", "placeholder", "width"];
  }

  constructor() {
    super();
    this.state = {
      isOpen: false,
      options: [
        { value: "Mr.", label: "Mr." },
        { value: "Mrs.", label: "Mrs." },
        { value: "Ms.", label: "Ms." },
      ],
      selectedOption: null,
    };
  }

  toggleDropdown() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  selectOption(option) {
    this.setAttribute("value", option.value);
    this.setState({
      selectedOption: option,
      isOpen: false,
    });
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: option,
        bubbles: true,
      })
    );
  }

  render() {
    const showLegend = this.state.selectedOption !== null;

    this.innerHTML = `
    <fieldset class="dropdown-fieldset border-default rounded-sm px-3">
      ${showLegend ? "<legend>Salutation*</legend>" : ""}
      <div class="dropdown ${this.state.isOpen ? "open" : ""}">
        <button class="dropdown-toggle justify-between items-center bg-white" ${this.hasAttribute("disabled") ? "disabled" : ""}>
          <div class="selected-content">
            ${
              this.state.selectedOption
                ? `
              <span class="option-label">${this.state.selectedOption.label}</span>
            `
                : `
              <span class="placeholder">${this.getAttribute("placeholder") || "Salutation*"}</span>
            `
            }
          </div>
          <span class="dropdown-arrow ">
            <icon-button icon="${chevron}"><icon-button>
          </span>
        </button>

        <div class="dropdown-menu bg-white m-1 rounded-md" style="display: ${this.state.isOpen ? "block" : "none"}">
          <div class="options-container">
            ${this.state.options
              .map(
                option => `
              <div class="option px-3 py-1 ${this.state.selectedOption && this.state.selectedOption.value === option.value ? "selected" : ""}"
                   data-value="${option.value}">
                <span class="option-label">${option.label}</span>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    </fieldset>
  `;

    this.initEventListeners();
  }

  initEventListeners() {
    const toggle = this.querySelector(".dropdown-toggle");
    if (toggle) {
      toggle.addEventListener("click", e => {
        e.stopPropagation();
        this.toggleDropdown();
      });
    }

    this.querySelectorAll(".option").forEach(option => {
      option.addEventListener("click", e => {
        e.stopPropagation();
        const selected = this.state.options.find(opt => opt.value === option.dataset.value);
        if (selected) {
          this.selectOption(selected);
        }
      });
    });

    document.addEventListener("click", () => {
      if (this.state.isOpen) {
        this.setState({ isOpen: false });
      }
    });
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}

customElements.define("dropdown-selection", DropdownSelection);
