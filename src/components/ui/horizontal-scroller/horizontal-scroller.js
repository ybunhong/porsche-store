/**
 * HorizontalScroller Web Component
 *
 * A customizable horizontal scroll container with left and right navigation buttons.
 *
 * Usage:
 * <horizontal-scroller>
 *   <base-button label="Item 1"></base-button>
 *   <base-button label="Item 2"></base-button>
 *   <base-button label="Item 3"></base-button>
 *   <!-- Any child elements will be placed in the scrollable area -->
 * </horizontal-scroller>
 *
 * Features:
 * - Wraps slotted content inside a scrollable container.
 * - Provides left/right navigation buttons with smooth scrolling.
 * - Navigation buttons auto-hide when scrolling isn't needed.
 *
 * Attributes:
 * - `scroll-step`: Optional. Specifies custom scroll distance in pixels
 *   (default: half of the container's width).
 *
 * Example with custom scroll step:
 * <horizontal-scroller scroll-step="300">
 *   <base-button label="Item 1"></base-button>
 *   <base-button label="Item 2"></base-button>
 *   <base-button label="Item 3"></base-button>
 * </horizontal-scroller>
 */

import "./horizontal-scroller.css";
import { chevron } from "../../../assets/assets.js";
import { BaseComponent } from "../../base-component.js";

class DeliveryScroller extends BaseComponent {
  constructor() {
    super();
    this.updateButtonVisibility = this.updateButtonVisibility.bind(this);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);

    this.scrollArea = null;
    this.prevBtn = null;
    this.nextBtn = null;
    this.scrollStepAttr = null;
    this.resizeObserver = null;
  }

  connectedCallback() {
    this.render();
    requestAnimationFrame(() => {
      this.initScroller();
    });
  }

  render() {
    // Save existing children (user's buttons)
    const userContent = Array.from(this.childNodes);

    // Clear all content first
    this.innerHTML = `
      <div class="delivery-scroller grid overflow-hidden position-relative">
        <div class="delivery-scroll-area flex flex-nowrap overflow-x-auto"></div>
        <dev class="action-prev">
          <icon-button class=" z-3 left-0 flex items-center justify-center" icon="${chevron}" action="chevron" aria-label="Scroll Left"></icon-button>
        </dev>
        <dev class="action-next" >
          <icon-button class="z-3 right-0 flex items-center justify-center" icon="${chevron}" action="chevron" aria-label="Scroll Right"></icon-button>
        </dev>
      </div>
    `;

    // Append user's original children into the scroll area
    const scrollArea = this.querySelector(".delivery-scroll-area");
    userContent.forEach(node => scrollArea.appendChild(node));
  }

  initScroller() {
    this.scrollArea = this.querySelector(".delivery-scroll-area");
    this.prevBtn = this.querySelector(".action-prev");
    this.nextBtn = this.querySelector(".action-next");

    if (!this.scrollArea || !this.prevBtn || !this.nextBtn) {
      return;
    }

    this.prevBtn.addEventListener("click", this.onPrevClick);
    this.nextBtn.addEventListener("click", this.onNextClick);
    this.scrollArea.addEventListener("scroll", this.updateButtonVisibility);

    this.resizeObserver = new ResizeObserver(this.updateButtonVisibility);
    this.resizeObserver.observe(this.scrollArea);

    this.updateButtonVisibility();
  }

  get scrollStep() {
    return this.scrollStepAttr || Math.floor(this.scrollArea.clientWidth / 2);
  }

  onPrevClick() {
    this.scrollPrev();
  }

  onNextClick() {
    this.scrollNext();
  }

  scrollPrev() {
    this.scrollArea.scrollBy({ left: -this.scrollStep, behavior: "smooth" });
  }

  scrollNext() {
    this.scrollArea.scrollBy({ left: this.scrollStep, behavior: "smooth" });
  }

  updateButtonVisibility() {
    if (!this.scrollArea || !this.prevBtn || !this.nextBtn) return;

    const maxScrollLeft = this.scrollArea.scrollWidth - this.scrollArea.clientWidth;
    this.prevBtn.style.visibility = this.scrollArea.scrollLeft > 0 ? "visible" : "hidden";
    this.nextBtn.style.visibility =
      this.scrollArea.scrollLeft < maxScrollLeft - 1 ? "visible" : "hidden";
  }
}

customElements.define("horizontal-scroller", DeliveryScroller);
