"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/Hero.module.css";
import { FaShippingFast, FaHeadphones, FaTags, FaClock } from "react-icons/fa";

const images = ["/bg1.jpg", "/bg2.jpg", "/bg3.jpg"]; // Background images
const bestSellers = [
  {
    id: 1,
    image: "/tablet.jpg",
    title: "JP - Space Tablet 10.4\" Wi-Fi 32GB",
    oldPrice: "$85.00",
    newPrice: "$70.00",
  },
  {
    id: 2,
    image: "/tablet2.jpg",
    title: "Ocean Pro 11 - 12.3\" Touch Screen",
    oldPrice: "$85.00",
    newPrice: "$70.00",
  },
  {
    id: 3,
    image: "/tv.jpg",
    title: "Shel 50\" Class LED 4K UHD Smart TV",
    newPrice: "$85.00",
  },
  {
    id: 4,
    image: "/watch.jpg",
    title: "Fitboot Inspire Fitness Tracker With Heart Rate Tracking",
    oldPrice: "$85.00",
    newPrice: "$70.00",
  },
];

const categories = [
  { id: 1, image: "/laptop.jpg", name: "Computers" },
  { id: 2, image: "/mobile.jpg", name: "Mobile" },
  { id: 3, image: "/drone.jpg", name: "Drones & Cameras" },
  { id: 4, image: "/sale.jpg", name: "Sale" },
  { id: 5, image: "/tablet1.jpg", name: "Tablets" },
  { id: 6, image: "/best-sellers.jpg", name: "Best Sellers" },
  { id: 7, image: "/tv1.jpg", name: "T.V & Home Cinema" },
  { id: 8, image: "/watch1.jpg", name: "Wearable Tech" },
  { id: 9, image: "/speaker.jpg", name: "Speakers" },
  { id: 10, image: "/headphones.jpg", name: "Headphones" },
];
const onSaleItems = [
  { id: 1, image: "/watch.jpg", title: "Space Moon Smartwatch With Charger", oldPrice: "$85.00", newPrice: "$70.00" },
  { id: 2, image: "/phone-promo.jpg", title: "OVE Light Space 5G, 128GB", oldPrice: "$85.00", newPrice: "$70.00" },
  { id: 3, image: "/laptop.jpg", title: "Pilates 16\" Touch Screen Laptop 24GB Memory", oldPrice: "$85.00", newPrice: "$70.00" },
  { id: 4, image: "/speaker.jpg", title: "Turn5 Portable Bluetooth Speaker", oldPrice: "$85.00", newPrice: "$70.00" },
  { id: 5, image: "/vr.jpg", title: "Journey Glass XD Virtual Reality Headset", oldPrice: "$85.00", newPrice: "$70.00" },
  { id: 6, image: "/camera.jpg", title: "H1C Indoor Wireless 1080p Network Security Camera", oldPrice: "$85.00", newPrice: "$70.00" }
];

const brands = ["ZODIAC", "ZORO", "PJK", "GXL", "HORIZON"];

export default function Hero() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.heroSection}>
      {/* Hero Banner */}
      <div
        className={styles.hero}
        style={{ backgroundImage: `url(${images[bgIndex]})` }}
      >
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <span className={styles.badge}>Best Prices</span>
          <h1>Incredible Prices on All Your Favorite Items</h1>
          <p>Get more for less on selected brands</p>
          <button className={styles.shopButton}>Shop Now</button>
        </div>
      </div>

      {/* Promotional Cards */}
      <div className={styles.cardsContainer}>
        <div className={styles.card} style={{ backgroundColor: "#D32F2F" }}>
          <div className={styles.cardContent}>
            <span>Holiday Deals</span>
            <h2>Up to <strong>30% off</strong></h2>
            <p>Selected Smartphone Brands</p>
            <button className={styles.cardButton}>Shop</button>
          </div>
          <img src="/phone-promo.jpg" alt="Phone Promotion" className={styles.cardImage} />
        </div>

        <div className={styles.card} style={{ backgroundColor: "#673AB7" }}>
          <div className={styles.cardContent}>
            <span>Just In</span>
            <h2>Take Your Sound Anywhere</h2>
            <p>Top Headphone Brands</p>
            <button className={styles.cardButton}>Shop</button>
          </div>
          <img src="/headphone-promo.jpg" alt="Headphone Promotion" className={styles.cardImage} />
        </div>
      </div>

      {/* Features Section */}
      <div className={styles.featuresContainer}>
        <div className={styles.featureItem}><FaShippingFast className={styles.icon} /><div><h3>Free Shipping</h3><p>On orders over $50</p></div></div>
        <div className={styles.featureItem}><FaTags className={styles.icon} /><div><h3>Low Prices</h3><p>Guaranteed savings</p></div></div>
        <div className={styles.featureItem}><FaHeadphones className={styles.icon} /><div><h3>24/7 Support</h3><p>Available anytime</p></div></div>
        <div className={styles.featureItem}><FaClock className={styles.icon} /><div><h3>Fast Delivery</h3><p>Speedy & secure</p></div></div>
      </div>

      {/* Best Sellers Carousel */}
      <div className={styles.bestSellersSection}>
        <h2 className={styles.sectionTitle}>Best Sellers</h2>
        <div className={styles.carousel}>
          {bestSellers.map((item) => (
            <div key={item.id} className={styles.productCard}>
              <span className={styles.saleBadge}>SALE</span>
              <img src={item.image} alt={item.title} className={styles.productImage} style={{ width: "250px", height: "150px", objectFit: "contain" }} />
              <p className={styles.productTitle}>{item.title}</p>
              <p className={styles.productPrice}>
                {item.oldPrice && <span className={styles.oldPrice}>{item.oldPrice}</span>} {item.newPrice}
              </p>
            </div>
          ))}
        </div>
        <button className={styles.viewAllButton} style={{ display: "block", margin: "20px auto", backgroundColor: "#6c36ff", color: "white", padding: "12px 20px", borderRadius: "20px", border: "none", cursor: "pointer" }}>View All</button>
      </div>

      {/* Categories Section */}
      <div className={styles.categoriesSection}>
        <h2 className={styles.sectionTitle}>Shop by Category</h2>
        <div className={styles.categoriesGrid}>
          {categories.map((category) => (
            <div key={category.id} className={styles.categoryCard}>
              <img src={category.image} alt={category.name} className={styles.categoryImage} />
              <p className={styles.categoryName}>{category.name}</p>
            </div>
          ))}
        </div>
      </div>
 {/* Promotional Banner */}
<div className={styles.promoBanner}>
  <div className={styles.promoImageContainer}>
    <img src="/promo-banner.jpg" alt="Promotional Banner" className={styles.promoImage} />
    <span className={styles.bestPriceBadge}>Best Price</span>
  </div>
  <div className={styles.promoContent}>
    <h2>Exclusive Deals Just for You!</h2>
    <p>Don't miss out on our latest discounts and special offers.</p>
    <button className={styles.promoButton}>Shop Now</button>
  </div>
</div>
  {/* On Sale Section */}
  <div className={styles.onSaleSection}>
        <h2 className={styles.sectionTitle}>On Sale</h2>
        <div className={styles.saleGrid}>
          {onSaleItems.map((item) => (
            <div key={item.id} className={styles.saleCard}>
              <span className={styles.saleBadge}>SALE</span>
              <img src={item.image} alt={item.title} className={styles.saleImage} />
              <p className={styles.saleTitle}>{item.title}</p>
              <p className={styles.salePrice}><span className={styles.oldPrice}>{item.oldPrice}</span> {item.newPrice}</p>
            </div>
          ))}
        </div>
        <button className={styles.viewAllButton}>View All</button>
      </div>
  
 {/* Promotional Banner 2 */}
 <div className={styles.promoBanner1}>
  {/* Left Side - Text */}
  <div className={styles.promoContent1}>
    <h2>Best Aerial View in Town</h2>
    <h3><span className={styles.discount1}>30%</span> OFF</h3>
    <p>On professional camera drones</p>
    <p className={styles.smallText1}>Limited quantities. See product detail pages for availability.</p>
    <button className={styles.promoButton1}>Shop</button>
  </div>

  {/* Right Side - Image */}
  <div className={styles.promoImageContainer1}>
    <img src="/promo-banner2.jpg" alt="Promotional Offer" className={styles.promoImage1} />
    <span className={styles.bestPriceBadge1}>Best Price</span>
  </div>
</div>
{/* Brand Section */}
<div className={styles.brandsSection}>
      <h2 className={styles.sectionTitle}>Brands</h2>
      <div className={styles.brandsGrid}>
        {brands.map((brand, index) => (
          <div key={index} className={styles.brandCard}>
            <span className={styles.brandName}>{brand}</span>
          </div>
        ))}
      </div>
    </div>

{/* Newsletter Section */}
      <div className={styles.newsletterSection}>
        <h2>Newsletter</h2>
        <p>Sign up to receive updates on new arrivals and special offers</p>
        <div className={styles.newsletterForm}>
          <input type="email" placeholder="Email *" className={styles.input} />
          <button className={styles.subscribeButton}>Subscribe</button>
        </div>
        <div className={styles.checkboxContainer}>
          <input type="checkbox" id="subscribe" />
          <label htmlFor="subscribe">Yes, subscribe me to your newsletter.</label>
        </div>
      </div>

    </section>
  );
}
