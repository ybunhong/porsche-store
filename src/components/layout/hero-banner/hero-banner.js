import "./hero-banner.css";
import { BaseComponent } from "../../base-component.js";
import "@ui";
import BannerImage from "../../../assets/hero-section.jpeg";

class HeroBanner extends BaseComponent {
  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  updateTemplate() {
    this.template = /* html */ `
       <section class=" hero w-full">
        <img 
          src="${BannerImage}" 
          alt="Porsche Outdoor Equipment" 
          class=" absolute hero-image "
        />

        <div class="relative z-0 flex flex-col items-center justify-center h-full text-white text-center">
          <h1 class="display-sm font-bold mb-4">Porsche Outdoor Equipment</h1>
          <base-button label="Discover more" variant="primary"></base-button>
        </div>
        <aside>
        </aside>
      </section>
    `;
    this.render();
  }
}

customElements.define("hero-banner", HeroBanner);
