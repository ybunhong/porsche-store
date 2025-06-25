import { renderHomePage } from "./pages/home-page.js";
import { renderProductPage } from "./pages/product-list.js";

function router() {
  const app = document.getElementById("app");
  const route = window.location.pathname;

  switch (route) {
    case "/products":
      app.innerHTML = renderProductPage();
      break;
    case "/home":
    case "":
    case "/#":
    default:
      app.innerHTML = renderHomePage();
      break;
  }
}

// Run router on initial load
window.addEventListener("load", router);

// Run router when URL hash changes
window.addEventListener("hashchange", router);
