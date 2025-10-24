import "../../index.js";
import "./scroll-product.css";
import { arrow } from "../../../assets/assets.js";
import { BaseComponent } from "../../base-component.js";

class ScrollProduct extends BaseComponent {
  static get observedAttributes() {
    return ["data"];
  }

  constructor() {
    super();
    this.data = ""; // stores the passed HTML string
  }

  connectedCallback() {
    super.connectedCallback();
    const dataAttr = this.getAttribute("data");
    if (dataAttr) {
      this.data = dataAttr;
    }
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "data" && oldVal !== newVal) {
      this.data = newVal;
      this.updateTemplate();
    }
  }

  updateTemplate() {
    this.template = `
      <div class="scroll-wrapper flex flex-col gap-4 w-full">
        <!-- Header and Arrows -->
        <div class="flex justify-between items-center w-full mb-2">
          <h1 class="text-xl font-bold">Last Viewed</h1>
          <div class="arrow-btns flex gap-4">
            <icon-button icon="${arrow}" size="1.5" id="scroll-left"></icon-button>
            <icon-button icon="${arrow}" size="1.5" id="scroll-right"></icon-button>
          </div>
        </div>

        <!-- Scrollable Area -->
        <div class="content-box relative flex gap-5 overflow-x-auto no-scrollbar" id="scrollable">
          ${this.data || "<p class='body-xs text-gray-400'>No content provided</p>"}
        </div>
      </div>
    `;

    this.render();
    this.attachScrollEvents();
  }

  attachScrollEvents() {
    const scrollable = this.querySelector("#scrollable");
    if (!scrollable) return;

    const scrollLeftBtn = this.querySelector("#scroll-left");
    if (scrollLeftBtn) {
      scrollLeftBtn.addEventListener("click", () => {
        scrollable.scrollBy({ left: -300, behavior: "smooth" });
      });
    }

    const scrollRightBtn = this.querySelector("#scroll-right");
    if (scrollRightBtn) {
      scrollRightBtn.addEventListener("click", () => {
        scrollable.scrollBy({ left: 300, behavior: "smooth" });
      });
    }

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    scrollable.addEventListener("mousedown", e => {
      isDown = true;
      startX = e.pageX - scrollable.offsetLeft;
      scrollLeft = scrollable.scrollLeft;
      scrollable.classList.add("dragging");
    });

    scrollable.addEventListener("mouseleave", () => {
      isDown = false;
      scrollable.classList.remove("dragging");
    });

    scrollable.addEventListener("mouseup", () => {
      isDown = false;
      scrollable.classList.remove("dragging");
    });

    scrollable.addEventListener("mousemove", e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollable.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollable.scrollLeft = scrollLeft - walk;
    });
  }
}

customElements.define("scroll-product", ScrollProduct);
