// bag
import bag1 from "../assets/image/bag/1.avif";
import bag2 from "../assets/image/bag/2.avif";
import bag3 from "../assets/image/bag/3.avif";
import bag4 from "../assets/image/bag/4.avif";
import bag5 from "../assets/image/bag/5.avif";
import bag6 from "../assets/image/bag/6.avif";

// cap
import cap1 from "../assets/image/cap/1.avif";
import cap2 from "../assets/image/cap/2.avif";
import cap3 from "../assets/image/cap/3.avif";
import cap4 from "../assets/image/cap/4.avif";
import cap5 from "../assets/image/cap/5.avif";
import cap6 from "../assets/image/cap/6.avif";
import cap7 from "../assets/image/cap/7.avif";
import cap8 from "../assets/image/cap/8.avif";

// car
import car1 from "../assets/image/car/1.avif";
import car2 from "../assets/image/car/2.avif";
import car3 from "../assets/image/car/3.avif";

// cool bag
import coolbag1 from "../assets/image/coolbag/1.avif";
import coolbag2 from "../assets/image/coolbag/2.avif";
import coolbag3 from "../assets/image/coolbag/3.avif";
import coolbag4 from "../assets/image/coolbag/4.avif";
import coolbag5 from "../assets/image/coolbag/5.avif";
import coolbag6 from "../assets/image/coolbag/6.avif";

// cup
import cup1 from "../assets/image/cup/1.avif";
import cup2 from "../assets/image/cup/2.avif";

// long shirt
import longshirt1 from "../assets/image/longshirt/1.avif";
import longshirt2 from "../assets/image/longshirt/2.avif";
import longshirt3 from "../assets/image/longshirt/3.avif";
import longshirt4 from "../assets/image/longshirt/4.avif";
import longshirt5 from "../assets/image/longshirt/5.avif";
import longshirt6 from "../assets/image/longshirt/6.avif";

// luggage
import luggage1 from "../assets/image/luggage/7.avif";
import luggage2 from "../assets/image/luggage/8.avif";
import luggage3 from "../assets/image/luggage/9.avif";

// shirt
import shirt1 from "../assets/image/shirt/1.avif";
import shirt2 from "../assets/image/shirt/2.avif";
import shirt3 from "../assets/image/shirt/3.avif";
import shirt4 from "../assets/image/shirt/4.avif";
import shirt5 from "../assets/image/shirt/5.avif";
import shirt6 from "../assets/image/shirt/6.avif";
import shirt7 from "../assets/image/shirt/7.avif";
import shirt8 from "../assets/image/shirt/8.avif";
// shoe
import shoe1 from "../assets/image/shoes/1.avif";
import shoe2 from "../assets/image/shoes/2.avif";
import shoe3 from "../assets/image/shoes/3.avif";
import shoe4 from "../assets/image/shoes/4.avif";
import shoe5 from "../assets/image/shoes/5.avif";
import shoe6 from "../assets/image/shoes/6.avif";
import shoe7 from "../assets/image/shoes/7.avif";
// watch
import watch1 from "../assets/image/watch/1.avif";
import watch2 from "../assets/image/watch/2.avif";
import watch3 from "../assets/image/watch/3.avif";
import watch4 from "../assets/image/watch/4.avif";
import watch5 from "../assets/image/watch/5.avif";
import watch6 from "../assets/image/watch/6.avif";

export {
  bag1,
  bag2,
  bag3,
  bag4,
  bag5,
  bag6,
  car1,
  cap2,
  cap3,
  coolbag1,
  coolbag2,
  coolbag3,
  coolbag4,
  coolbag5,
  coolbag6,
  cup1,
  cup2,
  longshirt1,
  longshirt2,
  longshirt3,
  longshirt4,
  longshirt5,
  longshirt6,
  luggage1,
  luggage2,
  luggage3,
  shirt1,
  shirt2,
  shirt3,
  shirt4,
  shirt5,
  shirt6,
  shirt7,
  shirt8,
  shoe1,
  shoe2,
  shoe3,
  shoe4,
  shoe5,
  shoe6,
  shoe7,
  watch1,
  watch2,
  watch3,
  watch4,
  watch5,
  watch6,
};

export const sampleProductDataList = [
  {
    id: 1,
    images: [
      { src: bag1, alt: "Bag 1" },
      { src: bag2, alt: "Bag 2" },
      { src: bag3, alt: "Bag 3" },
      { src: bag4, alt: "Bag 4" },
      { src: bag5, alt: "Bag 5" },
      { src: bag6, alt: "Bag 6" },
    ],
    category: "Bag",
    name: "Heritage Canvas Bag",
    price: "£90.00",
    discountPrice: "£70.00",
    normalPrice: "",
    priceNote: "incl. Tax",
    description: "Spacious canvas bag with vintage Porsche design.",
    sizes: [],
    deliveryOption: "Ship to home",
    deliveryButtons: ["Ship to home", "Pick up at Porsche Center"],
    shippingInfo: "Ships within 3–4 working days",
    sellerInfo: "Porsche Design",
  },
  {
    id: 2,
    images: [
      { src: cap1, alt: "Cap 1" },
      { src: cap2, alt: "Cap 2" },
      { src: cap3, alt: "Cap 3" },
      { src: cap4, alt: "Cap 4" },
      { src: cap5, alt: "Cap 5" },
      { src: cap6, alt: "Cap 6" },
      { src: cap7, alt: "Cap 7" },
      { src: cap8, alt: "Cap 8" },
    ],
    category: "Cap",
    name: "Motorsport Baseball Cap",
    price: "",
    discountPrice: "",
    normalPrice: "£35.00",
    priceNote: "excl. Tax",
    description:
      "Inspired by Porsche's timeless design legacy, the Heritage Canvas Bag combines functionality with sophisticated style.",
    sizes: ["One Size"],
    deliveryOption: "Ship to home",
    deliveryButtons: ["Ship to home", "Pick up at Porsche Center"],
    shippingInfo: "Ships within 1–2 working days",
    sellerInfo: "Porsche Motorsport",
  },
  {
    id: 3,
    images: [
      { src: car1, alt: "Car Model 1" },
      { src: car2, alt: "Car Model 2" },
      { src: car3, alt: "Car Model 3" },
    ],
    category: "Car Model",
    name: "1:43 Porsche 911 Carrera",
    price: "£55.00",
    discountPrice: "£45.00",
    normalPrice: "",
    priceNote: "incl. Tax",
    description:
      "Ideal for collectors or as a gift for Porsche lovers, this model brings the thrill of the 911 to your desk or shelf.",
    sizes: [],
    deliveryOption: "Ship to home",
    deliveryButtons: ["Ship to home"],
    shippingInfo: "Ships in 2–3 working days",
    sellerInfo: "Porsche Classic",
  },
  {
    id: 4,
    images: [
      { src: coolbag1, alt: "Coolbag 1" },
      { src: coolbag2, alt: "Coolbag 2" },
      { src: coolbag3, alt: "Coolbag 3" },
      { src: coolbag4, alt: "Coolbag 4" },
      { src: coolbag5, alt: "Coolbag 5" },
      { src: coolbag6, alt: "Coolbag 6" },
    ],
    category: "Cool Bag",
    name: "Thermo Cooler",
    price: "",
    discountPrice: "",
    normalPrice: "£60.00",
    priceNote: "incl. Tax",
    description:
      "This insulated cool bag features advanced thermal technology to keep your food and drinks fresh for hours.",
    sizes: [],
    deliveryOption: "Ship to home",
    deliveryButtons: ["Ship to home"],
    shippingInfo: "Ships within 5–7 working days",
    sellerInfo: "Porsche Travel",
  },
  {
    id: 5,
    images: [
      { src: cup1, alt: "Cup 1" },
      { src: cup2, alt: "Cup 2" },
    ],
    category: "Cup",
    name: "Porsche Espresso Cup",
    price: "£22.00",
    discountPrice: "£15.00",
    normalPrice: "",
    priceNote: "incl. Tax",
    description:
      "The ergonomic shape ensures a comfortable grip, while the compact size is perfect for enjoying a rich espresso.",
    sizes: [],
    deliveryOption: "Ship to home",
    deliveryButtons: ["Ship to home"],
    shippingInfo: "Ships within 1–2 working days",
    sellerInfo: "Porsche Home",
  },
  {
    id: 6,
    images: [
      { src: longshirt1, alt: "Longshirt 1" },
      { src: longshirt2, alt: "Longshirt 2" },
      { src: longshirt3, alt: "Longshirt 3" },
      { src: longshirt4, alt: "Longshirt 4" },
      { src: longshirt5, alt: "Longshirt 5" },
      { src: longshirt6, alt: "Longshirt 6" },
    ],
    category: "Long Shirt",
    name: "Heritage Long Sleeve Tee",
    price: "",
    discountPrice: "",
    normalPrice: "£50.00",
    priceNote: "incl. Tax",
    description:
      "Soft long sleeve cotton shirt with Porsche heritage graphics. Made from premium, soft cotton.",
    sizes: ["S", "M", "L", "XL"],
    deliveryOption: "Ship to home",
    deliveryButtons: ["Ship to home", "Pick up at Porsche Center"],
    shippingInfo: "Ships in 3–4 working days",
    sellerInfo: "Porsche Lifestyle",
  },
  {
    id: 7,
    images: [
      { src: luggage1, alt: "Luggage 1" },
      { src: luggage2, alt: "Luggage 2" },
      { src: luggage3, alt: "Luggage 3" },
    ],
    category: "Luggage",
    name: "Hardcase Travel Luggage",
    price: "£350.00",
    discountPrice: "£299.00",
    normalPrice: "",
    priceNote: "excl. Tax",
    description:
      "Hardcase Travel Luggage embodies Porsche's commitment to innovation and style. Constructed from lightweight, impact-resistant polycarbonate",
    sizes: [],
    deliveryOption: "Ship to home",
    deliveryButtons: ["Ship to home", "Pick up at Porsche Center"],
    shippingInfo: "Ships within 2–3 working days",
    sellerInfo: "Porsche Travel Systems",
  },
  {
    id: 8,
    images: [
      { src: shirt1, alt: "Shirt 1" },
      { src: shirt2, alt: "Shirt 2" },
      { src: shirt3, alt: "Shirt 3" },
      { src: shirt4, alt: "Shirt 4" },
      { src: shirt5, alt: "Shirt 5" },
      { src: shirt6, alt: "Shirt 6" },
      { src: shirt7, alt: "Shirt 7" },
      { src: shirt8, alt: "Shirt 8" },
    ],
    category: "Shirt",
    name: "Porsche Polo Shirt",
    price: "",
    discountPrice: "",
    normalPrice: "£55.00",
    priceNote: "incl. Tax",
    description:
      "Elegant polo shirt with Porsche branding. blending sporty elegance with everyday versatility.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    deliveryOption: "Ship to home",
    deliveryButtons: ["Ship to home", "Pick up at Porsche Center"],
    shippingInfo: "Ships in 2–3 working days",
    sellerInfo: "Porsche Apparel",
  },
  {
    id: 9,
    images: [
      { src: shoe1, alt: "Shoe 1" },
      { src: shoe2, alt: "Shoe 2" },
      { src: shoe3, alt: "Shoe 3" },
      { src: shoe4, alt: "Shoe 4" },
      { src: shoe5, alt: "Shoe 5" },
      { src: shoe6, alt: "Shoe 6" },
      { src: shoe7, alt: "Shoe 7" },
    ],
    category: "Shoe",
    name: "Urban Driving Sneaker",
    price: "£150.00",
    discountPrice: "£129.00",
    normalPrice: "",
    priceNote: "incl. Tax",
    description:
      "These sneakers feature a lightweight, breathable mesh upper combined with a cushioned sole for superior comfort during long drives or casual outings.",
    sizes: ["39", "40", "41", "42", "43", "44"],
    deliveryOption: "Ship to home",
    deliveryButtons: ["Ship to home", "Pick up at Porsche Center"],
    shippingInfo: "Ships in 3–5 working days",
    sellerInfo: "Porsche Footwear",
  },
  {
    id: 10,
    images: [
      { src: watch1, alt: "Watch 1" },
      { src: watch2, alt: "Watch 2" },
      { src: watch3, alt: "Watch 3" },
      { src: watch4, alt: "Watch 4" },
      { src: watch5, alt: "Watch 5" },
      { src: watch6, alt: "Watch 6" },
    ],
    category: "Watch",
    name: "Chronograph Titanium Watch",
    price: "",
    discountPrice: "",
    normalPrice: "£650.00",
    priceNote: "excl. Tax",
    description:
      "Premium Porsche chronograph with titanium case and leather strap. reflecting Porsche's commitment to engineering excellence.",
    sizes: [],
    deliveryOption: "Ship to home",
    deliveryButtons: ["Ship to home", "Pick up at Porsche Center"],
    shippingInfo: "Ships within 2–4 working days",
    sellerInfo: "Porsche Design Timepieces",
  },
];
