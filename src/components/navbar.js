"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
   FaTruck,
   FaUserCircle,
   FaShoppingBag,
   FaSearch,
   FaBars,
} from "react-icons/fa";
import { useCart } from "@/app/context/CartContext";
import CartSidebar from "@/components/CartSidebar";
import { products } from "@/app/data/products"; // Import the product list
import styles from "../styles/navbar.module.css";

export default function Navbar() {
   const [search, setSearch] = useState("");
   const [suggestions, setSuggestions] = useState([]);
   const [menuOpen, setMenuOpen] = useState(false);
   const { cart, isCartOpen, setIsCartOpen } = useCart();
   const router = useRouter();

   // 🔎 Fetch Product Suggestions
   useEffect(() => {
      if (search.trim() === "") {
         setSuggestions([]);
         return;
      }

      // Filter products based on search input
      const filtered = products.filter((product) =>
         product.name.toLowerCase().includes(search.toLowerCase())
      );

      setSuggestions(filtered);
   }, [search]);

   // 🔎 Handle Search Submit (Redirect on Enter)
   const handleSearchSubmit = (e) => {
      e.preventDefault();
      if (search.trim()) {
         router.push(`/search?query=${search}`);
         setSuggestions([]); // Hide suggestions
      }
   };

   return (
      <nav className={styles.navbar}>
         {/* 🔹 Top Bar */}
         <div className={styles.topBar}>
            <span className={styles.shipping}>
               <FaTruck /> Free Shipping for orders over $50
            </span>
            <div className={styles.topLinks}>
               <Link href="#">About</Link>
               <Link href="#">Contact</Link>
               <Link href="#">Help Center</Link>
               <span>
                  Call Us <a href="tel:1234567890">8148835997</a>
               </span>
            </div>
         </div>

         {/* 🔹 Main Navbar */}
         <div className={styles.mainNav}>
            <button
               className={styles.menuButton}
               onClick={() => setMenuOpen(!menuOpen)}
            >
               <FaBars />
            </button>

            <h1 className={styles.logo}>Mk Shop</h1>

            {/* 🔎 Search Bar with Suggestions */}
            <div className={styles.searchContainer}>
               <form onSubmit={handleSearchSubmit} className={styles.searchBarContainer}>
                  <input
                     type="text"
                     placeholder="Search..."
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     className={styles.searchInput}
                  />
                  <button type="submit" className={styles.searchButton}>
                     <FaSearch />
                  </button>
               </form>

               {/* 🛒 Search Suggestions Dropdown */}
               {suggestions.length > 0 && (
                  <ul className={styles.suggestionsList}>
                     {suggestions.map((product) => (
                        <li
                           key={product.id}
                           className={styles.suggestionItem}
                           onClick={() => {
                              setSearch(product.name);
                              setSuggestions([]);
                              router.push(`/product/${product.id}`);
                           }}
                        >
                           {product.name}
                        </li>
                     ))}
                  </ul>
               )}
            </div>

            {/* 🛍 Icons */}
            <div className={styles.icons}>
               <button
                  className={styles.loginButton}
                  onClick={() => router.push("/auth")}
               >
                  <FaUserCircle />
               </button>

               <button
                  className={styles.cartIcon}
                  onClick={() => setIsCartOpen(true)}
               >
                  <FaShoppingBag />
                  {cart.length > 0 && (
                     <span className={styles.cartCount}>{cart.length}</span>
                  )}
               </button>
            </div>
         </div>

         {/* 🔹 Categories (Mobile & Desktop) */}
         {menuOpen && (
            <div className={styles.categoriesMobile}>
               {[
                  "Shop All",
                  "Computers",
                  "Tablets",
                  "Drones & Cameras",
                  "Audio",
                  "Mobile",
                  "TV & Home Cinema",
                  "Wearable Tech",
                  "Sale",
               ].map((item, index) => (
                  <Link key={index} href="#" className={styles.categoryItem}>
                     {item}
                  </Link>
               ))}
            </div>
         )}

         <div className={styles.categoriesDesktop}>
            {[
               "Shop All",
               "Computers",
               "Tablets",
               "Drones & Cameras",
               "Audio",
               "Mobile",
               "TV & Home Cinema",
               "Wearable Tech",
               "Sale",
            ].map((item, index) => (
               <Link key={index} href="/shop" className={styles.categoryItem}>
                  {item}
               </Link>
            ))}
         </div>

         {/* ✅ Cart Sidebar */}
         <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </nav>
   );
}
