/**
 *
 * 1. Use a single banner by setting attributes in HTML:
 *    <banner-component
 *      variant="primary"
 *      background-mobile="img/mobile.jpg"
 *      background-desktop="img/desktop.jpg"
 *      logo-src="img/logo.svg"
 *      heading="Porsche Design"
 *      paragraph="Timeless style, new collection"
 *      button-label="Shop Now"
 *      button-variant="primary"
 *      button-href="/shop.html"
 *      primary-button-label="Our Collection"
 *      primary-button-variant="primary"
 *      primary-button-href="/collection.html"
 *      secondary-button-label="Learn More"
 *      secondary-button-variant="secondary"
 *      secondary-button-href="/about.html"
 *    ></banner-component>
 *
 * 2. Available `variant` options:
 *    - "primary": image + logo + heading + button
 *    - "secondary": image + heading
 *    - "tertiary": image + heading + button
 *    - "quaternary": image + heading + paragraph + button
 *    - "quinary": image + heading + primary & secondary buttons
 *
 * 3. Responsive behavior:
 *    - Use both `background-mobile` and `background-desktop` for responsive images:
 *      .background-mobile (< 760px)
 *      .background-desktop (>= 760px)
 *
 * 4. Buttons usage:
 *    - Main button controlled by:
 *        `button-label`, `button-variant`, `button-href`
 *    - Primary button controlled by:
 *        `primary-button-label`, `primary-button-variant`, `primary-button-href`
 *    - Secondary button controlled by:
 *        `secondary-button-label`, `secondary-button-variant`, `secondary-button-href`
 */

import "./banner_component.css";
import "../index.js";

class BannerComponent extends BaseComponent {
  static get observedAttributes() {
    return [
      "variant",
      "background-mobile",
      "background-desktop",
      "logo-src",
      "heading",
      "paragraph",
      "button-label",
      "button-variant",
      "button-href",
      "secondary-button-label",
      "secondary-button-variant",
      "secondary-button-href",
      "primary-button-label",
      "primary-button-variant",
      "primary-button-href",
    ];
  }

  constructor() {
    super();
    this.props = {
      variant: "primary",
      backgroundMobile: "",
      backgroundDesktop: "",
      logoSrc: "",
      heading: "",
      paragraph: "",
      buttonLabel: "",
      buttonVariant: "primary",
      buttonHref: "",
      secondaryButtonLabel: "",
      secondaryButtonVariant: "",
      secondaryButtonHref: "",
      primaryButtonLabel: "",
      primaryButtonVariant: "",
      primaryButtonHref: "",
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadAttributes();
    this.setDefaults();
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const propName = BannerComponent.toCamelCase(name);
      this.props[propName] = newValue;
      this.updateTemplate();
    }
  }

  loadAttributes() {
    this.constructor.observedAttributes.forEach(attr => {
      const prop = BannerComponent.toCamelCase(attr);
      const value = this.getAttribute(attr);
      if (value !== null) {
        this.props[prop] = value;
      }
    });
  }

  static toCamelCase(attr) {
    return attr.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
  }

  setDefaults() {
    const variantDefaults = {
      primary: {
        backgroundMobile: "../../../../src/assets/img/boy2.jpeg",
        backgroundDesktop: "../../../../src/assets/img/boy1.jpeg",
        logoSrc: "../../../../src/assets/img/download (1).svg",
        buttonLabel: "Discover now",
      },
      secondary: {
        backgroundMobile: "../../../../src/assets/img/camping2.jpeg",
        backgroundDesktop: "../../../../src/assets/img/camping1.jpeg",
        heading: "Porsche outdoor equipment",
      },
      tertiary: {
        backgroundMobile: "../../../../src/assets/img/camping2.jpeg",
        backgroundDesktop: "../../../../src/assets/img/camping1.jpeg",
        heading: "Porsche 911 Spirit 70 Collection",
        buttonLabel: "Discover now",
      },
      quaternary: {
        backgroundMobile: "../../../../src/assets/img/girl2.jpeg",
        backgroundDesktop: "../../../../src/assets/img/girl1.jpeg",
        heading: "Some things were pretty cool. Time to bring them back.",
        paragraph: "Porsche 911 Spirit 70 Collection",
        buttonLabel: "Discover now",
      },
      quinary: {
        backgroundMobile: "../../../../src/assets/img/shoes3.jpeg",
        backgroundDesktop: "../../../../src/assets/img/shoes.jpeg",
        heading: "A Design that never stands still",
        primaryButtonLabel: "Our collection",
        secondaryButtonLabel: "Learn more",
      },
    };

    const defaults = variantDefaults[this.props.variant];
    if (!defaults) return;

    Object.entries(defaults).forEach(([key, value]) => {
      if (!this.props[key]) {
        this.props[key] = value;
      }
    });
  }

  updateTemplate() {
    const {
      backgroundMobile,
      backgroundDesktop,
      logoSrc,
      heading,
      paragraph,
      buttonLabel,
      buttonVariant,
      buttonHref,
      primaryButtonLabel,
      primaryButtonVariant,
      primaryButtonHref,
      secondaryButtonLabel,
      secondaryButtonVariant,
      secondaryButtonHref,
    } = this.props;

    this.template = `
      <div class="banner relative m-5 overflow-hidden">
        ${
          backgroundMobile || backgroundDesktop
            ? `
          <picture>
            ${backgroundDesktop ? `<source srcset="${backgroundDesktop}" media="(min-width: 768px)">` : ""}
            ${backgroundMobile ? `<img src="${backgroundMobile}" alt="Banner Image" class="w-full h-auto object-cover">` : ""}
          </picture>
        `
            : ""
        }

        <div class="overlay absolute inset-0 flex flex-col justify-center items-center text-center p-5 bg-black/30 pointer-events-none">
          ${logoSrc ? `<img src="${logoSrc}" alt="Logo" class="mb-5 max-w-[180px] pointer-events-auto">` : ""}
          ${heading ? `<h1 class="pointer-events-auto">${heading}</h1>` : ""}
          ${paragraph ? `<p class="p font-bold text-p1 pointer-events-auto">${paragraph}</p>` : ""}

          ${
            buttonLabel
              ? `
            <base-button
              label="${buttonLabel}"
              variant="${buttonVariant}"
              href="${buttonHref || "#"}"
              class="pointer-events-auto"
            ></base-button>
          `
              : ""
          }

          <div class="button-group flex gap-2 mt-2">
            ${
              primaryButtonLabel
                ? `
              <base-button
                label="${primaryButtonLabel}"
                variant="${primaryButtonVariant}"
                href="${primaryButtonHref || "#"}"
                class="pointer-events-auto"
              ></base-button>
            `
                : ""
            }
            ${
              secondaryButtonLabel
                ? `
              <base-button
                label="${secondaryButtonLabel}"
                variant="${secondaryButtonVariant}"
                href="${secondaryButtonHref || "#"}"
                class="pointer-events-auto"
              ></base-button>
            `
                : ""
            }
          </div>
        </div>
      </div>
    `;

    this.render();
  }
}

customElements.define("banner-component", BannerComponent);
