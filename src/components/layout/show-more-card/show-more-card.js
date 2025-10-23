import { BaseComponent } from "../../base-component.js";

//  Usage Instructions for <show-more-card> Component:
//
// This component accepts two optional attributes:
//
// 1. num (default: 1)
//    - Defines the number of content blocks to display in the card.
//    - Example: num="3" will load the first 3 content blocks.
//    - By default, only 1 block is shown and the rest are hidden until "Show more" is clicked.
//    - If this attribute is not provided, it defaults to 1.
//
// 2. bg (default: "white")
//    - Sets the background color of the card.
//    - Example: bg="black" will apply a black background with white text for contrast.
//    - If this attribute is not provided, the background will be white by default.
//
//  Example usage:
// <show-more-card num="3" bg="black"></show-more-card> it will has 3 contentes and black background.
// <show-more-card num="2" bg="white"></show-more-card> it will has 2 contentes and white background.
// <show-more-card num="4"></show-more-card> it will has 4 contentes and white background.
// <show-more-card></show-more-card> it will has 1 content and white background.
class ShowMoreCard extends BaseComponent {
  constructor() {
    super();
    this.allSections = [
      {
        title: "Porsche Tequipment: more than just vehicle accessories.",
        description:
          "Designed with the vehicle as a whole in mind and perfectly tailored to your Porsche – your Porsche vehicle accessories. With Porsche Tequipment, we offer a diverse range of high-quality accessories with which you can easily customise your Porsche to suit your needs. Retrospectively and simply. With products that are perfect for your Porsche. The special feature: vehicle accessories from Porsche Tequipment are designed by the same engineers and designers who also create the vehicles. This mostly takes place at the Porsche Development Centre in Weissach Like the vehicles, all accessory products also undergo time-consuming tests during their development. Because they're more than just accessories, they form part of a harmonious overall concept. Part of a Porsche.",
      },
      {
        title:
          "Individual and sophisticated like you: Porsche vehicle accessories from the 911 to the Cayenne.",
        description:
          "A dream already came true when you bought your Porsche. But what would the dream of a Porsche be if it didn't offer enough scope for each and every one of your ideas? Shouldn't it be just as individual as your life? With Porsche vehicle accessories, we offer the appropriate options to support you in your active lifestyle. Our model-specific roof boxes and bike racks allow you to easily and safely transport luggage and bikes on your journey. Accessories developed to fit and protect your Porsche 911, 718 Boxster or 718 Cayman, Cayenne, Panamera, Macan or Taycan, such as our range for footwell and luggage compartments. To make sure your Porsche stays as pristine as the day you got it. In short, Porsche accessories make your Porsche even more individual, even more suitable for everyday use – but never ordinary.",
      },
      {
        title: "Original Porsche Accessories: protection and care for your Porsche.",
        description:
          "A good two-thirds of all 911 models ever built are still on the road today. We owe this to the absolutely outstanding quality of the products we manufacture. But it's certainly also thanks to you, the drivers. After all, you take very good care of your Porsche. Our care products, which are specially tailored to the needs of our sports cars, are designed to support you in this. From wheel rim cleaners to leather care to polish. Our Porsche vehicle accessories offer a wide range of products for the individual care of your vehicle. Other accessories such as vehicle covers or our backrest protection are also designed to increase the longevity of your Porsche. And to make sure that it looks the same way you dreamed of it as a child for a very long time.",
      },
      {
        title: "Designer sunglasses — exclusive models for every taste",
        description:
          "Shielding your eyes from the bright sun is both fashionable and functional: The right sunglasses elevate even the simplest outfits. Ensure optimal vision in an iconic look with exclusive designer sunglasses. Whether angular or round, subtle or bold: there’s a perfect pair of sunglasses for every taste. The right model depends not only on the desired look but also on the shape of your face. For angular and heart-shaped faces, round or oval frames are particularly suitable. If you have a round face, you should look for angular sunglasses, they make the face appear narrower. The angular models from Porsche Design combine bold shapes, high-quality materials and modern lenses for a striking look. Whether timeless or trendy, modern sunglasses stand out with their iconic and exclusive look, making them an accessory that commands attention.",
      },
    ];
    this.eventListenersAdded = false;
  }

  static get observedAttributes() {
    return ["color", "content"];
  }

  attributeChangedCallback(name, newValue) {
    if (name === "color") {
      this.bgColor = newValue || "white";
    }
    if (name === "content") {
      this.content = parseInt(newValue, 10) || 1;
    }
    if (this.isConnected) {
      this.prepareSections();
      this.updateTemplate();
      requestAnimationFrame(() => {
        this.bindElements();
        this.setupEventListeners();
        this.handleResize();
      });
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.color = this.getAttribute("color") || "white";
    this.content = parseInt(this.getAttribute("content"), 10) || 1;
    this.showAll = false;
    this.prepareSections();
    this.updateTemplate();
    requestAnimationFrame(() => {
      this.bindElements();
      this.setupEventListeners();
      this.handleResize();
    });
  }

  prepareSections() {
    this.sections = this.allSections.slice(0, this.content);
  }

  updateTemplate() {
    const isDarkBg = this.color.toLowerCase() === "black";
    const textColor = isDarkBg ? "white" : "black";
    const contentHtml = this.sections
      .map(
        (section, index) => `
            <div class="section-block" style="display: ${index === 0 || this.showAll ? "block" : "none"};">
                <h5 class="heading-sm mb-4 mt-6" style="color:${textColor};">
                ${section.title}
                </h5>
                <p class="body-xs" style="color:${textColor};">
                ${section.description}
                </p>
            </div>
        `
      )
      .join("");
    const shouldShowToggle = this.sections.length > 1;
    this.template = `
        <div class="p-5" style="background:${this.color}; height: auto;">
            ${contentHtml}
            ${
              shouldShowToggle
                ? `
                <button class="read-more-toggle mt-4" style="color:${textColor}; background:transparent; border:none;">
                    ${this.showAll ? "Show less" : "Show more"}
                </button>
            `
                : ""
            }
        </div>
        `;
    this.render();
  }

  bindElements() {
    this.clickText = this.querySelector(".read-more-toggle");
    this.sectionBlocks = Array.from(this.querySelectorAll(".section-block"));
  }

  setupEventListeners() {
    if (this.eventListenersAdded) return;
    if (this.clickText) {
      this.clickText.addEventListener("click", () => this.toggleContent());
    }
    window.addEventListener("resize", () => this.handleResize());
    window.addEventListener("load", () => this.handleResize());
    this.eventListenersAdded = true;
  }

  toggleContent() {
    this.showAll = !this.showAll;
    this.sectionBlocks.forEach((block, index) => {
      const b = block; // local variable to avoid param reassignment error
      b.style.display = this.showAll || index === 0 ? "block" : "none";
    });
    this.clickText.textContent = this.showAll ? "Show less" : "Show more";
  }

  handleResize() {
    const isDesktop = window.innerWidth >= 1000;
    this.showAll = isDesktop;
    this.sectionBlocks.forEach((block, index) => {
      const b = block; // local variable to avoid param reassignment error
      b.style.display = isDesktop || this.showAll || index === 0 ? "block" : "none";
    });
    if (this.clickText) {
      this.clickText.style.display =
        this.sections.length <= 1 || isDesktop ? "none" : "inline-block";
      if (!isDesktop) {
        this.clickText.textContent = this.showAll ? "Show less" : "Show more";
      }
    }
  }
}
customElements.define("show-more-card", ShowMoreCard);
