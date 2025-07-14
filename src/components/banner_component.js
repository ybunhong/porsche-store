class PorscheHeroCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "../components/banner_component.css");
    this.shadowRoot.appendChild(linkElem);

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML += `
      <div class="banner">
    <picture>
      <!-- Desktop image -->
      <source srcset="img/8dc2a35d-348c-4456-bbc2-997dffda1a54.jpeg" media="(min-width: 768px)">
      <!-- Mobile image -->
      <img src="img/d290e4b4-7a46-43e7-ab18-906ef39d8d86 (1).jpeg" alt="Luxury Porsche scenery" >
    </picture>
    <div class="overlay">
    <img src="img/download (1).svg" alt="">
      <button>Discover Now</button>
    </div>
  </div>

    `;
  }
}

customElements.define("banner-component", PorscheHeroCard);
