import "./vehicle-selection.css";
import carImage from "../../../assets/Cayenne.png";

class ModelSelectionPanel extends BaseComponent {
  constructor() {
    super();
    this.isModelTab = true;

    this.models = [
      { label: "", src: carImage },
      { label: "", src: carImage },
      { label: "", src: carImage },
      { label: "", src: carImage },
      { label: "", src: carImage },
      { label: "", src: carImage },
    ];
  }

  connectedCallback() {
    this.render();
  }

  switchTab(isModel) {
    this.isModelTab = isModel;
    this.render(); // Re-render with new state
  }

  render() {
    const carsHtml = this.models
      .map(
        card => `
          <div class="car">
            <img src="${card.src}" alt="${card.label}" />
            <span>${card.label}</span>
          </div>
        `
      )
      .join("");

    this.innerHTML = /* html */ `
      <div class="tabs">
        <button id="modelTab" class="${this.isModelTab ? "active" : ""}">With model selection</button>
        <button id="vehicleTab" class="${!this.isModelTab ? "active" : ""}">My vehicles</button>
      </div>

      ${
        this.isModelTab
          ? `
        <div class="model-view">
          <p class="instruction">
            Are you looking for a suitable product for your vehicle?<br />
            Select your model.
          </p>
          <div class="car-grid">${carsHtml}</div>
          <button class="classic-button">Classic models</button>
        </div>
      `
          : `
        <div class="vehicle-view">
          <p class="login-title">
            Not logged in yet?<br />
            <strong>Simply log in below.</strong>
          </p>
          <div class="login-img">
            <img src="${carImage}" alt="Vehicles" />
          </div>
          <button class="login-button">🔍 Log in now</button>
        </div>
      `
      }
    `;

    const modelTab = this.querySelector("#modelTab");
    if (modelTab) modelTab.addEventListener("click", () => this.switchTab(true));

    const vehicleTab = this.querySelector("#vehicleTab");
    if (vehicleTab) vehicleTab.addEventListener("click", () => this.switchTab(false));
  }
}

customElements.define("model-selection-panel", ModelSelectionPanel);
