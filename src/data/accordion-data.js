import {
  discoverLg,
  applePayLg,
  mastercardLg,
  visaLg,
  dinerMd,
  amexLg,
  facebook,
  instagram,
  x,
  pinterest,
  linkin,
} from "@assets";

const navItems = [
  { href: "index.html", label: "Terms and Conditions." },
  { href: "#", label: "Privacy Notice." },
  { href: "#", label: "California Privacy." },
  { href: "#", label: "Imprint and Legal Notice." },
  { href: "#", label: "Accessibility Statement." },
  { href: "#", label: "Consumption Information." },
  { href: "#", label: "Do Not Sell or Share My Personal Information." },
  { href: "#", label: "Business and Human Rights." },
  { href: "#", label: "Open Source Software Notice." },
];

const iconPayment = [
  { label: discoverLg },
  { label: applePayLg },
  { label: mastercardLg },
  { label: visaLg },
  { label: dinerMd },
  { label: amexLg },
];

const iconMedia = [
  { label: facebook },
  { label: instagram },
  { label: pinterest },
  { label: x },
  { label: linkin },
];

const iconListMedia = iconMedia
  .map(
    item => `<div class="flex items-center gap-5">
          <span class="bg-white square flex items-center justify-center">
          <icon-button icon="${item.label}" class=""></icon-button>
          </span>
          </div>`
  )
  .join("");

const iconListPayment = iconPayment
  .map(
    item => `<div class="flex items-center gap-5">
          <span class="bg-white square flex items-center justify-center">
          <icon-button icon="${item.label}" class=""></icon-button>
          </span>
          </div>`
  )
  .join("");

const navList = navItems
  .map(item => `<span><a href="${item.href}">${item.label}</a></span>`)
  .join("");

export const sampleSets = {
  productDetails: [
    { "desc-label": "Weight", "desc-value": "Light; Compact; Durable" },
    { label: "Size", value: "Medium" },
  ],
  shippingInfo: [
    { "desc-label": "Delivery", "desc-value": "1–3 Days; Local Only" },
    { label: "Carrier", value: "DHL Express" },
  ],
  warrantyDetails: [
    { label: "Period", value: "2 Years" },
    { "desc-label": "Coverage", "desc-value": "Mechanical Failure; Battery; Screen" },
  ],
  // footer-a
  newsLetter: [
    {
      label: "Never miss a thing again",
      value: `
        <base-button class="contactUs flex w-fit border border-white border-medium" label="Subscribe to the newsletter" variant="primary"></base-button>
      `,
    },
  ],
  contactUs: [
    {
      label: "Any question",
      value: `
        <base-button class="contactUs flex w-fit border border-white border-medium" label="Contact us" variant="primary"></base-button>
      `,
    },
  ],
  socialMedia: [
    {
      label: "Connect with Porsche",
      value: `
        <div class="flex gap-3 flex-wrap">
          ${iconListMedia}
        </div>
      `,
    },
  ],
  simplePayment: [
    {
      label: "Choose your preferred option",
      value: `
        <div class="flex gap-3 flex-wrap">
          ${iconListPayment}
        </div>
      `,
    },
  ],
  legalService: [
    {
      label: "",
      value: `
        <div class="flex flex-col-reverse gap-3">
          ${navList}
        </div>
      `,
    },
  ],
};
