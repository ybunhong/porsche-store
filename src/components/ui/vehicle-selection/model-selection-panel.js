import "./model-selection-panel.css";
import { BaseComponent } from "../../base-component.js";
import carImage from "../../../assets/Cayenne.png";

class ModelSelectionPanel extends BaseComponent {
  constructor() {
    super();
    this.isModelTab = true;

    this.models = [
      { src: carImage },
      { src: carImage },
      { src: carImage },
      { src: carImage },
      { src: carImage },
      { src: carImage },
    ];
  }

  connectedCallback() {
    this.render();
  }

  switchTab(isModel) {
    this.isModelTab = isModel;
    this.render();
  }

  render() {
    const carsHtml = this.models
      .map(
        card => `
          <div class="car" style="cursor: pointer;">
            <img src="${card.src}" alt="Car model" />
          </div>
        `
      )
      .join("");

    // Main structure with conditionally rendered tab content
    this.innerHTML = `
      <!-- Tab buttons -->
      <div class="tabs flex flex-wrap gap-5 mb-5 justify-center">
        <button id="modelTab" class="${this.isModelTab ? "active" : ""}">
          With model selection
        </button>
        <button id="vehicleTab" class="${!this.isModelTab ? "active" : ""}">
          My vehicles
        </button>
      </div>

      <!-- Panel content based on selected tab -->
      ${
        this.isModelTab
          ? `
            <!-- Model selection panel -->
            <div class="model-view">
              <p class="instruction text-center mb-5">
                Are you looking for a suitable product for your vehicle?<br />
                Select your model.
              </p>
              <div class="car-grid layout-grid mb-8 items-center">
                ${carsHtml}
              </div>
              <base-button class="classic-model" label="Classic models" variant="secondary"></base-button>
            </div>
          `
          : `
            <!-- Vehicle login panel -->
            <div class="vehicle-view">
              <p class="login-title gap-5 text-center mb-5">
                Not logged in yet?<br />
                <strong>Simply log in below.</strong>
              </p>
              <div class="login-img flex">
                <img src="${carImage}" alt="Vehicles" />
              </div>
              <a href="/pages/authentication-page/login-page.html">
              <base-button label="Login"></base-button></a>
            </div>
          `
      }
    `;

    // Add tab switching event listeners
    const modelTab = this.querySelector("#modelTab");
    if (modelTab) modelTab.addEventListener("click", () => this.switchTab(true));

    const vehicleTab = this.querySelector("#vehicleTab");
    if (vehicleTab) vehicleTab.addEventListener("click", () => this.switchTab(false));
  }
}

customElements.define("model-selection-panel", ModelSelectionPanel);
