"use client";
import { useState } from "react";
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
import styles from "../styles/navbar.module.css";

export default function Navbar() {
   const [search, setSearch] = useState("");
   const [menuOpen, setMenuOpen] = useState(false);
   const { cart, isCartOpen, setIsCartOpen } = useCart();
   const router = useRouter();

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
            {/* ☰ Menu Button (Left Corner) */}
            <button
               className={styles.menuButton}
               onClick={() => setMenuOpen(!menuOpen)}
            >
               <FaBars />
            </button>

            {/* Logo (Centered) */}
            <h1 className={styles.logo}>Mk Shop</h1>

            {/* 🔹 Search Bar & Icons (Right Side) */}
            <div className={styles.searchIconsContainer}>
               {/* 🔎 Search Bar */}
               <div className={styles.searchBarContainer}>
                  <input
                     type="text"
                     placeholder="Search..."
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     className={styles.searchInput}
                  />
                  <button className={styles.searchButton}>
                     <FaSearch />
                  </button>
               </div>

               {/* 🛒 Icons */}
               <div className={styles.icons}>
                  {/* 👤 Log In */}
                  <button
                     className={styles.loginButton}
                     onClick={() => router.push("/auth")}
                  >
                     <FaUserCircle />
                  </button>

                  {/* 🛍️ Cart */}
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
         </div>

         {/* 🔹 Categories (Mobile Dropdown) */}
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

         {/* 🔹 Categories (Desktop) */}
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
