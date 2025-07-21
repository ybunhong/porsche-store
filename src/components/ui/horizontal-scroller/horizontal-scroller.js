/**
 * DeliveryScroller Web Component
 *
 * A horizontal scroll container with previous and next buttons.
 *
 * Usage Example in HTML:
 *
 * <delivery-scroller>
 *   <base-button label="HIHIDGHjag"></base-button>
 *   <base-button label="HIHIDGHjag"></base-button>
 *   <base-button label="HIHIDGHjag"></base-button>
 *   <!-- Add any child elements that should scroll horizontally -->
 * </delivery-scroller>
 *
 * Features:
 * - Automatically wraps the slotted content inside a scrollable area.
 * - Left and right navigation buttons for smooth scrolling.
 * - Buttons hide automatically if scrolling is not possible.
 *
 * Attributes:
 * - `scroll-step`: Optional. Set a custom scroll step (default: half of container width).
 *
 * Example with custom scroll step:
 * <delivery-scroller scroll-step="300">
 *    <base-button label="HIHIDGHjag"></base-button>
 *    <base-button label="HIHIDGHjag"></base-button>
 *    <base-button label="HIHIDGHjag"></base-button>
 * </delivery-scroller>
 */

import "./horizontal-scroller.css";
import { chevron } from "@assets";

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
