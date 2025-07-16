import { arrow } from "@assets";
import searchImage from "../../../assets/search-item.avif";
import "./search-result-item.css";

class SearchResultItem extends BaseComponent {
  static get observedAttributes() {
    return ["title", "description", "price", "image", "href"];
  }

  constructor() {
    super();
    this.title = "";
    this.description = "";
    this.price = "";
    this.image = "";
    this.href = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateTemplate();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case "title":
          this.title = newValue || "";
          break;
        case "description":
          this.description = newValue || "";
          break;
        case "price":
          this.price = newValue || "";
          break;
        case "image":
          this.image = newValue || "";
          break;
        case "href":
          this.image = newValue || "";
          break;
        default:
          console.warn(`Unhandled observed attribute: ${name}`);
      }
      this.updateTemplate();
    }
  }

  updateTemplate() {
    this.template = /* html */ `
      <a href="${this.href}" class="flex gap-3 w-full items-center hover-bg-primary rounded">

        <div>
            <img src="${this.image || searchImage}" class="image"/>
        </div>

        <div class="w-full overflow-hidden ">
            <h4 class>${this.title}</h4>
            <p class="body-sm whitespace-nowrap text-ellipsis" >${this.description}</p>
            <p class="body-xs text-disable">${this.price}</p>
        </div>

        <img src="${arrow}" class="arrow"/>
   

       </a>
  
    `;
    this.render();
  }
}

customElements.define("search-result-item", SearchResultItem);
