// Import styles and car image asset
import "./vehicle-selection.css";
import carImage from "../../../assets/Cayenne.png";

// Define the custom element for the vehicle/model selection panel
class ModelSelectionPanel extends BaseComponent {
  constructor() {
    super();
    this.isModelTab = true; // Default tab is "With model selection"

    // 🚗 Array of car models (currently using the same image for all)
    this.models = [
      { src: carImage },
      { src: carImage },
      { src: carImage },
      { src: carImage },
      { src: carImage },
      { src: carImage },
    ];
  }

  // Called automatically when the element is added to the page
  connectedCallback() {
    this.render();
  }

  // Toggle between the two tabs: model selection and vehicle login
  switchTab(isModel) {
    this.isModelTab = isModel;
    this.render(); // Re-render based on selected tab
  }

  // Render the entire HTML of the component
  render() {
    // 🚘 Create HTML for each model image
    const carsHtml = this.models
      .map(
        card => `
          <div class="car" style="cursor: pointer;">
            <img src="${card.src}" alt="Car model" />
          </div>
        `
      )
      .join("");

    // 🖼 Main structure with conditionally rendered tab content
    this.innerHTML = /* html */ `
      <!-- 🔁 Tab buttons -->
      <div class="tabs flex flex-wrap gap-5 mb-5 justify-center">
        <button id="modelTab" class="${this.isModelTab ? "active" : ""}">
          With model selection
        </button>
        <button id="vehicleTab" class="${!this.isModelTab ? "active" : ""}">
          My vehicles
        </button>
      </div>

      <!-- 📦 Panel content based on selected tab -->
      ${
        this.isModelTab
          ? `
            <!-- 🔧 Model selection panel -->
            <div class="model-view">
              <p class="instruction text-center mb-5">
                Are you looking for a suitable product for your vehicle?<br />
                Select your model.
              </p>
              <div class="car-grid layout-grid mb-8 items-center">
                ${carsHtml}
              </div>
              <base-button label="Classic models" variant="secondary"></base-button>
            </div>
          `
          : `
            <!-- 🔒 Vehicle login panel -->
            <div class="vehicle-view">
              <p class="login-title gap-5 text-center mb-5">
                Not logged in yet?<br />
                <strong>Simply log in below.</strong>
              </p>
              <div class="login-img flex">
                <img src="${carImage}" alt="Vehicles" />
              </div>
              <base-button label="Login"></base-button>
            </div>
          `
      }
    `;

    // 🧠 Add tab switching event listeners
    const modelTab = this.querySelector("#modelTab");
    if (modelTab) modelTab.addEventListener("click", () => this.switchTab(true));

    const vehicleTab = this.querySelector("#vehicleTab");
    if (vehicleTab) vehicleTab.addEventListener("click", () => this.switchTab(false));
  }
}

// ✅ Register the component as a custom HTML tag
customElements.define("model-selection-panel", ModelSelectionPanel);
