import "@ui";
import "./popup.css";
import { heart, heartFilled } from "../../../assets/assets.js";
import { BaseComponent } from "../../base-component.js";
import { sampleProductDataList } from "../../../sample/sample-data.js";

class PopUp extends BaseComponent {
  static get observedAttributes() {
    return ["label", "variant", "disabled"];
  }

  constructor() {
    super();
    this.label = "";
    this.variant = "primary";
    this.disabled = false;

    const id = Number(this.getAttribute("data-product-id")) || 0;
    this.product = sampleProductDataList.find(p => p.id === id);
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate(); // render the product when component connects
  }

  updateTemplate() {
    const {
      name,
      price,
      priceNote,
      images: [{ src, alt }],
    } = this.product;

    if (!this.product) return;

    this.template = `
      <section>
        <div class="pop-up bg-white p-3 flex fixed rounded-lg justify-between item-center z-5000" 
          id="scroll-pop-up">
          <div class="scroll-trigger flex justify-between">
            <div class="info-pop-up flex hide-mobile items-center gap-4 grow shrink ">
              
              <!-- Left section -->
              <div class="pop-up-image relative">
                <img src="${src}" alt="${alt}" />
              </div>
              <div class="pop-up-content flex flex-col justify-center">
                <p>${name}</p>
                <div class="price_tax flex gap-2 items-baseline">
                  <span class="price">${price}</span>
                  <span class="tax">+ ${priceNote}</span>
                </div>
              </div>
            </div>

              <!-- Right section -->
            <div class="info-button flex gap-2 items-center">
              <div class="hide-mobile">
                <span class="squares flex bg-white rounded-sm items-center justify-center cursor-pointer">
                  <icon-button id="heart" icon="${heart}" size="2"></icon-button>
                </span>
              </div>
              <base-button class="w-full" id="configure" label="Configure" variant="primary"></base-button>
            </div>
          </div>
        </div>
      </section>
    `;

    this.render();

    // Heart toggle
    const heartBtn = this.querySelector("#heart");
    if (heartBtn) {
      heartBtn.addEventListener("click", () => {
        const isFilled = heartBtn.getAttribute("icon") === heartFilled;
        heartBtn.setAttribute("icon", isFilled ? heart : heartFilled);
        // Logic
      });
    }

    // Configure button
    const configureBtn = this.querySelector("#configure");
    if (configureBtn) {
      configureBtn.addEventListener("click", () => {
        // Logic
      });
    }

    window.addEventListener("scroll", () => {
      const appearEl = document.querySelector(".appear"); // class name will change according to developer usage
      const disappearEl = document.querySelector(".disappear"); // footer class name will change according to web page
      const popup = document.querySelector("pop-up");

      if (!appearEl || !disappearEl || !popup) return; // if any not found it stops

      const appearY = appearEl.getBoundingClientRect().top; // Vertical distance from viewport top to class ['.appear'] top (negative if scrolled past)
      const disappearY = disappearEl.getBoundingClientRect().top;

      const passedAppear = appearY < 0; // Check if class {.appear or .disappear} element has been scrolled above (off) the top of the viewport
      const reachedDisappear = disappearY < 0;

      // Show the popup only if we've scrolled past '.appear' but NOT yet past '.disappear'
      if (passedAppear && !reachedDisappear) {
        popup.style.display = "block";
      } else {
        popup.style.display = "none";
      }
    });
  }
}

customElements.define("pop-up", PopUp);
