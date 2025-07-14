// banner-component.js
/**
 * BaseBanner Web Component
 *
 * Usage:
 * <base-banner variant="primary"></base-banner>
 *
 * JS:
 * import "./banner-component.js";
 *
 * Description:
 * Dynamically displays a responsive banner with optional logo, headline, paragraph, and button.
 * The layout and content change based on the `variant` attribute.
 *
 * Available Variants:
 * - "primary": Shows background image, logo, headline, and button
 * - "secondary": Background + headline only
 * - "tertiary": Background + headline + button
 * - "quaternary": Background + headline + paragraph + button
 *
 * Attributes:
 * - variant (string): One of the four predefined styles
 *
 * Features:
 * - Responsive image loading (mobile/desktop)
 * - Optional logo, headline (h1), paragraph (p), and button
 * - Button supports variant style via `<base-button>` system
 * - Overlay with centered, stacked layout
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
      "secondary-button-label",
      "secondary-button-variant",
      "primary-button-label",
      "primary-button-variant",
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
      secondaryButtonLabel: "",
      secondaryButtonVariant: "",
      primaryButtonLabel: "",
      primaryButtonVariant: "",
    };
  }

  connectedCallback() {
    super.connectedCallback();
    // Load attribute values to props
    this.constructor.observedAttributes.forEach(attr => {
      const prop = this.constructor.toCamelCase(attr);
      const value = this.getAttribute(attr);
      if (value !== null) {
        this.props[prop] = value;
      }
    });

    this.setDefaults(); // fill in missing defaults
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Removed console.log for ESLint no-console
    if (oldValue !== newValue) {
      const propName = this.constructor.toCamelCase(name);
      this.props[propName] = newValue;
      this.updateTemplate();
    }
  }

  setDefaults() {
    const { variant } = this.props;

    switch (variant) {
      case "primary":
        if (!this.props.backgroundMobile)
          this.props.backgroundMobile = "../../../../src/assets/img/boy2.jpeg";
        if (!this.props.backgroundDesktop)
          this.props.backgroundDesktop = "../../../../src/assets/img/boy1.jpeg";
        if (!this.props.logoSrc) this.props.logoSrc = "../../../../src/assets/img/download (1).svg";
        if (!this.props.buttonLabel) this.props.buttonLabel = "Discover now";
        break;

      case "secondary":
        if (!this.props.backgroundMobile)
          this.props.backgroundMobile = "../../../../src/assets/img/camping2.jpeg";
        if (!this.props.backgroundDesktop)
          this.props.backgroundDesktop = "../../../../src/assets/img/camping1.jpeg";
        if (!this.props.heading) this.props.heading = "Porsche outdoor equipment";
        break;

      case "tertiary":
        if (!this.props.backgroundMobile)
          this.props.backgroundMobile = "../../../../src/assets/img/camping2.jpeg";
        if (!this.props.backgroundDesktop)
          this.props.backgroundDesktop = "../../../../src/assets/img/camping1.jpeg";
        if (!this.props.heading) this.props.heading = "Porsche 911 Spirit 70 Collection";
        if (!this.props.buttonLabel) this.props.buttonLabel = "Discover now";
        break;

      case "quaternary":
        if (!this.props.backgroundMobile)
          this.props.backgroundMobile = "../../../../src/assets/img/girl2.jpeg";
        if (!this.props.backgroundDesktop)
          this.props.backgroundDesktop = "../../../../src/assets/img/girl1.jpeg";
        if (!this.props.heading)
          this.props.heading = "Some things were pretty cool. Time to bring them back.";
        if (!this.props.paragraph) this.props.paragraph = "Porsche 911 Spirit 70 Collection";
        if (!this.props.buttonLabel) this.props.buttonLabel = "Discover now";
        break;

      case "quinary":
        if (!this.props.backgroundMobile)
          this.props.backgroundMobile = "../../../../src/assets/img/girl2.jpeg";
        if (!this.props.backgroundDesktop)
          this.props.backgroundDesktop = "../../../../src/assets/img/sh.jpeg";
        if (!this.props.heading) this.props.heading = "An Design that never stands still";
        if (!this.props.primaryButtonLabel) this.props.primaryButtonLabel = "ok";
        if (!this.props.secondaryButtonLabel) this.props.secondaryButtonLabel = "ok";
        break;

      default:
        // no defaults
        break;
    }
  }

  static toCamelCase(attr) {
    return attr.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
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
      secondaryButtonLabel,
      secondaryButtonVariant,
      primaryButtonLabel,
      primaryButtonVariant,
    } = this.props;

    this.template = `
      <div class="banner relative m-5 overflow-hidden">

        ${
          backgroundMobile || backgroundDesktop
            ? `<picture>
                ${
                  backgroundDesktop
                    ? `<source srcset="${backgroundDesktop}" media="(min-width: 768px)">`
                    : ""
                }
                ${
                  backgroundMobile
                    ? `<img src="${backgroundMobile}" alt="Banner Image" class="w-full h-auto object-cover">`
                    : ""
                }
              </picture>`
            : ""
        }

        <div class="overlay absolute inset-0 flex flex-col justify-center items-center text-center p-5 bg-black/30">
          ${logoSrc ? `<img src="${logoSrc}" alt="Logo" class="mb-5 max-w-[180px]">` : ""}
          ${heading ? `<h1>${heading}</h1>` : ""}
          ${paragraph ? `<p class="p font-bold text-p1">${paragraph}</p>` : ""}
          ${
            buttonLabel
              ? `<base-button label="${buttonLabel}" variant="${buttonVariant}"></base-button>`
              : ""
          }
          <div class="button-group">
            ${
              primaryButtonLabel
                ? `<base-button label="${primaryButtonLabel}" variant="${primaryButtonVariant}"></base-button>`
                : ""
            }
            ${
              secondaryButtonLabel
                ? `<base-button label="${secondaryButtonLabel}" variant="${secondaryButtonVariant}"></base-button>`
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
