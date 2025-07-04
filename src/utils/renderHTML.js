// src/utils/renderHTML.js
export function renderHTML(template) {
  const element = document.createElement("div"); // Create a temporary container
  element.innerHTML = template; // Set the HTML content inside the div
  return element.firstElementChild || element; // Ensure we return the first valid element
}
