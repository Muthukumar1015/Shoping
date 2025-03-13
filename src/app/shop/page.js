"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/shop.module.css";

// ✅ Categories
const categories = [
  "All Products",
  "Computers",
  "Drones & Cameras",
  "Headphones",
  "Mobile",
  "Speakers",
  "Tablets",
  "TV & Home Cinema",
  "Wearable Tech",
];

// ✅ Product Data
const products = [
  { id: 5, name: "Bluetooth Speaker", price: 50, salePrice: 40, category: "Speakers", image: "/speaker.jpg" },
  { id: 6, name: "Smartwatch", price: 60, salePrice: 50, category: "Wearable Tech", image: "/watch1.jpg" },
  { id: 7, name: "Gaming Laptop", price: 1200, salePrice: 1100, category: "Computers", image: "/laptop.jpg" },
  { id: 8, name: "Smartphone 5G", price: 999, salePrice: 899, category: "Mobile", image: "/phone-promo.jpg" },
  { id: 9, name: "4K OLED Smart TV", price: 900, salePrice: 850, category: "TV & Home Cinema", image: "/tv.jpg" },
  { id: 10, name: "Smart Home Security Camera", price: 150, salePrice: 135, category: "Drones & Cameras", image: "/camera1.jpg" }, 
  { id: 11, name: "Smart Light Bulb", price: 20, salePrice: 15, category: "Home Automation", image: "/lightbulb.jpg" },
  { id: 12, name: "Tablet Pro 12.3\"", price: 130, salePrice: 120, category: "Tablets", image: "/tablet2.jpg" },
  { id: 13, name: "Wearable Fitness Band", price: 45, salePrice: 35, category: "Wearable Tech", image: "/watch.jpg" },
  { id: 14, name: "Tablet Mini 8\"", price: 70, salePrice: 60, category: "Tablets", image: "/tablet1.jpg" },
  { id: 15, name: "TV Bluetooth Soundbar", price: 110, salePrice: 95, category: "Speakers", image: "/soundbar.jpg" },
  { id: 16, name: "Smart Light Bulb", price: 20, salePrice: 15, category: "Home Automation", image: "/lightbulb1.jpg" },
  { id: 17, name: "Gaming Headset", price: 65, salePrice: 55, category: "Headphones", image: "/gaming.jpg" },
  { id: 18, name: "Smartphone", price: 700, salePrice: 650, category: "Mobile", image: "/smartphone.jpg" },
  { id: 19, name: "Tablet FD Plus 10.3\"", price: 95, salePrice: 85, category: "Tablets", image: "/tablet.jpg" },
  { id: 20, name: "Wireless Earbuds", price: 55, salePrice: 45, category: "Headphones", image: "/earbuds.jpg" },
  { id: 21, name: "Portable Bluetooth Speaker", price: 75, salePrice: 65, category: "Speakers", image: "/portable_speaker.jpg" },
  { id: 22, name: "Camera", price: 150, salePrice: 135, category: "Drones & Cameras", image: "/camera.jpg" },
  { id: 23, name: "VR Headset", price: 200, salePrice: 180, category: "Headphones", image: "/vr1.jpg" },
  { id: 24, name: "4K Action Camera", price: 250, salePrice: 230, category: "Drones & Cameras", image: "/action_cam.jpg" },
  { id: 25, name: "Noise Cancelling Earbuds", price: 100, salePrice: 90, category: "Headphones", image: "/earbuds1.jpg" },
  { id: 26, name: "Tablet Pro 11\" 128GB", price: 110, salePrice: 100, category: "Tablets", image: "/tablet5.jpg" },
  { id: 27, name: "Smartphone Pro Max", price: 1200, salePrice: 1100, category: "Mobile", image: "/smartphone.jpg" },
  { id: 28, name: "Wireless Gaming Mouse", price: 60, salePrice: 50, category: "Computers", image: "/mouse.jpg" },
  { id: 29, name: "Smart Alarm Clock", price: 40, salePrice: 30, category: "Home Automation", image: "/clock.jpg" },
  { id: 30, name: "High-Res Audio Player", price: 300, salePrice: 280, category: "Headphones", image: "/audio_player.jpg" },
  { id: 31, name: "Smart Air Purifier", price: 500, salePrice: 450, category: "Home Automation", image: "/air_purifier.jpg" },
  { id: 32, name: "Mini Projector", price: 250, salePrice: 225, category: "TV & Home Cinema", image: "/projector.jpg" }
];


// ✅ Main Component
export default function ShopPage() {
  const [price, setPrice] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortOption, setSortOption] = useState("Recommended");

  // 🔹 **Filter Products by Price & Category**
  const filteredProducts = products.filter((product) => {
    return (
      product.price <= price &&
      (selectedCategory === "All Products" || product.category === selectedCategory)
    );
  });

  // 🔹 **Sorting Function**
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "Newest":
        return b.id - a.id;
      case "Price (low to high)":
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      case "Price (high to low)":
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      case "Name A-Z":
        return a.name.localeCompare(b.name);
      case "Name Z-A":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className={styles.shopPage}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <nav>
          <h3 className={styles.title}>Categories</h3>
          <ul className={styles.categoryList}>
            {categories.map((category) => (
              <li
                key={category}
                className={selectedCategory === category ? styles.active : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>

          {/* Price Filter */}
          <h3 className={styles.title}>Filter by Price</h3>
          <div className={styles.filterSection}>
            <input
              type="range"
              min="50"
              max="1000"
              value={price}
              className={styles.slider}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <div className={styles.priceRange}>
              <span>$50</span>
              <span>${price}</span>
            </div>
          </div>
        </nav>
      </div>

      {/* Product Grid */}
      <div className={styles.productSection}>
        {/* Sorting */}
        <div className={styles.sorting}>
          <span>Sort by:</span>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option>Recommended</option>
            <option>Newest</option>
            <option>Price (low to high)</option>
            <option>Price (high to low)</option>
            <option>Name A-Z</option>
            <option>Name Z-A</option>
          </select>
        </div>

        {/* Products */}
        <div className={styles.productGrid}>
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id} className={styles.productCard}>
                {product.salePrice && <span className={styles.saleBadge}>SALE</span>}
                <img src={product.image} alt={product.name} className={styles.productImage} />
                <p className={styles.productName}>{product.name}</p>
                <p className={styles.productPrice}>
                  {product.salePrice && <span className={styles.oldPrice}>${product.price}.00</span>}
                  <span className={styles.newPrice}>${product.salePrice || product.price}.00</span>
                </p>
              </Link>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
}
