import "@ui";
import "./scroll-product.css";
import { arrow } from "@assets";

class ScrollProduct extends BaseComponent {
  constructor() {
    super();

    this.products = [
      {
        title: "Porsche Watch",
        description: "Elegant timepiece",
        price: "4500",
        discount: "200",
        section: "Porsche Design",
      },
      {
        title: "Driving Gloves",
        description: "Leather gloves",
        price: "150",
        discount: "20",
        section: "Accessories",
      },
      {
        title: "Porsche Sunglasses",
        description: "Stylish and UV-protected",
        price: "300",
        discount: "50",
        section: "Eyewear",
      },
      {
        title: "Limited Edition Jacket",
        description: "Windproof and water-resistant",
        price: "700",
        discount: "100",
        section: "Apparel",
      },
      {
        title: "Leather Wallet",
        description: "Compact and luxurious",
        price: "250",
        discount: "30",
        section: "Accessories",
      },
      {
        title: "Sport Sneakers",
        description: "Comfortable and lightweight",
        price: "500",
        discount: "60",
        section: "Footwear",
      },
      {
        title: "Classic Cap",
        description: "Embroidered Porsche logo",
        price: "80",
        discount: "10",
        section: "Apparel",
      },
      {
        title: "Travel Backpack",
        description: "Durable and stylish",
        price: "320",
        discount: "40",
        section: "Travel Gear",
      },
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  updateTemplate() {
    const productCards = this.products
      .map(
        p => `
        <product-card
          title="${p.title}"
          description="${p.description}"
          price="${p.price}"
          discount="${p.discount}"
          section="${p.section}"
        ></product-card>
      `
      )
      .join("");

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

        <!-- Scrollable Products -->
        <div class="content-box relative flex gap-5 overflow-x-auto no-scrollbar" id="scrollable">
          ${productCards}
        </div>
      </div>
    `;

    this.render();

    const scrollable = this.querySelector("#scrollable");
    if (!scrollable) return;

    this.querySelector("#scroll-left").addEventListener("click", () => {
      scrollable.scrollBy({ left: -300, behavior: "smooth" });
    });

    this.querySelector("#scroll-right").addEventListener("click", () => {
      scrollable.scrollBy({ left: 300, behavior: "smooth" });
    });

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
